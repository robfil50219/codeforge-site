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
      <header className="sticky top-0 z-50">
        <div
          className={[
            "h-16 flex items-center px-4 sm:px-6 lg:px-8",
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
              className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-heading"
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
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-body">
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

              {/* CTA chip */}
              <button
                onClick={() => scrollToId("contact")}
                className={[
                  "surface-chip text-xs font-medium",
                  "px-3 py-1.5 text-heading",
                ].join(" ")}
              >
                Let’s talk
              </button>

              {/* Theme chip */}
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