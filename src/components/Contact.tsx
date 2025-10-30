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
        "text-(--text-page)"
      )}
      aria-labelledby="contact-heading"
    >
      <Container className="py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="contact-heading"
            className="text-3xl font-extrabold tracking-tight sm:text-4xl text-(--text-heading)"
          >
            {t("contact.heading") as string}
          </h2>
          <p className="mt-3 text-(--text-dim)">
            {t("contact.copy") as string}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 ring-1 bg-[rgba(246,250,250,0.03)] ring-(--card-border) text-(--text-dim)">
              <Clock className="h-4 w-4 text-(--text-dim)" />
              <span>{t("contact.trust.reply") as string}</span>
            </span>

            <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 ring-1 bg-[rgba(246,250,250,0.03)] ring-(--card-border) text-(--text-dim)">
              <MapPin className="h-4 w-4 text-(--text-dim)" />
              <span>{t("contact.trust.location") as string}</span>
            </span>
          </div>
        </div>

        {/* 👇 keep dark values stable on iOS */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Email */}
          <a
            href={MAILTO}
            className={cn(
              "group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition hover:shadow-lg",
              // light
              "border-slate-200 bg-white",
              // dark → use explicit token
              "dark:border-(--card-border) dark:bg-[color:var(--card-bg)]"
            )}
          >
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl transition duration-300 group-hover:scale-125",
                "bg-sky-100/60",
                "dark:bg-[rgba(0,160,160,0.2)]"
              )}
            />
            <div className="relative flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl ring-1 bg-sky-50 ring-sky-100 dark:bg-[rgba(0,160,160,0.08)] dark:ring-(--card-border)">
                <Mail className="h-5 w-5 text-sky-600 dark:text-(--color-brand-sea)" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-(--text-heading)">
                  {t("contact.email") as string}
                </h3>
                <p className="mt-1 text-sm text-(--text-dim)">{CONTACT_EMAIL}</p>
              </div>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/robfil50219"
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              "group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition hover:shadow-lg",
              "border-slate-200 bg-white",
              "dark:border-(--card-border) dark:bg-[color:var(--card-bg)]"
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl bg-slate-100/50 dark:bg-[rgba(246,250,250,0.03)] transition duration-300 group-hover:scale-125"
            />
            <div className="relative flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl ring-1 bg-slate-50 ring-slate-200 dark:bg-[rgba(246,250,250,0.05)] dark:ring-(--card-border)">
                <Github className="h-5 w-5 text-slate-700 dark:text-(--text-page)" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-(--text-heading)">
                  {t("contact.github") as string}
                </h3>
                <p className="mt-1 text-sm text-(--text-dim)">@robfil50219</p>
              </div>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/robert-filep-417146264"
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              "group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition hover:shadow-lg",
              "border-slate-200 bg-white",
              "dark:border-(--card-border) dark:bg-[color:var(--card-bg)]"
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl bg-[#eef5fc]/80 dark:bg-[rgba(13,148,190,0.14)] transition duration-300 group-hover:scale-125"
            />
            <div className="relative flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl ring-1 bg-[#eef5fc] ring-[#d7e8fb] dark:bg-[rgba(13,148,190,0.12)] dark:ring-(--card-border)">
                <Linkedin className="h-5 w-5 text-[#0a66c2] dark:text-[#4da6ff]" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-(--text-heading)">
                  {t("contact.linkedin") as string}
                </h3>
                <p className="mt-1 text-sm break-all text-(--text-dim)">
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