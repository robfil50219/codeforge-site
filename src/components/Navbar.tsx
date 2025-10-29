// src/components/Navbar.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MobileBubbleNav from "./MobileBubbleNav";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [interactiveBg, setInteractiveBg] = useState(true);

  useEffect(() => {
    // Sjekk dark mode status
    setIsDark(document.documentElement.classList.contains("dark"));

    // Les bakgrunnsvalg fra localStorage
    const savedBg = localStorage.getItem("interactiveBg");
    if (savedBg === "false") {
      setInteractiveBg(false);
      document.body.classList.add("static-bg");
    }
  }, []);

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setIsDark((v) => !v);
  }

  function toggleBackground() {
    setInteractiveBg((prev) => {
      const newValue = !prev;
      if (newValue) {
        document.body.classList.remove("static-bg");
        localStorage.setItem("interactiveBg", "true");
      } else {
        document.body.classList.add("static-bg");
        localStorage.setItem("interactiveBg", "false");
      }
      return newValue;
    });
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
            {/* Logo */}
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

              {/* CTA */}
              <button
                onClick={() => scrollToId("contact")}
                className="surface-chip text-xs font-medium px-3 py-1.5 text-heading"
              >
                La oss prate
              </button>

              {/* Tema-knapp */}
              <button
                onClick={toggleTheme}
                className="surface-chip text-xs font-medium px-3 py-1.5 text-heading"
              >
                {isDark ? "Lyst tema" : "Mørkt tema"}
              </button>

              {/* 🎈 Ny knapp: bakgrunn av/på */}
              <button
                onClick={toggleBackground}
                className="surface-chip text-xs font-medium px-3 py-1.5 text-heading"
              >
                {interactiveBg ? "Stopp bakgrunn" : "Start bakgrunn"}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <MobileBubbleNav />
    </>
  );
}