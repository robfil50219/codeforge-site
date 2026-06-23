// src/components/Footer.tsx
/**
 * -------------------------------------------------------
 *  CodeForge Studio — Proprietary Source Code
 *  © 2025 CodeForge Studio Filep. All rights reserved.
 * -------------------------------------------------------
 */
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { MAILTO, CONTACT_EMAIL } from "../config/contact";
import { resetConsent } from "../utils/consent";
import Container from "./ui/Container";
import { useTranslation } from "../lib/t";
import { renderBrandSafe } from "../utils/notranslate";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-(--bg-page) text-(--text-page) border-t border-(--card-border) pt-4">
      <Container className="py-8">
        {/* Top: brand left, contact right */}
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          {/* Brand row (flame + tagline) */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Til forsiden"
              className="shrink-0 inline-flex"
            >
              <img
                src={`${import.meta.env.BASE_URL}favicon2.png`}
                alt="CodeForge Studio flame logo"
                className="h-16 w-16 select-none pointer-events-none animate-[cfs-pulse_2.5s_ease-in-out_infinite]"
                loading="lazy"
                draggable={false}
              />
            </Link>

            <p className="text-sm text-(--text-dim) leading-snug max-w-xl">
              {renderBrandSafe(t("hero.tagline") as string)}
            </p>
          </div>

          {/* Contact block */}
          <div className="max-w-xs md:justify-self-end">
            <div className="text-sm font-semibold text-(--text-heading)">
              {t("footer.connect") as string}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <a
                href="https://github.com/robfil50219"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-(--card-bg) border border-(--card-border) shadow-sm hover:shadow-lg transition"
              >
                <Github className="h-5 w-5 text-(--text-heading)" />
              </a>
              <a
                href="https://www.linkedin.com/in/robert-filep-417146264"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-(--card-bg) border border-(--card-border) shadow-sm hover:shadow-lg transition"
              >
                <Linkedin className="h-5 w-5 text-(--color-brand-sea)" />
              </a>
              <a
                href={MAILTO}
                aria-label={`${t("contact.email") as string} ${CONTACT_EMAIL}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-(--card-bg) border border-(--card-border) shadow-sm hover:shadow-lg transition"
              >
                <Mail className="h-5 w-5 text-(--color-brand-sea)" />
              </a>
            </div>
            <p className="mt-2 break-all text-xs text-(--text-dim)">{CONTACT_EMAIL}</p>
          </div>
        </div>

        {/* Divider & bottom row */}
        <div className="mt-6 border-t border-(--card-border) pt-4 flex flex-col gap-2 text-xs text-(--text-dim) md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-1 flex-wrap">
            © {year} <span className="notranslate" translate="no">CodeForgeStudio</span>. {t("footer.rights") as string} {t("footer.designedBy") as string}{" "}
            <a
              href="https://codeforgestudio.no"
              target="_blank"
              rel="noreferrer"
              className="text-(--color-brand-sea) hover:underline"
            >
              <span className="notranslate" translate="no">CodeForgeStudio</span>
            </a>
            . {t("footer.hostedBy") as string}{" "}
            <a
              href="https://www.netlify.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:opacity-90 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/97/Netlify_logo_%282%29.svg"
                alt="Netlify"
                className="h-6 w-auto"
                loading="lazy"
              />
              <span className="sr-only notranslate" translate="no">Netlify</span>
            </a>
            .
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link to="/privacy" className="hover:text-(--text-heading) transition">
              {t("footer.privacy") as string}
            </Link>
            <Link to="/terms" className="hover:text-(--text-heading) transition">
              {t("footer.terms") as string}
            </Link>
            <button
              type="button"
              onClick={resetConsent}
              className="hover:text-(--text-heading) transition"
            >
              {t("consent.manage") as string}
            </button>
          </div>
        </div>
      </Container>

      {/* Scoped keyframes for the subtle flame pulse */}
      <style>{`
        @keyframes cfs-pulse {
          0%   { transform: scale(1);   filter: drop-shadow(0 0 0px rgba(255,140,0,0)); }
          50%  { transform: scale(1.04); filter: drop-shadow(0 0 10px rgba(255,140,0,0.45)); }
          100% { transform: scale(1);   filter: drop-shadow(0 0 0px rgba(255,140,0,0)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-[cfs-pulse_2.5s_ease-in-out_infinite] {
            animation: none !important;
          }
        }
      `}</style>
    </footer>
  );
}
