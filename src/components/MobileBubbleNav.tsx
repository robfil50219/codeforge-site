// src/components/MobileBubbleNav.tsx
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
import { useEffect, useState } from "react";
import {
  PhoneCall,
  Palette,
  Rocket,
  User,
  CircleDot,
  Globe,
  ChevronUp,
  Moon,
  Sun,
  X,
} from "lucide-react";
import useConsent from "../hooks/useConsent";
import useLanguage from "../hooks/useLanguage";
import {
  LANGUAGE_OPTIONS,
  NAVIGATION_LABELS,
} from "./translate/language-data";
import { useTranslation } from "../lib/t";

type MobileBubbleNavProps = {
  scrollToId: (id: string) => void;
  isStaticBg: boolean;
  isDarkMode: boolean;
  toggleBackgroundMode: () => void;
  toggleTheme: () => void;
};

export default function MobileBubbleNav({
  scrollToId,
  isStaticBg,
  isDarkMode,
  toggleBackgroundMode,
  toggleTheme,
}: MobileBubbleNavProps) {
  const { t } = useTranslation();
  const consent = useConsent();
  const language = useLanguage();
  const labels = NAVIGATION_LABELS[language];
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const backgroundLabel = isStaticBg
    ? labels.backgroundOff
    : labels.backgroundOn;

  useEffect(() => {
    if (!open) setLanguageOpen(false);
  }, [open]);

  function go(id: string) {
    scrollToId(id);
    setOpen(false);
    setLanguageOpen(false);
  }

  return (
    <>
      <button
        data-testid="mobile-menu-toggle"
        className={[
          "hidden",
          "fixed z-50 md:hidden",
          "surface-chip mobile-bubble-trigger px-4 py-2 text-heading text-xs font-semibold shadow-lg border-0",
          "active:scale-95 transition-transform",
        ].join(" ")}
        style={{
          bottom: "calc(1rem + var(--app-safe-bottom))",
          right: "calc(1rem + var(--app-safe-right))",
        }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? labels.closeMenu : labels.menu}
        title={open ? labels.closeMenu : labels.menu}
      >
      </button>

      {open && (
        <div
          className={[
            "hidden",
            "fixed z-[60] md:hidden w-56 rounded-xl border shadow-xl",
            "bg-(--bg-page) border-(--card-border) text-(--text-page)",
            "animate-in fade-in slide-in-from-bottom-4 duration-300",
          ].join(" ")}
          style={{
            bottom: `calc(4.5rem + var(--app-safe-bottom))`,
            right: `calc(1rem + var(--app-safe-right))`,
          }}
        >
          {/* top bar with close */}
          <div className="flex justify-end border-b border-(--card-border) px-3 py-2">
            <button
              onClick={() => setOpen(false)}
              aria-label={labels.closeMenu}
              title={labels.closeMenu}
              className="relative group p-1 rounded-md transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <span className="absolute inset-0 rounded-md bg-[rgba(255,255,255,0.1)] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
              <X className="relative z-10 h-4 w-4 text-(--text-heading) transition-transform duration-500 group-hover:rotate-90 group-hover:text-(--color-brand-sea)" />
            </button>
          </div>

          <ul className="p-3 text-sm">
            <li>
              <button
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5"
                onClick={() => go("services")}
                aria-label={labels.services}
              >
                <Palette className="inline-block h-4 w-4 mr-2 align-middle" />
                <span className="notranslate" translate="no">{labels.services}</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5"
                onClick={() => go("pricing")}
                aria-label={labels.pricing}
              >
                <Rocket className="inline-block h-4 w-4 mr-2 align-middle" />
                <span className="notranslate" translate="no">{labels.pricing}</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5"
                onClick={() => go("about")}
                aria-label={labels.about}
              >
                <User className="inline-block h-4 w-4 mr-2 align-middle" />
                <span className="notranslate" translate="no">{labels.about}</span>
              </button>
            </li>
            <li>
              <button
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5"
                onClick={() => go("contact")}
                aria-label={labels.contact}
              >
                <PhoneCall className="inline-block h-4 w-4 mr-2 align-middle" />
                <span className="notranslate" translate="no">{labels.contact}</span>
              </button>
            </li>

            {/* background toggle */}
            <li className="mt-2 border-t border-(--card-border) pt-2">
              <button
                className={[
                  "w-full text-left rounded-lg px-3 py-2 hover:bg-white/5 transition",
                  !isStaticBg && "ring-1 ring-(--color-brand-sea)",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={toggleBackgroundMode}
                aria-pressed={isStaticBg}
                aria-label={backgroundLabel}
                title={backgroundLabel}
                style={
                  isStaticBg
                    ? undefined
                    : {
                        background:
                          "color-mix(in srgb, var(--color-brand-sea, #0EA5E9) 18%, transparent)",
                      }
                }
              >
                <CircleDot className="inline-block h-4 w-4 mr-2 align-middle" />
                <span className="notranslate" translate="no">{backgroundLabel}</span>
              </button>
            </li>
            <li className="mt-2">
              <button
                data-testid="mobile-theme-toggle"
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5"
                onClick={toggleTheme}
                aria-label={isDarkMode ? labels.useLightTheme : labels.useDarkTheme}
                aria-pressed={isDarkMode}
                title={isDarkMode ? labels.useLightTheme : labels.useDarkTheme}
              >
                {isDarkMode ? (
                  <Sun className="inline-block h-4 w-4 mr-2 align-middle" />
                ) : (
                  <Moon className="inline-block h-4 w-4 mr-2 align-middle" />
                )}
                <span className="notranslate" translate="no">
                  {isDarkMode ? labels.useLightTheme : labels.useDarkTheme}
                </span>
              </button>
            </li>
            {consent === "accepted" && (
              <li className="mt-2 border-t border-(--card-border) pt-2 relative">
                <button
                  data-testid="mobile-language-toggle"
                  className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5 flex items-center justify-between"
                  onClick={() => setLanguageOpen((value) => !value)}
                  aria-haspopup="listbox"
                  aria-expanded={languageOpen}
                >
                  <span className="notranslate" translate="no">
                    <Globe className="inline-block h-4 w-4 mr-2 align-middle" />
                    {LANGUAGE_OPTIONS.find((option) => option.code === language)?.label ??
                      (t("controls.chooseLanguage") as string)}
                  </span>
                  <ChevronUp
                    className={[
                      "h-4 w-4 transition-transform duration-200",
                      languageOpen ? "" : "rotate-180",
                    ].join(" ")}
                  />
                </button>

                {languageOpen && (
                  <div className="translate-menu translate-menu--up translate-menu--full animate-in fade-in duration-200">
                    {LANGUAGE_OPTIONS.map((option) => (
                      <button
                        key={option.code}
                        data-testid={`mobile-language-${option.code}`}
                        className={[
                          "translate-menu__item",
                          option.code === language ? "translate-menu__item--active" : "",
                        ].join(" ")}
                        type="button"
                        onClick={() => {
                          window.__cfsTranslateSetLanguage?.(option.code);
                          setLanguageOpen(false);
                        }}
                      >
                        <span className="notranslate" translate="no">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}
