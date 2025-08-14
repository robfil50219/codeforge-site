export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Let’s build something great
          </h2>
          <p className="mt-3 text-slate-600">
            Tell me about your project — goals, timeline, and budget. I’ll follow up with a plan and next steps.
          </p>
        </div>

        {/* Contact cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="mailto:you@example.com"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h3 className="text-base font-semibold text-slate-900">Email</h3>
            <p className="mt-2 text-sm text-slate-600">you@example.com</p>
          </a>

          <a
            href="https://github.com/your-handle"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h3 className="text-base font-semibold text-slate-900">GitHub</h3>
            <p className="mt-2 text-sm text-slate-600">@your-handle</p>
          </a>

          <a
            href="https://www.linkedin.com/in/your-handle"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h3 className="text-base font-semibold text-slate-900">LinkedIn</h3>
            <p className="mt-2 text-sm text-slate-600">/in/your-handle</p>
          </a>
        </div>

        {/* Simple CTA */}
        <div className="mt-12 text-center">
          <a
            href="mailto:you@example.com"
            className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-white font-medium hover:bg-sky-700 transition"
          >
            Start a project
          </a>
        </div>
      </div>
    </section>
  );
}