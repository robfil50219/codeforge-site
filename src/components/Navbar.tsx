import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MobileBubbleNav from "./MobileBubbleNav";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  // On mount, sync state with current <html> class
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Smooth scroll helper for desktop nav
  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setIsDark((v) => !v);
  }

  return (
    <>
      <header className="sticky top-0 z-50">
        <div
          className={[
            "h-16 flex items-center",
            "px-4 sm:px-6 lg:px-8",
            // use our glass util instead of repeating tailwind classes
            "glass rounded-none rounded-b-none! border-b border-white/10 dark:border-white/10",
          ].join(" ")}
        >
          <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
            {/* Brand / logo */}
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-(--text-page)"
              aria-label="Go to home"
            >
              <img
                src={`${import.meta.env.BASE_URL}favicon.png`}
                alt="CodeForge Studio logo"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded"
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

              {/* Fancy CTA */}
              <button
                onClick={() => scrollToId("contact")}
                className={[
                  "surface-chip text-xs font-medium",
                  "px-3 py-1.5 text-(--text-page)",
                ].join(" ")}
              >
                Let’s talk
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className={[
                  "surface-chip text-xs font-medium",
                  "px-3 py-1.5 text-(--text-page)",
                ].join(" ")}
              >
                {isDark ? "Light" : "Dark"}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile floating nav */}
      <MobileBubbleNav />
    </>
  );
}