export type Tone = "sky" | "indigo" | "emerald" | "slate";

export function toneStyle(tone?: Tone) {
  switch (tone) {
    case "sky":
      return { ring: "ring-sky-100", bg: "bg-sky-50", icon: "text-sky-600", glow: "bg-sky-100/60" };
    case "indigo":
      return { ring: "ring-indigo-100", bg: "bg-indigo-50", icon: "text-indigo-600", glow: "bg-indigo-100/60" };
    case "emerald":
      return { ring: "ring-emerald-100", bg: "bg-emerald-50", icon: "text-emerald-600", glow: "bg-emerald-100/60" };
    default:
      return { ring: "ring-slate-200", bg: "bg-slate-50", icon: "text-slate-700", glow: "bg-slate-100/60" };
  }
}