import { useEffect, useState } from "react";
import {
  LANGUAGE_CHANGE_EVENT,
  detectPersistedLanguage,
  isSupportedLanguage,
  type LanguageCode,
} from "../components/translate/language-data";

export default function useLanguage() {
  const [language, setLanguage] = useState<LanguageCode>(
    detectPersistedLanguage,
  );

  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ code?: string }>;
      const code = customEvent.detail?.code;
      setLanguage(
        isSupportedLanguage(code) ? code : detectPersistedLanguage(),
      );
    };

    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
    return () => {
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageChange);
    };
  }, []);

  return language;
}
