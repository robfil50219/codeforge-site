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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MobileBubbleNav from "./MobileBubbleNav";
import GoogleTranslateBanner from "./GoogleTranslateBanner";

declare global {
  interface Window {
    __BALLPIT_DISABLED?: boolean;
  }
}

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isStaticBg, setIsStaticBg] = useState(false);

  // 👇 init theme + background
  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("cfs-theme"); // "light" | "dark" | null
    const savedBg = localStorage.getItem("cfs-ballpit");  // "static" | "interactive" | null
    const isMobile = window.innerWidth < 768;

    // background
    const startStatic = savedBg === "static";
    setIsStaticBg(startStatic);
    window.__BALLPIT_DISABLED = startStatic;
    window.dispatchEvent(
      new CustomEvent("ballpit-toggle", { detail: { disabled: startStatic } })
    );

    // THEME
    if (isMobile) {
      // mobile: always light
      root.classList.remove("dark");
      setIsDark(false);
    } else {
      // desktop: use saved or system
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const shouldDark = savedTheme === "dark" || (!savedTheme && prefersDark);
      if (shouldDark) {
        root.classList.add("dark");
        setIsDark(true);
      } else {
        root.classList.remove("dark");
        setIsDark(false);
      }
    }

    // listen to resize → if user goes from desktop → mobile, force light
    const onResize = () => {
      const isNowMobile = window.innerWidth < 768;
      if (isNowMobile) {
        root.classList.remove("dark");
        setIsDark(false);
      } else {
        // when going back up we can reapply saved theme
        const saved = localStorage.getItem("cfs-theme");
        const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const wantDark = saved === "dark" || (!saved && prefers);
        if (wantDark) {
          root.classList.add("dark");
          setIsDark(true);
        } else {
          root.classList.remove("dark");
          setIsDark(false);
        }
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // ignore on mobile for now
      root.classList.remove("dark");
      setIsDark(false);
      localStorage.setItem("cfs-theme", "light");
      return;
    }

    root.classList.toggle("dark");
    const next = root.classList.contains("dark");
    setIsDark(next);
    localStorage.setItem("cfs-theme", next ? "dark" : "light");
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

                <GoogleTranslateBanner
                  className="surface-chip px-3 py-1.5 text-heading"
                  aria-label="Oversett nettstedet"
                />
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
