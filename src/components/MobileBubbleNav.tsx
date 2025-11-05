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
  MoonStar,
  Sun,
  Settings2,
  Globe,
  ChevronUp,
  X,
} from "lucide-react";
import {
  LANGUAGE_OPTIONS,
  type LanguageCode,
} from "./translate/language-data";

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
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>("no");
  const [languageOpen, setLanguageOpen] = useState(false);

  useEffect(() => {
    const initial =
      (typeof window !== "undefined" &&
        window.__cfsGetCurrentLanguage?.()) || "no";
    if (
      initial &&
      LANGUAGE_OPTIONS.some((option) => option.code === initial)
    ) {
      setLanguage(initial as LanguageCode);
    }

    const handle = (event: Event) => {
      const custom = event as CustomEvent<{ code?: string }>;
      const code = custom.detail?.code as LanguageCode | undefined;
      if (!code) return;
      if (LANGUAGE_OPTIONS.some((option) => option.code === code)) {
        setLanguage(code);
      }
    };

    window.addEventListener("cfs-language-change", handle);
    return () => {
      window.removeEventListener("cfs-language-change", handle);
    };
  }, []);

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
        className={[
          "fixed bottom-4 right-4 z-50 md:hidden",
          "surface-chip mobile-bubble-trigger px-4 py-2 text-heading text-xs font-semibold shadow-lg border-0",
          "active:scale-95 transition-transform",
        ].join(" ")}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Meny"
      >
        <Settings2 className="inline-block h-4 w-4 align-middle mr-1" />
        Meny
      </button>

      {open && (
        <div
          className={[
            "fixed bottom-20 right-4 z-50 md:hidden w-56 rounded-xl border shadow-xl",
            "bg-(--bg-page) border-(--card-border) text-(--text-page)",
            "animate-in fade-in slide-in-from-bottom-4 duration-300",
          ].join(" ")}
        >
          {/* top bar with close */}
          <div className="flex justify-end border-b border-(--card-border) px-3 py-2">
            <button
              onClick={() => setOpen(false)}
              aria-label="Lukk meny"
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
              >
                <Palette className="inline-block h-4 w-4 mr-2 align-middle" />
                Tjenester
              </button>
            </li>
            <li>
              <button
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5"
                onClick={() => go("pricing")}
              >
                <Rocket className="inline-block h-4 w-4 mr-2 align-middle" />
                Priser
              </button>
            </li>
            <li>
              <button
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5"
                onClick={() => go("about")}
              >
                <User className="inline-block h-4 w-4 mr-2 align-middle" />
                Om oss
              </button>
            </li>
            <li>
              <button
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5"
                onClick={() => go("contact")}
              >
                <PhoneCall className="inline-block h-4 w-4 mr-2 align-middle" />
                Kontakt
              </button>
            </li>

            {/* background toggle */}
            <li className="mt-2 border-t border-(--card-border) pt-2">
              <button
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5"
                onClick={toggleBackgroundMode}
              >
                <CircleDot className="inline-block h-4 w-4 mr-2 align-middle" />
                {isStaticBg ? "Interaktiv bakgrunn" : "Stille bakgrunn"}
              </button>
            </li>
            <li>
              <button
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5 flex items-center justify-between"
                onClick={toggleTheme}
              >
                <span>
                  {isDarkMode ? (
                    <Sun className="inline-block h-4 w-4 mr-2 align-middle" />
                  ) : (
                    <MoonStar className="inline-block h-4 w-4 mr-2 align-middle" />
                  )}
                  {isDarkMode ? "Lys modus" : "Mørk modus"}
                </span>
              </button>
            </li>
            <li className="mt-2 border-t border-(--card-border) pt-2 relative">
              <button
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5 flex items-center justify-between"
                onClick={() => setLanguageOpen((value) => !value)}
                aria-haspopup="listbox"
                aria-expanded={languageOpen}
              >
                <span className="notranslate" translate="no">
                  <Globe className="inline-block h-4 w-4 mr-2 align-middle" />
                  {LANGUAGE_OPTIONS.find((option) => option.code === language)?.label ??
                    "Velg språk"}
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
                      className={[
                        "translate-menu__item",
                        option.code === language ? "translate-menu__item--active" : "",
                      ].join(" ")}
                      type="button"
                      onClick={() => {
                        window.__cfsTranslateSetLanguage?.(option.code);
                        setLanguage(option.code);
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
          </ul>
        </div>
      )}
    </>
  );
}
