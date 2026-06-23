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
import { Moon, Sun } from "lucide-react";
import MobileBubbleNav from "./MobileBubbleNav";
import FixedTranslateWidget from "./FixedTranslateWidget";
import useLanguage from "../hooks/useLanguage";
import { NAVIGATION_LABELS } from "./translate/language-data";

declare global {
  interface Window {
    __BALLPIT_DISABLED?: boolean;
    __CFS_SET_THEME?: (mode: ThemeMode, persist?: boolean) => void;
    __CFS_GET_THEME?: () => ThemeMode | undefined;
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

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== "undefined") {
    const windowTheme = window.__CFS_GET_THEME?.();
    if (windowTheme === "dark" || windowTheme === "light") return windowTheme;
  }

  if (typeof document !== "undefined" && document.documentElement.classList.contains("dark"))
    return "dark";
  return "light";
};

const applyThemeClass = (mode: ThemeMode) => {
  if (typeof document === "undefined") return;
  if (typeof window !== "undefined" && typeof window.__CFS_SET_THEME === "function") {
    window.__CFS_SET_THEME(mode, false);
    return;
  }
  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");
  root.style.colorScheme = mode;
  document.body?.style.setProperty("color-scheme", mode);
  const meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) meta.setAttribute("content", mode === "dark" ? "dark light" : "light dark");
  void root.offsetHeight;
};

export default function Navbar() {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);
  const manualThemeRef = useRef(readStoredTheme() !== null);
  const [isStaticBg, setIsStaticBg] = useState(false);
  const language = useLanguage();
  const labels = NAVIGATION_LABELS[language];
  const isDark = theme === "dark";
  const backgroundLabel = isStaticBg
    ? labels.backgroundOff
    : labels.backgroundOn;

  const setThemeInternal = useCallback((mode: ThemeMode, persist: boolean) => {
    if (typeof window !== "undefined" && typeof window.__CFS_SET_THEME === "function") {
      window.__CFS_SET_THEME(mode, persist);
    } else {
      applyThemeClass(mode);
      try {
        if (persist) localStorage.setItem(THEME_STORAGE_KEY, mode);
        else localStorage.removeItem(THEME_STORAGE_KEY);
      } catch {
        // ignore
      }
    }
    setThemeState((current) => (current === mode ? current : mode));
    if (persist) manualThemeRef.current = true;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystem = (event: MediaQueryListEvent) => {
      if (manualThemeRef.current) return;
      setThemeInternal(event.matches ? "dark" : "light", false);
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      const next =
        event.newValue === "dark" || event.newValue === "light"
          ? event.newValue
          : media.matches
            ? "dark"
            : "light";
      manualThemeRef.current = event.newValue === "dark" || event.newValue === "light";
      setThemeInternal(next, false);
    };

    window.addEventListener("storage", handleStorage);
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handleSystem);
      return () => {
        media.removeEventListener("change", handleSystem);
        window.removeEventListener("storage", handleStorage);
      };
    }
    media.addListener(handleSystem);
    return () => {
      media.removeListener(handleSystem);
      window.removeEventListener("storage", handleStorage);
    };
  }, [setThemeInternal]);

  useEffect(() => {
    try {
      localStorage.removeItem("cfs-ballpit");
    } catch {
      // ignore
    }
  }, []);

  function toggleTheme() {
    const next: ThemeMode = isDark ? "light" : "dark";
    setThemeInternal(next, true);
  }

  function toggleBackgroundMode() {
    const next = !isStaticBg;
    setIsStaticBg(next);
    try {
      localStorage.removeItem("cfs-ballpit");
    } catch {
      // ignore
    }
    window.__BALLPIT_DISABLED = next;
    window.dispatchEvent(new CustomEvent("ballpit-toggle", { detail: { disabled: next } }));
  }

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full border-b border-(--card-border) bg-(--bg-page) shadow-sm"
        style={{
          paddingTop: "var(--app-safe-top)",
          paddingLeft: "var(--app-safe-left)",
          paddingRight: "var(--app-safe-right)",
          backgroundColor: "color-mix(in srgb, var(--bg-page) 92%, transparent)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <div className="flex min-h-4rem items-center px-4 sm:px-6 lg:px-8">
          <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-3 text-lg font-extrabold tracking-tight text-(--text-heading)"

            >
              <img
                src={`${import.meta.env.BASE_URL}favicon.png`}
                alt="CodeForge Studio logo"
                className="nav-flame h-10 w-10 sm:h-14 sm:w-14 will-change-transform"
              />
              <span
                className="text-xl sm:text-2xl tracking-[0.04em] anim-delay-200 notranslate"
                translate="no"
              >
                CODEFORGE STUDIO
              </span>
            </Link>

            {/* desktop nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-(--text-page)">
              <button onClick={() => scrollToId("services")} className="hover:opacity-80 transition">
                <span className="notranslate" translate="no">{labels.services}</span>
              </button>
              <div className="flex items-center gap-3 text-xs font-medium">
                {/* background toggle */}
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleBackgroundMode();
                  }}
                  className={[
                    "surface-chip nav-chip px-3 py-1.5 text-heading transition",
                    !isStaticBg && "ring-1 ring-(--color-brand-sea)",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={
                    isStaticBg
                      ? undefined
                      : {
                          background:
                            "color-mix(in srgb, var(--color-brand-sea, #0EA5E9) 18%, transparent)",
                        }
                  }
                  aria-pressed={isStaticBg}
                  aria-label={backgroundLabel}
                  title={backgroundLabel}
                >
                  <span className="notranslate" translate="no">{backgroundLabel}</span>
                </button>

                {/* desktop theme toggle */}
                <button
                  type="button"
                  data-testid="desktop-theme-toggle"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleTheme();
                  }}
                  className="surface-chip nav-chip px-3 py-1.5 text-heading"
                  aria-label={isDark ? labels.useLightTheme : labels.useDarkTheme}
                  aria-pressed={isDark}
                  title={isDark ? labels.useLightTheme : labels.useDarkTheme}
                >
                  {isDark ? (
                    <Sun className="inline-block h-4 w-4 mr-2 align-middle" />
                  ) : (
                    <Moon className="inline-block h-4 w-4 mr-2 align-middle" />
                  )}
                  <span className="notranslate" translate="no">
                    {isDark ? labels.useLightTheme : labels.useDarkTheme}
                  </span>
                </button>

                {/* translate button */}
                <FixedTranslateWidget className="shrink-0" />
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <MobileBubbleNav
        scrollToId={scrollToId}
        isStaticBg={isStaticBg}
        isDarkMode={isDark}
        toggleBackgroundMode={toggleBackgroundMode}
        toggleTheme={toggleTheme}
      />
    </>
  );
}
