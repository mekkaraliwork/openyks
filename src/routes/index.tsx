import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Library,
  Timer,
  LineChart,
  Github,
  ArrowRight,
  Check,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "openyks — YKS'yi veriyle çalış" },
      {
        name: "description",
        content:
          "Geçmiş YKS sorularını çöz, denemelerini analiz et, sana özel çalışma planını gör. Açık kaynak, tarayıcıda çalışır, ücretsiz.",
      },
      { property: "og:title", content: "openyks — YKS'yi veriyle çalış" },
      {
        property: "og:description",
        content:
          "Geçmiş sorular + interaktif deneme + kişiye özel analiz. Tarayıcında, ücretsiz.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: LandingPage,
});

const trust = [
  "Açık kaynak",
  "Tarayıcıda çalışır",
  "Kurulum gerektirmez",
  "Veri temelli",
  "Reklamsız",
];

const features = [
  {
    icon: Library,
    title: "Geçmiş Sınav Soruları",
    desc: "Yıllara göre filtrele, konuya göre çöz, çözüm geçmişini sakla.",
  },
  {
    icon: Timer,
    title: "İnteraktif Deneme",
    desc: "Süre, optik form mantığı ve anında değerlendirme ile gerçek sınav hissi.",
  },
  {
    icon: LineChart,
    title: "Kişisel Analiz & Öneri",
    desc: "Zayıf konularını, hız–doğruluk dengeni ve sıradaki çalışma adımını gör.",
  },
];

const steps = [
  {
    title: "Profilini oluştur",
    desc: "Alanını ve hedefini seç. 30 saniye sürer.",
  },
  {
    title: "Soru çöz veya deneme yap",
    desc: "Geçmiş YKS sorularıyla pratik yap ya da tam deneme başlat.",
  },
  {
    title: "Analizi ve öneriyi gör",
    desc: "Verilerinden çıkan zayıf konu listesi ve sıradaki adım.",
  },
];

const faqs = [
  { q: "openyks ücretli mi?", a: "Hayır. Tamamen ücretsiz ve açık kaynak." },
  { q: "Kayıt olmam gerekiyor mu?", a: "Hayır. Veriler tarayıcında tutulur." },
  { q: "Verim nerede saklanıyor?", a: "Cihazında. Sunucuya gönderilmez." },
  {
    q: "Sorular nereden geliyor?",
    a: "Açık kaynaklı geçmiş YKS soru havuzlarından.",
  },
  { q: "Mobilde çalışıyor mu?", a: "Evet, modern her tarayıcıda." },
  {
    q: "Katkıda bulunabilir miyim?",
    a: "Evet, proje GitHub'da açık kaynak.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Features />
        <HowItWorks />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-display text-xl font-bold tracking-tight">
          open<span className="text-primary">yks</span>
        </Link>
        <Link
          to="/onboarding"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Hemen Başla <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in oklab, var(--primary) 25%, transparent), transparent)",
        }}
      />
      <div className="mx-auto max-w-4xl px-6 pb-20 pt-24 text-center sm:pt-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Açık kaynak · Yapım aşamasında
        </span>
        <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          YKS'yi <span className="text-primary">veriyle</span> çalış.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Geçmiş soruları çöz, denemelerini analiz et, sana özel çalışma
          planını gör. Tamamı tarayıcında, ücretsiz.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:translate-y-[-1px] hover:opacity-95"
          >
            Hemen Başla <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#nasil-calisir"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition hover:bg-accent"
          >
            Nasıl çalışır?
          </a>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          Ücretsiz · Kayıt yok · Tarayıcıda çalışır
        </p>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-6 text-sm text-muted-foreground">
        {trust.map((t) => (
          <span key={t} className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Üç şey, doğru yapılmış.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Soru havuzu, deneme deneyimi ve analiz — hepsi tek yerde.
        </p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40"
          >
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section
      id="nasil-calisir"
      className="border-t border-border/60 bg-card/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            3 adımda başla.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Hesap yok, kurulum yok. Açıp çalışmaya başla.
          </p>
        </div>
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-2xl border border-border bg-background p-6"
            >
              <div className="font-display text-5xl font-bold leading-none text-primary/30">
                0{i + 1}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Sıkça sorulanlar
        </h2>
      </div>
      <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-medium">{f.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-sm text-muted-foreground">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24">
      <div
        className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-14 text-center"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
        }}
      >
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Verinle çalışmaya başla.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Birkaç saniye sürer, hesaba gerek yok.
        </p>
        <Link
          to="/onboarding"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-95"
        >
          Hemen Başla <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        <div>
          <span className="font-display font-semibold text-foreground">
            openyks
          </span>{" "}
          · Açık kaynak · © 2026
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 hover:text-foreground"
        >
          <Github className="h-4 w-4" /> GitHub
        </a>
      </div>
    </footer>
  );
}
