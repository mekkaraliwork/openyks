import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Onboarding — openyks" },
      { name: "description", content: "openyks onboarding yakında." },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md">
        <p className="text-sm font-medium text-primary">openyks</p>
        <h1 className="mt-2 font-display text-3xl font-bold">
          Onboarding yakında.
        </h1>
        <p className="mt-3 text-muted-foreground">
          Bu adım hazırlık aşamasında. Şimdilik ana sayfaya dönebilirsin.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:bg-accent"
        >
          ← Ana sayfa
        </Link>
      </div>
    </div>
  );
}
