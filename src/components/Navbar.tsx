import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MobileBubbleNav from "./MobileBubbleNav";

// Define the global types once (keeps TypeScript happy)
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
    // sync background mode from global flag
    setIsStaticBg(window.__BALLPIT_DISABLED === true);
  }, []);

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setIsDark((v) => !v);
  }

  function toggleBackgroundMode() {
    const next = !isStaticBg;
    setIsStaticBg(next);

    // Notify BallpitBackground
    const evt: CustomEvent<BallpitToggleDetail> = new CustomEvent("ballpit-toggle", {
      detail: { disabled: next },
    });
    window.dispatchEvent(evt);

    // Store global state
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
            "h-16 flex items-center px-4 sm:px-6 lg:px-8",
            "border-b border-(--card-border)",
            "bg-(--bg-page)",
            "shadow-sm",
          ].join(" ")}
        >
          <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
            {/* === Logo + text (animated) === */}
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
              <span className="text-xl sm:text-2xl tracking-[0.04em] animate-text-glide anim-delay-200">
                CODEFORGE STUDIO
              </span>
            </Link>

            {/* === Desktop navigation === */}
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

              {/* === Toggle background === */}
              <button
                onClick={toggleBackgroundMode}
                aria-pressed={isStaticBg}
                className="surface-chip text-xs font-medium px-3 py-1.5 text-heading"
              >
                {isStaticBg ? "Interaktiv bakgrunn" : "Stille bakgrunn"}
              </button>

              {/* === Theme toggle === */}
              <button
                onClick={toggleTheme}
                aria-pressed={isDark}
                className="surface-chip text-xs font-medium px-3 py-1.5 text-heading"
              >
                {isDark ? "Lys" : "Mørk"}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* === Mobil flytende meny === */}
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