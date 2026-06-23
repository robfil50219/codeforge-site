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
import {
  CircleDot,
  Home,
  Menu,
  Moon,
  Palette,
  PhoneCall,
  Rocket,
  Sun,
  User,
  X,
} from "lucide-react";
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
const SECTION_ICON_CLASS = "h-4 w-4";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false);
  }

  const navItems = [
    { id: "hero", label: labels.home, icon: Home },
    { id: "services", label: labels.services, icon: Palette },
    { id: "pricing", label: labels.pricing, icon: Rocket },
    { id: "about", label: labels.about, icon: User },
    { id: "contact", label: labels.contact, icon: PhoneCall },
  ];

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
          <div className="relative flex w-full items-center justify-between max-w-7xl mx-auto gap-3">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsMobileMenuOpen(false);
              }}
              className="group flex items-center gap-3 text-lg font-extrabold tracking-tight text-(--text-heading)"

            >
              <img
                src={`${import.meta.env.BASE_URL}favicon.png`}
                alt="CodeForge Studio logo"
                className="nav-flame h-10 w-10 sm:h-14 sm:w-14 will-change-transform"
              />
              <span
                className="text-base sm:text-2xl tracking-[0.04em] anim-delay-200 notranslate"
                translate="no"
              >
                CODEFORGE STUDIO
              </span>
            </Link>

            {/* desktop nav */}
            <nav className="hidden lg:flex items-center gap-3 text-sm font-medium text-(--text-page)">
              <div className="nav-rail flex items-center gap-1.5">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollToId(id)}
                    className="nav-link"
                    aria-label={label}
                  >
                    <Icon className={SECTION_ICON_CLASS} aria-hidden="true" />
                    <span className="notranslate" translate="no">{label}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs font-medium">
                {/* background toggle */}
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleBackgroundMode();
                  }}
                  className={[
                    "surface-chip nav-chip nav-icon-button text-heading transition",
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
                  <CircleDot className="h-4 w-4" aria-hidden="true" />
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
                  className="surface-chip nav-chip nav-icon-button text-heading"
                  aria-label={isDark ? labels.useLightTheme : labels.useDarkTheme}
                  aria-pressed={isDark}
                  title={isDark ? labels.useLightTheme : labels.useDarkTheme}
                >
                  {isDark ? (
                    <Sun className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Moon className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>

                {/* translate button */}
                <FixedTranslateWidget className="shrink-0" compact />
              </div>
            </nav>

            <button
              type="button"
              data-testid="mobile-menu-toggle"
              className="surface-chip nav-chip nav-mobile-toggle text-heading lg:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-header-menu"
              aria-label={isMobileMenuOpen ? labels.closeMenu : labels.menu}
              title={isMobileMenuOpen ? labels.closeMenu : labels.menu}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>

            {isMobileMenuOpen && (
              <div id="mobile-header-menu" className="mobile-header-panel lg:hidden">
                <nav className="grid gap-2" aria-label={labels.menu}>
                  {navItems.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      className="mobile-header-link"
                      onClick={() => scrollToId(id)}
                      aria-label={label}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      <span className="notranslate" translate="no">{label}</span>
                    </button>
                  ))}
                </nav>

                <div className="mobile-header-actions">
                  <button
                    type="button"
                    onClick={toggleBackgroundMode}
                    className={[
                      "mobile-header-action",
                      !isStaticBg && "mobile-header-action--active",
                    ].filter(Boolean).join(" ")}
                    aria-pressed={isStaticBg}
                    aria-label={backgroundLabel}
                    title={backgroundLabel}
                  >
                    <CircleDot className="h-4 w-4" aria-hidden="true" />
                    <span className="notranslate" translate="no">{backgroundLabel}</span>
                  </button>

                  <button
                    type="button"
                    data-testid="mobile-theme-toggle"
                    onClick={toggleTheme}
                    className="mobile-header-action"
                    aria-label={isDark ? labels.useLightTheme : labels.useDarkTheme}
                    aria-pressed={isDark}
                    title={isDark ? labels.useLightTheme : labels.useDarkTheme}
                  >
                    {isDark ? (
                      <Sun className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Moon className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span className="notranslate" translate="no">
                      {isDark ? labels.useLightTheme : labels.useDarkTheme}
                    </span>
                  </button>

                  <FixedTranslateWidget className="mobile-header-language" compact />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* The former bubble nav stays mounted as a compatibility shim. */}
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
