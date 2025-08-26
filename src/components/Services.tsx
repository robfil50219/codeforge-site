// src/components/Services.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Palette, Rocket } from "lucide-react";

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

  // --- Animated process strip state ---
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useMemo(
    () => Array.from({ length: steps.length }, () => React.createRef<HTMLDivElement>()),
    [steps.length]
  );

  const [dotLeft, setDotLeft] = useState<number>(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [inView, setInView] = useState(false);
  const [pause, setPause] = useState(false);

  // NEW: which step's dropdown is open (desktop & mobile share this)
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const positionDotAtIndex = (idx: number) => {
    const track = trackRef.current;
    const stepEl = stepRefs[idx]?.current as HTMLDivElement | null;
    if (!track || !stepEl) return;
    const trackRect = track.getBoundingClientRect();
    const stepRect = stepEl.getBoundingClientRect();
    const centerX = stepRect.left + stepRect.width / 2;
    setDotLeft(centerX - trackRect.left);
  };

  // initial position + on resize
  useEffect(() => {
    positionDotAtIndex(0);
    const onResize = () => positionDotAtIndex(activeIdx);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // observe visibility to only auto-animate when on screen
  useEffect(() => {
    if (!trackRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "-20% 0px -20% 0px", threshold: 0.2 }
    );
    observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, []);

  // auto-advance the active index (skip if reduced motion or paused or not in view)
  useEffect(() => {
    if (prefersReducedMotion || pause || !inView) return;
    const id = window.setInterval(() => {
      setActiveIdx((idx) => {
        const next = (idx + 1) % steps.length;
        positionDotAtIndex(next);
        return next;
      });
    }, 2600);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pause, inView, prefersReducedMotion, steps.length]);

  // re-center dot on activeIdx
  useEffect(() => {
    positionDotAtIndex(activeIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  // icons per step (index-based, stays consistent with 3-step flow)
  const stepIcons = [Search, Palette, Rocket];

  // Try to pull longer detail text from i18n; fallback to the short text
  const detailFor = (idx: number) => {
    const key = `services.process.details.${idx}`;
    const maybe = t(key, { defaultValue: "" }) as string;
    return maybe && maybe.trim().length > 0 ? maybe : steps[idx]?.text;
  };

  // Utility: toggle open panel
  const togglePanel = (idx: number) => {
    setOpenIdx((curr) => (curr === idx ? null : idx));
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

          {/* Desktop timeline */}
          <div
            ref={trackRef}
            className="relative mt-12 hidden h-36 sm:flex items-start"
            onMouseEnter={() => setPause(true)}
            onMouseLeave={() => setPause(false)}
          >
            {/* Base line */}
            <div className="absolute left-4 right-4 top-8 h-0.5 bg-slate-200" />

            {/* Steps */}
            <div className="grid w-full grid-cols-3">
              {steps.map((x, idx) => {
                const Icon = stepIcons[idx % stepIcons.length];
                const isActive = idx === activeIdx;
                const isOpen = openIdx === idx;

                return (
                  <div
                    key={x.step}
                    ref={(el) => {
                      stepRefs[idx].current = el as HTMLDivElement;
                    }}
                    className="relative flex flex-col items-center"
                    onMouseEnter={() => {
                      setActiveIdx(idx);
                      positionDotAtIndex(idx);
                    }}
                    onFocus={() => {
                      setActiveIdx(idx);
                      positionDotAtIndex(idx);
                    }}
                    tabIndex={-1}
                    aria-label={x.step}
                  >
                    {/* Anchor dot (grey) */}
                    <div className="relative h-0">
                      <div className="absolute left-1/2 top-8 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300" />
                    </div>

                    {/* Icon button (toggles dropdown) */}
                    <button
                      type="button"
                      onClick={() => togglePanel(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`process-panel-${idx}`}
                      className={`mt-12 grid place-items-center rounded-xl ring-1 ring-slate-200 bg-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                        ${isActive ? "shadow-md" : "opacity-90"}`}
                      style={{ width: 52, height: 52 }}
                    >
                      <Icon
                        className={`h-5 w-5 transition ${
                          isActive ? "text-sky-600" : "text-slate-500"
                        }`}
                      />
                    </button>

                    {/* Labels */}
                    <div className="mt-3 text-center">
                      <div className="font-semibold text-slate-900">{x.step}</div>
                      <div className="text-sm text-slate-600">{x.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Moving blue dot */}
            <div
              className="pointer-events-none absolute top-8 -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                left: dotLeft,
                transition: prefersReducedMotion
                  ? undefined
                  : "left 280ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              aria-hidden="true"
            >
              {/* Glow */}
              <div
                className="h-8 w-8 rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(59,130,246,0.22), rgba(14,165,233,0))",
                  filter: "blur(4px)",
                }}
              />
              {/* Dot */}
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

          {/* Desktop: dropdown panel (shared area under the strip) */}
          <div
            className={`mt-4 overflow-hidden transition-[max-height,opacity] duration-300 ${
              openIdx === null ? "max-h-0 opacity-0" : "max-h-72 opacity-100"
            }`}
            aria-live="polite"
          >
            {openIdx !== null && (
              <div
                id={`process-panel-${openIdx}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700"
              >
                <div className="font-semibold text-slate-900 mb-1">
                  {steps[openIdx].step}
                </div>
                <p>{detailFor(openIdx)}</p>
              </div>
            )}
          </div>

          {/* Mobile list (icon also toggles inline panel) */}
          <ol className="sm:hidden mt-6 space-y-6">
            {steps.map((x, idx) => {
              const Icon = stepIcons[idx % stepIcons.length];
              const isOpen = openIdx === idx;
              return (
                <li key={x.step} className="relative">
                  <div className="pl-10">
                    <button
                      type="button"
                      onClick={() => togglePanel(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`m-process-panel-${idx}`}
                      className="absolute left-0 top-0 inline-grid h-7 w-7 place-items-center rounded-full bg-sky-50 ring-1 ring-sky-100 text-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      <Icon className="h-4 w-4" />
                    </button>

                    <div className="font-semibold text-slate-900">{x.step}</div>
                    <div className="text-sm text-slate-600">{x.text}</div>
                  </div>

                  {/* connector line */}
                  {idx < steps.length - 1 && (
                    <span className="absolute left-3.5 top-8 bottom-[-12px] w-0.5 bg-slate-200" />
                  )}

                  <div
                    id={`m-process-panel-${idx}`}
                    className={`ml-10 mt-3 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 transition-[max-height,opacity] duration-300 ${
                      isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p>{detailFor(idx)}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}