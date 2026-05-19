#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ROOT = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/exams/osym-yks-manifest.json'), 'utf8'));
let ok = 0, bad = 0;
for (const r of manifest.exams) {
  if (r.status !== 'downloaded') { console.log(`SKIP ${r.year} ${r.type} (missing)`); bad++; continue; }
  const p = path.join(ROOT, r.booklet.localPath);
  if (!fs.existsSync(p)) { console.log(`MISSING FILE ${p}`); bad++; continue; }
  const buf = fs.readFileSync(p);
  if (buf.length < 10240 || buf.slice(0,4).toString() !== '%PDF') { console.log(`BAD PDF ${p}`); bad++; continue; }
  const h = crypto.createHash('sha256').update(buf).digest('hex');
  if (h !== r.booklet.sha256) { console.log(`HASH MISMATCH ${p}`); bad++; continue; }
  ok++;
}
console.log(`\n${ok} ok, ${bad} sorunlu`);
process.exit(bad ? 1 : 0);
