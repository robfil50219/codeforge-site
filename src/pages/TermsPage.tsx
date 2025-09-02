import { useTranslation } from "react-i18next";

export default function TermsPage() {
  const { t } = useTranslation();
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {t("terms.heading")}
        </h1>
        <p className="mt-3 text-slate-600">{t("terms.intro")}</p>

        <section className="mt-8 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("terms.sections.usage.title")}
            </h2>
            <p className="mt-1 text-slate-600">
              {t("terms.sections.usage.text")}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("terms.sections.payments.title")}
            </h2>
            <p className="mt-1 text-slate-600">
              {t("terms.sections.payments.text")}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("terms.sections.ip.title")}
            </h2>
            <p className="mt-1 text-slate-600">{t("terms.sections.ip.text")}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("terms.sections.liability.title")}
            </h2>
            <p className="mt-1 text-slate-600">
              {t("terms.sections.liability.text")}
            </p>
          </div>
        </section>

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