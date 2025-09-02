import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getConsent, setConsent } from "../utils/consent";

/**
 * Always-mounted consent banner:
 * - Registers window.showConsent so Footer (Manage cookies) can reopen it.
 * - Hides via internal state after accept/reject (no unmount).
 * - Mobile-friendly layout with no overflow issues.
 */
export default function ConsentBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage once on client
  useEffect(() => {
    const stored = getConsent();
    setVisible(stored === null); // show if not decided yet
    setHydrated(true);
  }, []);

  // Expose global opener that Footer calls via resetConsent()
  useEffect(() => {
    function openBanner() {
      setVisible(true);
    }
    // register
    (window as Window & { showConsent?: () => void }).showConsent = openBanner;

    // cleanup on unmount (kept for safety even though we keep the component mounted)
    return () => {
      if ((window as Window & { showConsent?: () => void }).showConsent === openBanner) {
        (window as Window & { showConsent?: () => void }).showConsent = undefined;
      }
    };
  }, []);

  if (!hydrated || !visible) return null;

  const onAccept = () => {
    setConsent("accepted");
    setVisible(false);
  };

  const onReject = () => {
    setConsent("rejected");
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-labelledby="consent-title"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 sm:px-6 lg:px-8 pb-4"
    >
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="p-4 sm:p-6">
            <div className="sm:flex sm:items-start sm:gap-6">
              {/* Text */}
              <div className="flex-1">
                <h2 id="consent-title" className="text-sm font-semibold text-slate-900">
                  {t("consent.title")}
                </h2>
                <p className="mt-1 text-sm text-slate-600">{t("consent.text")}</p>
                <Link
                  to="/privacy"
                  className="mt-2 inline-block text-sm font-medium text-sky-700 underline underline-offset-2 hover:text-sky-800"
                >
                  {t("consent.learnMore")}
                </Link>
              </div>

              {/* Actions */}
              <div className="mt-4 grid gap-2 sm:mt-0 sm:w-[min(320px,100%)] sm:grid-cols-2">
                <button
                  onClick={onReject}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  {t("consent.actions.reject")}
                </button>
                <button
                  onClick={onAccept}
                  className="w-full rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
                >
                  {t("consent.actions.accept")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}