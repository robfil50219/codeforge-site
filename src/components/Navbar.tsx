import { Link } from "react-router-dom";
import MobileBubbleNav from "./MobileBubbleNav";

export default function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-50">
        <div
          className={[
            // size + layout
            "h-16 flex items-center",
            // responsive padding
            "px-4 sm:px-6 lg:px-8",
            // glass look
            "backdrop-blur-xl bg-white/40 dark:bg-[#001920]/40",
            "border-b border-white/10 dark:border-white/10",
            "shadow-lg shadow-black/10",
          ].join(" ")}
        >
          <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
            {/* Brand / logo */}
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-[#0F4452] dark:text-[#F6FAFA]"
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
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <a
                href="#services"
                className="text-[#0F4452] hover:text-[#001920] dark:text-[#F6FAFA] dark:hover:text-white transition"
              >
                Services
              </a>

              <a
                href="#pricing"
                className="text-[#0F4452] hover:text-[#001920] dark:text-[#F6FAFA] dark:hover:text-white transition"
              >
                Pricing
              </a>

              <a
                href="#about"
                className="text-[#0F4452] hover:text-[#001920] dark:text-[#F6FAFA] dark:hover:text-white transition"
              >
                About
              </a>

              <a
                href="#contact"
                className="text-[#0F4452] hover:text-[#001920] dark:text-[#F6FAFA] dark:hover:text-white transition"
              >
                Contact
              </a>

              {/* Fancy CTA */}
              <a
                href="#contact"
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-[#0F4452] dark:text-[#F6FAFA] backdrop-blur-sm hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/8 transition"
              >
                Let’s talk
              </a>
            </nav>

            {/* Desktop theme toggle */}
            <button
              onClick={() => {
                document.documentElement.classList.toggle("dark");
              }}
              className="hidden md:inline-flex rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-[#0F4452] dark:text-[#F6FAFA] backdrop-blur-sm hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/8 transition"
            >
              Dark
            </button>
          </div>
        </div>
      </header>

      {/* Mobile floating nav */}
      <MobileBubbleNav />
    </>
  );
}