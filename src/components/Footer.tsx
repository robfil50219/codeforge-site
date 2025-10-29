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
    <footer
      className={[
        "w-full",
        // theme-aware background + text
        "bg-(--bg-page) text-(--text-page)",
        // subtle top border
        "border-t border-(--card-border)",
      ].join(" ")}
    >
      <Container className="py-12">
        {/* TOP ROW */}
        <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
          {/* BRAND */}
          <div>
            <Link
              to="/"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-(--text-heading)"
              aria-label="Back to home"
            >
              <img
                src={`${import.meta.env.BASE_URL}favicon.png`}
                alt="CodeForge Studio logo"
                className="h-12 w-12 sm:h-14 sm:w-14"
              />
              <span className="text-xl sm:text-2xl">
                {(t("brand") as string).toUpperCase()}
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-(--text-dim)">
              {t("hero.tagline") as string}
            </p>
          </div>

          {/* CONTACT */}
          <div className="max-w-xs lg:justify-self-end">
            <div className="text-sm font-semibold text-(--text-heading)">
              {t("footer.connect") as string}
            </div>

            <div className="mt-4 flex items-center gap-3">
              {/* GitHub */}
              <a
                href="https://github.com/robfil50219"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className={[
                  "inline-flex h-10 w-10 items-center justify-center rounded-lg",
                  "bg-(--card-bg) border border-(--card-border)",
                  "shadow-sm transition hover:shadow-lg",
                ].join(" ")}
              >
                <Github className="h-5 w-5 text-(--text-heading)" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/robert-filep-417146264"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className={[
                  "inline-flex h-10 w-10 items-center justify-center rounded-lg",
                  "bg-(--card-bg) border border-(--card-border)",
                  "shadow-sm transition hover:shadow-lg",
                ].join(" ")}
              >
                <Linkedin className="h-5 w-5 text-(--color-brand-sea)" />
              </a>

              {/* Email */}
              <a
                href={MAILTO}
                aria-label={`Email ${CONTACT_EMAIL}`}
                className={[
                  "inline-flex h-10 w-10 items-center justify-center rounded-lg",
                  "bg-(--card-bg) border border-(--card-border)",
                  "shadow-sm transition hover:shadow-lg",
                ].join(" ")}
              >
                <Mail className="h-5 w-5 text-(--color-brand-sea)" />
              </a>
            </div>

            <p className="mt-4 break-all text-xs text-(--text-dim)">
              {CONTACT_EMAIL}
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-10 border-t border-(--card-border) pt-6" />

        {/* BOTTOM ROW */}
        <div className="flex flex-col gap-4 text-xs text-(--text-dim) md:flex-row md:items-center md:justify-between">
          <p>
            © {year} CodeForge Studio. {t("footer.rights") as string}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              to="/privacy"
              className="transition hover:text-(--text-heading)"
            >
              {t("footer.privacy") as string}
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-(--text-heading)"
            >
              {t("footer.terms") as string}
            </Link>

            <button
              type="button"
              onClick={resetConsent}
              className={[
                "cursor-pointer rounded",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-(--card-border)",
                "transition hover:text-(--text-heading)",
              ].join(" ")}
              aria-label={t("consent.manage") as string}
            >
              {t("consent.manage") as string}
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}