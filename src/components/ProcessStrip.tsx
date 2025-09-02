import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

type Step = { step: string; text: string };
type Detail = { title: string; body: string };

type ProcessStripProps = {
  steps: Step[];
  icons: LucideIcon[];
  title: string;
  /** Localized details for each step (title + body) */
  details?: Detail[]; // optional but recommended
};

export default function ProcessStrip({ steps, icons, title, details }: ProcessStripProps) {
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

    // Set position just below the icons row.
    dropdown.style.left = `${centerX}px`;
    dropdown.style.top = `120px`;
    dropdown.style.transform = `translate(-50%, 0)`;
  }

  // Initial + resize
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

  // Reposition while scroll (keeps card centered under icon if the page moves)
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

  // Reposition when openIdx changes
  useEffect(() => {
    positionDropdown(openIdx);
    if (openIdx !== null) positionDotAtIndex(openIdx);
  }, [openIdx]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const t = e.target as Node;
      const clickedStep = stepRefs.current.some((step) => step?.contains(t));
      if (dropdownRef.current && !dropdownRef.current.contains(t) && !clickedStep) {
        setOpenIdx(null);
      }
    }
    if (openIdx !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openIdx]);

  // Close on Escape
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
      className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm relative"
    >
      <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase text-center">
        {title}
      </p>

      {/* Desktop strip */}
      <div ref={trackRef} className="relative mt-12 hidden h-40 sm:flex items-start">
        {/* Dotted baseline above icons */}
        <div
          className="absolute left-4 right-4 top-4 h-0.5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(148,163,184,0.9) 0 6px, transparent 6px 14px)",
          }}
          aria-hidden="true"
        />

        {/* Steps */}
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
                {/* Anchor dot on the line */}
                <div className="relative h-0">
                  <div className="absolute left-1/2 top-4 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300 z-0" />
                </div>

                {/* Icon button */}
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="mt-8 grid place-items-center rounded-xl ring-1 ring-slate-200 bg-white shadow-sm w-14 h-14 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                >
                  <Icon className="h-5 w-5 text-sky-600" />
                </button>

                {/* Text button (doesn’t expand the card itself) */}
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="mt-3 text-center rounded px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                >
                  <div className="font-semibold text-slate-900">{x.step}</div>
                  <div className="text-sm text-slate-600">{x.text}</div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Moving highlight dot */}
        <div
          className="pointer-events-none absolute top-4 -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: dotLeft,
            transition: "left 280ms cubic-bezier(0.22, 1, 0.36, 1)",
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

        {/* Dropdown card */}
        <div
          ref={dropdownRef}
          className={`absolute z-20 w-full max-w-md transition-all duration-300 ease-out ${
            openIdx === null
              ? "pointer-events-none opacity-0 translate-y-2 scale-[0.98]"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          {/* caret */}
          <div
            className={`mx-auto -mb-2 h-3 w-3 rotate-45 border border-slate-200 bg-white shadow-sm`}
            aria-hidden="true"
          />
          <div className="rounded-xl border border-slate-200 bg-white shadow-xl">
            <div className="p-4">
              {openIdx !== null && (
                <>
                  <div className="text-sm font-semibold text-slate-900">
                    {details?.[openIdx]?.title ?? steps[openIdx].step}
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {details?.[openIdx]?.body ?? steps[openIdx].text}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile vertical list with expandable details */}
<ol className="sm:hidden mt-6 space-y-6">
  {steps.map((x, idx) => {
    const Icon = icons[idx % icons.length];
    const isOpen = openIdx === idx;

    return (
      <li key={x.step} className="relative pl-10">
        {/* Step icon */}
        <span className="absolute left-0 top-1.5 inline-grid h-7 w-7 place-items-center rounded-full bg-sky-50 ring-1 ring-sky-100">
          <Icon className="h-4 w-4 text-sky-600" />
        </span>

        {/* Vertical connector line */}
        {idx < steps.length - 1 && (
          <span className="absolute left-3.5 top-8 bottom-[-12px] w-0.5 bg-slate-200" />
        )}

        {/* Clickable label */}
        <button
          type="button"
          onClick={() => setOpenIdx(isOpen ? null : idx)}
          aria-expanded={isOpen}
          className="w-full text-left"
        >
          <div className="font-semibold text-slate-900">{x.step}</div>
          <div className="text-sm text-slate-600">{x.text}</div>
        </button>

        {/* Expanded details */}
        {isOpen && (
          <div className="mt-2 rounded-lg border border-slate-200 bg-white p-3 shadow-md">
            <div className="text-sm font-semibold text-slate-900">
              {details?.[idx]?.title ?? x.step}
            </div>
            <p className="mt-1 text-sm text-slate-600">
              {details?.[idx]?.body ?? x.text}
            </p>
          </div>
        )}
      </li>
    );
  })}
</ol>
    </div>
  );
}