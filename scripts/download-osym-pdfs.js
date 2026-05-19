#!/usr/bin/env node
// openyks — ÖSYM YKS PDF indirici (2018-2025 TYT/AYT/YDT-İng).
// Proje sahibi ÖSYM içeriklerini kullanmak için yazılı izin aldığını beyan ediyor.
// Sadece resmî dokuman.osym.gov.tr kaynaklarından indirir.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');
const SOURCES = JSON.parse(fs.readFileSync(path.join(__dirname, 'sources.json'), 'utf8'));
const MANIFEST_PATH = path.join(ROOT, 'data/exams/osym-yks-manifest.json');
const REPORT_PATH = path.join(ROOT, 'data/exams/download-report.md');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function get(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, {
      headers: { 'User-Agent': UA, 'Referer': 'https://www.osym.gov.tr/', 'Accept': 'application/pdf,*/*' },
    }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && maxRedirects > 0) {
        res.resume();
        return resolve(get(new URL(res.headers.location, url).toString(), maxRedirects - 1));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(60000, () => { req.destroy(new Error('Timeout')); });
  });
}

function sha256(buf) { return crypto.createHash('sha256').update(buf).digest('hex'); }
function isPdf(buf) { return buf.length > 10240 && buf.slice(0, 4).toString() === '%PDF'; }

const TYPE_META = {
  tyt: { type: 'TYT', language: null, dir: 'tyt', label: 'Temel Yeterlilik Testi' },
  ayt: { type: 'AYT', language: null, dir: 'ayt', label: 'Alan Yeterlilik Testleri' },
  ydt_ing: { type: 'YDT', language: 'ing', dir: 'ydt/en', label: 'Yabancı Dil Testi (İngilizce)' },
};

async function main() {
  const records = [];
  for (const year of Object.keys(SOURCES).sort()) {
    for (const key of Object.keys(SOURCES[year])) {
      const meta = TYPE_META[key];
      const url = SOURCES[year][key];
      const relDir = `assets/exams/${year}/${meta.dir}`;
      const absDir = path.join(ROOT, relDir);
      fs.mkdirSync(absDir, { recursive: true });
      const bookletRel = `${relDir}/booklet.pdf`;
      const bookletAbs = path.join(ROOT, bookletRel);

      const title = `${year} YKS ${meta.type}${meta.language === 'ing' ? ' (İngilizce)' : ''} Soru Kitapçığı ve Cevap Anahtarı`;
      const record = {
        year: Number(year),
        type: meta.type,
        language: meta.language,
        title,
        status: 'missing',
        booklet: { status: 'missing', localPath: null, sourceUrl: url },
        answerKey: { status: 'included', localPath: null, sourceUrl: url, note: 'Cevap anahtarı kitapçık içinde' },
        answerKeyIncludedInBooklet: true,
        downloadedAt: null,
        source: 'ÖSYM',
        sourcePage: `https://www.osym.gov.tr/tr,15164/yks-cikmis-sorular.html`,
      };

      try {
        process.stdout.write(`↓ ${year} ${meta.type}${meta.language ? '-'+meta.language : ''} ... `);
        const buf = await get(url);
        if (!isPdf(buf)) throw new Error('Geçersiz PDF (header / boyut)');
        fs.writeFileSync(bookletAbs, buf);
        const hash = sha256(buf);
        record.status = 'downloaded';
        record.booklet = { status: 'downloaded', localPath: bookletRel, sourceUrl: url, sizeBytes: buf.length, sha256: hash };
        record.answerKey = { status: 'included', localPath: bookletRel, sourceUrl: url, note: 'Cevap anahtarı kitapçık içinde' };
        record.downloadedAt = new Date().toISOString();
        fs.writeFileSync(path.join(absDir, 'metadata.json'), JSON.stringify(record, null, 2));
        console.log(`OK ${(buf.length/1024/1024).toFixed(2)} MB`);
      } catch (e) {
        record.error = e.message;
        console.log(`HATA: ${e.message}`);
      }
      records.push(record);
    }
  }

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  const manifest = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    source: 'ÖSYM (https://www.osym.gov.tr)',
    note: 'PDF dosyaları proje sahibinin beyan ettiği yazılı izne dayanılarak resmî ÖSYM kaynağından indirilmiştir.',
    totals: {
      exams: records.length,
      downloaded: records.filter(r => r.status === 'downloaded').length,
      missing: records.filter(r => r.status === 'missing').length,
    },
    exams: records,
  };
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  const lines = [];
  lines.push(`# openyks — ÖSYM PDF Arşivi İndirme Raporu`);
  lines.push(``);
  lines.push(`- Oluşturulma: ${manifest.generatedAt}`);
  lines.push(`- Toplam sınav: ${manifest.totals.exams}`);
  lines.push(`- İndirilen: ${manifest.totals.downloaded}`);
  lines.push(`- Eksik: ${manifest.totals.missing}`);
  lines.push(`- Kaynak: ÖSYM resmî dokuman.osym.gov.tr`);
  lines.push(``);
  lines.push(`| Yıl | Sınav | Durum | Dosya | Boyut | SHA256 | Kaynak |`);
  lines.push(`|-----|-------|-------|-------|-------|--------|--------|`);
  for (const r of records) {
    const t = `${r.type}${r.language ? ' ('+r.language+')' : ''}`;
    if (r.status === 'downloaded') {
      const mb = (r.booklet.sizeBytes/1024/1024).toFixed(2) + ' MB';
      lines.push(`| ${r.year} | ${t} | ✅ indirildi | \`${r.booklet.localPath}\` | ${mb} | \`${r.booklet.sha256.slice(0,16)}…\` | [link](${r.booklet.sourceUrl}) |`);
    } else {
      lines.push(`| ${r.year} | ${t} | ❌ eksik | — | — | — | [link](${r.booklet.sourceUrl}) — ${r.error || ''} |`);
    }
  }
  lines.push(``);
  lines.push(`## Not`);
  lines.push(`- 2018–2025 YKS soru kitapçıkları ÖSYM tarafından tek PDF içinde yayımlanır; cevap anahtarı genellikle kitapçık PDF'inin sonunda yer alır. Bu nedenle \`answerKeyIncludedInBooklet: true\` olarak işaretlenmiştir.`);
  lines.push(`- YDT için yalnızca İngilizce dili indirilmiştir (proje gereksinimi).`);
  fs.writeFileSync(REPORT_PATH, lines.join('\n'));

  console.log(`\nManifest: ${MANIFEST_PATH}`);
  console.log(`Rapor:    ${REPORT_PATH}`);
  console.log(`Özet: ${manifest.totals.downloaded}/${manifest.totals.exams} indirildi.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
