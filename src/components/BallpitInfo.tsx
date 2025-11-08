import { Sparkles, PenTool } from "lucide-react";

export default function BallpitInfo({ className = "" }) {
  return (
    <section
      className={`relative rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur md:p-8 dark:bg-white/5 dark:border-white/10 ${className}`}
    >
      {/* glød */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-2 -top-2 -z-10 h-24 rounded-3xl bg-linear-to-r from-sky-100 via-indigo-100 to-violet-100 blur-2xl dark:from-sky-900/30 dark:via-indigo-900/30 dark:to-violet-900/30"
      />

      <header className="mb-3 flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 bg-white/80 shadow-sm dark:bg-white/10 dark:border-white/10">
          <Sparkles className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
        </div>
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          Interaktiv bakgrunn
        </h2>
      </header>

      <p className="text-sm leading-relaxed text-slate-700 md:text-base dark:text-slate-200">
        Bak den rolige overflaten er det bevegelse — bakgrunnen vår lever, drevet
        av en egendesignet fysikksimulering. Hos CodeForge Studio mener vi at selv
        piksler skal ha personlighet.
      </p>

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <PenTool className="h-4 w-4" />
        <span>Utviklet med React, Canvas og fysikk — håndkodet fra bunnen av.</span>
      </div>
    </section>
  );
}