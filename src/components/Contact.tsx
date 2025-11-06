/**
 * -------------------------------------------------------
 *  CodeForge Studio — Proprietary Source Code
 *  © 2025 CodeForge Studio Filep. All rights reserved.
 *
 *  This file is part of the CodeForge Studio website.
 *  Unauthorized copying, modification, or distribution
 *  of this file, via any medium, is strictly prohibited.
 *
 *  For licensing or collaboration inquiries:
 *  robert@codeforgestudio.no | https://codeforgestudio.no
 * -------------------------------------------------------
 */
// src/components/Contact.tsx
import { Mail, Github, Linkedin, Clock, MapPin } from "lucide-react";
import { MAILTO, CONTACT_EMAIL } from "../config/contact";
import Container from "./ui/Container";
import { useTranslation } from "../lib/t";
import { cn } from "../utils/cn";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className={cn(
        "scroll-mt-24 bg-transparent",
        // default text color uses tokens
        "text-body dark:text-(--text-page)"
      )}
      aria-labelledby="contact-heading"
    >
      <Container className="py-20">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="contact-heading"
            className={cn(
              "text-3xl font-extrabold tracking-tight sm:text-4xl",
              "text-slate-900 dark:text-(--text-heading)"
            )}
          >
            {t("contact.heading") as string}
          </h2>

          <p
            className={cn(
              "mt-3",
              "text-slate-600 dark:text-(--text-dim)"
            )}
          >
            {t("contact.copy") as string}
          </p>

          {/* trust row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            {/* reply speed */}
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1 ring-1",
                // light
                "bg-slate-100 text-slate-600 ring-slate-200",
                // dark
                "dark:bg-[rgba(255,255,255,0.05)] dark:text-(--text-dim) dark:ring-(--card-border)"
              )}
            >
              <Clock className="h-4 w-4 text-slate-500 dark:text-(--text-dim)" />
              <span>{t("contact.trust.reply") as string}</span>
            </span>

            {/* location */}
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1 ring-1",
                // light
                "bg-slate-100 text-slate-600 ring-slate-200",
                // dark
                "dark:bg-[rgba(255,255,255,0.05)] dark:text-(--text-dim) dark:ring-(--card-border)"
              )}
            >
              <MapPin className="h-4 w-4 text-slate-500 dark:text-(--text-dim)" />
              <span>{t("contact.trust.location") as string}</span>
            </span>
          </div>
        </div>

        {/* Contact cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Email */}
          <a
            href={MAILTO}
            className={cn(
              "group relative overflow-hidden rounded-2xl p-6 transition",
              "surface-card",
              // light card
              "bg-white border border-slate-200",
              // dark card
              "dark:bg-(--card-bg) dark:border-(--card-border)"
            )}
          >
            {/* corner blob */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl transition duration-300 group-hover:scale-125",
                // light blob
                "bg-sky-100",
                // dark blob (teal-ish tint)
                "dark:bg-[rgba(0,160,160,0.12)] group-hover:dark:bg-[rgba(0,160,160,0.18)]"
              )}
            />
            <div className="relative flex items-start gap-4">
              {/* icon chip */}
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl ring-1",
                  // light chip
                  "bg-sky-50 ring-sky-100",
                  // dark chip: translucent teal glass on dark
                  "dark:bg-[rgba(0,160,160,0.08)] dark:ring-(--card-border)"
                )}
              >
                <Mail className={cn("h-5 w-5", "text-sky-600 dark:text-(--color-brand-sea)")} />
              </span>

              <div>
                <h3
                  className={cn(
                    "text-base font-semibold",
                    "text-slate-900 dark:text-(--text-heading)"
                  )}
                >
                  {t("contact.email") as string}
                </h3>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    "text-slate-600 dark:text-(--text-dim)"
                  )}
                >
                  {CONTACT_EMAIL}
                </p>
              </div>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/robfil50219"
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              "group relative overflow-hidden rounded-2xl p-6 transition",
              "surface-card",
              "bg-white border border-slate-200",
              "dark:bg-(--card-bg) dark:border-(--card-border)"
            )}
          >
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl transition duration-300 group-hover:scale-125",
                "bg-slate-100",
                "dark:bg-[rgba(255,255,255,0.05)] group-hover:dark:bg-[rgba(255,255,255,0.08)]"
              )}
            />
            <div className="relative flex items-start gap-4">
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl ring-1",
                  "bg-slate-50 ring-slate-200",
                  "dark:bg-[rgba(255,255,255,0.05)] dark:ring-(--card-border)"
                )}
              >
                <Github className={cn("h-5 w-5", "text-slate-700 dark:text-(--text-heading)")} />
              </span>

              <div>
                <h3
                  className={cn(
                    "text-base font-semibold",
                    "text-slate-900 dark:text-(--text-heading)"
                  )}
                >
                  {t("contact.github") as string}
                </h3>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    "text-slate-600 dark:text-(--text-dim)"
                  )}
                >
                  @robfil50219
                </p>
              </div>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/robert-filep-417146264"
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              "group relative overflow-hidden rounded-2xl p-6 transition",
              "surface-card",
              "bg-white border border-slate-200",
              "dark:bg-(--card-bg) dark:border-(--card-border)"
            )}
          >
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl transition duration-300 group-hover:scale-125",
                "bg-[#eef5fc]",
                "dark:bg-[rgba(10,102,194,0.12)] group-hover:dark:bg-[rgba(10,102,194,0.2)]"
              )}
            />
            <div className="relative flex items-start gap-4">
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl ring-1",
                  "bg-[#eef5fc] ring-[#d7e8fb]",
                  "dark:bg-[rgba(10,102,194,0.12)] dark:ring-(--card-border)"
                )}
              >
                <Linkedin className={cn("h-5 w-5", "text-[#0a66c2] dark:text-[#4da6ff]")} />
              </span>

              <div>
                <h3
                  className={cn(
                    "text-base font-semibold",
                    "text-slate-900 dark:text-(--text-heading)"
                  )}
                >
                  {t("contact.linkedin") as string}
                </h3>
                <p
                  className={cn(
                    "mt-1 text-sm break-all", // wrap URL nicely on small screens
                    "text-slate-600 dark:text-(--text-dim)"
                  )}
                >
                  linkedin.com/in/robert-filep-417146264
                </p>
              </div>
            </div>
          </a>
        </div>
      </Container>
    </section>
  );
}
