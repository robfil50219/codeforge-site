import { useState } from "react";
import {
  Sun,
  Moon,
  PhoneCall,
  Palette,
  Rocket,
  User,
  CircleDot,
  Settings2,
  X,
} from "lucide-react";

type MobileBubbleNavProps = {
  scrollToId: (id: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
  isStaticBg: boolean;
  toggleBackgroundMode: () => void;
};

export default function MobileBubbleNav({
  scrollToId,
  isDark,
  toggleTheme,
  isStaticBg,
  toggleBackgroundMode,
}: MobileBubbleNavProps) {
  const [open, setOpen] = useState(false);

  function go(id: string) {
    scrollToId(id);
    setOpen(false);
  }

  return (
    <>
      {/* Flytende knapp (mobil) */}
      <button
        className={[
          "fixed bottom-4 right-4 z-50 md:hidden",
          "surface-chip px-4 py-2 text-heading text-xs font-semibold shadow-lg",
          "dark:bg-[rgba(0,160,160,0.18)]",
          "dark:border dark:border-[rgba(0,160,160,0.6)]",
          "dark:shadow-[0_20px_40px_rgba(0,0,0,0.9),0_0_16px_rgba(0,160,160,0.4)]",
          "active:scale-95 transition-transform",
        ].join(" ")}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Meny"
      >
        <Settings2 className="inline-block h-4 w-4 align-middle mr-1" />
        Meny
      </button>

      {/* Selve meny-panelet */}
      {open && (
        <div
          className={[
            "fixed bottom-20 right-4 z-50 md:hidden w-56 rounded-xl border shadow-xl",
            "bg-(--bg-page) border-(--card-border) text-(--text-page)",
            "animate-in fade-in slide-in-from-bottom-4 duration-300",
          ].join(" ")}
        >
          {/* Lukk-knapp øverst til høyre */}
          <div className="flex justify-end border-b border-(--card-border) px-3 py-2">
            <button
              onClick={() => setOpen(false)}
              aria-label="Lukk meny"
              className={[
                "relative group p-1 rounded-md transition-transform duration-300",
                "hover:scale-110 active:scale-95",
              ].join(" ")}
            >
              {/* bakgrunnslyseffekt */}
              <span className="absolute inset-0 rounded-md bg-[rgba(255,255,255,0.1)] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
              {/* selve X */}
              <X
                className={[
                  "relative z-10 h-4 w-4 text-(--text-heading)",
                  "transition-transform duration-500",
                  "group-hover:rotate-90 group-hover:text-(--color-brand-sea)",
                ].join(" ")}
              />
            </button>
          </div>

          <ul className="p-3 text-sm">
            {/* Navigasjon */}
            <li>
              <button
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5"
                onClick={() => go("services")}
              >
                <Palette className="inline-block h-4 w-4 mr-2 align-middle" />
                Tjenester
              </button>
            </li>

            <li>
              <button
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5"
                onClick={() => go("pricing")}
              >
                <Rocket className="inline-block h-4 w-4 mr-2 align-middle" />
                Priser
              </button>
            </li>

            <li>
              <button
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5"
                onClick={() => go("about")}
              >
                <User className="inline-block h-4 w-4 mr-2 align-middle" />
                Om oss
              </button>
            </li>

            <li>
              <button
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5"
                onClick={() => go("contact")}
              >
                <PhoneCall className="inline-block h-4 w-4 mr-2 align-middle" />
                Kontakt
              </button>
            </li>

            {/* Skillelinje */}
            <li className="mt-2 border-t border-(--card-border) pt-2">
              <button
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5"
                onClick={toggleBackgroundMode}
              >
                <CircleDot className="inline-block h-4 w-4 mr-2 align-middle" />
                {isStaticBg ? "Interaktiv bakgrunn" : "Stille bakgrunn"}
              </button>
            </li>

            {/* Tema */}
            <li>
              <button
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-white/5"
                onClick={toggleTheme}
              >
                {isDark ? (
                  <>
                    <Sun className="inline-block h-4 w-4 mr-2 align-middle" />
                    Lys
                  </>
                ) : (
                  <>
                    <Moon className="inline-block h-4 w-4 mr-2 align-middle" />
                    Mørk
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}