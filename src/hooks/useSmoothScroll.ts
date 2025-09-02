import { useLocation } from "react-router-dom";

/** Smoothly scrolls to an element id on the home page; navigates with hash if off-home. */
export default function useSmoothScroll(headerOffset = 80) {
  const location = useLocation();

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = window.scrollY + el.getBoundingClientRect().top - (headerOffset - 4);
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function handleAnchorClick(e: React.MouseEvent, id: string) {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      window.location.href = `/${"#" + id}`;
    }
  }

  return { handleAnchorClick, scrollToId };
}