#!/usr/bin/env node
/**
 * openyks · ÖSYM PDF indirici
 *
 * - Sadece data/exams/osym-source-links.json içindeki URL'leri kullanır.
 * - Asla URL uydurmaz. Boş URL = missing.
 * - Sadece .pdf veya content-type application/pdf olan dosyaları kabul eder.
 * - Hiçbir korumayı (paywall/login/captcha) aşmaz; 401/403/redirect-login durumunda atlar.
 * - Dosyayı doğrular (>10KB ve %PDF header).
 * - data/exams/osym-yks-manifest.json ve missing-report.json dosyalarını günceller.
 *
 * Kullanım:
 *   npm run exams:download           # indir
 *   npm run exams:check              # --dry-run
 *   npm run exams:report             # sadece raporu yenile
 *   node scripts/download-osym-pdfs.js --force
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data', 'exams');
const ASSETS_DIR = path.join(ROOT, 'assets', 'exams');
const MANIFEST_PATH = path.join(DATA_DIR, 'osym-yks-manifest.json');
const SOURCES_PATH = path.join(DATA_DIR, 'osym-source-links.json');
const MISSING_PATH = path.join(DATA_DIR, 'missing-report.json');
const REPORT_PATH = path.join(DATA_DIR, 'download-report.md');

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');
const FORCE = args.has('--force');
const REPORT_ONLY = args.has('--report-only');
const MAX_BYTES = 60 * 1024 * 1024; // 60MB hard cap
const MIN_BYTES = 10 * 1024;

function nowIso() { return new Date().toISOString(); }
function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf-8')); }
function writeJson(p, obj) { fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf-8'); }

function fetchPdf(url, redirectsLeft = 5) {
  return new Promise((resolve, reject) => {
    if (!url) return reject(new Error('empty url'));
    let lib;
    try {
      const u = new URL(url);
      if (u.protocol !== 'https:' && u.protocol !== 'http:') {
        return reject(new Error('unsupported protocol: ' + u.protocol));
      }
      lib = u.protocol === 'https:' ? https : http;
    } catch (e) {
      return reject(new Error('invalid url: ' + url));
    }

    const req = lib.get(url, {
      headers: {
        'User-Agent': 'openyks-archive-fetcher/1.0 (+https://github.com/)',
        'Accept': 'application/pdf,*/*;q=0.8'
      }
    }, (res) => {
      // Redirect — but never follow into login/captcha endpoints implicitly
      if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
        if (redirectsLeft <= 0) return reject(new Error('too many redirects'));
        const loc = res.headers.location;
        res.resume();
        if (!loc) return reject(new Error('redirect without location'));
        const next = new URL(loc, url).toString();
        return resolve(fetchPdf(next, redirectsLeft - 1));
      }
      if (res.statusCode === 401 || res.statusCode === 403) {
        res.resume();
        return reject(new Error('access restricted (' + res.statusCode + ') — bypass refused'));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('http ' + res.statusCode));
      }
      const ct = (res.headers['content-type'] || '').toLowerCase();
      const isPdfCt = ct.includes('application/pdf') || ct.includes('application/octet-stream');
      const isPdfUrl = /\.pdf(\?|$)/i.test(url);
      if (!isPdfCt && !isPdfUrl) {
        res.resume();
        return reject(new Error('non-pdf content-type: ' + ct));
      }
      const chunks = [];
      let total = 0;
      res.on('data', (c) => {
        total += c.length;
        if (total > MAX_BYTES) {
          req.destroy(new Error('file too large'));
          return;
        }
        chunks.push(c);
      });
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(45000, () => req.destroy(new Error('timeout')));
  });
}

function validatePdf(buf) {
  if (!buf || buf.length < MIN_BYTES) return 'too small (<10KB)';
  const head = buf.slice(0, 5).toString('ascii');
  if (!head.startsWith('%PDF')) return 'missing %PDF header';
  return null;
}

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

async function processOne(part, url, localRel, alreadyOk) {
  const localAbs = path.join(ROOT, localRel);
  if (!url) {
    return { status: 'missing', reason: 'no source url', sizeBytes: 0 };
  }
  if (alreadyOk && !FORCE) {
    let size = 0;
    try { size = fs.statSync(localAbs).size; } catch {}
    return { status: 'downloaded', sourceUrl: url, sizeBytes: size, localPath: localRel };
  }
  if (DRY_RUN) {
    return { status: 'planned', sourceUrl: url };
  }
  try {
    const buf = await fetchPdf(url);
    const err = validatePdf(buf);
    if (err) {
      // try linked fallback
      return { status: 'linked', sourceUrl: url, sizeBytes: 0, reason: 'validation failed: ' + err };
    }
    ensureDir(path.dirname(localAbs));
    fs.writeFileSync(localAbs, buf);
    return {
      status: 'downloaded',
      sourceUrl: url,
      sizeBytes: buf.length,
      localPath: localRel
    };
  } catch (e) {
    return { status: 'linked', sourceUrl: url, sizeBytes: 0, reason: String(e.message || e) };
  }
}

function localExists(rel) {
  try {
    const s = fs.statSync(path.join(ROOT, rel));
    return s.isFile() && s.size > MIN_BYTES;
  } catch { return false; }
}

async function main() {
  const manifest = readJson(MANIFEST_PATH);
  const sources = fs.existsSync(SOURCES_PATH) ? readJson(SOURCES_PATH) : {};
  const missing = [];
  let downloaded = 0, linked = 0, missingCount = 0, totalSize = 0;

  if (!REPORT_ONLY) {
    for (const yearBlock of manifest.years) {
      const y = yearBlock.year;
      const srcYear = sources[String(y)] || {};
      for (const exam of yearBlock.exams) {
        const t = exam.type;
        let src;
        if (t === 'YDT') {
          const lang = exam.language || 'en';
          src = (srcYear.YDT && srcYear.YDT[lang]) || {};
        } else {
          src = srcYear[t] || {};
        }

        const parts = [
          { key: 'booklet', url: src.bookletUrl, target: exam.booklet },
          { key: 'answerKey', url: src.answerKeyUrl, target: exam.answerKey }
        ];
        for (const p of parts) {
          if (!p.target) continue;
          const okLocal = localExists(p.target.localPath);
          const result = await processOne(p.key, p.url, p.target.localPath, okLocal);
          // merge
          p.target.status = result.status;
          p.target.sourceUrl = result.sourceUrl || p.target.sourceUrl || '';
          p.target.sizeBytes = result.sizeBytes ?? p.target.sizeBytes ?? 0;
          if (result.reason) p.target.note = result.reason;

          if (result.status === 'downloaded') { downloaded++; totalSize += p.target.sizeBytes || 0; }
          else if (result.status === 'linked') linked++;
          else {
            missingCount++;
            missing.push({
              year: y, type: t,
              ...(exam.language ? { language: exam.language } : {}),
              part: p.key,
              reason: result.reason || 'no source url',
              searchedAt: nowIso()
            });
          }
        }
      }
    }
    manifest.generatedAt = nowIso();
    writeJson(MANIFEST_PATH, manifest);
    writeJson(MISSING_PATH, { generatedAt: nowIso(), totalMissing: missing.length, items: missing });
  }

  // Always rewrite report
  const lines = [];
  lines.push('# openyks · YKS PDF Arşivi · İndirme Raporu');
  lines.push('');
  lines.push(`Oluşturulma: ${nowIso()}`);
  lines.push(`Mod: ${DRY_RUN ? 'dry-run' : REPORT_ONLY ? 'report-only' : 'download'}${FORCE ? ' (force)' : ''}`);
  lines.push('');
  lines.push('## Özet');
  lines.push(`- İndirilen PDF: ${downloaded}`);
  lines.push(`- Linked (sadece resmî kaynak): ${linked}`);
  lines.push(`- Eksik: ${missingCount}`);
  lines.push(`- Toplam boyut: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  lines.push('');
  lines.push('## Politika');
  lines.push('- Hiçbir paywall/login/captcha aşılmamıştır.');
  lines.push('- URL uydurulmamıştır; boş URL = missing.');
  lines.push('- Sahte PDF veya cevap anahtarı üretilmemiştir.');
  lines.push('');
  if (missing.length) {
    lines.push('## Eksikler');
    for (const m of missing) {
      lines.push(`- ${m.year} ${m.type}${m.language ? ' (' + m.language + ')' : ''} / ${m.part}: ${m.reason}`);
    }
  }
  fs.writeFileSync(REPORT_PATH, lines.join('\n') + '\n', 'utf-8');

  console.log(`✓ done. downloaded=${downloaded} linked=${linked} missing=${missingCount}`);
}

main().catch(e => { console.error(e); process.exit(1); });
