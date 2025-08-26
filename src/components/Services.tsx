// import hooks if needed
import { useTranslation } from "react-i18next";
import {
  Palette,
  Code,
  Gauge,
  FileText,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Search,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ProcessStrip from "./ProcessStrip";

type Service = {
  title: string;
  blurb: string;
  points: string[];
  Icon: LucideIcon;
  tone?: "sky" | "indigo" | "emerald" | "slate";
};

export default function Services() {
  const { t } = useTranslation();

  // Primary services with icons
  const primary: Service[] = [
    {
      title: t("services.primary.uiux.title"),
      blurb: t("services.primary.uiux.blurb"),
      points: t("services.primary.uiux.points", { returnObjects: true }) as string[],
      Icon: Palette,
      tone: "sky",
    },
    {
      title: t("services.primary.frontend.title"),
      blurb: t("services.primary.frontend.blurb"),
      points: t("services.primary.frontend.points", { returnObjects: true }) as string[],
      Icon: Code,
      tone: "indigo",
    },
    {
      title: t("services.primary.perf.title"),
      blurb: t("services.primary.perf.blurb"),
      points: t("services.primary.perf.points", { returnObjects: true }) as string[],
      Icon: Gauge,
      tone: "emerald",
    },
  ];

  // Extra services with icons
  const extras: Service[] = [
    {
      title: t("services.extras.cms.title"),
      blurb: t("services.extras.cms.blurb"),
      points: t("services.extras.cms.points", { returnObjects: true }) as string[],
      Icon: FileText,
      tone: "slate",
    },
    {
      title: t("services.extras.responsive.title"),
      blurb: t("services.extras.responsive.blurb"),
      points: t("services.extras.responsive.points", { returnObjects: true }) as string[],
      Icon: Smartphone,
      tone: "sky",
    },
    {
      title: t("services.extras.quality.title"),
      blurb: t("services.extras.quality.blurb"),
      points: t("services.extras.quality.points", { returnObjects: true }) as string[],
      Icon: ShieldCheck,
      tone: "indigo",
    },
  ];

  const steps = t("services.process.steps", {
    returnObjects: true,
  }) as { step: string; text: string }[];

  // Icon tone styles (for cards)
  const toneStyle = (tone: Service["tone"]) => {
    switch (tone) {
      case "sky":
        return { ring: "ring-sky-100", bg: "bg-sky-50", icon: "text-sky-600", glow: "bg-sky-100/60" };
      case "indigo":
        return { ring: "ring-indigo-100", bg: "bg-indigo-50", icon: "text-indigo-600", glow: "bg-indigo-100/60" };
      case "emerald":
        return { ring: "ring-emerald-100", bg: "bg-emerald-50", icon: "text-emerald-600", glow: "bg-emerald-100/60" };
      default:
        return { ring: "ring-slate-200", bg: "bg-slate-50", icon: "text-slate-700", glow: "bg-slate-100/60" };
    }
  };

  return (
    <section id="services" className="scroll-mt-24 bg-white" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="services-heading" className="text-3xl font-bold tracking-tight text-slate-900">
            {t("services.heading")}
          </h2>
          <p className="mt-3 text-slate-600">{t("services.sub")}</p>
        </div>

        {/* Primary services */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {primary.map(({ title, blurb, points, Icon, tone }) => {
            const toneCls = toneStyle(tone);
            return (
              <article
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
              >
                {/* Decorative corner glow */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl ${toneCls.glow} transition duration-300 group-hover:scale-125`}
                />
                <div className="relative">
                  <span
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${toneCls.bg} ring-1 ${toneCls.ring}`}
                  >
                    <Icon className={`h-6 w-6 ${toneCls.icon}`} />
                  </span>
                  <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{blurb}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-slate-400" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* Process strip (extracted component) */}
        <ProcessStrip
          steps={steps}
          icons={[Search, Palette, Rocket]}
          title={t("services.process.title")}
        />

        {/* Extras */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {extras.map(({ title, blurb, points, Icon, tone }) => {
            const toneCls = toneStyle(tone);
            return (
              <article
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
              >
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl ${toneCls.glow} transition duration-300 group-hover:scale-125`}
                />
                <div className="relative">
                  <span
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${toneCls.bg} ring-1 ${toneCls.ring}`}
                  >
                    <Icon className={`h-6 w-6 ${toneCls.icon}`} />
                  </span>
                  <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{blurb}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-slate-400" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}