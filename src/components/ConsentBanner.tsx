// src/components/ConsentBanner.tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStoredConsent, setStoredConsent } from "../utils/consent";

export default function ConsentBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) setVisible(true);

    const onReset = () => setVisible(true);
    window.addEventListener("cf:consent:reset", onReset);
    return () => window.removeEventListener("cf:consent:reset", onReset);
  }, []);

  const acceptAll = () => {
    setStoredConsent("accepted");
    setVisible(false);
    // Init analytics later if needed
  };

  const rejectNonEssential = () => {
    setStoredConsent("rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
        <div className="rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="p-4 sm:p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="sm:pr-6">
              <h2 className="text-sm font-semibold text-slate-900">
                {t("consent.title")}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
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

            <div className="flex gap-2 sm:gap-3">
              <button
                type="button"
                onClick={rejectNonEssential}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {t("consent.actions.reject")}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                {t("consent.actions.accept")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}