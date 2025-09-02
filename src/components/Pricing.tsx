// src/components/Pricing.tsx
import { useTranslation } from "react-i18next";
import { Rocket, Sparkles, Settings } from "lucide-react";

// 🧩 shared primitives
import Container from "./ui/Container";
import { Card } from "./ui/Card";
import { Button } from "./ui/Buttons";

export default function Pricing() {
  const { t } = useTranslation();

  const bullet =
    "mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-500 flex-shrink-0";

  const starterFeatures = t("pricing.starter.features", {
    returnObjects: true,
  }) as string[];
  const proFeatures = t("pricing.pro.features", {
    returnObjects: true,
  }) as string[];
  const customFeatures = t("pricing.custom.features", {
    returnObjects: true,
  }) as string[];

  return (
    <section id="pricing" className="scroll-mt-24 bg-white">
      <Container className="py-16 sm:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {t("pricing.heading")}
          </h2>
          <p className="mt-3 text-slate-600">{t("pricing.sub")}</p>
        </div>

        {/* Tiers */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Starter */}
          <Card className="group relative overflow-hidden p-6">
            {/* corner glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 -z-10 h-28 w-28 rotate-12 rounded-3xl bg-sky-100 transition-transform duration-300 group-hover:scale-125"
            />
            <div className="relative z-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 ring-1 ring-sky-100">
                <Rocket className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {t("pricing.starter.name")}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {t("pricing.starter.blurb")}
              </p>
              <div className="mt-4">
                <span className="text-3xl font-extrabold text-slate-900">
                  {t("pricing.starter.price")}
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
              <Button
                asChild
                className="mt-6 bg-slate-900 text-white hover:bg-slate-800"
              >
                <a href="mailto:robert@codeforgestudio.no">
                  {t("pricing.chooseStarter")}
                </a>
              </Button>
            </div>
          </Card>

          {/* Pro */}
          <Card className="group relative overflow-hidden p-6 border-2 border-sky-500">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 -z-10 h-28 w-28 rotate-12 rounded-3xl bg-indigo-100 transition-transform duration-300 group-hover:scale-125"
            />
            <span className="absolute top-4 right-4 rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white z-10">
              {t("pricing.pro.badge")}
            </span>
            <div className="relative z-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 ring-1 ring-indigo-100">
                <Sparkles className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {t("pricing.pro.name")}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {t("pricing.pro.blurb")}
              </p>
              <div className="mt-4">
                <span className="text-3xl font-extrabold text-slate-900">
                  {t("pricing.pro.price")}
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
              <Button
                asChild
                className="mt-6 bg-sky-600 text-white hover:bg-sky-700"
              >
                <a href="mailto:robert@codeforgestudio.no">
                  {t("pricing.choosePro")}
                </a>
              </Button>
            </div>
          </Card>

          {/* Custom */}
          <Card className="group relative overflow-hidden p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 -z-10 h-28 w-28 rotate-12 rounded-3xl bg-slate-100 transition-transform duration-300 group-hover:scale-125"
            />
            <div className="relative z-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
                <Settings className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {t("pricing.custom.name")}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {t("pricing.custom.blurb")}
              </p>
              <div className="mt-4">
                <span className="text-3xl font-extrabold text-slate-900">
                  {t("pricing.custom.price")}
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
              <Button
                asChild
                variant="outline"
                className="mt-6 text-slate-700 hover:bg-slate-100"
              >
                <a href="mailto:robert@codeforgestudio.no">
                  {t("pricing.requestQuote")}
                </a>
              </Button>
            </div>
          </Card>
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          {t("pricing.fineprint")}
        </p>
      </Container>
    </section>
  );
}