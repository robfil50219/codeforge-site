// src/components/ConsentBanner.tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ConsentBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function acceptAll() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function rejectNonEssential() {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-lg">
      <div className="mx-auto max-w-7xl">
        {/* Shell */}
        <div className="p-4 sm:p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Text */}
          <div className="md:pr-6 min-w-0">
            <h2 className="text-sm font-semibold text-slate-900">
              {t("consent.title")}
            </h2>
            <p className="mt-1 text-sm text-slate-600 leading-snug break-words">
              {t("consent.text")}{" "}
              <a
                href="/privacy"
                className="underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
              >
                {t("consent.learnMore")}
              </a>
              .
            </p>
          </div>

          {/* Actions */}
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-2 md:gap-3">
            <button
              type="button"
              onClick={rejectNonEssential}
              className="w-full md:w-auto inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm leading-tight font-medium text-slate-700 hover:bg-slate-50 text-center"
            >
              {t("consent.actions.reject")}
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="w-full md:w-auto inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm leading-tight font-semibold text-white hover:bg-slate-800 text-center"
            >
              {t("consent.actions.accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}