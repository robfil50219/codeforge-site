// src/components/Hero.tsx
import Container from "./ui/Container";
import { useTranslation } from "../lib/t";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative scroll-mt-24 text-slate-900">
      {/* Transparent soft gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-white/80 via-white/60 to-white/40 backdrop-blur-[2px]" />

      <Container className="py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: text */}
          <div className="max-w-xl">
            {/* Removed "CODEFORGE STUDIO" line */}

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight text-slate-900">
              {t("hero.title") as string}
            </h1>

            <p className="mt-3 text-lg font-medium text-sky-700">
              {t("hero.tagline") as string}
            </p>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">
              {t("hero.blurb") as string}
            </p>
          </div>

          {/* Right: image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white/50 backdrop-blur-sm shadow-lg">
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

            {/* Only keep the photo credit */}
            <p className="mt-4 text-center text-xs text-slate-600">
              Photo by{" "}
              <a
                href="https://unsplash.com/photos/people-sitting-on-chair-in-front-of-computer-monitor-Fa9b57hffnM"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-sky-500/60 underline-offset-2 hover:text-sky-700 hover:decoration-sky-700"
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