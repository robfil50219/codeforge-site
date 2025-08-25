// src/components/Footer.tsx
import { Link, useLocation } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MAILTO, CONTACT_EMAIL } from "../config/contact";
import { resetConsent } from "../utils/consent";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const location = useLocation();

  const nav = [
    { to: "/", hash: "#services", label: t("nav.services") },
    { to: "/", hash: "#pricing", label: t("nav.pricing") },
    { to: "/", hash: "#about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const handleSmoothScroll = (
    e: React.MouseEvent,
    to: string,
    hash?: string
  ) => {
    if (hash && to === "/") {
      e.preventDefault();
      if (location.pathname === "/") {
        const id = hash.replace("#", "");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `${to}${hash}`; // navigate home with anchor
      }
    }
  };

  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Top: brand + nav + socials */}
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand (header-style: icon + brand text) */}
          <div>
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-slate-900"
              aria-label="Back to home"
            >
              <img
                src={`${import.meta.env.BASE_URL}favicon.png`}
                alt="CodeForge Studio logo"
                className="h-12 w-12 sm:h-14 sm:w-14"
              />
              <span className="text-xl sm:text-2xl">{t("brand")}</span>
            </Link>
            <p className="mt-3 text-sm text-slate-600">{t("hero.tagline")}</p>
          </div>

          {/* Quick links */}
          <nav
            aria-label={t("footer.navLabel", {
              defaultValue: "Footer navigation",
            })}
            className="sm:justify-self-center"
          >
            <ul className="space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to + (item.hash || "")}
                    onClick={(e) => handleSmoothScroll(e, item.to, item.hash)}
                    className="text-slate-600 hover:text-slate-900 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="sm:justify-self-end">
            <div className="text-sm font-medium text-slate-900">
              {t("footer.connect", { defaultValue: "Connect" })}
            </div>
            <ul className="mt-3 flex items-center gap-3">
              <li>
                <a
                  href="https://github.com/robfil50219"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
                >
                  <Github className="h-5 w-5 text-slate-700" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/robert-filep-417146264"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
                >
                  <Linkedin className="h-5 w-5 text-[#0a66c2]" />
                </a>
              </li>
              <li>
                <a
                  href={MAILTO}
                  aria-label={`Email ${CONTACT_EMAIL}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
                >
                  <Mail className="h-5 w-5 text-sky-600" />
                </a>
              </li>
            </ul>
            <p className="mt-3 text-xs text-slate-500">{CONTACT_EMAIL}</p>
          </div>
        </div>

        {/* Bottom: legal line */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} CodeForge Studio.{" "}
            {t("footer.rights", { defaultValue: "All rights reserved." })}
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-slate-700">
              {t("footer.privacy", { defaultValue: "Privacy" })}
            </Link>
            <Link to="/terms" className="hover:text-slate-700">
              {t("footer.terms", { defaultValue: "Terms" })}
            </Link>
            {/* Manage cookies */}
            <button
              type="button"
              onClick={resetConsent}
              className="text-slate-500 hover:text-slate-700 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded"
              aria-label={t("consent.manage", {
                defaultValue: "Manage cookies",
              })}
            >
              {t("consent.manage", { defaultValue: "Manage cookies" })}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}