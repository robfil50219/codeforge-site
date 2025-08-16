import {
  SwatchIcon,
  CodeBracketSquareIcon,
  BoltIcon,
  CommandLineIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

type Service = {
  title: string;
  blurb: string;
  points: string[];
  icon: React.ElementType;
};

const services: Service[] = [
  {
    title: "UI/UX Design",
    blurb:
      "Simple, modern interfaces that put the user first and feel great to use.",
    points: ["Design systems", "Wireframes & mockups", "Interactive prototypes"],
    icon: SwatchIcon,
  },
  {
    title: "Frontend Development",
    blurb:
      "Production-ready React + TypeScript with clean, maintainable structure.",
    points: ["Component libraries", "API integration", "Routing & state"],
    icon: CodeBracketSquareIcon,
  },
  {
    title: "Performance & Accessibility",
    blurb:
      "Fast, inclusive experiences that score well and work for everyone.",
    points: ["Core Web Vitals", "WCAG best practices", "Audit & fixes"],
    icon: BoltIcon,
  },
];

const extras: Service[] = [
  {
    title: "CMS & Content",
    blurb: "Hook your UI up to content that’s easy to edit.",
    points: ["Headless CMS", "Markdown/MDX", "Content modeling"],
    icon: CommandLineIcon,
  },
  {
    title: "Responsive & Mobile",
    blurb: "Looks sharp on every device, from phones to 4K monitors.",
    points: ["Mobile-first", "Adaptive layouts", "Touch interactions"],
    icon: DevicePhoneMobileIcon,
  },
  {
    title: "Quality & Security",
    blurb: "Confidence to ship, with checks and guardrails in place.",
    points: ["Type safety", "Lint & tests", "Best-practice hardening"],
    icon: ShieldCheckIcon,
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Services
          </h2>
          <p className="mt-3 text-slate-600">
            Design, build, and polish. From idea to production-ready front-ends.
          </p>
        </div>

        {/* Primary services */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <s.icon className="h-6 w-6 text-sky-600" />
                <h3 className="text-base font-semibold text-slate-900">
                  {s.title}
                </h3>
              </div>
              <p className="mt-3 text-sm text-slate-600">{s.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Extras */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {extras.map((s) => (
            <article
              key={s.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <s.icon className="h-6 w-6 text-sky-600" />
                <h3 className="text-base font-semibold text-slate-900">
                  {s.title}
                </h3>
              </div>
              <p className="mt-3 text-sm text-slate-600">{s.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Process strip */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase text-center">
            Process
          </p>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3 text-center">
            {[
              { step: "1. Discover", text: "Goals, audience, scope" },
              { step: "2. Design", text: "Flows, wireframes, UI" },
              { step: "3. Build & Ship", text: "Code, QA, deploy" },
            ].map((x) => (
              <li key={x.step} className="px-4">
                <div className="text-slate-900 font-semibold">{x.step}</div>
                <div className="text-sm text-slate-600">{x.text}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}