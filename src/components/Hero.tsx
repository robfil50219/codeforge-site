// src/components/Hero.tsx
import Container from "./ui/Container";
import { useTranslation } from "../lib/t";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative scroll-mt-24 text-white">
      {/* Gjennomsiktig base + gradient lik About */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-slate-900/60 via-slate-900/40 to-transparent" />

      <Container className="py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: text */}
          <div className="max-w-xl">
            <p className="text-sm font-semibold tracking-widest text-sky-300 uppercase">
              {t("brand") as string}
            </p>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight text-white">
              {t("hero.title") as string}
            </h1>

            <p className="mt-3 text-lg font-medium text-sky-300">
              {t("hero.tagline") as string}
            </p>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
              {t("hero.blurb") as string}
            </p>
          </div>

          {/* Right: image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/5 backdrop-blur-[1px] shadow-xl">
              <img
                src={`${import.meta.env.BASE_URL}hero.jpg`}
                alt={t("hero.imageAlt") as string}
                className="h-80 w-full object-cover sm:h-96 lg:h-112"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width={1280}
                height={896}
              />
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              {t("hero.imageCaption") as string} · Photo by{" "}
              <a
                href="https://unsplash.com/photos/people-sitting-on-chair-in-front-of-computer-monitor-Fa9b57hffnM"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-sky-300/70 underline-offset-2 hover:text-slate-100 hover:decoration-sky-200"
              >
                Sigmund / Unsplash
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}