export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">

          {/* LEFT: Text */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase">
              CodeForge Studio
            </p>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Design & build modern web apps
            </h1>

            <p className="mt-5 text-lg leading-7 text-slate-600 max-w-xl">
              We craft fast, accessible, and beautiful front-ends with React and TypeScript.
              Clean code, crisp UX, shipped with care.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-white font-medium hover:bg-sky-700 transition"
              >
                View Services
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-slate-700 font-medium hover:bg-slate-100 transition"
              >
                See Work
              </a>
            </div>

            {/* Small trust row (optional) */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <span>Performance-first</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>Accessible UI</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>TypeScript everywhere</span>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className="relative">
            {/* Decorative blob behind image */}
            <div className="pointer-events-none absolute -top-10 -right-10 -z-10 h-56 w-56 rounded-full bg-sky-200 blur-3xl opacity-60" />
            <div className="pointer-events-none absolute bottom-0 -left-6 -z-10 h-48 w-48 rounded-full bg-indigo-200 blur-3xl opacity-60" />

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <img
                src="/hero.jpg"
                alt="Developer workspace"
                className="h-72 w-full object-cover sm:h-96"
                loading="eager"
              />
            </div>

            {/* Caption */}
            <p className="mt-3 text-center text-sm text-slate-500">
              Real-time UI, clean architecture, and pixel-perfect details.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}