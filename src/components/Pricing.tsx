import { useTranslation } from "../lib/t";
import { Rocket, Sparkles, Settings } from "lucide-react";
import Container from "./ui/Container";
import { cn } from "../utils/cn";
import { useWpPage } from "../hooks/useWpPage";

/** ACF structure you made in WP (field names must match) */
type PricingAcf = {
  starter_price?: string;
  pro_price?: string;
  custom_price?: string;
};

export default function Pricing() {
  const { t } = useTranslation();
  // ⬇️ Now generic: page.acf is typed
  const { page, loading } = useWpPage<PricingAcf>("pricing");

  // Safe fallbacks: use i18n if WP/ACF not present yet
  const starterPrice = page?.acf?.starter_price ?? (t("pricing.starter.price") as string);
  const proPrice = page?.acf?.pro_price ?? (t("pricing.pro.price") as string);
  const customPrice = page?.acf?.custom_price ?? (t("pricing.custom.price") as string);

  const cardBase =
    "group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg";
  const bullet =
    "mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-500 flex-shrink-0";

  const starterFeatures = t("pricing.starter.features", { returnObjects: true }) as string[];
  const proFeatures = t("pricing.pro.features", { returnObjects: true }) as string[];
  const customFeatures = t("pricing.custom.features", { returnObjects: true }) as string[];

  return (
    <section id="pricing" className="scroll-mt-24 bg-white">
      <Container className="py-16 sm:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {t("pricing.heading") as string}
          </h2>
          <p className="mt-3 text-slate-600">{t("pricing.sub") as string}</p>
        </div>

        {loading ? (
          <p className="mt-6 text-center text-slate-500">{t("loading")}</p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Starter */}
            <div className={cardBase}>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl bg-sky-100 transition-transform duration-300 group-hover:scale-125"
              />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 ring-1 ring-sky-100">
                  <Rocket className="h-6 w-6 text-sky-600" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {t("pricing.starter.name") as string}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {t("pricing.starter.blurb") as string}
                </p>

                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {starterPrice}
                  </span>
                </div>

                <ul className="mt-6 space-y-2 text-sm text-slate-700">
                  {starterFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className={bullet} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:robert@codeforgestudio.no"
                  className={cn(
                    "mt-6 inline-flex items-center justify-center rounded-xl",
                    "bg-slate-900 px-4 py-2 text-sm font-medium text-white",
                    "transition hover:bg-slate-800"
                  )}
                >
                  {t("pricing.chooseStarter") as string}
                </a>
              </div>
            </div>

            {/* Pro */}
            <div className={cn(cardBase, "border-2 border-sky-500")}>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl bg-indigo-100 transition-transform duration-300 group-hover:scale-125"
              />
              <span className="absolute top-4 right-4 rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white">
                {t("pricing.pro.badge") as string}
              </span>
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100">
                  <Sparkles className="h-6 w-6 text-indigo-600" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {t("pricing.pro.name") as string}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {t("pricing.pro.blurb") as string}
                </p>

                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {proPrice}
                  </span>
                </div>

                <ul className="mt-6 space-y-2 text-sm text-slate-700">
                  {proFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className={bullet} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:robert@codeforgestudio.no"
                  className={cn(
                    "mt-6 inline-flex items-center justify-center rounded-xl",
                    "bg-sky-600 px-4 py-2 text-sm font-medium text-white",
                    "transition hover:bg-sky-700"
                  )}
                >
                  {t("pricing.choosePro") as string}
                </a>
              </div>
            </div>

            {/* Custom */}
            <div className={cardBase}>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl bg-slate-100 transition-transform duration-300 group-hover:scale-125"
              />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
                  <Settings className="h-6 w-6 text-emerald-600" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {t("pricing.custom.name") as string}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {t("pricing.custom.blurb") as string}
                </p>

                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {customPrice}
                  </span>
                </div>

                <ul className="mt-6 space-y-2 text-sm text-slate-700">
                  {customFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className={bullet} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:robert@codeforgestudio.no"
                  className={cn(
                    "mt-6 inline-flex items-center justify-center rounded-xl",
                    "border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700",
                    "transition hover:bg-slate-100"
                  )}
                >
                  {t("pricing.requestQuote") as string}
                </a>
              </div>
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-slate-500">
          {t("pricing.fineprint") as string}
        </p>
      </Container>
    </section>
  );
}