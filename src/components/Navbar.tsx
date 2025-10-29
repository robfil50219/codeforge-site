// src/components/Navbar.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MobileBubbleNav from "./MobileBubbleNav";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setIsDark((v) => !v);
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
            // Solid bakgrunn (ingen glass)
            "bg-(--bg-page)",
            // Flat design uten runde kanter
            "shadow-sm",
          ].join(" ")}
        >
          <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
            {/* Logo / brand */}
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

            {/* Desktop navigasjon */}
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

              {/* CTA – behold chip-stil */}
              <button
                onClick={() => scrollToId("contact")}
                className={[
                  "surface-chip text-xs font-medium",
                  "px-3 py-1.5 text-heading",
                ].join(" ")}
              >
                La oss prate
              </button>

              {/* Tema-knapp */}
              <button
                onClick={toggleTheme}
                className={[
                  "surface-chip text-xs font-medium",
                  "px-3 py-1.5 text-heading",
                ].join(" ")}
              >
                {isDark ? "Lyst tema" : "Mørkt tema"}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <MobileBubbleNav />
    </>
  );
}