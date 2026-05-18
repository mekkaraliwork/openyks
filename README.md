# openyks — GitHub Pages

Statik landing page. Tek yapman gereken: bu klasördeki dosyaları repo'nun **ana dizinine** koymak ve GitHub Pages'i `main` / `root` olarak ayarlamak.

## Dosyalar
- `index.html` — ana sayfa (landing)
- `onboarding.html` — "Hemen Başla" hedefi (yakında placeholder)
- `.nojekyll` — Jekyll'i devre dışı bırakır

## Yayınlama
1. Repo oluştur (örn. `openyks`) ve bu dosyaları **kök dizine** at.
2. GitHub → Settings → Pages → Source: `Deploy from a branch` → `main` / `/ (root)`.
3. Birkaç dakika sonra `https://<kullanici>.github.io/<repo>/` adresinde yayında.

> Not: Hiçbir build adımı yok. Tailwind CDN + Google Fonts ile tek dosya çalışır.
