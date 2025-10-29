// src/utils/consent.ts

const CONSENT_KEY = "cf-consent"; // same key you're already using

export function getConsent(): "accepted" | "rejected" | null {
  try {
    return localStorage.getItem(CONSENT_KEY) as
      | "accepted"
      | "rejected"
      | null;
  } catch {
    return null;
  }
}

export function setConsent(value: "accepted" | "rejected") {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
}

export function resetConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }

  // 🔊 tell the app "consent was cleared"
  window.dispatchEvent(new CustomEvent("cf-consent-reset"));
}