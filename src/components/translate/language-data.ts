export const LANGUAGE_OPTIONS = [
  { code: "no", label: "Norsk" },
  { code: "en", label: "English" },
  { code: "sv", label: "Svenska" },
  { code: "da", label: "Dansk" },
  { code: "fi", label: "Suomi" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
] as const;

export type LanguageCode = (typeof LANGUAGE_OPTIONS)[number]["code"];
