import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "cf_consent"; // "accepted" | "rejected"
type ConsentValue = "accepted" | "rejected";

function getStoredConsent(): ConsentValue | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

function setStoredConsent(v: ConsentValue) {
  try {
    localStorage.setItem(STORAGE_KEY, v);
    document.cookie = `cf_consent=${v}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

export default function ConsentBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) setVisible(true);
  }, []);

  const acceptAll = () => {
    setStoredConsent("accepted");
    setVisible(false);
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
          {/* On mobile: stack content; on sm+: row */}
          <div className="p-4 sm:p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Text block */}
            <div className="sm:pr-6 min-w-0">
              <h2 className="text-sm font-semibold text-slate-900">
                {t("consent.title")}
              </h2>
              <p className="mt-1 text-sm text-slate-600 break-words">
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

            {/* Actions: full-width buttons on mobile */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                type="button"
                onClick={rejectNonEssential}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {t("consent.actions.reject")}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
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