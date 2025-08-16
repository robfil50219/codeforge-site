// src/components/Navbar.tsx
import { useState } from "react";

type NavItem = { id: string; label: string };

const NAV_ITEMS: NavItem[] = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "pricing", label: "Pricing" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

// sticky header height (px) for offset when scrolling to sections
const HEADER_OFFSET = 80;

export default function Navbar() {
  const [open, setOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand → scroll to absolute top */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-lg font-extrabold tracking-tight text-slate-900"
        >
          CodeForge Studio
        </a>

        {/* Desktop nav with animated dots */}
        <nav className="hidden md:flex items-center">
          {NAV_ITEMS.map((item, idx) => (
            <div key={item.id} className="group flex items-center">
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(item.id);
                }}
                className="px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition"
              >
                {item.label}
              </a>
              {/* Dot divider (skip after last item) */}
              {idx < NAV_ITEMS.length - 1 && (
                <span
                  className="mx-1 h-1 w-1 rounded-full bg-slate-400 transition duration-200 ease-out
                             group-hover:scale-125 group-hover:bg-slate-500"
                />
              )}
            </div>
          ))}
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

      {/* Mobile nav with clean separators (no dots) */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(item.id);
                }}
                className="block py-3 text-center text-sm text-slate-600 hover:text-slate-900 transition border-b border-slate-100 last:border-0"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}