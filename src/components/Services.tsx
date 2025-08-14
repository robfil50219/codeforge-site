export default function Services() {
  const items = [
    {
      title: "Frontend Engineering",
      desc: "React/Next.js/Angular, TypeScript, API integration, testing, and clean architecture.",
    },
    {
      title: "Design & UX",
      desc: "Wireframes to polished UI. Accessible, responsive, and fast to ship.",
    },
    {
      title: "Performance",
      desc: "Core Web Vitals, image optimization, lazy loading, and CI/CD-ready builds.",
    },
  ];

  return (
    <section id="services" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Services
          </h2>
          <p className="mt-3 text-slate-600">What I build and how I help.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <article
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}