// src/pages/PrivacyPage.tsx
import { useTranslation } from "react-i18next";
import { CONTACT_EMAIL, MAILTO } from "../config/contact";
import { Link } from "react-router-dom";

export default function PrivacyPage() {
  const { t } = useTranslation();
  const site = "CodeForge Studio";
  const title = `${t("privacy.heading")} • ${site}`;
  const desc = t("privacy.intro");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      {/* SEO head tags */}
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href="https://www.codeforgestudio.no/privacy" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content="https://www.codeforgestudio.no/privacy" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />

      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        {t("privacy.heading")}
      </h1>
      <p className="text-slate-600 mb-8">{t("privacy.intro")}</p>

      {/* Sections */}
      <div className="space-y-6">
        {["data", "use", "rights", "cookies"].map((key) => (
          <section key={key}>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              {t(`privacy.sections.${key}.title`)}
            </h2>
            <p className="text-slate-600">
              {t(`privacy.sections.${key}.text`)}
            </p>
          </section>
        ))}
      </div>

      {/* Contact */}
      <div className="mt-10">
        <p className="text-slate-600">{t("privacy.contact")}</p>
        <a href={MAILTO} className="text-sky-600 hover:underline">
          {CONTACT_EMAIL}
        </a>
      </div>

      {/* Back */}
      <div className="mt-10">
        <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">
          ← {t("privacy.back")}
        </Link>
      </div>
    </div>
  );
}