// src/components/ConsentBanner.tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getConsent, setConsent } from "../utils/consent";
import { Link } from "react-router-dom";

export default function ConsentBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  // Expose showConsent globally
  useEffect(() => {
    window.showConsent = () => setVisible(true);
    const current = getConsent();
    if (!current) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-white/90 backdrop-blur-md border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Text */}
        <p className="text-sm text-slate-700">
          <span className="font-semibold">{t("consent.title")}</span> ·{" "}
          {t("consent.text")}{" "}
          <Link
            to="/privacy"
            className="underline underline-offset-2 hover:text-slate-800"
          >
            {t("consent.learnMore")}
          </Link>
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setConsent("rejected");
              setVisible(false);
            }}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {t("consent.actions.reject")}
          </button>
          <button
            onClick={() => {
              setConsent("accepted");
              setVisible(false);
            }}
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            {t("consent.actions.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}