import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import Container from "./ui/Container";
import useSmoothScroll from "../hooks/useSmoothScroll";

type NavItem = { id: string; labelKey: string };

const NAV_ITEMS: NavItem[] = [
  { id: "services", labelKey: "nav.services" },
  { id: "pricing", labelKey: "nav.pricing" },
  { id: "about", labelKey: "nav.about" },
  { id: "contact", labelKey: "nav.contact" },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { handleAnchorClick } = useSmoothScroll(80);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <Container className="h-16 flex items-center justify-between">
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
          <span className="text-xl sm:text-2xl tracking-[0.04em]">
            {t("brand").toUpperCase()}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center">
          {NAV_ITEMS.map((item, idx) => (
            <div key={item.id} className="group flex items-center">
              <Link
                to={"/#" + item.id}
                onClick={(e) => handleAnchorClick(e, item.id)}
                className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition"
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
      </Container>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <Container>
            <nav>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  to={"/#" + item.id}
                  onClick={(e) => {
                    handleAnchorClick(e, item.id);
                    setOpen(false);
                  }}
                  className="block py-3 text-center text-sm text-slate-600 hover:text-slate-900 transition border-b border-slate-100 last:border-0"
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <div className="py-3 flex justify-center">
                <LanguageToggle />
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}