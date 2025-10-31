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
// src/components/About.tsx
import { type JSX } from "react";
import { useTranslation } from "../lib/t";
import profileImg from "../assets/profileimage.png";

// Icons
import { FaReact, FaNodeJs, FaWordpress } from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiFirebase,
  SiGraphql,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

export default function About() {
  const { t } = useTranslation();

  const highlights = t("about.highlights", { returnObjects: true }) as string[];
  const tech = t("about.tech", { returnObjects: true }) as string[];

  // Icon mapping (keys must match your i18n labels)
  const techIcons: Record<string, JSX.Element> = {
    React: <FaReact className="h-5 w-5 text-sky-600" />,
    TypeScript: <SiTypescript className="h-5 w-5 text-blue-600" />,
    "Next.js": <SiNextdotjs className="h-5 w-5 text-slate-800" />,
    "Node.js": <FaNodeJs className="h-5 w-5 text-emerald-600" />,
    TailwindCSS: <SiTailwindcss className="h-5 w-5 text-sky-600" />,
    Vite: <SiVite className="h-5 w-5 text-purple-500" />,
    WordPress: <FaWordpress className="h-5 w-5 text-slate-700" />,
    Firebase: <SiFirebase className="h-5 w-5 text-amber-500" />,
    "REST & GraphQL APIs": (
      <span className="flex -space-x-1.5 items-center">
        <TbApi className="h-5 w-5 text-indigo-500" />
        <SiGraphql className="h-4 w-4 translate-y-px text-pink-500" />
      </span>
    ),
  };

  return (
    <section
      id="about"
      className="relative scroll-mt-24 text-slate-900"
    >
      {/* Transparent gradient similar to Hero */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-white/80 via-white/60 to-white/40 backdrop-blur-[2px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Photo + Name */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="relative aspect-square w-56 sm:w-64 overflow-hidden rounded-full ring-4 ring-white/60 shadow-[0_8px_30px_rgba(15,23,42,0.15)] bg-white/60 backdrop-blur-sm">
                <img
                  src={profileImg}
                  alt={t("about.alt") as string}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Name + Title */}
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-slate-900">Robert Filep</h3>
<p className="mt-1 text-sky-700 font-medium">
  Frontend-utvikler&nbsp;•&nbsp;Grunnlegger av CodeForge Studio
</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-sky-700 uppercase">
              {t("about.sectionLabel") as string}
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {t("about.heading") as string}
            </h2>

            <p className="mt-4 text-lg text-slate-700">
              {t("about.copy") as string}
            </p>

            {/* Highlights */}
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-slate-200/70 bg-white/50 px-3 py-2 text-sm text-slate-800 backdrop-blur-sm"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Tech chips with logos */}
            <div className="mt-6 flex flex-wrap gap-2">
              {tech.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-sm text-slate-900 ring-1 ring-slate-200/60 backdrop-blur-sm"
                  title={label}
                >
                  {techIcons[label] ?? (
                    <span className="inline-block h-2 w-2 rounded-full bg-slate-400" />
                  )}
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}