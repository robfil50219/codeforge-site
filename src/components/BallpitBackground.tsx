// src/components/BallpitBackground.tsx
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    __BALLPIT_DISABLED?: boolean;
  }
}

type Ball = { x: number; y: number; vx: number; vy: number; r: number; c: string };
type Sprite = { cvs: HTMLCanvasElement; hw: number; hh: number };

export default function BallpitBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctxRaw = el.getContext("2d");
    if (!ctxRaw) return;

    const canvas = el;
    const ctx = ctxRaw;

    const nativeDpr = window.devicePixelRatio || 1;
    const isMobile =
      matchMedia("(pointer: coarse)").matches || matchMedia("(max-width: 768px)").matches;

    // eslint wanted const here
    const CONFIG = isMobile
      ? { BALLS: 14, R_MIN: 12, R_MAX: 22, DPR_CAP: 1.25, MOUSE_R: 120, MOUSE_FORCE: 1.25 }
      : { BALLS: 26, R_MIN: 14, R_MAX: 28, DPR_CAP: 1.5, MOUSE_R: 90, MOUSE_FORCE: 0.9 };

    // this one also never changed → const
    const dpr = Math.min(nativeDpr, CONFIG.DPR_CAP);

    let W = 0;
    let H = 0;
    let raf = 0;
    let running = true;
    let frozen = window.__BALLPIT_DISABLED === true;

    const rs = getComputedStyle(document.documentElement);
    const SEA = (rs.getPropertyValue("--color-brand-sea") || "#00A0A0").trim();
    const MIDNIGHT = (rs.getPropertyValue("--color-brand-midnight") || "#0F4452").trim();
    const colors = [SEA, MIDNIGHT, "#0BB3B3", "#067A7A", "#06B6D4", "#22D3EE"];

    const mouse = { x: -9999, y: -9999, r: CONFIG.MOUSE_R, force: CONFIG.MOUSE_FORCE };

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const rand = (a: number, b: number) => Math.random() * (b - a) + a;

    const spriteCache = new Map<string, Sprite>();
    function getSprite(r: number, color: string): Sprite {
      const R = Math.max(6, Math.round(r));
      const key = color + "-" + R;
      const hit = spriteCache.get(key);
      if (hit) return hit;

      const pad = Math.round(R * 1.05);
      const w = R * 2 + pad * 2;
      const h = R * 2 + pad * 2;
      const off = document.createElement("canvas");
      off.width = Math.ceil(w * dpr);
      off.height = Math.ceil(h * dpr);
      const octx = off.getContext("2d")!;
      octx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = pad + R;
      const cy = pad + R;

      octx.beginPath();
      octx.fillStyle = color;
      octx.arc(cx, cy, R, 0, Math.PI * 2);
      octx.fill();

      const sprite: Sprite = { cvs: off, hw: w / 2, hh: h / 2 };
      spriteCache.set(key, sprite);
      return sprite;
    }

    const balls: Ball[] = [];

    function initBalls() {
      balls.length = 0;
      for (let i = 0; i < CONFIG.BALLS; i++) {
        const r = rand(CONFIG.R_MIN, CONFIG.R_MAX);
        balls.push({
          x: rand(r, W - r),
          y: rand(r, H - r),
          vx: rand(-0.5, 0.5),
          vy: rand(-0.5, 0.5),
          r,
          c: colors[(Math.random() * colors.length) | 0],
        });
      }
    }

    function update() {
      ctx.clearRect(0, 0, W, H);

      if (!frozen) {
        for (const b of balls) {
          const dx = b.x - mouse.x;
          const dy = b.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const rr = (b.r + mouse.r) * (b.r + mouse.r);
          if (d2 < rr) {
            const dist = Math.max(6, Math.sqrt(d2));
            const ux = dx / dist;
            const uy = dy / dist;
            const push = 1 - dist / Math.sqrt(rr);
            b.vx += ux * push * mouse.force;
            b.vy += uy * push * mouse.force;
          }

          b.x += b.vx;
          b.y += b.vy;

          if (b.x - b.r < 0 || b.x + b.r > W) b.vx *= -1;
          if (b.y - b.r < 0 || b.y + b.r > H) b.vy *= -1;
        }
      }

      for (const b of balls) {
        const s = getSprite(b.r, b.c);
        ctx.drawImage(s.cvs, Math.round(b.x - s.hw), Math.round(b.y - s.hh));
      }

      if (running) raf = requestAnimationFrame(update);
    }

    const onToggle = (e: Event) => {
      const ce = e as CustomEvent<{ disabled: boolean }>;
      frozen = ce.detail.disabled;
    };
    window.addEventListener("ballpit-toggle", onToggle);

    resize();
    requestAnimationFrame(() => {
      initBalls();
      raf = requestAnimationFrame(update);
    });

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("ballpit-toggle", onToggle);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />;
}