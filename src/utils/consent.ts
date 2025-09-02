// Simple consent utilities used by the Footer "Manage cookies" button
// and by the ConsentBanner component.

export {}; // ensure this file is a module so global augmentation is allowed

declare global {
  interface Window {
    /** Exposed by ConsentBanner so other parts of the app can reopen it. */
    showConsent?: () => void;
  }
}

const CONSENT_KEY = "cookieConsent"; // "accepted" | "rejected"

export function getConsent(): "accepted" | "rejected" | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: "accepted" | "rejected") {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* no-op */
  }
}

/** Called by the "Manage cookies" button. Clears and reopens the banner. */
export function resetConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* no-op */
  }
  // Call the global hook the banner registers. This is safe on mobile/desktop.
  if (typeof window !== "undefined" && typeof window.showConsent === "function") {
    window.showConsent();
  }
}