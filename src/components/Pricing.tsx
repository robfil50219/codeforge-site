import { CheckCircle } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Project packages
          </h2>
          <p className="mt-3 text-slate-600">
            From quick launches to full-scale platforms — choose the path that fits your goals.
          </p>
        </div>

        {/* Tiers */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Launch */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Launch Package</h3>
            <p className="mt-1 text-sm text-slate-600">Launch a clean one-pager.</p>
            <div className="mt-4">
              <span className="text-3xl font-extrabold text-slate-900">€799</span>
              <span className="text-slate-500"> / fixed</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              {[
                "1 landing page",
                "Responsive + basic SEO",
                "Contact form or mailto CTA",
                "Deployed to your host",
              ].map((f) => (
                <li key={f} className="flex gap-2 items-start">
                  <CheckCircle className="h-4 w-4 text-sky-500 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="mailto:robert.codeforgestudio@gmail.com?subject=Launch%20Package%20Inquiry"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition"
            >
              Choose Launch
            </a>
          </div>

          {/* Growth (highlighted) */}
          <div className="relative flex flex-col rounded-2xl border-2 border-sky-500 bg-white p-6 shadow-md">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white">
              Most popular
            </span>
            <h3 className="text-base font-semibold text-slate-900">Growth Package</h3>
            <p className="mt-1 text-sm text-slate-600">Full site + components.</p>
            <div className="mt-4">
              <span className="text-3xl font-extrabold text-slate-900">€2,400</span>
              <span className="text-slate-500"> / fixed</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              {[
                "Up to 6 pages",
                "Design system + components",
                "Integrations (forms, CMS, email)",
                "Performance & accessibility pass",
              ].map((f) => (
                <li key={f} className="flex gap-2 items-start">
                  <CheckCircle className="h-4 w-4 text-sky-500 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="mailto:robert.codeforgestudio@gmail.com?subject=Growth%20Package%20Inquiry"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 transition"
            >
              Choose Growth
            </a>
          </div>

          {/* Enterprise */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Enterprise Package</h3>
            <p className="mt-1 text-sm text-slate-600">Complex or ongoing work.</p>
            <div className="mt-4">
              <span className="text-3xl font-extrabold text-slate-900">€? / quote</span>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              {[
                "Advanced features / integrations",
                "E-commerce, auth, dashboards",
                "Roadmap & iterations",
                "Flexible timeline & budget",
              ].map((f) => (
                <li key={f} className="flex gap-2 items-start">
                  <CheckCircle className="h-4 w-4 text-sky-500 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="mailto:robert.codeforgestudio@gmail.com?subject=Enterprise%20Package%20Inquiry"
              className="mt-6 inline-flex items-center justify-center rounded-xl border border-sky-600 px-4 py-2 text-sm font-medium text-sky-600 hover:bg-slate-100 transition"
            >
              Request a quote
            </a>
          </div>
        </div>

        {/* Fine print */}
        <p className="mt-8 text-center text-xs text-slate-500">
          Prices are typical starting points. Final quote depends on scope and integrations.
        </p>
      </div>
    </section>
  );
}