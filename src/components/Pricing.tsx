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

  // single, safe card style
  const cardBase = cn(
    "group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition hover:shadow-lg",
    "border-slate-200 bg-white",
    "dark:bg-(--card-bg) dark:border-(--card-border)"
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
      className={cn("scroll-mt-24 bg-transparent", "text-body dark:text-(--text-page)")}
    >
      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-(--text-heading)">
            {t("pricing.heading") as string}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-(--text-dim)">
            {t("pricing.sub") as string}
          </p>
        </div>

        {loading ? (
          <p className="mt-6 text-center text-slate-500 dark:text-(--text-dim)">{t("loading")}</p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* START */}
            <div className={cardBase}>
              {/* corner */}
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl transition-transform duration-300 group-hover:scale-125",
                  "bg-sky-100",
                  // 👇 simple dark fallback
                  "dark:bg-(--bg-page)/12"
                )}
              />
              <div className="relative">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl ring-1",
                    "bg-sky-50 ring-sky-100",
                    "dark:bg-(--bg-page)/12 dark:ring-(--card-border)"
                  )}
                >
                  <Rocket className="h-6 w-6 text-sky-600 dark:text-(--color-brand-sea)" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-(--text-heading)">
                  {t("pricing.starter.name") as string}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-(--text-dim)">
                  {t("pricing.starter.blurb") as string}
                </p>
                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-(--text-heading)">
                    {starterPrice}
                  </span>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-slate-700 dark:text-(--text-page)">
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
                  className={cn(
                    "mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",
                    "bg-slate-900 text-white hover:bg-slate-800",
                    "dark:bg-(--color-brand-sea) dark:text-(--color-brand-black) dark:hover:brightness-110"
                  )}
                >
                  {t("pricing.chooseStarter") as string}
                </a>
              </div>
            </div>

            {/* PRO */}
            <div
              className={cn(
                cardBase,
                "border-2 border-sky-500",
                "dark:border-(--color-brand-sea) dark:border-2"
              )}
            >
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl transition-transform duration-300 group-hover:scale-125",
                  "bg-indigo-100",
                  "dark:bg-(--bg-page)/12"
                )}
              />
              <span
                className={cn(
                  "absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold",
                  "bg-sky-600 text-white",
                  "dark:bg-(--color-brand-sea) dark:text-(--color-brand-black)"
                )}
              >
                {t("pricing.pro.badge") as string}
              </span>

              <div className="relative">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl ring-1",
                    "bg-indigo-50 ring-indigo-100",
                    "dark:bg-(--bg-page)/12 dark:ring-(--card-border)"
                  )}
                >
                  <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-(--text-heading)">
                  {t("pricing.pro.name") as string}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-(--text-dim)">
                  {t("pricing.pro.blurb") as string}
                </p>

                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-(--text-heading)">
                    {proPrice}
                  </span>
                </div>

                <ul className="mt-6 space-y-2 text-sm text-slate-700 dark:text-(--text-page)">
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
                  className={cn(
                    "mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",
                    "bg-sky-600 text-white hover:bg-sky-700",
                    "dark:bg-(--color-brand-sea) dark:text-(--color-brand-black) dark:hover:brightness-110"
                  )}
                >
                  {t("pricing.choosePro") as string}
                </a>
              </div>
            </div>

            {/* CUSTOM */}
            <div className={cardBase}>
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl transition-transform duration-300 group-hover:scale-125",
                  "bg-slate-100",
                  "dark:bg-(--bg-page)/12"
                )}
              />
              <div className="relative">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl ring-1",
                    "bg-emerald-50 ring-emerald-100",
                    "dark:bg-(--bg-page)/12 dark:ring-(--card-border)"
                  )}
                >
                  <Settings className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-(--text-heading)">
                  {t("pricing.custom.name") as string}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-(--text-dim)">
                  {t("pricing.custom.blurb") as string}
                </p>

                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-(--text-heading)">
                    {customPrice}
                  </span>
                </div>

                <ul className="mt-6 space-y-2 text-sm text-slate-700 dark:text-(--text-page)">
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
                  className={cn(
                    "mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",
                    "border border-slate-300 text-slate-700 hover:bg-slate-100",
                    "dark:border-0 dark:bg-(--color-brand-sea) dark:text-(--color-brand-black) dark:hover:brightness-110"
                  )}
                >
                  {t("pricing.requestQuote") as string}
                </a>
              </div>
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-slate-500 dark:text-(--text-dim)">
          {t("pricing.fineprint") as string}
        </p>
      </Container>
    </section>
  );
}