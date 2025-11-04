// src/components/Navbar.tsx
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
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MobileBubbleNav from "./MobileBubbleNav";

declare global {
  interface Window {
    __BALLPIT_DISABLED?: boolean;
  }
}

const THEME_STORAGE_KEY = "cfs-theme";
type ThemeMode = "light" | "dark";

const readStoredTheme = (): ThemeMode | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "dark" || stored === "light" ? stored : null;
  } catch {
    return null;
  }
};

const getSystemTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getInitialTheme = (): ThemeMode => {
  const stored = readStoredTheme();
  if (stored) return stored;
  if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) {
    return "dark";
  }
  return getSystemTheme();
};

const applyThemeClass = (mode: ThemeMode) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (mode === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

const LANGUAGES = [
  { code: "no", label: "Norsk" },
  { code: "sv", label: "Svensk" },
  { code: "da", label: "Dansk" },
  { code: "fi", label: "Finsk" },
  { code: "en", label: "Engelsk" },
] as const;

export default function Navbar() {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);
  const manualThemeRef = useRef(readStoredTheme() !== null);

  const [isStaticBg, setIsStaticBg] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const isDark = theme === "dark";

  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  const setThemeInternal = useCallback(
    (mode: ThemeMode, persist: boolean) => {
      applyThemeClass(mode);
      setThemeState((current) => (current === mode ? current : mode));
      if (typeof window !== "undefined") {
        try {
          if (persist) {
            localStorage.setItem(THEME_STORAGE_KEY, mode);
          } else {
            localStorage.removeItem(THEME_STORAGE_KEY);
          }
        } catch {
          // ignore storage errors (e.g. private mode)
        }
      }
      manualThemeRef.current = persist;
    },
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedTheme = readStoredTheme();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const initialTheme: ThemeMode = storedTheme ?? (media.matches ? "dark" : "light");
    setThemeInternal(initialTheme, storedTheme !== null);

    const handleSystem = (event: MediaQueryListEvent) => {
      if (manualThemeRef.current) return;
      const next = event.matches ? "dark" : "light";
      setThemeInternal(next, false);
    };

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handleSystem);
      return () => media.removeEventListener("change", handleSystem);
    }
    media.addListener(handleSystem);
    return () => media.removeListener(handleSystem);
  }, [setThemeInternal]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedBg = (() => {
      try {
        return localStorage.getItem("cfs-ballpit");
      } catch {
        return null;
      }
    })();
    const startStatic = savedBg === "static";
    setIsStaticBg(startStatic);
    window.__BALLPIT_DISABLED = startStatic;
    window.dispatchEvent(
      new CustomEvent("ballpit-toggle", { detail: { disabled: startStatic } })
    );
  }, []);

  function toggleTheme() {
    const next: ThemeMode = isDark ? "light" : "dark";
    setThemeInternal(next, true);
  }

  function toggleLanguageMenu() {
    setIsLangMenuOpen((open) => !open);
  }

  function closeLanguageMenu() {
    setIsLangMenuOpen(false);
  }

  useEffect(() => {
    if (!isLangMenuOpen) return;
    const handleClickAway = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        languageMenuRef.current?.contains(target) ||
        languageButtonRef.current?.contains(target)
      ) {
        return;
      }
      closeLanguageMenu();
    };
    document.addEventListener("pointerdown", handleClickAway);
    return () => document.removeEventListener("pointerdown", handleClickAway);
  }, [isLangMenuOpen]);

  useEffect(() => {
    if (!isLangMenuOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        closeLanguageMenu();
        languageButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isLangMenuOpen]);

  function selectLanguage(code: string) {
    console.info("Selected language:", code);
    closeLanguageMenu();
  }

  function toggleBackgroundMode() {
    const next = !isStaticBg;
    setIsStaticBg(next);
    localStorage.setItem("cfs-ballpit", next ? "static" : "interactive");
    window.__BALLPIT_DISABLED = next;
    window.dispatchEvent(
      new CustomEvent("ballpit-toggle", { detail: { disabled: next } })
    );
  }

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div className="h-16 flex items-center px-4 sm:px-6 lg:px-8 border-b border-(--card-border) bg-(--bg-page) shadow-sm">
          <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-(--text-heading)"
              aria-label="Til forsiden"
            >
              <img
                src={`${import.meta.env.BASE_URL}favicon.png`}
                alt="CodeForge Studio logo"
                className="h-10 w-10 sm:h-12 sm:w-12 animate-flame-breathe"
              />
              <span className="text-xl sm:text-2xl tracking-[0.04em] animate-text-glide anim-delay-200">
                CODEFORGE STUDIO
              </span>
            </Link>

            {/* desktop nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-(--text-page)">
              <button onClick={() => scrollToId("services")} className="hover:opacity-80 transition">
                Tjenester
              </button>
              <button onClick={() => scrollToId("pricing")} className="hover:opacity-80 transition">
                Priser
              </button>
              <button onClick={() => scrollToId("about")} className="hover:opacity-80 transition">
                Om oss
              </button>
              <button onClick={() => scrollToId("contact")} className="hover:opacity-80 transition">
                Kontakt
              </button>
              <div className="flex items-center gap-3 text-xs font-medium">
                {/* background toggle */}
                <button
                  onClick={toggleBackgroundMode}
                  className="surface-chip px-3 py-1.5 text-heading"
                  aria-pressed={isStaticBg}
                >
                  {isStaticBg ? "Interaktiv bakgrunn" : "Stille bakgrunn"}
                </button>

                {/* desktop theme toggle */}
                <button
                  onClick={toggleTheme}
                  className="surface-chip px-3 py-1.5 text-heading"
                >
                  {isDark ? "Lys" : "Mørk"}
                </button>

                <div className="relative">
                  <button
                    ref={languageButtonRef}
                    className="surface-chip px-3 py-1.5 text-heading flex items-center gap-2"
                    onClick={toggleLanguageMenu}
                    aria-haspopup="menu"
                    aria-expanded={isLangMenuOpen}
                  >
                    Velg språk
                    <span
                      className={[
                        "transition-transform duration-200",
                        isLangMenuOpen ? "rotate-180" : "",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </button>

                  {isLangMenuOpen && (
                    <div
                      ref={languageMenuRef}
                      className="absolute right-0 mt-2 w-48 rounded-lg border border-(--card-border) bg-(--bg-page) shadow-xl z-50 overflow-hidden"
                      role="menu"
                    >
                      <ul className="py-2 text-sm text-(--text-page)">
                        {LANGUAGES.map((language) => (
                          <li key={language.code}>
                            <button
                              onClick={() => selectLanguage(language.code)}
                              className="w-full text-left px-3 py-2 hover:bg-white/10 transition"
                              role="menuitem"
                            >
                              {language.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* mobile menu (no theme btn) */}
      <MobileBubbleNav
        scrollToId={scrollToId}
        isStaticBg={isStaticBg}
        toggleBackgroundMode={toggleBackgroundMode}
      />
    </>
  );
}
