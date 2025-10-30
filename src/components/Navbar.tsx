// src/components/Navbar.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MobileBubbleNav from "./MobileBubbleNav";

declare global {
  interface Window {
    __BALLPIT_DISABLED?: boolean;
  }
}

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isStaticBg, setIsStaticBg] = useState(false);

  // read initial values (what we put in index.html)
  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);

    const pit = window.__BALLPIT_DISABLED === true;
    setIsStaticBg(pit);
  }, []);

  function toggleTheme() {
    const html = document.documentElement;
    const next = !html.classList.contains("dark");
    if (next) {
      html.classList.add("dark");
      localStorage.setItem("cf-theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("cf-theme", "light");
    }
    setIsDark(next);
  }

  function toggleBackgroundMode() {
    const next = !isStaticBg;
    setIsStaticBg(next);
    window.__BALLPIT_DISABLED = next;
    localStorage.setItem("cf-ballpit", next ? "off" : "on");
    // tell BallpitBackground
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
        <div className="h-16 flex items-center px-4 sm:px-6 lg:px-8 bg-(--bg-page) border-b border-(--card-border) shadow-sm">
          <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
            {/* logo */}
            <Link
              to="/"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="flex items-center gap-2 sm:gap-2.5 text-(--text-heading)"
              aria-label="Til forsiden"
            >
              <img
                src={`${import.meta.env.BASE_URL}favicon.png`}
                alt="CodeForge Studio"
                className="h-10 w-10 sm:h-11 sm:w-11 animate-flame-breathe"
              />
              <span className="text-lg sm:text-xl font-extrabold tracking-[0.035em] animate-text-glide">
                CODEFORGE STUDIO
              </span>
            </Link>

            {/* desktop nav */}
            <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-(--text-page)">
              <button onClick={() => scrollToId("services")} className="hover:opacity-80">
                Tjenester
              </button>
              <button onClick={() => scrollToId("pricing")} className="hover:opacity-80">
                Priser
              </button>
              <button onClick={() => scrollToId("about")} className="hover:opacity-80">
                Om oss
              </button>
              <button onClick={() => scrollToId("contact")} className="hover:opacity-80">
                Kontakt
              </button>

              <button
                onClick={toggleBackgroundMode}
                className="surface-chip text-xs font-medium px-3 py-1.5 text-heading"
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

      {/* mobile */}
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