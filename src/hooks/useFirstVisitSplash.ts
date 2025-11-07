import { useEffect, useState } from "react";

const FLAG = "cfs-splash-done";

/** Read synchronously so there's no flash before first paint */
function getInitialShow(): boolean {
  try {
    return !sessionStorage.getItem(FLAG); // show if not seen this tab
  } catch {
    return true; // private mode fallback
  }
}

/**
 * Returns:
 * - showSplash: whether to render the Splash overlay
 * - startAppFade: when true, the app should begin fading in (while splash fades out)
 */
export default function useFirstVisitSplash() {
  const initialShow = getInitialShow();
  const [showSplash, setShowSplash] = useState<boolean>(initialShow);
  const [startAppFade, setStartAppFade] = useState<boolean>(!initialShow); // if no splash, app visible immediately

  useEffect(() => {
    if (!showSplash) return;

    // mark as seen for this tab
    try {
      sessionStorage.setItem(FLAG, "1");
    } catch {
      /* no-op */
    }

    // Your Splash.tsx starts fade at 2400ms and removes at 3000ms.
    // We start the app fade a bit earlier for overlap, at 2000ms:
    const tStart = setTimeout(() => setStartAppFade(true), 2000);

    // Keep Splash mounted slightly past its own removal time to avoid any flicker
    const tEnd = setTimeout(() => setShowSplash(false), 3100);

    return () => {
      clearTimeout(tStart);
      clearTimeout(tEnd);
    };
  }, [showSplash]);

  return { showSplash, startAppFade };
}