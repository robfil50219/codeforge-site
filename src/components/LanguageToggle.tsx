import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const isNO = i18n.language?.startsWith("no");

  const toggle = () => {
    const next = isNO ? "en" : "no";
    i18n.changeLanguage(next);
    // html lang updates via i18n listener (see i18n.ts)
  };

  return (
    <button
      onClick={toggle}
      className="rounded-lg px-3 py-1.5 text-sm border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
      aria-label="Toggle language"
      title={isNO ? "Switch to English" : "Bytt til norsk"}
    >
      {isNO ? "EN" : "NO"}
    </button>
  );
}