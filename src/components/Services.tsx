import { useEffect, useRef } from "react";
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

import Container from "./ui/Container";
import { Card, CardHeader, CardIcon, CardTitle, CardDescription, CardList } from "./ui/Card";
import { toneStyle, type Tone } from "../utils/tone";
import ProcessStrip from "./ProcessStrip";

type Service = {
  title: string;
  blurb: string;
  points: string[];
  Icon: LucideIcon;
  tone?: Tone;
};

export default function Services() {
  const { t } = useTranslation();

  // Primary & Extras (content from i18n)
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

  // Process data + localized details
  const steps = t("services.process.steps", {
    returnObjects: true,
  }) as { step: string; text: string }[];

  const detailsRaw = t("services.process.details", {
    returnObjects: true,
  }) as unknown;

  type Detail = { title: string; body: string };
  let details: Detail[] = steps.map((s) => ({ title: s.step, body: s.text }));
  if (detailsRaw && typeof detailsRaw === "object" && !Array.isArray(detailsRaw)) {
    const entries = Object.entries(detailsRaw as Record<string, { title?: string; body?: string }>)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([, v]) => ({ title: v?.title ?? "", body: v?.body ?? "" }));
    if (entries.length) {
      details = entries.map((d, i) => ({
        title: d.title || steps[i]?.step || "",
        body: d.body || steps[i]?.text || "",
      }));
    }
  }

  // Process dot (unchanged behavior)
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Removed unused dotLeft state

  useEffect(() => {
    positionDotAtIndex(0);
    const onResize = () => positionDotAtIndex(0);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function positionDotAtIndex(idx: number) {
    const track = trackRef.current;
    const stepEl = stepRefs.current[idx];
    if (!track || !stepEl) return;
  }

  const stepIcons: LucideIcon[] = [Search, Palette, Rocket];

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
              <Card key={title}>
                {/* Decorative corner glow */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl ${toneCls.glow} transition duration-300 group-hover:scale-125`}
                />
                <CardHeader>
                  <CardIcon className={`${toneCls.bg} ${toneCls.ring}`}>
                    <Icon className={`h-6 w-6 ${toneCls.icon}`} />
                  </CardIcon>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{blurb}</CardDescription>
                  {/* Keep original check icon style for bullets */}
                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-slate-400" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Process strip (separate component) */}
        <ProcessStrip steps={steps} icons={stepIcons} title={t("services.process.title")} details={details} />

        {/* Extras */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {extras.map(({ title, blurb, points, Icon, tone }) => {
            const toneCls = toneStyle(tone);
            return (
              <Card key={title}>
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl ${toneCls.glow} transition duration-300 group-hover:scale-125`}
                />
                <CardHeader>
                  <CardIcon className={`${toneCls.bg} ${toneCls.ring}`}>
                    <Icon className={`h-6 w-6 ${toneCls.icon}`} />
                  </CardIcon>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{blurb}</CardDescription>
                  <CardList items={points} />
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}