// src/components/ConsentBanner.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../lib/t";
import { getConsent, setConsent } from "../utils/consent";

export default function ConsentBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner if the user hasn't chosen yet
    const c = getConsent(); // "accepted" | "rejected" | null
    setVisible(!c); // true if null, false if accepted/rejected

    // 👂 listen for manual reset from footer ("Administrer informasjonskapsler")
    function handleReset() {
      setVisible(true);
    }

    window.addEventListener("cf-consent-reset", handleReset);
    return () => {
      window.removeEventListener("cf-consent-reset", handleReset);
    };
  }, []);

  if (!visible) return null;

  const accept = () => {
    setConsent("accepted");
    setVisible(false);
  };

  const reject = () => {
    setConsent("rejected");
    setVisible(false);
  };

  return (
    <div
      className={[
        "fixed inset-x-0 bottom-0 z-50",
        // light mode look
        "bg-white/95 border-t border-slate-200 backdrop-blur",
        // dark mode look (matches the rest of the site tokens)
        "dark:bg-(--bg-page)/95 dark:text-(--text-page) dark:border-(--card-border)",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="sm:max-w-[70%]">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-(--text-heading)">
            {t("consent.title") as string}
          </h3>

          <p className="mt-1 text-sm text-slate-600 dark:text-(--text-dim)">
            {t("consent.text") as string}{" "}
            <Link
              to="/privacy"
              className="underline text-slate-800 hover:text-slate-900 dark:text-(--color-brand-sea) dark:hover:brightness-110"
            >
              {t("consent.learnMore") as string}
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
          <button
            onClick={reject}
            className={[
              "rounded-xl px-4 py-2 text-sm font-medium transition",
              // light style
              "border border-slate-300 text-slate-700 hover:bg-slate-100",
              // dark style
              "dark:border-(--card-border) dark:text-(--text-page) dark:bg-transparent dark:hover:bg-white/5",
            ].join(" ")}
          >
            {t("consent.actions.reject") as string}
          </button>

          <button
            onClick={accept}
            className={[
              "rounded-xl px-4 py-2 text-sm font-medium transition",
              // light CTA
              "bg-slate-900 text-white hover:bg-slate-800",
              // dark CTA (use your brand teal on dark)
              "dark:bg-(--color-brand-sea) dark:text-(--color-brand-black) dark:hover:brightness-110",
            ].join(" ")}
          >
            {t("consent.actions.accept") as string}
          </button>
        </div>
      </div>
    </div>
  );
}