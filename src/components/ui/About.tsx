// src/components/About.tsx
import { useTranslation } from "react-i18next";
import profileImg from "../assets/profileimage.png";

export default function About() {
  const { t } = useTranslation();

  const highlights = t("about.highlights", { returnObjects: true }) as string[];
  const tech = t("about.tech", { returnObjects: true }) as string[];

  return (
    <section id="about" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Photo (locked square → circle) */}
          <div className="flex justify-center">
            <div className="relative">
              {/* soft glow */}
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-sky-200/50 blur-2xl" />
              {/* Perfect circle wrapper */}
              <div className="relative aspect-square w-56 sm:w-64 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                <img
                  src={profileImg}
                  alt={t("about.alt")}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
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

            {/* Tech chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {tech.map((tItem) => (
                <span
                  key={tItem}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800"
                >
                  {tItem}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}