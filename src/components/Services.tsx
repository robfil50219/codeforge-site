// src/components/Services.tsx
import { useEffect, useRef } from "react";
import { useTranslation } from "../lib/t";
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
  type LucideIcon,
} from "lucide-react";

import Container from "./ui/Container";
import ProcessStrip from "./ProcessStrip";

/**
 * Tone system for the little icon bubble at the top of each service card.
 * We return inline color values so we can style via style={}
 * instead of relying on Tailwind classes that don't behave well in dark mode.
 */
type Tone = "sky" | "indigo" | "emerald" | "slate";

function toneStyle(tone?: Tone) {
  switch (tone) {
    case "sky":
      return {
        bgLight: "rgba(186, 230, 253, 0.6)", // sky-200-ish
        ringLight: "rgba(186, 230, 253, 0.9)",
        icon: "#00a0a0", // brand teal
      };
    case "indigo":
      return {
        bgLight: "rgba(199, 210, 254, 0.6)", // indigo-200-ish
        ringLight: "rgba(199, 210, 254, 0.9)",
        icon: "#6366f1",
      };
    case "emerald":
      return {
        bgLight: "rgba(167, 243, 208, 0.6)", // emerald-200-ish
        ringLight: "rgba(167, 243, 208, 0.9)",
        icon: "#10b981",
      };
    default:
      // slate / neutral
      return {
        bgLight: "rgba(226,232,240,0.6)", // slate-200-ish
        ringLight: "rgba(226,232,240,0.9)",
        icon: "rgba(148,163,184,1)", // slate-400
      };
  }
}

type Service = {
  title: string;
  blurb: string;
  points: string[];
  Icon: LucideIcon;
  tone?: Tone;
};

export default function Services() {
  const { t } = useTranslation();

  // Primary "core" offerings
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

  // "Extras" / supporting services
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

  // Process data (the strip below cards)
  const steps = t("services.process.steps", {
    returnObjects: true,
  }) as { step: string; text: string }[];

  const detailsRaw = t("services.process.details", {
    returnObjects: true,
  }) as unknown;

  type Detail = { title: string; body: string };

  let details: Detail[] = steps.map((s) => ({ title: s.step, body: s.text }));

  if (detailsRaw && typeof detailsRaw === "object" && !Array.isArray(detailsRaw)) {
    const entries = Object.entries(
      detailsRaw as Record<string, { title?: string; body?: string }>
    )
      .sort(([a, b]) => Number(a) - Number(b))
      .map(([, v]) => ({ title: v?.title ?? "", body: v?.body ?? "" }));

    if (entries.length) {
      details = entries.map((d, i) => ({
        title: d.title || steps[i]?.step || "",
        body: d.body || steps[i]?.text || "",
      }));
    }
  }

  // Refs for (future) animated indicator in ProcessStrip
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    // placeholder for future dot alignment logic
  }

  const stepIcons: LucideIcon[] = [Search, Palette, Rocket];

  return (
    <section
      id="services"
      className="scroll-mt-24 transition-colors duration-500 bg-transparent"
      aria-labelledby="services-heading"
    >
      <Container className="py-16 sm:py-24">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="services-heading"
            className="text-heading text-3xl font-bold tracking-tight"
          >
            {t("services.heading")}
          </h2>

          <p className="mt-3 text-body">
            {t("services.sub")}
          </p>
        </div>

        {/* Primary services cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {primary.map(({ title, blurb, points, Icon, tone }) => {
            const toneVars = toneStyle(tone);

            return (
              <div key={title} className="surface-card p-6 flex flex-col">
                {/* icon chip */}
                <div
                  className="shrink-0 inline-flex items-center justify-center rounded-xl border text-[11px] font-semibold"
                  style={{
                    backgroundColor: toneVars.bgLight,
                    borderColor: toneVars.ringLight,
                    boxShadow: `0 12px 24px ${toneVars.ringLight}`,
                  }}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: toneVars.icon }}
                  />
                </div>

                {/* title / blurb */}
                <h3 className="text-heading text-lg font-semibold mt-4">
                  {title}
                </h3>

                <p className="text-body text-sm leading-relaxed mt-2">
                  {blurb}
                </p>

                {/* bullet list */}
                <ul className="mt-4 space-y-2 text-sm">
                  {points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2 text-body text-sm leading-relaxed"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-dim shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Process strip */}
        <ProcessStrip
          steps={steps}
          icons={stepIcons}
          title={t("services.process.title")}
          details={details}
        />

        {/* Extras cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {extras.map(({ title, blurb, points, Icon, tone }) => {
            const toneVars = toneStyle(tone);

            return (
              <div key={title} className="surface-card p-6 flex flex-col">
                {/* icon chip */}
                <div
                  className="shrink-0 inline-flex items-center justify-center rounded-xl border text-[11px] font-semibold"
                  style={{
                    backgroundColor: toneVars.bgLight,
                    borderColor: toneVars.ringLight,
                    boxShadow: `0 12px 24px ${toneVars.ringLight}`,
                  }}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: toneVars.icon }}
                  />
                </div>

                <h3 className="text-heading text-lg font-semibold mt-4">
                  {title}
                </h3>

                <p className="text-body text-sm leading-relaxed mt-2">
                  {blurb}
                </p>

                <ul className="mt-4 space-y-2 text-sm">
                  {points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2 text-body text-sm leading-relaxed"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-dim shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}