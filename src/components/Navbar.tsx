// src/components/Navbar.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MobileBubbleNav from "./MobileBubbleNav";

declare global {
  interface Window {
    __BALLPIT_DISABLED?: boolean;
  }
}

const THEME_KEY = "cf-theme";           // "dark" | "light"
const BALLPIT_KEY = "cf-ballpit";       // "on" | "off"

export default function Navbar() {
  // default = DARK + BALLPIT ON
  const [isDark, setIsDark] = useState(true);
  const [isStaticBg, setIsStaticBg] = useState(false); // false = interactive

  // read saved prefs once
  useEffect(() => {
    // 1) theme
    const savedTheme = localStorage.getItem(THEME_KEY);
    const shouldBeDark =
      savedTheme ? savedTheme === "dark" : true; // default = dark
    document.documentElement.classList.toggle("dark", shouldBeDark);
    setIsDark(shouldBeDark);

    // 2) ballpit
    const savedBallpit = localStorage.getItem(BALLPIT_KEY);
    const shouldBeStatic =
      savedBallpit ? savedBallpit === "off" : false; // default = interactive
    setIsStaticBg(shouldBeStatic);
    window.__BALLPIT_DISABLED = shouldBeStatic;
    window.dispatchEvent(
      new CustomEvent("ballpit-toggle", {
        detail: { disabled: shouldBeStatic },
      })
    );
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(THEME_KEY, next ? "dark" : "light");
  }

  function toggleBackgroundMode() {
    const next = !isStaticBg;
    setIsStaticBg(next);
    localStorage.setItem(BALLPIT_KEY, next ? "off" : "on");
    window.__BALLPIT_DISABLED = next;
    window.dispatchEvent(
      new CustomEvent("ballpit-toggle", {
        detail: { disabled: next },
      })
    );
  }

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div
          className={[
            "h-16 flex items-center px-4 sm:px-6 lg:px-8",
            "border-b border-(--card-border)",
            "bg-(--bg-page)",
            "shadow-sm",
          ].join(" ")}
        >
          <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 sm:gap-3 text-lg font-extrabold tracking-tight text-(--text-heading)"
              aria-label="Til forsiden"
            >
              <img
                src={`${import.meta.env.BASE_URL}favicon.png`}
                alt="CodeForge Studio logo"
                className="h-10 w-10 sm:h-12 sm:w-12 animate-flame-breathe"
              />
              <span className="text-xl sm:text-2xl tracking-[0.04em] animate-text-glide anim-delay-150">
                CODEFORGE STUDIO
              </span>
            </Link>

            {/* desktop */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-(--text-page)">
              <button onClick={() => scrollToId("services")} className="hover:opacity-80 transition">Tjenester</button>
              <button onClick={() => scrollToId("pricing")} className="hover:opacity-80 transition">Priser</button>
              <button onClick={() => scrollToId("about")} className="hover:opacity-80 transition">Om oss</button>
              <button onClick={() => scrollToId("contact")} className="hover:opacity-80 transition">Kontakt</button>

              <button
                onClick={toggleBackgroundMode}
                className="surface-chip text-xs font-medium px-3 py-1.5 text-heading"
                aria-pressed={isStaticBg}
              >
                {isStaticBg ? "Interaktiv bakgrunn" : "Stille bakgrunn"}
              </button>

              <button
                onClick={toggleTheme}
                className="surface-chip text-xs font-medium px-3 py-1.5 text-heading"
              >
                {isDark ? "Lys" : "Mørk"}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* mobile bubble */}
      <MobileBubbleNav
        scrollToId={scrollToId}
        isDark={isDark}
        toggleTheme={toggleTheme}
        isStaticBg={isStaticBg}
        toggleBackgroundMode={toggleBackgroundMode}
      />
    </>
  );
}