// src/components/Hero.tsx
/**
 * -------------------------------------------------------
 *  CodeForge Studio — Proprietary Source Code
 *  © 2025 CodeForge Studio Filep. All rights reserved.
 * -------------------------------------------------------
 */
import { ArrowRight, Code2, Gauge, ShieldCheck } from "lucide-react";
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
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-xl">
            <p className="section-kicker mb-5">{t("hero.kicker") as string}</p>

            <h1 className="text-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              {t("hero.title") as string}
            </h1>

            <p
              className="mt-4 max-w-lg text-xl font-semibold leading-8"
              style={{ color: "var(--color-brand-accent-soft)" }}
            >
              {t("hero.tagline") as string}
            </p>

            <p className="mt-6 max-w-xl text-body text-lg leading-8">
              {t("hero.blurb") as string}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-brand-midnight)] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_34px_rgba(15,68,82,0.22)] transition hover:-translate-y-0.5 hover:bg-[var(--color-brand-black)] dark:bg-[var(--color-brand-sea)] dark:text-[var(--color-brand-black)] dark:hover:brightness-110"
              >
                {t("hero.ctaQuote") as string}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border border-[var(--card-border)] bg-white/60 px-5 py-3 text-sm font-bold text-heading backdrop-blur transition hover:-translate-y-0.5 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10"
              >
                {t("hero.ctaServices") as string}
              </a>
            </div>

            <div className="mt-8 grid max-w-lg grid-cols-3 gap-3 text-xs font-semibold text-dim">
              <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--card-border)] bg-white/55 px-3 py-2 dark:bg-white/5">
                <Code2 className="h-4 w-4 text-[var(--color-brand-accent-soft)]" />
                React
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--card-border)] bg-white/55 px-3 py-2 dark:bg-white/5">
                <Gauge className="h-4 w-4 text-[var(--color-brand-accent-soft)]" />
                {t("hero.stats.speed") as string}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-[var(--card-border)] bg-white/55 px-3 py-2 dark:bg-white/5">
                <ShieldCheck className="h-4 w-4 text-[var(--color-brand-accent-soft)]" />
                {t("hero.stats.polish") as string}
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="surface-card hero-media-frame">
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
              <div className="absolute bottom-4 left-4 right-4 z-10 rounded-2xl border border-white/18 bg-[#001920]/72 p-4 text-white shadow-2xl backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-100">
                  {t("hero.imageKicker") as string}
                </p>
                <p className="mt-1 text-sm text-white/82">
                  {t("hero.imageCopy") as string}
                </p>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-dim">
              {t("hero.photoCredit") as string}{" "}
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
