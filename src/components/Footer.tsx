import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MAILTO, CONTACT_EMAIL } from "../config/contact";
import { resetConsent } from "../utils/consent";
import Container from "./ui/Container";
import useSmoothScroll from "../hooks/useSmoothScroll";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const { handleAnchorClick } = useSmoothScroll(80);
  const year = new Date().getFullYear();

  const nav = [
    { id: "services", label: t("nav.services") },
    { id: "pricing", label: t("nav.pricing") },
    { id: "about", label: t("nav.about") },
    { id: "contact", label: t("nav.contact") },
  ] as const;

  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <Container className="py-10">
        {/* Top: brand + nav + socials */}
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
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
              <span className="text-xl sm:text-2xl">{t("brand").toUpperCase()}</span>
            </Link>
            <p className="mt-3 text-sm text-slate-600">{t("hero.tagline")}</p>
          </div>

          {/* Quick links */}
          <nav aria-label={t("footer.navLabel")} className="sm:justify-self-center">
            <ul className="space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.id}>
                  <Link
                    to={"/#" + item.id}
                    onClick={(e) => handleAnchorClick(e, item.id)}
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
            <div className="text-sm font-medium text-slate-900">{t("footer.connect")}</div>
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
            © {year} CodeForge Studio. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-slate-700">
              {t("footer.privacy")}
            </Link>
            <Link to="/terms" className="hover:text-slate-700">
              {t("footer.terms")}
            </Link>
            <button
              key={i18n.language}
              type="button"
              onClick={resetConsent}
              className="text-slate-500 hover:text-slate-700 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded"
              aria-label={t("consent.manage")}
            >
              {t("consent.manage")}
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}