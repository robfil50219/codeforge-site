// Removed unused React hooks
import { useTranslation } from "react-i18next";
import {
  Palette,
  Code,
  Gauge,
  FileText,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Container from "./ui/Container";
import { Card } from "./ui/Card";
import { toneStyle } from "../utils/tone";
import ProcessStrip from "./ProcessStrip";
import { Search, Palette as PaletteIcon, Rocket } from "lucide-react";

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

  const details = (t("services.process.details", { returnObjects: true }) ||
    []) as string[]; // optional; we pass title/body below

  return (
    <section id="services" className="scroll-mt-24 bg-white" aria-labelledby="services-heading">
      <Container className="py-16 sm:py-24">
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
              <Card key={title} className="group">
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
              </Card>
            );
          })}
        </div>

        {/* Process strip (separate component, visuals unchanged) */}
        <ProcessStrip
          title={t("services.process.title")}
          steps={steps}
          icons={[Search, PaletteIcon, Rocket]}
          details={[
            { title: steps[0]?.step, body: (details[0] as string) ?? steps[0]?.text },
            { title: steps[1]?.step, body: (details[1] as string) ?? steps[1]?.text },
            { title: steps[2]?.step, body: (details[2] as string) ?? steps[2]?.text },
          ]}
        />

        {/* Extras */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {extras.map(({ title, blurb, points, Icon, tone }) => {
            const toneCls = toneStyle(tone);
            return (
              <Card key={title} className="group">
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
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}