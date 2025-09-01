// src/components/About.tsx
import { type JSX } from "react";
import { useTranslation } from "react-i18next";
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

  // Map i18n labels -> icons (match exactly the strings you have in i18n)
  const techIcons: Record<string, JSX.Element> = {
    React: <FaReact className="h-5 w-5" />,
    TypeScript: <SiTypescript className="h-5 w-5" />,
    "Next.js": <SiNextdotjs className="h-5 w-5" />,
    "Node.js": <FaNodeJs className="h-5 w-5" />,
    TailwindCSS: <SiTailwindcss className="h-5 w-5" />,
    Vite: <SiVite className="h-5 w-5" />,
    WordPress: <FaWordpress className="h-5 w-5" />,
    Firebase: <SiFirebase className="h-5 w-5" />,
    // Special combined label → show REST + GraphQL together
    "REST & GraphQL APIs": (
      <span className="flex -space-x-1.5 items-center">
        <TbApi className="h-5 w-5" />
        <SiGraphql className="h-4 w-4 translate-y-[1px]" />
      </span>
    ),
  };

  // Optional color accents per tech (kept subtle)
  const techColor: Record<string, string> = {
    React: "text-sky-500",
    TypeScript: "text-blue-600",
    "Next.js": "text-slate-900",
    "Node.js": "text-green-600",
    TailwindCSS: "text-sky-400",
    Vite: "text-purple-500",
    WordPress: "text-slate-700",
    Firebase: "text-amber-500",
    "REST & GraphQL APIs": "text-indigo-600",
  };

  return (
    <section id="about" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative">
              {/* soft glow behind */}
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-full bg-sky-200/50 blur-2xl" />
              <img
                src={profileImg}
                alt={t("about.alt")}
                className="block aspect-square h-56 w-56 sm:h-64 sm:w-64 rounded-full object-cover object-center
                           ring-4 ring-white shadow-[0_4px_12px_rgba(0,0,0,0.25),0_8px_24px_rgba(0,0,0,0.15)]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase">
              {t("about.sectionLabel")}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {t("about.heading")}
            </h2>
            <p className="mt-4 text-lg text-slate-600">{t("about.copy")}</p>

            {/* Highlights */}
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Tech chips with icons */}
            <div className="mt-6 flex flex-wrap gap-2">
              {tech.map((label) => {
                const icon = techIcons[label];
                const color = techColor[label] ?? "text-slate-700";
                return (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800"
                    title={label}
                  >
                    {icon ? (
                      <span className={color}>{icon}</span>
                    ) : (
                      <span className="inline-block h-2 w-2 rounded-full bg-slate-400" />
                    )}
                    <span>{label}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}