import {
  EnvelopeIcon,
  CodeBracketIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Let’s build something great
          </h2>
          <p className="mt-3 text-slate-600">
            Tell me about your project — goals, timeline, and budget. I’ll
            follow up with a plan and next steps.
          </p>
        </div>

        {/* Contact cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="mailto:robert.codeforgestudio@gmail.com"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md flex flex-col items-center text-center"
          >
            <EnvelopeIcon className="h-8 w-8 text-sky-600" />
            <h3 className="mt-3 text-base font-semibold text-slate-900">
              Email
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              robert.codeforgestudio@gmail.com
            </p>
          </a>

          <a
            href="https://github.com/robfil50219"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md flex flex-col items-center text-center"
          >
            <CodeBracketIcon className="h-8 w-8 text-sky-600" />
            <h3 className="mt-3 text-base font-semibold text-slate-900">
              GitHub
            </h3>
            <p className="mt-2 text-sm text-slate-600">@robfil50219</p>
          </a>

          <a
            href="https://www.linkedin.com/in/robert-filep-417146264"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md flex flex-col items-center text-center"
          >
            <BriefcaseIcon className="h-8 w-8 text-sky-600" />
            <h3 className="mt-3 text-base font-semibold text-slate-900">
              LinkedIn
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              linkedin.com/in/robert-filep-417146264
            </p>
          </a>
        </div>

        {/* Simple CTA */}
        <div className="mt-12 text-center">
          <a
            href="mailto:robert.codeforgestudio@gmail.com"
            className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-white font-medium hover:bg-sky-700 transition"
          >
            Start a project
          </a>
        </div>
      </div>
    </section>
  );
}