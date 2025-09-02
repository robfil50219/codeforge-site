import { useTranslation } from "react-i18next";

export default function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {t("privacy.heading")}
        </h1>
        <p className="mt-3 text-slate-600">{t("privacy.intro")}</p>

        <section className="mt-8 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("privacy.sections.data.title")}
            </h2>
            <p className="mt-1 text-slate-600">
              {t("privacy.sections.data.text")}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("privacy.sections.use.title")}
            </h2>
            <p className="mt-1 text-slate-600">
              {t("privacy.sections.use.text")}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("privacy.sections.rights.title")}
            </h2>
            <p className="mt-1 text-slate-600">
              {t("privacy.sections.rights.text")}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {t("privacy.sections.cookies.title")}
            </h2>
            <p className="mt-1 text-slate-600">
              {t("privacy.sections.cookies.text")}
            </p>
          </div>
        </section>

        <p className="mt-8 text-slate-600">
          {t("privacy.contact")}
        </p>

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