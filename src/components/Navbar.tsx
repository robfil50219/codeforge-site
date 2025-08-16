import { useEffect, useMemo, useRef, useState } from "react";

type NavItem = { id: string; label: string };

const NAV_ITEMS: NavItem[] = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

// Height of your sticky header (px) to offset calculations
const HEADER_OFFSET = 80; // ~h-16 with a bit of cushion

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const ticking = useRef(false);

  // Cache section elements after mount
  const sections = useMemo(() => {
    const ids = ["home", ...NAV_ITEMS.map((n) => n.id)];
    return ids
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((x): x is { id: string; el: HTMLElement } => !!x.el);
  }, []);

  // Scroll-based active section detection (robust with sticky headers)
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        ticking.current = false;

        // Find the last section whose top is above the header offset
        let current = "home";
        for (const { id, el } of sections) {
          const top = el.getBoundingClientRect().top;
          if (top - HEADER_OFFSET <= 0) current = id;
          else break; // sections are in DOM order; stop at the first below header
        }
        setActive(current);
      });
    };

    // Run once on mount (in case you load mid-page)
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setOpen(false);

    // Smooth-scroll with header offset so the title isn’t hidden
    const y =
      window.scrollY +
      el.getBoundingClientRect().top -
      (HEADER_OFFSET - 4); // small nudge so the section title breathes
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const navLink = (id: string) =>
    [
      "px-1 py-2 text-sm transition",
      active === id ? "text-sky-700 font-semibold" : "text-slate-600 hover:text-slate-900",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand (scrolls to absolute top) */}
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

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(item.id);
              }}
              className={navLink(item.id)}
            >
              {item.label}
            </a>
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

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-col">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(item.id);
                }}
                className={[
                  "py-2",
                  active === item.id ? "text-sky-700 font-semibold" : "text-slate-700",
                ].join(" ")}
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