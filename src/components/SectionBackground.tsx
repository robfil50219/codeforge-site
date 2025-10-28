// src/components/SectionBackground.tsx
import cn from "../utils/cn";

type Props = { className?: string };

export default function SectionBackground({ className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
    >
      {/* Dark base veil (tweak opacity by changing /20) */}
      <div className="absolute inset-0 bg-slate-900/20" />

      {/* Gentle dark gradient for depth */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-900/10 via-slate-900/8 to-slate-900/6" />

      {/* Very faint brand blobs (kept subtle so they don't brighten the section) */}
      <div className="absolute -left-20 -top-10 h-72 w-72 rounded-full bg-sky-900/10 blur-3xl" />
      <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-900/10 blur-3xl" />
      <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-emerald-900/10 blur-3xl" />
    </div>
  );
}