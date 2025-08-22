// src/pages/TermsPage.tsx
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function TermsPage() {
  const { t } = useTranslation();

  // All text (including SEO) comes from i18n
  const site = "CodeForge Studio";
  const title = `${t("terms.heading")} • ${site}`;
  const desc = t("terms.intro");

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      {/* SEO head tags (React 19) */}
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href="https://www.codeforgestudio.no/terms" />

      {/* Open Graph / Twitter (localized) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content="https://www.codeforgestudio.no/terms" />
      {/* <meta property="og:image" content="https://www.codeforgestudio.no/og-default.png" /> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      {/* <meta name="twitter:image" content="https://www.codeforgestudio.no/og-default.png" /> */}

      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        {t("terms.heading")}
      </h1>
      <p className="text-slate-600 mb-8">{t("terms.intro")}</p>

      {/* Sections */}
      <div className="space-y-6">
        {["usage", "payments", "ip", "liability"].map((key) => (
          <section key={key}>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              {t(`terms.sections.${key}.title`)}
            </h2>
            <p className="text-slate-600">
              {t(`terms.sections.${key}.text`)}
            </p>
          </section>
        ))}
      </div>

      {/* Back link */}
      <div className="mt-10">
        <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">
          ← {t("terms.back")}
        </Link>
      </div>
    </main>
  );
}