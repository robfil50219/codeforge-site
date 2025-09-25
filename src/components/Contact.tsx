import { Mail, Github, Linkedin, Clock, MapPin } from "lucide-react";
import { MAILTO, CONTACT_EMAIL } from "../config/contact";
import ContactForm from "./ContactForm";
import Container from "./ui/Container";
import { useTranslation } from "../lib/t";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="scroll-mt-24 relative bg-white"
      aria-labelledby="contact-heading"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-sky-100/60 blur-3xl" />
      </div>

      <Container className="py-20">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="contact-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            {t("contact.heading") as string}
          </h2>
          <p className="mt-3 text-slate-600">{t("contact.copy") as string}</p>

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

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Form in CTA panel */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-sky-50 to-indigo-50 p-6 sm:p-10">
          <div className="mx-auto max-w-3xl">
            <h3 className="text-xl font-semibold text-slate-900 text-center">
              {t("contact.formTitle") as string}
            </h3>
            <p className="mt-2 text-slate-600 text-center">
              {t("contact.formCopy") as string}
            </p>

            <div className="mt-8">
              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}