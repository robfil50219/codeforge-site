type Project = {
  title: string;
  blurb: string;
  tags: string[];
  image: string;
  href?: string;
};

const projects: Project[] = [
  {
    title: "Dashboard Pro",
    blurb: "Analytics dashboard with charts, filters, and real‑time data.",
    tags: ["React", "TypeScript", "Vite"],
    image:
      "https://images.unsplash.com/photo-1551281044-8a5a39c9b638?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
  {
    title: "Landing Kit",
    blurb: "High‑conversion landing page with A/B testing hooks.",
    tags: ["Tailwind", "Accessibility", "SEO"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
  {
    title: "Storefront UI",
    blurb: "Fast e‑commerce front‑end with cart and checkout.",
    tags: ["SPA", "State Mgmt", "API"],
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
  {
    title: "Docs Engine",
    blurb: "Searchable docs site with live code examples.",
    tags: ["MDX", "Search", "Perf"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
];

export default function Work() {
  return (
    <section id="work" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Selected Work
          </h2>
          <p className="mt-3 text-slate-600">
            A few highlights from recent projects.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {/* subtle gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-slate-900">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{p.blurb}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5">
                  <a
                    href={p.href || "#"}
                    className="inline-flex items-center rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                  >
                    View project
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-white font-medium hover:bg-sky-700 transition"
          >
            Start your project
          </a>
        </div>
      </div>
    </section>
  );
}