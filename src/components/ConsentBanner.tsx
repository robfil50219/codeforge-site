import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

declare global {
  interface Window {
    showConsent: () => void;
  }
}

const STORAGE_KEY = "cf_consent";

export default function ConsentBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  function getStoredConsent(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function setStoredConsent(value: string) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      document.cookie = `${STORAGE_KEY}=${value}; Path=/; SameSite=Lax; Max-Age=31536000`;
    } catch {
      // ignore
    }
  }

  function acceptAll() {
    setStoredConsent("accepted");
    setVisible(false);
  }

  function rejectAll() {
    setStoredConsent("rejected");
    setVisible(false);
  }

  useEffect(() => {
    // Show if no stored decision
    if (!getStoredConsent()) setVisible(true);

    // Expose global opener
    window.showConsent = () => setVisible(true);

    // Listen for cross-tab resets
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === null || e.newValue === "")) {
        setVisible(true);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-slate-700">
          <p className="font-semibold">{t("consent.title")}</p>
          <p className="mt-1">{t("consent.text")}</p>
          <a
            href="/privacy"
            className="mt-1 inline-block underline text-sky-600 hover:text-sky-700"
          >
            {t("consent.learnMore")}
          </a>
        </div>
        <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3">
          <button
            onClick={rejectAll}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {t("consent.actions.reject")}
          </button>
          <button
            onClick={acceptAll}
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            {t("consent.actions.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}