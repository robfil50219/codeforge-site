// src/utils/consent.ts
const STORAGE_KEY = "cf_consent"; // "accepted" | "rejected"
export type ConsentValue = "accepted" | "rejected";

export function getStoredConsent(): ConsentValue | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(v: ConsentValue) {
  try {
    localStorage.setItem(STORAGE_KEY, v);
    document.cookie = `cf_consent=${v}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

export function resetConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = `cf_consent=; Path=/; Max-Age=0; SameSite=Lax`;
    window.dispatchEvent(new CustomEvent("cf:consent:reset"));
  } catch {
    /* ignore */
  }
}