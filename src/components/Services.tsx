// src/components/Services.tsx
import { useTranslation } from "react-i18next";

type Service = {
  title: string;
  blurb: string;
  points: string[];
};

export default function Services() {
  const { t } = useTranslation();

  const primary: Service[] = [
    {
      title: t("services.primary.uiux.title"),
      blurb: t("services.primary.uiux.blurb"),
      points: t("services.primary.uiux.points", { returnObjects: true }) as string[],
    },
    {
      title: t("services.primary.frontend.title"),
      blurb: t("services.primary.frontend.blurb"),
      points: t("services.primary.frontend.points", { returnObjects: true }) as string[],
    },
    {
      title: t("services.primary.perf.title"),
      blurb: t("services.primary.perf.blurb"),
      points: t("services.primary.perf.points", { returnObjects: true }) as string[],
    },
  ];

  const extras: Service[] = [
    {
      title: t("services.extras.cms.title"),
      blurb: t("services.extras.cms.blurb"),
      points: t("services.extras.cms.points", { returnObjects: true }) as string[],
    },
    {
      title: t("services.extras.responsive.title"),
      blurb: t("services.extras.responsive.blurb"),
      points: t("services.extras.responsive.points", { returnObjects: true }) as string[],
    },
    {
      title: t("services.extras.quality.title"),
      blurb: t("services.extras.quality.blurb"),
      points: t("services.extras.quality.points", { returnObjects: true }) as string[],
    },
  ];

  const steps = t("services.process.steps", { returnObjects: true }) as { step: string; text: string }[];

  return (
    <section id="services" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {t("services.heading")}
          </h2>
          <p className="mt-3 text-slate-600">{t("services.sub")}</p>
        </div>

        {/* Primary services */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {primary.map((s) => (
            <article key={s.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
              <h3 className="text-base font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{s.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Extras */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {extras.map((s) => (
            <article key={s.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
              <h3 className="text-base font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{s.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Process strip */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase text-center">
            {t("services.process.title")}
          </p>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3 text-center">
            {steps.map((x) => (
              <li key={x.step} className="px-4">
                <div className="text-slate-900 font-semibold">{x.step}</div>
                <div className="text-sm text-slate-600">{x.text}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}