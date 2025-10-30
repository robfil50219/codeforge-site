// src/components/Pricing.tsx
import { useTranslation } from "../lib/t";
import { Rocket, Sparkles, Settings } from "lucide-react";
import Container from "./ui/Container";
import { cn } from "../utils/cn";
import { useWpPage } from "../hooks/useWpPage";

type PricingAcf = {
  starter_price?: string;
  pro_price?: string;
  custom_price?: string;
};

export default function Pricing() {
  const { t } = useTranslation();
  const { page, loading } = useWpPage<PricingAcf>("pricing");

  const starterPrice = page?.acf?.starter_price ?? (t("pricing.starter.price") as string);
  const proPrice = page?.acf?.pro_price ?? (t("pricing.pro.price") as string);
  const customPrice = page?.acf?.custom_price ?? (t("pricing.custom.price") as string);

  const cardBase = cn(
    "group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition hover:shadow-lg",
    "bg-(--card-bg) border-(--card-border)",
    "dark:shadow-[0_24px_64px_rgba(0,0,0,0.9)] dark:hover:shadow-[0_32px_80px_rgba(0,0,0,1)]"
  );

  const bullet = cn(
    "mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full",
    "bg-sky-500 dark:bg-(--color-brand-sea)"
  );

  const starterFeatures = t("pricing.starter.features", { returnObjects: true }) as string[];
  const proFeatures = t("pricing.pro.features", { returnObjects: true }) as string[];
  const customFeatures = t("pricing.custom.features", { returnObjects: true }) as string[];

  return (
    <section
      id="pricing"
      className="scroll-mt-24 bg-(--bg-page) text-(--text-page) transition-colors duration-500"
    >
      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-(--text-heading)">
            {t("pricing.heading") as string}
          </h2>
          <p className="mt-3 text-(--text-dim)">
            {t("pricing.sub") as string}
          </p>
        </div>

        {loading ? (
          <p className="mt-6 text-center text-(--text-dim)">{t("loading")}</p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* --- Starter --- */}
            <div className={cardBase}>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl bg-sky-100 transition-transform duration-300 group-hover:scale-125 dark:bg-[rgba(0,160,160,0.1)] dark:group-hover:bg-[rgba(0,160,160,0.15)]"
              />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl ring-1 bg-sky-50 ring-sky-100 dark:bg-[rgba(0,160,160,0.08)] dark:ring-(--card-border)">
                  <Rocket className="h-6 w-6 text-sky-600 dark:text-(--color-brand-sea)" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-(--text-heading)">
                  {t("pricing.starter.name") as string}
                </h3>
                <p className="mt-1 text-sm text-(--text-dim)">
                  {t("pricing.starter.blurb") as string}
                </p>
                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-(--text-heading)">
                    {starterPrice}
                  </span>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-(--text-page)">
                  {starterFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className={bullet} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:robert@codeforgestudio.no?subject=${encodeURIComponent(
                    "CodeForge Studio – Starter"
                  )}`}
                  className="mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 dark:bg-(--color-brand-sea) dark:text-(--color-brand-black) dark:hover:brightness-110"
                >
                  {t("pricing.chooseStarter") as string}
                </a>
              </div>
            </div>

            {/* --- Pro --- */}
            <div className={cn(cardBase, "border-2 border-sky-500 dark:border-(--color-brand-sea)")}>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl bg-indigo-100 transition-transform duration-300 group-hover:scale-125 dark:bg-[rgba(99,102,241,0.12)] dark:group-hover:bg-[rgba(99,102,241,0.18)]"
              />
              <span className="absolute top-4 right-4 rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white dark:bg-(--color-brand-sea) dark:text-(--color-brand-black)">
                {t("pricing.pro.badge") as string}
              </span>
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl ring-1 bg-indigo-50 ring-indigo-100 dark:bg-[rgba(99,102,241,0.12)] dark:ring-(--card-border)">
                  <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-(--text-heading)">
                  {t("pricing.pro.name") as string}
                </h3>
                <p className="mt-1 text-sm text-(--text-dim)">
                  {t("pricing.pro.blurb") as string}
                </p>
                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-(--text-heading)">
                    {proPrice}
                  </span>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-(--text-page)">
                  {proFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className={bullet} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:robert@codeforgestudio.no?subject=${encodeURIComponent(
                    "CodeForge Studio – Pro"
                  )}`}
                  className="mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-sky-600 text-white hover:bg-sky-700 dark:bg-(--color-brand-sea) dark:text-(--color-brand-black) dark:hover:brightness-110"
                >
                  {t("pricing.choosePro") as string}
                </a>
              </div>
            </div>

            {/* --- Custom --- */}
            <div className={cardBase}>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl bg-slate-100 transition-transform duration-300 group-hover:scale-125 dark:bg-[rgba(255,255,255,0.05)] dark:group-hover:bg-[rgba(255,255,255,0.08)]"
              />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl ring-1 bg-emerald-50 ring-emerald-100 dark:bg-[rgba(16,185,129,0.12)] dark:ring-(--card-border)">
                  <Settings className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-(--text-heading)">
                  {t("pricing.custom.name") as string}
                </h3>
                <p className="mt-1 text-sm text-(--text-dim)">
                  {t("pricing.custom.blurb") as string}
                </p>
                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-(--text-heading)">
                    {customPrice}
                  </span>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-(--text-page)">
                  {customFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className={bullet} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:robert@codeforgestudio.no?subject=${encodeURIComponent(
                    "CodeForge Studio – Skreddersydd løsning"
                  )}`}
                  className="mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-0 dark:bg-(--color-brand-sea) dark:text-(--color-brand-black) dark:hover:brightness-110"
                >
                  {t("pricing.requestQuote") as string}
                </a>
              </div>
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-(--text-dim)">
          {t("pricing.fineprint") as string}
        </p>
      </Container>
    </section>
  );
}