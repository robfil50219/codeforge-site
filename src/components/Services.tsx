// src/components/Services.tsx
import React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
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

  const steps = t("services.process.steps", {
    returnObjects: true,
  }) as { step: string; text: string }[];

  // --- Animated dot state ---
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useMemo(
    () => Array.from({ length: steps.length }, () => React.createRef<HTMLDivElement>()),
    [steps.length]
  );
  const [dotLeft, setDotLeft] = useState<number>(0);

  useEffect(() => {
    positionDotAtIndex(0);
    const onResize = () => positionDotAtIndex(0);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const positionDotAtIndex = (idx: number) => {
    const track = trackRef.current;
    const stepEl = stepRefs[idx]?.current as HTMLDivElement | null;
    if (!track || !stepEl) return;
    const trackRect = track.getBoundingClientRect();
    const stepRect = stepEl.getBoundingClientRect();
    const centerX = stepRect.left + stepRect.width / 2;
    setDotLeft(centerX - trackRect.left);
  };

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
            <article
              key={s.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
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
            <article
              key={s.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
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

          {/* Desktop: line above labels; perfectly centered dots */}
          <div
            ref={trackRef}
            className="relative mt-12 hidden h-28 sm:flex items-start"
          >
            {/* Baseline line ABOVE labels */}
            <div className="absolute left-4 right-4 top-6 h-0.5 bg-slate-200" />

            {/* Steps with static anchor dots and labels */}
            <div className="grid w-full grid-cols-3">
              {steps.map((x, idx) => (
                <div
                  key={x.step}
                  ref={(el) => { stepRefs[idx].current = el; }}
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => positionDotAtIndex(idx)}
                  onFocus={() => positionDotAtIndex(idx)}
                  tabIndex={0}
                  aria-label={x.step}
                >
                  {/* Static grey dot (behind) centered on the line */}
                  <div className="relative h-0">
                    <div className="absolute left-1/2 top-6 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300 z-0" />
                  </div>
                  {/* Labels under the line */}
                  <div className="mt-10 text-center">
                    <div className="font-semibold text-slate-900">{x.step}</div>
                    <div className="text-sm text-slate-600">{x.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Moving blue dot (always above) centered on the same line */}
            <div
              className="pointer-events-none absolute top-6 -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                left: dotLeft,
                transition: "left 280ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* Glow ring */}
              <div
                className="h-8 w-8 rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(59,130,246,0.22), rgba(14,165,233,0))",
                  filter: "blur(4px)",
                }}
              />
              {/* Shiny dot */}
              <div
                className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-md ring-1 ring-white"
                style={{
                  background:
                    "linear-gradient(145deg, #38bdf8 0%, #3b82f6 70%, #1d4ed8 100%)",
                  boxShadow:
                    "0 3px 6px rgba(2,132,199,0.35), 0 0 0 2px rgba(255,255,255,0.85)",
                }}
              />
              {/* Inner sparkle */}
              <div
                className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.25))",
                }}
              />
            </div>
          </div>

          {/* Mobile: vertical list */}
          <ol className="sm:hidden mt-6 space-y-6">
            {steps.map((x, idx) => (
              <li key={x.step} className="relative pl-8">
                <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-sky-500" />
                {idx < steps.length - 1 && (
                  <span className="absolute left-1.5 top-5 bottom-[-12px] w-0.5 bg-slate-200" />
                )}
                <div className="font-semibold text-slate-900">{x.step}</div>
                <div className="text-sm text-slate-600">{x.text}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}