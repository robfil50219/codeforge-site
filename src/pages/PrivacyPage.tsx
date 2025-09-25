// src/pages/PrivacyPage.tsx
import { useWpPage } from "../hooks/useWpPage";
import { useTranslation } from "../lib/t";

export default function PrivacyPage() {
  const { t } = useTranslation();
  const { page, loading } = useWpPage("privacy-policy"); // WP slug
  const locale = "no-NO"; // site is Norwegian-only for now

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Title from local copy (body comes from WP) */}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {t("privacy.heading") as string}
        </h1>

        {page ? (
          <>
            <p className="mt-2 text-xs text-slate-500">
              {(t("privacy.lastUpdated") as string) ?? "Sist oppdatert"}{" "}
              {new Date(page.modified).toLocaleDateString(locale)}
            </p>
            <article
              className="prose prose-slate mt-6"
              dangerouslySetInnerHTML={{ __html: page.content.rendered }}
            />
          </>
        ) : loading ? (
          <p className="mt-3 text-slate-600">{(t("loading") as string) ?? "Laster …"}</p>
        ) : (
          <p className="mt-3 text-slate-600">{t("privacy.intro") as string}</p>
        )}

        <a
          href="/"
          className="mt-10 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          {t("privacy.back") as string}
        </a>
      </div>
    </main>
  );
}