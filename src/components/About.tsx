import profileImg from "../assets/profile.jpg";

export default function About() {
  return (
    <section id="about" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Photo */}
          <div className="flex justify-center">
            <div className="relative">
              {/* soft glow */}
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-full bg-sky-200/50 blur-2xl" />
              <img
                src={profileImg}
                alt="Robert Filep"
                className="h-56 w-56 rounded-full object-cover shadow-xl ring-4 ring-white"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase">
              About
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Building clean, fast, user-friendly UIs
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              I’m <span className="font-semibold">Robert Filep</span>, a front-end developer and founder of
              <span className="font-semibold"> CodeForge Studio</span>. I design and build responsive,
              accessible interfaces with React + TypeScript and a strong eye for detail.
            </p>

            {/* Highlights */}
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Performance-first mindset",
                "Accessible by default",
                "TypeScript everywhere",
                "Pixel-perfect execution",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Tech chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["React", "TypeScript", "TailwindCSS", "Vite"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}