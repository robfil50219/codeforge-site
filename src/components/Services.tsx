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

// Tone color system for icon chips
type Tone = "sky" | "indigo" | "emerald" | "slate";

function toneStyle(tone?: Tone) {
  switch (tone) {
    case "sky":
      return {
        bgLight: "rgba(186,230,253,1)",
        bgDark: "rgba(0,160,160,0.25)",
        ringLight: "rgba(186,230,253,1)",
        ringDark: "rgba(0,160,160,0.4)",
        icon: "#00A0A0",
      };
    case "indigo":
      return {
        bgLight: "rgba(199,210,254,1)",
        bgDark: "rgba(99,102,241,0.25)",
        ringLight: "rgba(199,210,254,1)",
        ringDark: "rgba(99,102,241,0.4)",
        icon: "#6366F1",
      };
    case "emerald":
      return {
        bgLight: "rgba(167,243,208,1)",
        bgDark: "rgba(16,185,129,0.25)",
        ringLight: "rgba(167,243,208,1)",
        ringDark: "rgba(16,185,129,0.4)",
        icon: "#10B981",
      };
    default:
      return {
        bgLight: "rgba(241,245,249,1)",
        bgDark: "rgba(255,255,255,0.08)",
        ringLight: "rgba(241,245,249,1)",
        ringDark: "rgba(255,255,255,0.2)",
        icon: "#94A3B8",
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

  const steps = t("services.process.steps", { returnObjects: true }) as {
    step: string;
    text: string;
  }[];

  const detailsRaw = t("services.process.details", { returnObjects: true }) as unknown;
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

  const trackRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const positionDotAtIndex = (idx: number) => {
      const track = trackRef.current;
      const stepEl = stepRefs.current[idx];
      if (!track || !stepEl) return;
    };
    positionDotAtIndex(0);
    const onResize = () => positionDotAtIndex(0);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const stepIcons: LucideIcon[] = [Search, Palette, Rocket];

  return (
    <section
      id="services"
      className="scroll-mt-24 transition-colors duration-500 bg-transparent"
      aria-labelledby="services-heading"
    >
      <Container className="py-16 sm:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="services-heading" className="text-heading text-3xl font-bold tracking-tight">
            {t("services.heading")}
          </h2>
          <p className="mt-3 text-body">{t("services.sub")}</p>
        </div>

        {/* Primary services */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {primary.map(({ title, blurb, points, Icon, tone }) => {
            const toneVars = toneStyle(tone);
            return (
              <div key={title} className="surface-card p-6 flex flex-col rounded-xl group">
                {/* icon chip with NO shadow */}
                <div
                  className="inline-flex max-w-max items-center gap-2 rounded-xl border text-[11px] font-semibold px-3 py-2 transition-colors duration-300"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${toneVars.bgLight} 70%, ${toneVars.bgDark} 30%)`,
                    borderColor: `color-mix(in srgb, ${toneVars.ringLight} 70%, ${toneVars.ringDark} 30%)`,
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: toneVars.icon }} />
                </div>

                <h3 className="text-heading text-lg font-semibold mt-4">{title}</h3>
                <p className="text-body text-sm leading-relaxed mt-2">{blurb}</p>

                <ul className="mt-4 space-y-2 text-sm">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-body leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-dim shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <ProcessStrip
          steps={steps}
          icons={stepIcons}
          title={t("services.process.title")}
          details={details}
        />

        {/* Extra services */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {extras.map(({ title, blurb, points, Icon, tone }) => {
            const toneVars = toneStyle(tone);
            return (
              <div key={title} className="surface-card p-6 flex flex-col rounded-xl group">
                <div
                  className="inline-flex max-w-max items-center gap-2 rounded-xl border text-[11px] font-semibold px-3 py-2 transition-colors duration-300"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${toneVars.bgLight} 70%, ${toneVars.bgDark} 30%)`,
                    borderColor: `color-mix(in srgb, ${toneVars.ringLight} 70%, ${toneVars.ringDark} 30%)`,
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: toneVars.icon }} />
                </div>

                <h3 className="text-heading text-lg font-semibold mt-4">{title}</h3>
                <p className="text-body text-sm leading-relaxed mt-2">{blurb}</p>

                <ul className="mt-4 space-y-2 text-sm">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-body leading-relaxed">
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