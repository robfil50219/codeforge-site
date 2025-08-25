// src/components/Hero.tsx
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Text content */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase">
              {t("brand")}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-3 text-lg font-medium text-sky-600">
              {t("hero.tagline")}
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600 max-w-xl">
              {t("hero.blurb")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-white font-medium shadow-sm hover:bg-sky-700 transition"
              >
                {t("hero.ctaServices")}
              </a>
              {/* <a
                href="#work"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-slate-700 font-medium hover:bg-slate-100 transition"
              >
                {t("hero.ctaWork")}
              </a> */}
            </div>
          </div>

          {/* Right: Image with caption */}
          <div className="relative">
            <div className="pointer-events-none absolute -top-12 -right-12 -z-10 h-72 w-72 rounded-full bg-sky-100 blur-3xl opacity-70" />
            <div className="pointer-events-none absolute bottom-0 -left-10 -z-10 h-64 w-64 rounded-full bg-indigo-100 blur-3xl opacity-70" />
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
              <img
                src="/hero.jpg"
                alt={t("hero.imageAlt")}
                className="h-80 w-full object-cover sm:h-96 lg:h-[28rem]"
                loading="eager"
              />
            </div>
            <p className="mt-4 text-center text-xs text-slate-400">
              {t("hero.imageCaption")} · Photo by{" "}
              <a
                href="https://unsplash.com/photos/people-sitting-on-chair-in-front-of-computer-monitor-Fa9b57hffnM"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-600"
              >
                 Sigmund / Unsplash
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}