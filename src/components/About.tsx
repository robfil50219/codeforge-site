// src/components/About.tsx
import { type JSX } from "react";
import fallbackProfileImg from "../assets/profileimage.png";
import Container from "./ui/Container";
import { useTranslation } from "../lib/t";
import { useWpPage } from "../hooks/useWpPage";

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

  // Hent "about"-siden fra WP
  const { page } = useWpPage("about");

  // Dra ut ACF-bildet (url + alt)
  const acfImg =
    (page?.acf as { profile_image?: { url?: string; alt?: string } })?.profile_image;

  const profileSrc = acfImg?.url || fallbackProfileImg;
  const profileAlt = acfImg?.alt || (t("about.alt") as string);

  // Tekst fra i18n
  const highlights = (t("about.highlights") as unknown as string[]) ?? [];
  const tech = (t("about.tech") as unknown as string[]) ?? [];

  // Ikoner
  const techIcons: Record<string, JSX.Element> = {
    React: <FaReact className="h-5 w-5" />,
    TypeScript: <SiTypescript className="h-5 w-5" />,
    "Next.js": <SiNextdotjs className="h-5 w-5" />,
    "Node.js": <FaNodeJs className="h-5 w-5" />,
    TailwindCSS: <SiTailwindcss className="h-5 w-5" />,
    Vite: <SiVite className="h-5 w-5" />,
    WordPress: <FaWordpress className="h-5 w-5" />,
    Firebase: <SiFirebase className="h-5 w-5" />,
    "REST & GraphQL APIs": (
      <span className="flex -space-x-1.5 items-center">
        <TbApi className="h-5 w-5" />
        <SiGraphql className="h-4 w-4 translate-y-px" />
      </span>
    ),
  };

  // Lysere ikonfarger for mørk bakgrunn
  const techColor: Record<string, string> = {
    React: "text-sky-300",
    TypeScript: "text-blue-300",
    "Next.js": "text-white",
    "Node.js": "text-green-400",
    TailwindCSS: "text-sky-300",
    Vite: "text-purple-300",
    WordPress: "text-white/80",
    Firebase: "text-amber-300",
    "REST & GraphQL APIs": "text-indigo-300",
  };

  return (
    <section
      id="about"
      className="scroll-mt-24 bg-slate-900/65 backdrop-blur-sm py-16 sm:py-24"
    >
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Bilde */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-full bg-sky-400/20 blur-2xl" />
              <img
                src={profileSrc}
                alt={profileAlt}
                className="h-56 w-56 rounded-full object-cover shadow-[0_8px_30px_rgba(2,6,23,0.35)] ring-4 ring-white/20"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Tekst */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-sky-300 uppercase">
              {t("about.sectionLabel") as string}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t("about.heading") as string}
            </h2>
            <p className="mt-4 text-lg text-slate-200">
              {t("about.copy") as string}
            </p>

            {/* Highlights */}
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-sky-400" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Tech-chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {tech.map((label) => {
                const icon = techIcons[label];
                const color = techColor[label] ?? "text-slate-100";
                return (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-slate-100 ring-1 ring-white/10"
                    title={label}
                  >
                    {icon ? (
                      <span className={`${color} drop-shadow-sm`}>{icon}</span>
                    ) : (
                      <span className="inline-block h-2 w-2 rounded-full bg-slate-300" />
                    )}
                    <span>{label}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}