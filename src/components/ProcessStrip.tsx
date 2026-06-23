/**
 * -------------------------------------------------------
 *  CodeForge Studio — Proprietary Source Code
 *  © 2025 CodeForge Studio Filep. All rights reserved.
 *
 *  This file is part of the CodeForge Studio website.
 *  Unauthorized copying, modification, or distribution
 *  of this file, via any medium, is strictly prohibited.
 *
 *  For licensing or collaboration inquiries:
 *  robert@codeforgestudio.no | https://codeforgestudio.no
 * -------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from "react";
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
  const cardRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [centers, setCenters] = useState<number[]>([]);
  const [dotLeft, setDotLeft] = useState<number>(0);
  const [barLeft, setBarLeft] = useState<number>(0);
  const [barWidth, setBarWidth] = useState<number>(0);

  // --- geometry helpers -----------------------------------------------------

  const computeCenters = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return [];
    const rect = rail.getBoundingClientRect();
    return iconRefs.current.map((btn) => {
      if (!btn) return 0;
      const r = btn.getBoundingClientRect();
      return r.left + r.width / 2 - rect.left;
    });
  }, []);

  const updateGeometry = useCallback(
    (idx: number | null) => {
      const newCenters = computeCenters();
      setCenters(newCenters);
      if (!newCenters.length) return;
      const first = newCenters[0];
      const active = newCenters[idx ?? 0] ?? first;
      setDotLeft(active);
      setBarLeft(Math.min(first, active));
      setBarWidth(Math.abs(active - first));
    },
    [computeCenters],
  );

  const positionDropdown = useCallback((idx: number | null) => {
    const dropdown = dropdownRef.current;
    const offsetParent = dropdown?.offsetParent;
    if (
      !dropdown ||
      !(offsetParent instanceof HTMLElement) ||
      idx === null
    ) {
      return;
    }
    const btn = iconRefs.current[idx];
    if (!btn) return;

    const parentRect = offsetParent.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const targetCenter =
      btnRect.left + btnRect.width / 2 - parentRect.left;
    const horizontalMargin = 8;
    const maxWidth = 448;
    const dropdownWidth = Math.min(
      maxWidth,
      Math.max(0, parentRect.width - horizontalMargin * 2),
    );
    const unclampedLeft = targetCenter - dropdownWidth / 2;
    const clampedLeft = Math.min(
      Math.max(unclampedLeft, horizontalMargin),
      parentRect.width - dropdownWidth - horizontalMargin,
    );

    dropdown.style.width = `${dropdownWidth}px`;
    dropdown.style.left = `${clampedLeft}px`;
    dropdown.style.top = "120px";
    dropdown.style.transform = "none";
  }, []);

  // --- effects --------------------------------------------------------------
  useEffect(() => {
    const i = openIdx ?? 0;
    updateGeometry(i);
    positionDropdown(openIdx);
  }, [openIdx, updateGeometry, positionDropdown]);

  useEffect(() => {
    const onResize = () => {
      const i = openIdx ?? 0;
      updateGeometry(i);
      positionDropdown(openIdx);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [openIdx, updateGeometry, positionDropdown]);

  useEffect(() => {
    const onScroll = () => {
      const i = openIdx ?? 0;
      updateGeometry(i);
      positionDropdown(openIdx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [openIdx, updateGeometry, positionDropdown]);

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const t = e.target as Node;
      const clickedIcon = iconRefs.current.some((el) => el?.contains(t));
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(t) &&
        !clickedIcon
      ) {
        setOpenIdx(null);
      }
    }
    if (openIdx !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openIdx]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // --- render ---------------------------------------------------------------
  return (
    <div
      ref={cardRef}
      className="mt-16 sm:mt-20 relative surface-card rounded-2xl p-6 sm:p-8"
    >
      <p className="text-dim text-xs font-semibold tracking-widest uppercase text-center">
        {title}
      </p>

      {/* DESKTOP STRIP */}
      <div className="relative mt-12 hidden h-40 sm:flex items-start">
        <div
          ref={railRef}
          className="absolute left-4 right-4 top-4 h-6 pointer-events-none"
          aria-hidden="true"
        >
          {/* dotted baseline */}
          <div
            className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(148,163,184,0.35) 0 6px, transparent 6px 14px)",
            }}
          />

          {/* progress bar */}
          <div
            className="absolute top-1/2 h-0.5 -translate-y-1/2 transition-all duration-300"
            style={{
              left: barLeft,
              width: barWidth,
              backgroundColor: "var(--color-brand-sea)",
            }}
          />

          {/* anchor dots */}
          {centers.map((cx, i) => (
            <div
              key={i}
              className="absolute h-2.5 w-2.5 rounded-full bg-(--text-dim)/50"
              style={{
                left: cx,
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}

          {/* orb */}
          <div
            className="absolute z-30"
            style={{
              left: dotLeft,
              top: "50%",
              transform: "translate(-50%, -50%)",
              transition: "left 260ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div
              className="relative h-8 w-8 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55), rgba(0,0,0,0.15) 70%)",
                border: "1px solid rgba(255,255,255,0.4)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                backdropFilter: "blur(1.5px)",
                WebkitBackdropFilter: "blur(1.5px)",
              }}
            >
              <div
                className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.9), rgba(0,160,160,0.4) 60%, rgba(0,0,0,0) 100%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* steps */}
        <div className="grid w-full grid-cols-3">
          {steps.map((x, idx) => {
            const Icon = icons[idx % icons.length];
            const isOpen = openIdx === idx;

            return (
              <div
                key={x.step}
                className="relative flex flex-col items-center pb-3"
                onMouseEnter={() => updateGeometry(idx)}
              >
                <button
                  ref={(el) => {
                    iconRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className={[
                    "mt-16 grid place-items-center w-14 h-14 rounded-xl surface-card border border-(--card-border) shadow-md",
                    "transition-all duration-300",
                    isOpen
                      ? "ring-2 ring-(--color-brand-sea) scale-105"
                      : "ring-0 hover:scale-105 active:scale-95",
                  ].join(" ")}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: "var(--color-brand-sea)" }}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="mt-4 text-center rounded px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand-sea)"
                >
                  <div className="text-heading font-semibold">{x.step}</div>
                  <div className="text-sm text-dim mt-1 leading-snug min-h-10 text-center whitespace-normal">
                    {x.text}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* dropdown card */}
        <div
          ref={dropdownRef}
          className={[
            "absolute z-50 w-full max-w-md origin-top transition-all duration-300 ease-out",
            openIdx === null
              ? "pointer-events-none opacity-0 translate-y-2 scale-[0.98]"
              : "opacity-100 translate-y-0 scale-100",
          ].join(" ")}
        >
          <div
            className="-mb-2 mx-auto h-3 w-3 rotate-45 surface-card border border-(--card-border) shadow-md"
            aria-hidden="true"
          />
          <div className="surface-card rounded-xl shadow-xl border border-(--card-border) p-4 text-center">
            {steps.map((step, idx) => (
              <div
                key={step.step}
                className={openIdx === idx ? "block" : "hidden"}
              >
                <div className="text-dim text-sm tracking-wide uppercase">
                  {details?.[idx]?.title ?? step.step}
                </div>
                <div className="text-heading text-xl font-semibold mt-1">
                  {step.step}
                </div>
                <p className="text-body text-base leading-relaxed mt-4 whitespace-normal">
                  {details?.[idx]?.body ?? step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE VERSION */}
      <ol className="sm:hidden mt-8 space-y-6">
        {steps.map((x, idx) => {
          const Icon = icons[idx % icons.length];
          const isOpen = openIdx === idx;
          return (
            <li key={x.step} className="relative pl-10">
              {idx < steps.length - 1 && (
                <span className="absolute left-3.5 top-8 -bottom-3 w-0.5 bg-(--text-dim)/30" />
              )}
              <span className="absolute left-0 top-1.5 inline-grid h-8 w-8 place-items-center rounded-xl surface-card border border-(--card-border) shadow-md">
                <Icon
                  className="h-4 w-4"
                  style={{ color: "var(--color-brand-sea)" }}
                />
              </span>
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="w-full text-left"
              >
                <div className="text-heading font-semibold text-base leading-tight">
                  {x.step}
                </div>
                <div className="text-dim text-sm leading-relaxed">
                  {x.text}
                </div>
              </button>
              <div
                className={[
                  "grid origin-top transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 scale-100 translate-y-2"
                    : "pointer-events-none grid-rows-[0fr] opacity-0 scale-[0.98] -translate-y-1",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <div className="surface-card mt-3 rounded-lg shadow-md border border-(--card-border) p-3">
                    <div className="text-heading text-sm font-semibold">
                      {details?.[idx]?.title ?? x.step}
                    </div>
                    <p className="text-body text-sm leading-relaxed mt-2 whitespace-normal">
                      {details?.[idx]?.body ?? x.text}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
