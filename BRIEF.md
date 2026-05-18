# openyks — Landing 10/10 Brief

## 1) Teşhis

**En güçlü 3 şey**
1. Konumlandırma net: "YKS'yi veriyle çalış" — fonksiyonel + duygusal vaadi tek cümlede taşıyor.
2. Sürtünme yok mesajı güçlü: ücretsiz / hesapsız / cihazda — bariyer üçlüsünü vuruyor.
3. Görsel sistem (Space Grotesk + indigo glow + koyu zemin) genç-teknik kitleye doğru hitap ediyor.

**Conversion'ı düşüren 7 problem**
1. **Aynı bilginin tekrarı:** hero alt-bilgi şeridi ("✓ Ücretsiz ✓ Kayıt yok…") ile trust bar birebir aynı; biri çıkmalı.
2. **Çift "Why" formatı:** masaüstünde tablo + mobilde kart aynı içeriği iki ayrı blokla teslim ediyor; responsive tek tablo yeter, kod ve göz yükü düşer.
3. **CTA metni jenerik:** "Hemen Başla" üç yerde aynı; "Ücretsiz başla / 30 sn içinde" gibi değer + zaman ekleyince tıklama artar.
4. **Navbar yükü:** Özellikler / Nasıl çalışır / Neden / SSS / GitHub — 5 link kararı geciktirir. Tek anchor + GitHub + CTA yeter.
5. **Sosyal kanıt zayıf:** "Yapım aşamasında" rozeti güven verirken aynı zamanda riski artırıyor; yanına somut bir mikrocopy ("İlk denemen 30 saniyede başlar") koymak şart.
6. **"Sorular nereden geliyor?" hem hero ne hem FAQ'da müphem:** "telif itirazı kaldırılır" cümlesi landing'de korkutucu; FAQ'da kalmalı, landing'de tek satır geçmeli.
7. **Erişilebilirlik eksikleri:** skip-link yok, ikonlarda aria-hidden yok, FAQ details'lerinde klavye odak halkası net değil, h1→h2 hiyerarşisi sağlam ama landmark `aria-labelledby` yok.

**Budanacak tekrarlar**
- Hero alt mikrocopy şeridi (trust bar'la çakışıyor).
- Mobil "Why" kart bloğu (responsive tablo ile birleştir).
- "Hesap yok, kurulum yok" 3 kere geçiyor — hero + how + final; ikisinde kalsın.
- "Açık kaynak" rozet + trust bar + sosyal şerit + footer = 4 kez; sosyal şerit kaldırıldı.

## 2) Blueprint (bölüm sırası, amaç, bariyer)

1. **Navbar** — Logo · "Nasıl çalışır?" · GitHub · Primary CTA. *Amaç:* her scroll noktasında CTA görünür. *Bariyer:* "nereden başlarım?" sorusu.
2. **Hero** — H1 + alt metin + Primary + Secondary + 1 satır güven mikrocopy. *Amaç:* 5 saniyede ne / kime / neden cevabı. *Bariyer:* belirsizlik.
3. **Trust bar** — 6 etiket. *Amaç:* itirazları (ücret, hesap, mahremiyet, reklam) önden kapatmak. *Bariyer:* "ücretli mi, veri çalıyor mu?"
4. **Features (3 kart)** — pratik, prova, sonraki adım. *Amaç:* somut fayda. *Bariyer:* "tam olarak ne yapıyor?"
5. **How it works (3 adım)** — profil → çöz → analiz. *Amaç:* mental model. *Bariyer:* "ne kadar uğraşacağım?"
6. **Why openyks (tek tablo)** — alternatif × eksik × openyks farkı. *Amaç:* mevcut alışkanlığı bırakmadan satın alma. *Bariyer:* "zaten X'i kullanıyorum."
7. **FAQ (8 madde)** — ücret, kayıt, veri, kaynak, mobil, çevrimdışı, sıralama tahmini, katkı. *Amaç:* son itirazlar. *Bariyer:* güven açığı.
8. **Final CTA** — son ikna + Primary + Secondary. *Amaç:* karar anı.
9. **Footer** — GitHub · İletişim · İçerik politikası · lisans.

## 3) Nihai Copy (kopyala-yapıştır)

### Hero
- **H1:** YKS'yi **veriyle** çalış.
- **Alt:** Geçmiş soruları çöz, denemeni analiz et, sıradaki çalışma adımını gör. Hesap yok, kurulum yok — tarayıcında açılır.
- **Primary CTA:** Ücretsiz başla
- **Secondary:** Nasıl çalışır?
- **Mikrocopy:** 30 saniyede başlar · TYT · AYT · YDT · Veriler cihazında kalır

### CTA buton alternatifleri (5)
1. Ücretsiz başla *(seçildi — net fayda + tek kelime engel kaldırma)*
2. 30 saniyede başla
3. Hemen denemeyi aç
4. Çalışmaya başla
5. Profilimi oluştur

### Trust bar
Ücretsiz · Kayıt yok · Veriler cihazında · Reklamsız · Açık kaynak · Mobil uyumlu

### Features
- **Doğru soruyla pratik yap** — Geçmiş YKS sorularını yıla, derse ve konuya göre filtrele. Çözüm geçmişin kayıt altında, ilerlemen görünür.
- **Sınav gününü prova et** — Süre, optik form mantığı ve anında değerlendirme. Gerçek sınav koşulu, evden çıkmadan.
- **Bir sonraki adımı gör** — Zayıf konular, hız–doğruluk dengesi ve önerilen çalışma sırası. Tahmin değil, önceliklendirme.

### How it works
- **01 Profilini seç** — Alanını ve hedefini gir. Hesap açma, e-posta yok.
- **02 Çöz** — Konu çalışması ya da tam deneme — istediğin formatta.
- **03 Analizi gör** — Zayıf konuların ve sıradaki adımın listelenir. Tekrar et, ilerle.

### Why openyks (tablo)
| Alternatif | Eksiği | openyks farkı |
|---|---|---|
| Dershane / koçluk | Pahalı, sabit program | Verinle şekillenir, ücretsiz |
| YouTube videoları | Pasif izleme | Aktif çözüm + anında geri bildirim |
| Kaynak kitaplar | Geri bildirim yok | Zayıf konu listesi, hız–doğruluk analizi |
| Genel deneme uygulamaları | Reklam + hesap zorunluluğu | Reklamsız, hesapsız, veriler cihazında |

### Final CTA
- **H2:** Bugün bir denemeyle başla.
- **Alt:** Hesap yok, kurulum yok. 30 saniye sonra ilk sorudasın.

## 4) "Sorular nereden geliyor?"

**Landing tek cümle (FAQ içinde, korkutmayan):**
> Topluluk katkılarıyla derlenen, kamuya açık geçmiş YKS soru havuzlarından.

**FAQ detay (3 madde, kısa):**
1. Her soru yıl / ders / konu etiketiyle birlikte tutulur; kaynağı belirlidir.
2. Topluluk katkıları GitHub üzerinden gözden geçirilir.
3. Ayrıntı için "İçerik politikası" sayfası.

> Telif/itiraz dili landing'de hiç geçmiyor; sadece "İçerik politikası" linki var.

## 5) Hero — 12 varyasyon

1. **Agresif iddia:** "YKS net'ini 30 günde gör." — Hesapsız bir analiz aracı.
2. **Korkudan kaçınma:** "Soru çözüyorsun, ilerliyor musun?" — openyks sana cevabı verir.
3. **Veri odaklı:** "YKS'yi **veriyle** çalış." — Geçmiş sorular, deneme, analiz; tek yerde. **(SEÇİLDİ)**
4. **Mahremiyet odaklı:** "Çalış. Veri sende kalsın." — Hesapsız YKS çalışma aracı.
5. **Hız vurgulu:** "30 saniyede ilk soruda ol." — Kurulum yok, hesap yok.
6. **Karşıt:** "Dershane değil, **strateji**." — YKS'yi veriyle önceliklendir.
7. **Soru formu:** "Bu hafta hangi konuya çalışmalısın?" — openyks verine bakar, söyler.
8. **Manifesto:** "Pasif izleme bitti." — Aktif çözüm + anında geri bildirim.
9. **Sade vaat:** "Çöz. Gör. İlerle." — YKS için ücretsiz, açık kaynak çalışma aracı.
10. **Topluluk:** "Öğrenciler için, öğrencilerle." — Açık kaynak YKS deneme + analiz.
11. **Araç tonu:** "YKS için kişisel çalışma paneli." — Tarayıcında, ücretsiz.
12. **Minimal:** "YKS, ama verimli." — Çöz, analiz et, sıradaki adımı gör.

**En iyi 2:**
- **#3 "YKS'yi veriyle çalış."** — Ürünün tek cümlelik özü; "veri" kelimesi modern çalışma kültürüne hitap ediyor, garanti vermeden iddia taşıyor.
- **#5 "30 saniyede ilk soruda ol."** — Sürtünme yok mesajını eyleme bağlıyor; A/B test için güçlü ikinci aday.

## 6) UI/UX kuralları

- **Mobil öncelik:** tüm grid'ler `grid-cols-1 → md:grid-cols-3`. Tablo `hidden sm:table-cell` ile orta sütunu mobilde gizliyor.
- **CTA görünürlük:** sticky navbar'daki Primary CTA her scroll'da ekranda; hero CTA fold üstünde; Final CTA scroll sonunda. 3 nokta yeter.
- **Heading hiyerarşisi:** Tek H1, bölüm başlıkları H2, kart başlıkları H3. Her `<section>` `aria-labelledby` ile başlığına bağlı.
- **FAQ erişilebilirlik:** native `<details>/<summary>` — klavye / ekran okuyucu hazır. ESC açık olanı kapatır. Skip-link var, ikonlarda `aria-hidden`.
- **Performans:** Tailwind CDN dışında JS yok; tek 8 satırlık ESC listener. Animasyon `prefers-reduced-motion`'a saygılı. Font `display=swap`.
- **Renk kontrastı:** `#e7e9f3` üzerinde `#0b0d17` → WCAG AAA. Muted (`#9aa0bd`) → AA.

## 7) Çıkışlar
- `index.html` — yeni landing, semantic HTML + Tailwind, tek dosya.
- `onboarding.html` — placeholder (mevcut).
- `.nojekyll` — Pages için.
