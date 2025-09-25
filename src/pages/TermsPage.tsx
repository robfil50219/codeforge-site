// src/pages/TermsPage.tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type WpPage = {
  title: { rendered: string };
  content: { rendered: string };
  modified: string;
};

const decode = (s: string) =>
  new DOMParser().parseFromString(s, "text/html").body.textContent || s;

export default function TermsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState<WpPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API = import.meta.env.VITE_API_BASE; // e.g. https://api.codeforgestudio.no/wp-json
    fetch(`${API}/wp/v2/pages?slug=terms&_fields=title,content,modified`)
      .then(r => (r.ok ? r.json() : Promise.reject(r)))
      .then((arr: WpPage[]) => setPage(arr[0] ?? null))
      .catch(() => setPage(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {page ? decode(page.title.rendered) : t("terms.heading")}
        </h1>

        {page ? (
          <>
            <p className="mt-2 text-xs text-slate-500">
              {t("terms.lastUpdated")}{" "}
              {new Date(page.modified).toLocaleDateString("no-NO")}
            </p>
            <article
              className="prose prose-slate mt-6"
              dangerouslySetInnerHTML={{ __html: page.content.rendered }}
            />
          </>
        ) : loading ? (
          <p className="mt-3 text-slate-600">{t("loading")}</p>
        ) : (
          <>
            <p className="mt-3 text-slate-600">{t("terms.intro")}</p>
            {/* keep your static fallback sections here if you want */}
          </>
        )}

        <a
          href="/"
          className="mt-10 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
        >
          {t("terms.back")}
        </a>
      </div>
    </main>
  );
}