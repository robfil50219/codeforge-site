// src/components/Work.tsx
import { useTranslation } from "../lib/t";

type Project = {
  title: string;
  blurb: string;
  tags: string[];
  image: string;
  href?: string;
};

export default function Work() {
  const { t } = useTranslation();

  const projects: Project[] = [
    {
      title: t("work.cards.dashboard.title") as string,
      blurb: t("work.cards.dashboard.blurb") as string,
      tags: t("work.cards.dashboard.tags") as string[],
      image:
        "https://images.unsplash.com/photo-1551281044-8a5a39c9b638?q=80&w=1600&auto=format&fit=crop",
      href: "#",
    },
    {
      title: t("work.cards.landing.title") as string,
      blurb: t("work.cards.landing.blurb") as string,
      tags: t("work.cards.landing.tags") as string[],
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
      href: "#",
    },
    {
      title: t("work.cards.storefront.title") as string,
      blurb: t("work.cards.storefront.blurb") as string,
      tags: t("work.cards.storefront.tags") as string[],
      image:
        "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop",
      href: "#",
    },
    {
      title: t("work.cards.docs.title") as string,
      blurb: t("work.cards.docs.blurb") as string,
      tags: t("work.cards.docs.tags") as string[],
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
      href: "#",
    },
  ];

  return (
    <section id="work" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {t("work.heading") as string}
          </h2>
          <p className="mt-3 text-slate-600">{t("work.sub") as string}</p>
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
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{p.blurb}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((tTag) => (
                    <span
                      key={tTag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
                    >
                      {tTag}
                    </span>
                  ))}
                </div>

                <div className="mt-5">
                  <a
                    href={p.href || "#"}
                    className="inline-flex items-center rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
                  >
                    {t("work.view") as string}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}