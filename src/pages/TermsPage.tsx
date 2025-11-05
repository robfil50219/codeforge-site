// src/pages/TermsPage.tsx
import { useWpPage } from "../hooks/useWpPage";
import { useTranslation } from "../lib/t";

export default function TermsPage() {
  const { t } = useTranslation();
  const { page, loading } = useWpPage("terms");
  const locale = "no-NO";

  const lastUpdated = page
    ? new Date(page.modified).toLocaleDateString(locale)
    : null;

  return (
    <main
      className={[
        "bg-(--bg-page) text-(--text-page) transition-colors duration-300",
        "min-h-[var(--app-height,100vh)] pt-24 pb-16 px-4 sm:px-6 lg:px-8",
      ].join(" ")}
      style={{ paddingTop: "calc(var(--app-safe-top) + 6rem)" }}
    >
      <div className="mx-auto max-w-3xl">
        <section
          className={[
            "surface-card rounded-2xl border border-(--card-border)",
            "p-6 sm:p-8",
          ].join(" ")}
        >
          {/* Title */}
          <h1 className="text-(--text-heading) text-2xl font-bold tracking-tight sm:text-3xl">
            {t("terms.heading") as string}
          </h1>

          {/* Last updated */}
          {lastUpdated && (
            <p className="mt-2 text-xs text-(--text-dim)">
              {(t("terms.lastUpdated") as string) ?? "Sist oppdatert"}{" "}
              {lastUpdated}
            </p>
          )}

          {/* WP content or fallback */}
          {page ? (
            <article
              className={[
                "prose prose-slate max-w-none mt-6",
                "**:text-(--text-page)",
                "[&_h1]:text-(--text-heading)",
                "[&_h2]:text-(--text-heading)",
                "[&_h3]:text-(--text-heading)",
                "[&_strong]:text-(--text-heading)",
                "[&_a]:text-(--color-brand-sea) [&_a]:no-underline hover:[&_a]:underline",
              ].join(" ")}
              dangerouslySetInnerHTML={{ __html: page.content.rendered }}
            />
          ) : loading ? (
            <p className="mt-6 text-(--text-dim) text-sm">
              {(t("loading") as string) ?? "Laster …"}
            </p>
          ) : (
            <>
              <p className="mt-6 text-(--text-page) leading-relaxed">
                {t("terms.intro") as string}
              </p>
              <p className="mt-4 text-(--text-page) leading-relaxed">
                Vi kunne ikke laste vilkårene akkurat nå. Kontakt oss på{" "}
                <a
                  href="mailto:robert@codeforgestudio.no"
                  className="text-(--color-brand-sea) hover:opacity-80"
                >
                  robert@codeforgestudio.no
                </a>{" "}
                for mer informasjon.
              </p>
            </>
          )}

          {/* Back button */}
          <a
            href="/"
            className={[
              "mt-10 inline-flex items-center justify-center rounded-xl text-sm font-medium",
              "px-4 py-2 transition",
              // Light mode
              "bg-slate-900 text-white hover:bg-slate-800",
              // Dark mode
              "dark:bg-(--color-brand-sea) dark:text-(--color-brand-black) dark:hover:brightness-110",
            ].join(" ")}
          >
            {t("terms.back") as string}
          </a>
        </section>
      </div>
    </main>
  );
}
