// src/components/Navbar.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";

type NavItem = { id: string; labelKey: string };

const NAV_ITEMS: NavItem[] = [
  { id: "services", labelKey: "nav.services" },
  { id: "pricing", labelKey: "nav.pricing" },
  { id: "about", labelKey: "nav.about" },
  { id: "contact", labelKey: "nav.contact" },
];

const HEADER_OFFSET = 80;

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setOpen(false);
    const y =
      window.scrollY +
      el.getBoundingClientRect().top -
      (HEADER_OFFSET - 4);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleSmoothScroll = (
    e: React.MouseEvent,
    id: string
  ) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      window.location.href = `/${"#" + id}`;
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="glass backdrop-blur-md bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
<Link
  to="/"
  onClick={() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
  className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-slate-900"
  aria-label="Go to home"
>
  <img
    src={`${import.meta.env.BASE_URL}favicon.png`}
    alt="CodeForge Studio logo"
    className="h-12 w-12 sm:h-14 sm:w-14"
  />
  {/* force uppercase */}
  <span className="text-xl sm:text-2xl uppercase">{t("brand")}</span>
</Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center">
            {NAV_ITEMS.map((item, idx) => (
              <div key={item.id} className="group flex items-center">
                <Link
                  to={"/#" + item.id}
                  onClick={(e) => handleSmoothScroll(e, item.id)}
                  className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition cursor-pointer"
                >
                  {t(item.labelKey)}
                </Link>
                {idx < NAV_ITEMS.length - 1 && (
                  <span className="mx-1 h-1 w-1 rounded-full bg-slate-400 transition duration-200 ease-out group-hover:scale-125 group-hover:bg-slate-500" />
                )}
              </div>
            ))}
            <div className="ml-4">
              <LanguageToggle />
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-lg p-2 hover:bg-slate-100"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="w-6 h-0.5 bg-slate-900 mb-1.5" />
            <div className="w-6 h-0.5 bg-slate-900 mb-1.5" />
            <div className="w-6 h-0.5 bg-slate-900" />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white/90 backdrop-blur-md">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={"/#" + item.id}
                onClick={(e) => handleSmoothScroll(e, item.id)}
                className="block py-3 text-center text-sm text-slate-600 hover:text-slate-900 transition border-b border-slate-100 last:border-0 cursor-pointer"
              >
                {t(item.labelKey)}
              </Link>
            ))}
            <div className="py-3 flex justify-center">
              <LanguageToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}