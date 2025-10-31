// src/components/Hero.tsx
/**
 * -------------------------------------------------------
 *  CodeForge Studio — Proprietary Source Code
 *  © 2025 CodeForge Studio Filep. All rights reserved.
 * -------------------------------------------------------
 */
import Container from "./ui/Container";
import { useTranslation } from "../lib/t";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className={[
        "relative scroll-mt-24 transition-colors duration-500",
        "surface-hero",
      ].join(" ")}
    >
      {/* light mist */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)",
        }}
      />
      {/* dark glow */}
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
          <div className="max-w-xl">
            <h1 className="text-heading text-4xl font-extrabold tracking-tight leading-tight sm:text-5xl lg:text-6xl">
              {t("hero.title") as string}
            </h1>

            {/* 👇 this is the important part */}
            <p
              className="mt-3 text-lg font-medium"
              style={{ color: "var(--color-brand-accent-soft)" }}
            >
              {t("hero.tagline") as string}
            </p>

            <p className="mt-6 max-w-xl text-body text-lg leading-8">
              {t("hero.blurb") as string}
            </p>
          </div>

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