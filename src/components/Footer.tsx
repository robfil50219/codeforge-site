// src/components/Footer.tsx
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { MAILTO, CONTACT_EMAIL } from "../config/contact";
import { resetConsent } from "../utils/consent";
import Container from "./ui/Container";
import { useTranslation } from "../lib/t";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-(--bg-page) text-(--text-page) border-t border-(--card-border)">
      <Container className="py-8">
        {/* Top section */}
        <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
          {/* Brand */}
          <div>
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-(--text-heading)"
              aria-label="Til forsiden"
            >
              <img
                src={`${import.meta.env.BASE_URL}favicon.png`}
                alt="CodeForge Studio logo"
                className="h-12 w-12"
              />
              <span className="text-xl sm:text-2xl">
                {(t("brand") as string).toUpperCase()}
              </span>
            </Link>
            <p className="mt-2 max-w-md text-sm text-(--text-dim)">
              {t("hero.tagline") as string}
            </p>
          </div>

          {/* Contact */}
          <div className="max-w-xs lg:justify-self-end">
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
                aria-label={`Email ${CONTACT_EMAIL}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-(--card-bg) border border-(--card-border) shadow-sm hover:shadow-lg transition"
              >
                <Mail className="h-5 w-5 text-(--color-brand-sea)" />
              </a>
            </div>
            <p className="mt-2 break-all text-xs text-(--text-dim)">
              {CONTACT_EMAIL}
            </p>
          </div>
        </div>

        {/* Divider & bottom section */}
        <div className="mt-6 border-t border-(--card-border) pt-4 flex flex-col gap-2 text-xs text-(--text-dim) md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-1 flex-wrap">
            © {year} CodeForge Studio. Alle rettigheter forbeholdt. Designet og utviklet av{" "}
            <a
              href="https://codeforgestudio.no"
              target="_blank"
              rel="noreferrer"
              className="text-(--color-brand-sea) hover:underline"
            >
              CodeForge Studio
            </a>
            . Driftet av{" "}
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
              <span className="sr-only">Netlify</span>
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
    </footer>
  );
}