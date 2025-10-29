// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import MobileBubbleNav from "./MobileBubbleNav";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isStaticBg, setIsStaticBg] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    // @ts-expect-error global fra BallpitBackground
    const disabled = window.__BALLPIT_DISABLED === true;
    setIsStaticBg(disabled);
  }, []);

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setIsDark((v) => !v);
  }

  function toggleBackgroundMode() {
    // @ts-expect-error custom global
    const currentlyDisabled = window.__BALLPIT_DISABLED === true;
    // @ts-expect-error custom global
    window.__BALLPIT_DISABLED = !currentlyDisabled;
    setIsStaticBg(!currentlyDisabled);
    window.dispatchEvent(
      new CustomEvent("ballpit-toggle", { detail: { disabled: !currentlyDisabled } })
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
            {/* Logo + tekst – animert */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-1 sm:gap-2 font-extrabold tracking-tight text-(--text-heading)"
              aria-label="Til toppen"
            >
              <img
                src={`${import.meta.env.BASE_URL}favicon.png`}
                alt="CodeForge Studio logo"
                className={[
                  "h-12 w-12 sm:h-14 sm:w-14 object-contain",
                  "logo-anim",
                ].join(" ")}
              />

              <span
                className={[
                  "text-xl sm:text-2xl leading-none",
                  "opacity-0 animate-[slideInRight_1.8s_cubic-bezier(0.22,1,0.36,1)_0.25s_forwards]",
                ].join(" ")}
              >
                CODEFORGE STUDIO
              </span>
            </button>

            {/* Desktop navigasjon */}
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
                {isDark ? (
                  <span className="inline-flex items-center gap-1">
                    <Sun className="h-4 w-4" />
                    Lys
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <Moon className="h-4 w-4" />
                    Mørk
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobil meny */}
      <MobileBubbleNav
        scrollToId={scrollToId}
        isDark={isDark}
        toggleTheme={toggleTheme}
        isStaticBg={isStaticBg}
        toggleBackgroundMode={toggleBackgroundMode}
      />

      {/* Animasjoner */}
      <style>{`
        /* Kort intro-pop uten opacity-flicker */
        @keyframes popInSmooth {
          0%   { transform: scale(0.94); }
          60%  { transform: scale(1.04); }
          100% { transform: scale(1.00); }
        }

        /* Kontinuerlig, subtil “pust” – kun scale, ingen opacity */
        @keyframes breath {
          0%   { transform: scale(1.00); }
          25%  { transform: scale(1.055); }
          50%  { transform: scale(1.00); }
          75%  { transform: scale(1.055); }
          100% { transform: scale(1.00); }
        }

        /* Tekst glir sakte inn fra høyre */
        @keyframes slideInRight {
          0%   { opacity: 0; transform: translateX(18px); }
          60%  { opacity: 1; transform: translateX(0); }
          100% { opacity: 1; transform: translateX(0); }
        }

        /* Kombiner: liten pop-in, deretter evig pust.
           Én linje => unngår konkurrerende transform-animasjoner. */
        .logo-anim {
          will-change: transform;
          animation:
            popInSmooth 0.7s cubic-bezier(0.22,1,0.36,1) forwards,
            breath 7.5s ease-in-out 0.7s infinite;
        }

        /* Liten glød i dark mode for litt “varme” */
        :root.dark .logo-anim {
          filter: drop-shadow(0 0 6px rgba(0,160,160,0.28));
        }
      `}</style>
    </>
  );
}