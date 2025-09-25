import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import Container from "./ui/Container";
import useSmoothScroll from "../hooks/useSmoothScroll";
import { useWpMenu } from "../hooks/useWpMenu";
import type { MenuItem as WpMenuItem } from "../hooks/useWpMenu";

/** Convert a menu URL to a section id (without '#') if it’s an in-page anchor. */
function sectionIdFrom(url: string): string | undefined {
  try {
    const u = new URL(url, window.location.origin);
    if (u.origin === window.location.origin && u.hash.startsWith("#")) {
      return u.hash.slice(1);
    }
    if (url.startsWith("#")) return url.slice(1);
  } catch {
    if (url.startsWith("/#")) return url.slice(2);
    if (url.startsWith("#")) return url.slice(1);
  }
  return undefined;
}

type RenderItem = {
  key: string;
  title: string;
  href: string;
  sectionId?: string;
  external?: boolean;
  target?: string;
};

export default function Navbar() {
  const { t } = useTranslation();
  const { handleAnchorClick } = useSmoothScroll(80);
  const [open, setOpen] = useState(false);

  // Only WP: fetch the "primary" menu (you can change to "header" if you prefer slug)
  const { items: wpItems, loading } = useWpMenu("primary", { fallbackSlug: "header" });

  const items: RenderItem[] = useMemo(() => {
    if (!wpItems) return [];
    const sorted: WpMenuItem[] = [...wpItems].sort(
      (a: WpMenuItem, b: WpMenuItem) => a.order - b.order
    );
    return sorted.map((i: WpMenuItem): RenderItem => {
      const sectionId = i.url ? sectionIdFrom(i.url) : undefined;
      const external =
        !!i.url &&
        /^https?:\/\//i.test(i.url) &&
        !i.url.includes(window.location.host);

      return {
        key: String(i.id),
        title: i.title,
        href: i.url ?? "#",
        sectionId,
        external,
        target: i.target || (external ? "_blank" : "_self"),
      };
    });
  }, [wpItems]);

  const renderLink = (item: RenderItem, showDivider: boolean) => {
    const common =
      "px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition";

    if (item.sectionId) {
      // Smooth scroll to a section on the same page.
      return (
        <div key={item.key} className="group flex items-center">
          <Link
            to={`/#${item.sectionId}`}
            onClick={(e) => handleAnchorClick(e, item.sectionId!)}
            className={common}
          >
            {item.title}
          </Link>
          {showDivider && (
            <span className="mx-1 h-1 w-1 rounded-full bg-slate-400 transition group-hover:scale-125 group-hover:bg-slate-500" />
          )}
        </div>
      );
    }

    return (
      <div key={item.key} className="group flex items-center">
        <a
          href={item.href}
          target={item.target}
          rel={item.external ? "noreferrer noopener" : undefined}
          onClick={() => setOpen(false)}
          className={common}
        >
          {item.title}
        </a>
        {showDivider && (
          <span className="mx-1 h-1 w-1 rounded-full bg-slate-400 transition group-hover:scale-125 group-hover:bg-slate-500" />
        )}
      </div>
    );
  };

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
          {loading && (
            <div className="flex items-center gap-2 mr-4">
              <div className="h-4 w-12 rounded bg-slate-200 animate-pulse" />
              <div className="h-4 w-12 rounded bg-slate-200 animate-pulse" />
              <div className="h-4 w-12 rounded bg-slate-200 animate-pulse" />
            </div>
          )}
          {items.map((item, idx) => renderLink(item, idx < items.length - 1))}
          <div className="ml-4">
            <LanguageToggle />
          </div>
        </nav>

        {/* Mobile toggle */}
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
              {items.map((item) =>
                item.sectionId ? (
                  <Link
                    key={item.key}
                    to={`/#${item.sectionId}`}
                    onClick={(e) => {
                      handleAnchorClick(e, item.sectionId!);
                      setOpen(false);
                    }}
                    className="block py-3 text-center text-sm text-slate-600 hover:text-slate-900 transition border-b border-slate-100 last:border-0"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <a
                    key={item.key}
                    href={item.href}
                    target={item.target}
                    rel={item.external ? "noreferrer noopener" : undefined}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-center text-sm text-slate-600 hover:text-slate-900 transition border-b border-slate-100 last:border-0"
                  >
                    {item.title}
                  </a>
                )
              )}
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