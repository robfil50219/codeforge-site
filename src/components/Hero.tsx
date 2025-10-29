// src/components/Hero.tsx
import Container from "./ui/Container";
import { useTranslation } from "../lib/t";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className={[
        "relative scroll-mt-24 transition-colors duration-500",
        "surface-hero", // now behaves differently light vs dark
      ].join(" ")}
    >
      {/* LIGHT MODE glow layer:
         a subtle soft white radial to keep that premium 'mist' in the top-left.
         This already looks like your original.
      */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)",
        }}
      />

      {/* DARK MODE accent glow:
         low opacity, only really visible once background gets inky.
         We keep this layer always mounted but it's faint in light mode,
         and it "wakes up" in dark because the surface-hero turns translucent.
      */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          mixBlendMode: "screen",
          opacity: 0.12,
          background:
            "radial-gradient(circle at 60% 30%, rgba(0,160,160,0.6) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      <Container className="py-20 sm:py-24 relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: text */}
          <div className="max-w-xl">
            <h1 className="text-heading text-4xl font-extrabold tracking-tight leading-tight sm:text-5xl lg:text-6xl">
              {t("hero.title") as string}
            </h1>

            <p className="mt-3 text-link text-lg font-medium">
              {t("hero.tagline") as string}
            </p>

            <p className="mt-6 max-w-xl text-body text-lg leading-8">
              {t("hero.blurb") as string}
            </p>
          </div>

          {/* Right: image card */}
          <div className="relative">
            <div className="surface-card overflow-hidden rounded-3xl">
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

            <p className="mt-4 text-center text-xs text-dim">
              Photo by{" "}
              <a
                href="https://unsplash.com/photos/people-sitting-on-chair-in-front-of-computer-monitor-Fa9b57hffnM"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link underline underline-offset-2 decoration-transparent hover:decoration-current"
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