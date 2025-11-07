/**
 * -------------------------------------------------------
 *  CodeForge Studio — Proprietary Source Code
 *  © 2025 CodeForge Studio Filep. All rights reserved.
 *
 *  This file is part of the CodeForge Studio website.
 *  Unauthorized copying, modification, or distribution
 *  of this file, via any medium, is strictly prohibited.
 *
 *  For licensing or collaboration inquiries:
 *  robert@codeforgestudio.no | https://codeforgestudio.no
 * -------------------------------------------------------
 */
import { useTranslation } from "../lib/t";
import { Rocket, Sparkles, Settings } from "lucide-react";
import Container from "./ui/Container";
import { cn } from "../utils/cn";
import { useWpPage } from "../hooks/useWpPage";
import { renderBrandSafe } from "../utils/notranslate";

/** ACF structure you made in WP (field names must match) */
type PricingAcf = {
  starter_price?: string;
  pro_price?: string;
  custom_price?: string;
};

export default function Pricing() {
  const { t } = useTranslation();
  const { page, loading } = useWpPage<PricingAcf>("pricing");

  const FALLBACK_STARTER_PRICE = "8,500 NOK";
  const FALLBACK_PRO_PRICE = "25,000 NOK";

  // Temporarily lock prices to the fallback values while API access is blocked
  const starterPrice = FALLBACK_STARTER_PRICE;
  const proPrice = FALLBACK_PRO_PRICE;
  const customPrice =
    page?.acf?.custom_price ?? (t("pricing.custom.price") as string);

  //
  // SHARED STYLES
  //
  const cardBase = cn(
    "group relative overflow-hidden rounded-2xl p-6 transition",
    "surface-card",
    // light styling keeps the same palette tokens as other cards
    "bg-white border border-slate-200",
    // dark styling relies on global tokens for consistency
    "dark:bg-[var(--card-bg)] dark:border-[var(--card-border)]"
  );

  // bullet dot in feature lists
  const bullet = cn(
    "mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full",
    // light
    "bg-sky-500",
    // dark: keep teal-ish / bright accent
    "dark:bg-[var(--color-brand-sea)]"
  );

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
    <section
      id="pricing"
      className={cn(
        "scroll-mt-24 bg-transparent",
        // text defaults to tokens
        "text-body dark:text-(--text-page)"
      )}
    >
      <Container className="py-16 sm:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={cn(
              "text-3xl font-bold tracking-tight",
              // light
              "text-slate-900",
              // dark
              "dark:text-(--text-heading)"
            )}
          >
            {renderBrandSafe(t("pricing.heading") as string)}
          </h2>

          <p
            className={cn(
              "mt-3",
              // light
              "text-slate-600",
              // dark
              "dark:text-(--text-dim)"
            )}
          >
            {renderBrandSafe(t("pricing.sub") as string)}
          </p>
        </div>

        {loading ? (
          <p
            className={cn(
              "mt-6 text-center",
              // light
              "text-slate-500",
              // dark
              "dark:text-(--text-dim)"
            )}
          >
            {t("loading")}
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Starter */}
            <div className={cardBase}>
              {/* corner blob */}
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl transition-transform duration-300 group-hover:scale-125",
                  // light blob
                  "bg-sky-100",
                  // dark blob (sky glow to match icon tone)
                  "dark:bg-[rgba(56,189,248,0.28)] dark:group-hover:bg-[rgba(125,211,252,0.36)]"
                )}
              />
              <div className="relative">
                {/* icon chip */}
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl ring-1",
                    // light
                    "bg-sky-50 ring-sky-100",
                    // dark: use card-bg + border var tokens
                    "dark:bg-[rgba(0,160,160,0.08)] dark:ring-(--card-border)"
                  )}
                >
                  <Rocket
                    className={cn(
                      "h-6 w-6",
                      // light
                      "text-sky-600",
                      // dark accent teal
                      "dark:text-(--color-brand-sea)"
                    )}
                  />
                </div>

                <h3
                  className={cn(
                    "mt-4 text-base font-semibold",
                    // light
                    "text-slate-900",
                    // dark
                    "dark:text-(--text-heading)"
                  )}
                >
                  {t("pricing.starter.name") as string}
                </h3>

                <p
                  className={cn(
                    "mt-1 text-sm",
                    // light
                    "text-slate-600",
                    // dark
                    "dark:text-(--text-dim)"
                  )}
                >
                  {renderBrandSafe(t("pricing.starter.blurb") as string)}
                </p>

                <div className="mt-4">
                  <span
                    className={cn(
                      "text-3xl font-extrabold notranslate",
                      // light
                      "text-slate-900",
                      // dark
                      "dark:text-(--text-heading)"
                    )}
                    translate="no"
                  >
                    {starterPrice}
                  </span>
                </div>

                <ul
                  className={cn(
                    "mt-6 space-y-2 text-sm",
                    // light
                    "text-slate-700",
                    // dark
                    "dark:text-(--text-page)"
                  )}
                >
                  {starterFeatures.map((f, idx) => (
                    <li key={`starter-${idx}`} className="flex items-start gap-2">
                      <span className={bullet} />
                      <span>{renderBrandSafe(f)}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA button (Starter) */}
                <a
                  href={`mailto:robert@codeforgestudio.no?subject=${encodeURIComponent(
                    "CodeForge Studio – Starter"
                  )}`}
                  className={cn(
                    "mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",

                    // LIGHT MODE: black bg, white text
                    "bg-slate-900 text-white hover:bg-slate-800",

                    // DARK MODE: teal bg, black text
                    "dark:bg-(--color-brand-sea) dark:text-(--color-brand-black) dark:hover:brightness-110"
                  )}
                >
                  {t("pricing.chooseStarter") as string}
                </a>
              </div>
            </div>

            {/* Pro */}
            <div
              className={cn(
                cardBase,
                // light 2px border highlight
                "border-2 border-sky-500",
                // dark: use brand teal border instead of sky-500
                "dark:border-(--color-brand-sea) dark:border-2"
              )}
            >
              {/* corner blob */}
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl transition-transform duration-300 group-hover:scale-125",
                  // light blob
                  "bg-indigo-100",
                  // dark blob
                  "dark:bg-[rgba(129,140,248,0.3)] dark:group-hover:bg-[rgba(165,180,252,0.38)]"
                )}
              />

              {/* badge */}
              <span
                className={cn(
                  "absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold",
                  // light badge
                  "bg-sky-600 text-white",
                  // dark badge
                  "dark:bg-(--color-brand-sea) dark:text-(--color-brand-black)"
                )}
              >
                {t("pricing.pro.badge") as string}
              </span>

              <div className="relative">
                {/* icon chip */}
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl ring-1",
                    // light
                    "bg-indigo-50 ring-indigo-100",
                    // dark
                    "dark:bg-[rgba(99,102,241,0.12)] dark:ring-(--card-border)"
                  )}
                >
                  <Sparkles
                    className={cn(
                      "h-6 w-6",
                      // light
                      "text-indigo-600",
                      // dark keep purple-ish so Pro stands out from teal
                      "dark:text-indigo-400"
                    )}
                  />
                </div>

                <h3
                  className={cn(
                    "mt-4 text-base font-semibold",
                    "text-slate-900 dark:text-(--text-heading)"
                  )}
                >
                  {renderBrandSafe(t("pricing.pro.name") as string)}
                </h3>

                <p
                  className={cn(
                    "mt-1 text-sm",
                    "text-slate-600 dark:text-(--text-dim)"
                  )}
                >
                  {renderBrandSafe(t("pricing.pro.blurb") as string)}
                </p>

                <div className="mt-4">
                  <span
                    className={cn(
                      "text-3xl font-extrabold notranslate",
                      "text-slate-900 dark:text-(--text-heading)"
                    )}
                    translate="no"
                  >
                    {proPrice}
                  </span>
                </div>

                <ul
                  className={cn(
                    "mt-6 space-y-2 text-sm",
                    "text-slate-700 dark:text-(--text-page)"
                  )}
                >
                  {proFeatures.map((f, idx) => (
                    <li key={`pro-${idx}`} className="flex items-start gap-2">
                      <span className={bullet} />
                      <span>{renderBrandSafe(f)}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA button (Pro) */}
                <a
                  href={`mailto:robert@codeforgestudio.no?subject=${encodeURIComponent(
                    "CodeForge Studio – Pro"
                  )}`}
                  className={cn(
                    "mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",

                    // LIGHT MODE: sky bg, white text
                    "bg-sky-600 text-white hover:bg-sky-700",

                    // DARK MODE: teal bg, black text
                    "dark:bg-(--color-brand-sea) dark:text-(--color-brand-black) dark:hover:brightness-110"
                  )}
                >
                  {t("pricing.choosePro") as string}
                </a>
              </div>
            </div>

            {/* Custom */}
            <div className={cardBase}>
              {/* corner blob */}
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl transition-transform duration-300 group-hover:scale-125",
                  // light
                  "bg-slate-100",
                  // dark (lean into emerald so it stands apart from the Starter card)
                  "dark:bg-[rgba(16,185,129,0.3)] dark:group-hover:bg-[rgba(45,212,191,0.38)]"
                )}
              />
              <div className="relative">
                {/* icon chip */}
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl ring-1",
                    // light
                    "bg-emerald-50 ring-emerald-100",
                    // dark
                    "dark:bg-[rgba(16,185,129,0.12)] dark:ring-(--card-border)"
                  )}
                >
                  <Settings
                    className={cn(
                      "h-6 w-6",
                      // light
                      "text-emerald-600",
                      // dark
                      "dark:text-emerald-400"
                    )}
                  />
                </div>

                <h3
                  className={cn(
                    "mt-4 text-base font-semibold",
                    "text-slate-900 dark:text-(--text-heading)"
                  )}
                >
                  {renderBrandSafe(t("pricing.custom.name") as string)}
                </h3>

                <p
                  className={cn(
                    "mt-1 text-sm",
                    "text-slate-600 dark:text-(--text-dim)"
                  )}
                >
                  {renderBrandSafe(t("pricing.custom.blurb") as string)}
                </p>

                <div className="mt-4">
                  <span
                    className={cn(
                      "text-3xl font-extrabold notranslate",
                      "text-slate-900 dark:text-(--text-heading)"
                    )}
                    translate="no"
                  >
                    {customPrice}
                  </span>
                </div>

                <ul
                  className={cn(
                    "mt-6 space-y-2 text-sm",
                    "text-slate-700 dark:text-(--text-page)"
                  )}
                >
                  {customFeatures.map((f, idx) => (
                    <li key={`custom-${idx}`} className="flex items-start gap-2">
                      <span className={bullet} />
                      <span>{renderBrandSafe(f)}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA button (Custom) */}
                <a
                  href={`mailto:robert@codeforgestudio.no?subject=${encodeURIComponent(
                    "CodeForge Studio – Skreddersydd løsning"
                  )}`}
                  className={cn(
                    "mt-6 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",

                    // LIGHT MODE: outlined gray button
                    "border border-slate-300 text-slate-700 hover:bg-slate-100",

                    // DARK MODE: filled teal button
                    "dark:border-0 dark:bg-(--color-brand-sea) dark:text-(--color-brand-black) dark:hover:brightness-110"
                  )}
                >
                  {t("pricing.requestQuote") as string}
                </a>
              </div>
            </div>
          </div>
        )}

        <p
          className={cn(
            "mt-8 text-center text-xs",
            // light
            "text-slate-500",
            // dark
            "dark:text-(--text-dim)"
          )}
        >
          {t("pricing.fineprint") as string}
        </p>
      </Container>
    </section>
  );
}
