// src/pages/PrivacyPage.tsx
import { useTranslation } from "react-i18next";
import { useWpPage } from "../hooks/useWpPage";


export default function PrivacyPage() {
  const { t, i18n } = useTranslation();
  const { page, loading } = useWpPage("privacy-policy"); // <-- WP slug

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Title from i18n so it translates (body comes from WP) */}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {t("privacy.heading")}
        </h1>

        {page ? (
          <>
            <p className="mt-2 text-xs text-slate-500">
              {t("terms.lastUpdated")}{" "}
              {new Date(page.modified).toLocaleDateString(
                i18n.language === "no" ? "no-NO" : "en-GB"
              )}
            </p>
            <article
              className="prose prose-slate mt-6"
              dangerouslySetInnerHTML={{ __html: page.content.rendered }}
            />
          </>
        ) : loading ? (
          <p className="mt-3 text-slate-600">{t("loading")}</p>
        ) : (
          <p className="mt-3 text-slate-600">{t("privacy.intro")}</p>
        )}

        <a
          href="/"
          className="mt-10 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          {t("privacy.back")}
        </a>
      </div>
    </main>
  );
}