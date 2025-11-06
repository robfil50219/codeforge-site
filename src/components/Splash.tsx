// src/components/Splash.tsx
import { useEffect, useState } from "react";

export default function Splash({ showTitle = false }: { showTitle?: boolean }) {
  const [fade, setFade] = useState(false);
  const logoSrc = "/favicon2.png";

  useEffect(() => {
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const startFade = setTimeout(() => setFade(true), 2400);
    const remove = setTimeout(() => {
      document.getElementById("cfs-react-splash")?.style.setProperty("display", "none");
      document.documentElement.style.overflow = original;
    }, 3000);
    return () => { clearTimeout(startFade); clearTimeout(remove); document.documentElement.style.overflow = original; };
  }, []);

  return (
    <div
      id="cfs-react-splash"
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-50 grid place-items-center bg-white dark:bg-[#0B0F12] transition-opacity duration-700 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
      aria-label="CodeForge Studio laster inn"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Logo (96px mobile → 128px desktop) */}
        <img
          src={logoSrc}
          alt="" /* decorative; we provide aria-label on the container */
          width={128}
          height={128}
          className="select-none pointer-events-none h-auto w-24 sm:w-32 animate-[cfs-pulse_1.1s_ease-in-out_infinite]"
          draggable={false}
        />

        {/* Optional visible title */}
        {showTitle ? (
          <div className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            CodeForge Studio
          </div>
        ) : (
          // Keep accessible name for screen readers without showing text
          <span className="sr-only">CodeForge Studio</span>
        )}

        {/* Shimmer loader bar */}
        <div className="relative h-1 w-48 sm:w-56 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
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