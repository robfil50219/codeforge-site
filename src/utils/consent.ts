export type ConsentValue = "accepted" | "rejected" | null;

export const CONSENT_CHANGE_EVENT = "cf-consent-change";
const CONSENT_KEY = "cf-consent";

function emitConsentChange(value: ConsentValue) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<{ value: ConsentValue }>(CONSENT_CHANGE_EVENT, {
      detail: { value },
    }),
  );
}

export function getConsent(): ConsentValue {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Exclude<ConsentValue, null>) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
  emitConsentChange(value);
}

export function resetConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }

  emitConsentChange(null);
}
