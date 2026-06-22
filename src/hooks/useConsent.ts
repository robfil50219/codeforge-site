import { useEffect, useState } from "react";
import {
  CONSENT_CHANGE_EVENT,
  getConsent,
  type ConsentValue,
} from "../utils/consent";

export default function useConsent() {
  const [consent, setConsent] = useState<ConsentValue>(getConsent);

  useEffect(() => {
    const handleConsentChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ value?: ConsentValue }>;
      setConsent(customEvent.detail?.value ?? getConsent());
    };

    window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    };
  }, []);

  return consent;
}
