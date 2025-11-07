/**
 * -------------------------------------------------------
 *  CodeForge Studio — Proprietary Source Code
 *  © 2025 CodeForge Studio Filep. All rights reserved.
 * -------------------------------------------------------
 */
// src/components/About.tsx
import { type JSX } from "react";
import { useTranslation } from "../lib/t";
import { renderBrandSafe } from "../utils/notranslate";

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

  const rawCopy = t("about.copy") as string;
  const nameToken = "Robert Filep";
  const brandToken = "CodeForge Studio";

  // Safe token spans (non-breaking spaces + notranslate)
  const NameToken = () => (
    <span className="notranslate" translate="no">
      {"\u00A0"}
      {nameToken}
      {"\u00A0"}
    </span>
  );
  const BrandToken = () => (
    <span className="notranslate" translate="no">
      {"\u00A0"}
      {brandToken}
      {"\u00A0"}
    </span>
  );

  // Render copy with BOTH tokens protected from translation spacing issues
  const renderCopy = () => {
    // First, split by brand to interleave <BrandToken/>
    const byBrand = rawCopy.split(brandToken);
    const brandInterleaved: (string | JSX.Element)[] = [];
    byBrand.forEach((chunk, i) => {
      // Within each chunk, split by name to interleave <NameToken/>
      const byName = chunk.split(nameToken);
      byName.forEach((sub, j) => {
        brandInterleaved.push(<span key={`seg-${i}-${j}`}>{sub}</span>);
        if (j < byName.length - 1) {
          brandInterleaved.push(<NameToken key={`name-${i}-${j}`} />);
        }
      });
      if (i < byBrand.length - 1) {
        brandInterleaved.push(<BrandToken key={`brand-${i}`} />);
      }
    });
    return brandInterleaved;
  };

  const techIcons: Record<string, JSX.Element> = {
    React: <FaReact className="h-5 w-5 text-sky-600 dark:text-sky-200" />,
    TypeScript: <SiTypescript className="h-5 w-5 text-blue-600 dark:text-sky-100" />,
    "Next.js": <SiNextdotjs className="h-5 w-5 text-slate-800 dark:text-white" />,
    "Node.js": <FaNodeJs className="h-5 w-5 text-emerald-600 dark:text-emerald-200" />,
    TailwindCSS: <SiTailwindcss className="h-5 w-5 text-sky-600 dark:text-cyan-200" />,
    Vite: <SiVite className="h-5 w-5 text-purple-500 dark:text-violet-200" />,
    WordPress: <FaWordpress className="h-5 w-5 text-slate-700 dark:text-slate-50" />,
    Firebase: <SiFirebase className="h-5 w-5 text-amber-500 dark:text-amber-200" />,
    "REST & GraphQL APIs": (
      <span className="flex -space-x-1.5 items-center">
        <TbApi className="h-5 w-5 text-indigo-500 dark:text-indigo-200" />
        <SiGraphql className="h-4 w-4 translate-y-px text-pink-500 dark:text-pink-200" />
      </span>
    ),
  };

  return (
    <section
      id="about"
      className="relative scroll-mt-24 transition-colors duration-500 surface-hero"
    >
      {/* hero-like light mist */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)",
        }}
      />
      {/* hero-like dark glow */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          mixBlendMode: "screen",
          opacity: 0.12,
          background:
            "radial-gradient(circle at 60% 30%, rgba(0,160,160,0.6) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Profile */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="relative aspect-square w-56 sm:w-64 overflow-hidden rounded-full ring-4 ring-white/60 dark:ring-white/10 shadow-[0_8px_30px_rgba(15,23,42,0.15)] bg-white/60 dark:bg-white/10 backdrop-blur-sm transition-transform duration-500 hover:scale-105">
                <picture>
                  <source srcSet="/robert-profile-800.webp" type="image/webp" />
                  <img
                    src="/robert-profile-800.jpg"
                    alt={t("about.alt") as string}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </picture>
              </div>
            </div>

            <div className="mt-6">
              <h3
                className="text-2xl font-bold text-slate-900 dark:text-white notranslate"
                translate="no"
              >
                {nameToken}
              </h3>
              <p
                className="mt-1 font-medium"
                style={{ color: "var(--color-brand-accent-soft)" }}
              >
                {/* Frontend-utvikler • Grunnlegger av CodeForge Studio */}
                <span className="notranslate" translate="no">
                  Frontend-utvikler • Grunnlegger av
                </span>
                <BrandToken />
              </p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-sky-700 dark:text-cyan-200 uppercase">
              {renderBrandSafe(t("about.sectionLabel") as string)}
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {renderBrandSafe(t("about.heading") as string)}
            </h2>

            <p className="mt-4 text-lg text-slate-700 dark:text-white/80">
              {renderCopy()}
            </p>

            {/* Highlights */}
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-slate-200/70 bg-white/50 px-3 py-2 text-sm text-slate-800 backdrop-blur-sm
                             dark:border-white/10 dark:bg-white/5 dark:text-white/90"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-sky-500 dark:bg-cyan-300" />
                  {renderBrandSafe(item)}
                </li>
              ))}
            </ul>

            {/* Tech chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {tech.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-sm text-slate-900 ring-1 ring-slate-200/60 backdrop-blur-sm
                             dark:bg-white/5 dark:text-white dark:ring-white/10"
                  title={label}
                >
                  {techIcons[label] ?? (
                    <span className="inline-block h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-200/70" />
                  )}
                  <span>{renderBrandSafe(label)}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
