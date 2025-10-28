// src/components/About.tsx
import { type JSX } from "react";
import { useTranslation } from "../lib/t";
import SectionBackground from "./SectionBackground";
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
    React: <FaReact className="h-5 w-5 text-sky-300" />,
    TypeScript: <SiTypescript className="h-5 w-5 text-blue-300" />,
    "Next.js": <SiNextdotjs className="h-5 w-5 text-white" />,
    "Node.js": <FaNodeJs className="h-5 w-5 text-emerald-300" />,
    TailwindCSS: <SiTailwindcss className="h-5 w-5 text-sky-300" />,
    Vite: <SiVite className="h-5 w-5 text-purple-300" />,
    WordPress: <FaWordpress className="h-5 w-5 text-slate-200" />,
    Firebase: <SiFirebase className="h-5 w-5 text-amber-300" />,
    "REST & GraphQL APIs": (
      <span className="flex -space-x-1.5 items-center">
        <TbApi className="h-5 w-5 text-indigo-300" />
        <SiGraphql className="h-4 w-4 translate-y-px text-pink-300" />
      </span>
    ),
  };

  return (
    <section id="about" className="relative scroll-mt-24">
      <SectionBackground />
      {/* Desktop: gradient behind text column for readability */}
      <div className="absolute inset-0 -z-10 hidden md:block bg-linear-to-l from-slate-900/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="relative aspect-square w-56 sm:w-64 overflow-hidden rounded-full ring-4 ring-white/60 shadow-[0_8px_30px_rgba(2,6,23,0.25)] bg-white/5">
                <img
                  src={profileImg}
                  alt={t("about.alt") as string}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-sky-300 uppercase">
              {t("about.sectionLabel") as string}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t("about.heading") as string}
            </h2>
            <p className="mt-4 text-lg text-slate-200">{t("about.copy") as string}</p>

            {/* Highlights */}
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-white"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-sky-300" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Tech chips with logos */}
            <div className="mt-6 flex flex-wrap gap-2">
              {tech.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white ring-1 ring-white/10"
                  title={label}
                >
                  {techIcons[label] ?? (
                    <span className="inline-block h-2 w-2 rounded-full bg-slate-300" />
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