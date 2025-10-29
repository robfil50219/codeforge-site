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
            // Layout
            "h-16 flex items-center px-4 sm:px-6 lg:px-8",
            "border-b border-(--card-border)",
            // Make background solid (no transparency)
            "bg-(--bg-page)",
            // Remove rounding & glass effects
            "backdrop-blur-0 shadow-sm",
          ].join(" ")}
        >
          <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
            {/* Brand / logo */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-(--text-heading)"
              aria-label="Go to home"
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
                Services
              </button>

              <button
                onClick={() => scrollToId("pricing")}
                className="hover:opacity-80 transition"
              >
                Pricing
              </button>

              <button
                onClick={() => scrollToId("about")}
                className="hover:opacity-80 transition"
              >
                About
              </button>

              <button
                onClick={() => scrollToId("contact")}
                className="hover:opacity-80 transition"
              >
                Contact
              </button>

              {/* CTA chip (original look preserved) */}
              <button
                onClick={() => scrollToId("contact")}
                className={[
                  "surface-chip text-xs font-medium",
                  "px-3 py-1.5 text-heading",
                ].join(" ")}
              >
                Let’s talk
              </button>

              {/* Theme chip (original look preserved) */}
              <button
                onClick={toggleTheme}
                className={[
                  "surface-chip text-xs font-medium",
                  "px-3 py-1.5 text-heading",
                ].join(" ")}
              >
                {isDark ? "Light" : "Dark"}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <MobileBubbleNav />
    </>
  );
}