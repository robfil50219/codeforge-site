// src/components/Navbar.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MobileBubbleNav from "./MobileBubbleNav";

// Augment the Window type so we can store/read our background flag safely
declare global {
  interface Window {
    __BALLPIT_DISABLED?: boolean;
  }
  interface BallpitToggleDetail {
    disabled: boolean;
  }
}

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isStaticBg, setIsStaticBg] = useState<boolean>(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    // sync initial static/interactive state from global flag if present
    setIsStaticBg(window.__BALLPIT_DISABLED === true);
  }, []);

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setIsDark((v) => !v);
  }

  function toggleBackgroundMode() {
    const next = !isStaticBg;
    setIsStaticBg(next);
    // Let BallpitBackground know (typed CustomEvent payload)
    const evt: CustomEvent<BallpitToggleDetail> = new CustomEvent("ballpit-toggle", {
      detail: { disabled: next },
    });
    window.dispatchEvent(evt);
    // keep a global hint so initial mount can read it
    window.__BALLPIT_DISABLED = next;
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
            // Layout
            "h-16 flex items-center px-4 sm:px-6 lg:px-8",
            "border-b border-(--card-border)",
            // Solid background (no transparency/glass)
            "bg-(--bg-page)",
            "shadow-sm",
          ].join(" ")}
        >
          <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
            {/* Brand / logo */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-(--text-heading)"
              aria-label="Til forsiden"
            >
              <img
                src={`${import.meta.env.BASE_URL}favicon.png`}
                alt="CodeForge Studio logo"
                className="h-10 w-10 sm:h-12 sm:w-12"
              />
              <span className="text-xl sm:text-2xl tracking-[0.04em]">
                CODEFORGE STUDIO
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-(--text-page)">
              <button
                onClick={() => scrollToId("services")}
                className="hover:opacity-80 transition"
              >
                Tjenester
              </button>

              <button
                onClick={() => scrollToId("pricing")}
                className="hover:opacity-80 transition"
              >
                Priser
              </button>

              <button
                onClick={() => scrollToId("about")}
                className="hover:opacity-80 transition"
              >
                Om oss
              </button>

              <button
                onClick={() => scrollToId("contact")}
                className="hover:opacity-80 transition"
              >
                Kontakt
              </button>

              {/* Background mode chip */}
              <button
                onClick={toggleBackgroundMode}
                className="surface-chip text-xs font-medium px-3 py-1.5 text-heading"
                aria-pressed={isStaticBg}
              >
                {isStaticBg ? "Interaktiv bakgrunn" : "Stille bakgrunn"}
              </button>

              {/* Theme chip */}
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

      {/* Mobilmeny (flytende knapp + panel) */}
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