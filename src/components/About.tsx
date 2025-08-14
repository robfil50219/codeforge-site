export default function About() {
  return (
    <section id="about" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <div className="w-56 h-56 rounded-full overflow-hidden shadow-lg">
              <img
                src="https://via.placeholder.com/300"
                alt="Profile placeholder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              About Me
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Hi, I’m <span className="font-semibold">[Your Name]</span>, a
              passionate front-end developer and founder of CodeForge Studio.
              I specialize in crafting clean, modern, and responsive web
              experiences. I love turning ideas into interactive, user-friendly
              digital products.
            </p>

            {/* Tech stack */}
            <div className="mt-6 flex flex-wrap gap-3">
              {["React", "TypeScript", "TailwindCSS", "Vite"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm rounded-full bg-slate-100 text-slate-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}