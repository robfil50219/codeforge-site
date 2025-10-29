import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

type Step = { step: string; text: string };
type Detail = { title: string; body: string };

type ProcessStripProps = {
  steps: Step[];
  icons: LucideIcon[];
  title: string;
  details?: Detail[];
};

export default function ProcessStrip({
  steps,
  icons,
  title,
  details,
}: ProcessStripProps) {
  const processCardRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [dotLeft, setDotLeft] = useState<number>(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  function positionDotAtIndex(idx: number) {
    const track = trackRef.current;
    const stepEl = stepRefs.current[idx];
    if (!track || !stepEl) return;
    const trackRect = track.getBoundingClientRect();
    const stepRect = stepEl.getBoundingClientRect();
    setDotLeft(stepRect.left + stepRect.width / 2 - trackRect.left);
  }

  function positionDropdown(idx: number | null) {
    const dropdown = dropdownRef.current;
    const track = trackRef.current;
    const stepEl = idx !== null ? stepRefs.current[idx] : null;
    if (!dropdown || !track || !stepEl) return;

    const trackRect = track.getBoundingClientRect();
    const stepRect = stepEl.getBoundingClientRect();
    const centerX = stepRect.left + stepRect.width / 2 - trackRect.left;

    dropdown.style.left = `${centerX}px`;
    dropdown.style.top = `120px`;
    dropdown.style.transform = `translate(-50%, 0)`;
  }

  // init + resize
  useEffect(() => {
    positionDotAtIndex(0);
    const onResize = () => {
      const idx = openIdx ?? 0;
      positionDotAtIndex(idx);
      positionDropdown(idx);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [openIdx]);

  // keep dropdown anchored if scrolling
  useEffect(() => {
    const onScroll = () => {
      if (openIdx !== null) {
        positionDropdown(openIdx);
        positionDotAtIndex(openIdx);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [openIdx]);

  // when openIdx changes
  useEffect(() => {
    positionDropdown(openIdx);
    if (openIdx !== null) positionDotAtIndex(openIdx);
  }, [openIdx]);

  // click-outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const t = e.target as Node;
      const clickedStep = stepRefs.current.some((step) => step?.contains(t));
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(t) &&
        !clickedStep
      ) {
        setOpenIdx(null);
      }
    }

    if (openIdx !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openIdx]);

  // ESC to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIdx(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={processCardRef}
      className={[
        "mt-16 sm:mt-20 relative",
        // ✅ use same theme surface as other cards
        "surface-card rounded-2xl p-6 sm:p-8",
        "transition-colors duration-300",
      ].join(" ")}
    >
      {/* section label */}
      <p className="text-dim text-xs font-semibold tracking-widest uppercase text-center">
        {title}
      </p>

      {/* desktop / tablet timeline */}
      <div
        ref={trackRef}
        className="relative mt-12 hidden h-40 sm:flex items-start"
      >
        {/* dotted rail */}
        <div
          className="absolute left-4 right-4 top-4 h-0.5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(148,163,184,0.4) 0 6px, transparent 6px 14px)",
          }}
          aria-hidden="true"
        />

        {/* all steps */}
        <div className="grid w-full grid-cols-3">
          {steps.map((x, idx) => {
            const Icon = icons[idx % icons.length];
            const isOpen = openIdx === idx;

            return (
              <div
                key={x.step}
                ref={(el) => {
                  stepRefs.current[idx] = el;
                }}
                className="relative flex flex-col items-center"
                onMouseEnter={() => positionDotAtIndex(idx)}
              >
                {/* little dot on the rail */}
                <div className="relative h-0">
                  <div
                    className="absolute left-1/2 top-4 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400 dark:bg-slate-500 z-0"
                    aria-hidden="true"
                  />
                </div>

                {/* icon bubble */}
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className={[
                    "mt-8 grid place-items-center w-14 h-14 rounded-xl",
                    // ✅ solid themed card surface for the bubble:
                    "surface-card border border-(--card-border) shadow-md",
                    "transition-all duration-300",
                    isOpen
                      ? "ring-2 ring-(--color-brand-sea) scale-105 shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                      : "ring-0 hover:scale-105 active:scale-95",
                  ].join(" ")}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: "var(--color-brand-sea)" }}
                  />
                </button>

                {/* label under icon */}
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className={[
                    "mt-3 text-center rounded px-1 transition-colors duration-300",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand-sea)",
                  ].join(" ")}
                >
                  <div className="font-semibold text-heading">{x.step}</div>
                  <div className="text-sm text-dim">{x.text}</div>
                </button>
              </div>
            );
          })}
        </div>

        {/* glowing orb that tracks current step */}
        <div
          className="pointer-events-none absolute top-4 -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: dotLeft,
            transition:
              "left 260ms cubic-bezier(0.22, 1, 0.36, 1), filter 0.2s",
          }}
          aria-hidden="true"
        >
          {/* glow */}
          <div
            className="h-8 w-8 rounded-full blur-xs"
            style={{
              background:
                "radial-gradient(closest-side, rgba(0,160,160,0.25), rgba(0,0,0,0))",
              filter:
                openIdx !== null
                  ? "brightness(1.2) saturate(1.2)"
                  : "brightness(1) saturate(1)",
            }}
          />
          {/* core dot */}
          <div
            className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-md ring-1 ring-white"
            style={{
              background:
                "linear-gradient(145deg, var(--color-brand-sea) 0%, #3b82f6 70%, #1d4ed8 100%)",
              boxShadow:
                "0 3px 6px rgba(2,132,199,0.35), 0 0 0 2px rgba(255,255,255,0.85)",
            }}
          />
          {/* sparkle highlight */}
          <div
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.25))",
            }}
          />
        </div>

        {/* dropdown / popover */}
        <div
          ref={dropdownRef}
          className={[
            "absolute z-20 w-full max-w-md origin-top",
            "transition-all duration-300 ease-out",
            openIdx === null
              ? "pointer-events-none opacity-0 translate-y-2 scale-[0.98]"
              : "opacity-100 translate-y-0 scale-100",
          ].join(" ")}
        >
          {/* caret */}
          <div
            className={[
              "-mb-2 mx-auto h-3 w-3 rotate-45 shadow-md border",
              // ✅ caret also uses card surface color now
              "surface-card border-(--card-border)",
            ].join(" ")}
            aria-hidden="true"
          />

          {/* body */}
          <div
            className={[
              "surface-card rounded-xl shadow-xl border border-(--card-border)",
            ].join(" ")}
          >
            <div className="p-4">
              {openIdx !== null && (
                <>
                  <div className="text-heading text-sm font-semibold">
                    {details?.[openIdx]?.title ?? steps[openIdx].step}
                  </div>

                  <p className="mt-1 text-body text-sm leading-relaxed">
                    {details?.[openIdx]?.body ?? steps[openIdx].text}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* mobile vertical timeline */}
      <ol className="sm:hidden mt-8 space-y-6">
        {steps.map((x, idx) => {
          const Icon = icons[idx % icons.length];
          const isOpen = openIdx === idx;

          return (
            <li key={x.step} className="relative pl-10">
              {/* connector line */}
              {idx < steps.length - 1 && (
                <span className="absolute left-3.5 top-8 -bottom-3 w-0.5 bg-slate-300 dark:bg-slate-600" />
              )}

              {/* step icon bubble */}
              <span
                className={[
                  "absolute left-0 top-1.5 inline-grid h-7 w-7 place-items-center rounded-xl border shadow-md",
                  // ✅ use same solid surface for mobile badges too
                  "surface-card border-(--card-border)",
                ].join(" ")}
              >
                <Icon
                  className="h-4 w-4"
                  style={{ color: "var(--color-brand-sea)" }}
                />
              </span>

              {/* clickable label */}
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="w-full text-left"
              >
                <div className="text-heading font-semibold">{x.step}</div>
                <div className="text-dim text-sm">{x.text}</div>
              </button>

              {/* expanded details */}
              <div
                className={[
                  "mt-2 origin-top transition-all duration-300 ease-out",
                  isOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "pointer-events-none opacity-0 scale-[0.98] -translate-y-1",
                ].join(" ")}
              >
                <div className="surface-card rounded-lg shadow-md border border-(--card-border) p-3">
                  <div className="text-heading text-sm font-semibold">
                    {details?.[idx]?.title ?? x.step}
                  </div>
                  <p className="mt-1 text-body text-sm leading-relaxed">
                    {details?.[idx]?.body ?? x.text}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}