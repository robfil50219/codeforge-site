// src/components/Contact.tsx
import { Mail, Github, Linkedin, Clock, MapPin } from "lucide-react";
import { MAILTO, CONTACT_EMAIL } from "../config/contact";
import Container from "./ui/Container";
import { useTranslation } from "../lib/t";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-transparent"
      aria-labelledby="contact-heading"
    >

      <Container className="py-20">
        {/* Overskrift */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="contact-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            {t("contact.heading") as string}
          </h2>

          <p className="mt-3 text-slate-600">
            {t("contact.copy") as string}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
              <Clock className="h-4 w-4" />
              <span>{t("contact.trust.reply") as string}</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
              <MapPin className="h-4 w-4" />
              <span>{t("contact.trust.location") as string}</span>
            </span>
          </div>
        </div>

        {/* Kontakt-kort */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* E-post */}
          <a
            href={MAILTO}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl bg-sky-100 transition duration-300 group-hover:scale-125"
            />
            <div className="relative flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 ring-1 ring-sky-100">
                <Mail className="h-5 w-5 text-sky-600" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {t("contact.email") as string}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{CONTACT_EMAIL}</p>
              </div>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/robfil50219"
            target="_blank"
            rel="noreferrer noopener"
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl bg-slate-100 transition duration-300 group-hover:scale-125"
            />
            <div className="relative flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-200">
                <Github className="h-5 w-5 text-slate-700" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {t("contact.github") as string}
                </h3>
                <p className="mt-1 text-sm text-slate-600">@robfil50219</p>
              </div>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/robert-filep-417146264"
            target="_blank"
            rel="noreferrer noopener"
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rotate-12 rounded-3xl bg-[#eef5fc] transition duration-300 group-hover:scale-125"
            />
            <div className="relative flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef5fc] ring-1 ring-[#d7e8fb]">
                <Linkedin className="h-5 w-5 text-[#0a66c2]" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {t("contact.linkedin") as string}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
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