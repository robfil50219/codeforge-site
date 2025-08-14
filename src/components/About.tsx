import { useRef } from "react";
import profileImg from "../assets/profile.jpg";

export default function About() {
  const coinRef = useRef<HTMLDivElement>(null);

  const spin = () => {
    const el = coinRef.current;
    if (!el) return;

    // cancel any in-progress animation
    el.getAnimations().forEach(a => a.cancel());

    // 3-second spin that decelerates and ends perfectly aligned
    el.animate(
      [
        { transform: "rotateY(0turn)" },
        { offset: 0.60, transform: "rotateY(7turn)" },    // fast early
        { offset: 0.80, transform: "rotateY(7.5turn)" },  // slowing
        { offset: 0.90, transform: "rotateY(7.75turn)" }, // slower
        { transform: "rotateY(8turn)" },                  // final alignment
      ],
      {
        duration: 3000,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)", // smooth decel
        fill: "none",  // revert to original (no leftover transform)
      }
    );
  };

  return (
    <section id="about" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <div
              ref={coinRef}
              onClick={spin}
              className="w-56 h-56 rounded-full overflow-hidden shadow-lg cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                // 3D polish: add perspective on the parent block if you want more depth
              }}
              title="Click to spin"
            >
              <img
                src={profileImg}
                alt="Robert Filep"
                className="w-full h-full object-cover"
                style={{ backfaceVisibility: "hidden" }}
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              About Me
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Hi, I’m <span className="font-semibold">Robert Filep</span>, a front‑end developer and founder of CodeForge Studio.
              I specialize in crafting clean, modern, and responsive web experiences.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["React", "TypeScript", "TailwindCSS", "Vite"].map((t) => (
                <span key={t} className="px-3 py-1 text-sm rounded-full bg-slate-100 text-slate-800">
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