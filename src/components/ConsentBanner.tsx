// src/components/ConsentBanner.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../lib/t";
import { getConsent, setConsent } from "../utils/consent";

export default function ConsentBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show only if no decision is stored yet
    const c = getConsent(); // expect: "accepted" | "rejected" | null
    if (!c) setVisible(true);
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
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="sm:max-w-[70%]">
          <h3 className="text-sm font-semibold text-slate-900">
            {t("consent.title") as string}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            {t("consent.text") as string}{" "}
            <Link
              to="/privacy"
              className="underline hover:text-slate-800"
            >
              {t("consent.learnMore") as string}
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={reject}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            {t("consent.actions.reject") as string}
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            {t("consent.actions.accept") as string}
          </button>
        </div>
      </div>
    </div>
  );
}