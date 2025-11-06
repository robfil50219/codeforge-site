import { useEffect, useState } from "react";

/**
 * Splash screen with pulsating flame logo + shimmer bar.
 * Uses the same flame mark as your navbar (favicon2.png).
 */
export default function Splash() {
  const [fade, setFade] = useState(false);

  // Use your actual logo in /public
  const logoSrc = "/favicon2.png";

  useEffect(() => {
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const startFade = setTimeout(() => setFade(true), 1200);
    const remove = setTimeout(() => {
      const el = document.getElementById("cfs-react-splash");
      if (el) el.style.display = "none";
      document.documentElement.style.overflow = original;
    }, 1800);

    return () => {
      clearTimeout(startFade);
      clearTimeout(remove);
      document.documentElement.style.overflow = original;
    };
  }, []);

  return (
    <div
      id="cfs-react-splash"
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-50 grid place-items-center bg-white dark:bg-[#0B0F12] transition-opacity duration-700 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* 🔥 Pulsating flame logo */}
        <img
          src={logoSrc}
          alt="CodeForge Studio flame logo"
          width={96}
          height={96}
          className="select-none pointer-events-none animate-[cfs-pulse_1.1s_ease-in-out_infinite]"
          draggable={false}
        />

        <div className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          CodeForge Studio
        </div>

        {/* Shimmer loader bar */}
        <div className="relative h-1 w-56 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
          <span className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-linear-to-r from-transparent via-slate-400/80 to-transparent animate-[cfs-slide_1.1s_ease-in-out_infinite]" />
        </div>

        <p className="sr-only">Laster inn innhold …</p>
      </div>

      <style>{`
        @keyframes cfs-slide {
          0% { transform: translateX(-120%); opacity:.6; }
          50% { transform: translateX(60%);  opacity:1; }
          100%{ transform: translateX(220%); opacity:.6; }
        }
        @keyframes cfs-pulse {
          0%   { transform: scale(1);   filter: drop-shadow(0 0 0px rgba(255,100,0,0)); }
          50%  { transform: scale(1.08); filter: drop-shadow(0 0 12px rgba(255,140,0,0.6)); }
          100% { transform: scale(1);   filter: drop-shadow(0 0 0px rgba(255,100,0,0)); }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-[cfs-slide_1.1s_ease-in-out_infinite],
          .animate-[cfs-pulse_1.1s_ease-in-out_infinite] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}