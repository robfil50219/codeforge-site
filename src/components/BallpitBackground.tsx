// src/components/BallpitBackground.tsx
import { useEffect, useRef } from "react";

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  c: string;
};

type Sprite = {
  cvs: HTMLCanvasElement;
  hw: number;
  hh: number;
};

type Settings = {
  count: number;
  rMin: number;
  rMax: number;
  alpha: number;
  topKeepout: number; // keep balls away from top text on small screens
  dprCap: number;
  maxSpeed: number;
  mouseRadius: number; // ✅ same values used for desktop & touch
  mouseForce: number;  // ✅ same values used for desktop & touch
};

export default function BallpitBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const canvas: HTMLCanvasElement = el;

    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    // Brand colors (fallbacks)
    const rs = getComputedStyle(document.documentElement);
    const SEA = (rs.getPropertyValue("--color-brand-sea") || "#00A0A0").trim();
    const MIDNIGHT = (rs.getPropertyValue("--color-brand-midnight") || "#0F4452").trim();

    const colors = [
      SEA, MIDNIGHT,
      "#0BB3B3", "#067A7A",
      "#06B6D4", "#22D3EE",
      "#0891B2", "#38BDF8",
    ];

    const balls: Ball[] = [];
    let settings: Settings = getSettings();
    let nativeDpr = window.devicePixelRatio || 1;
    let dpr = Math.min(nativeDpr, settings.dprCap);

    let W = 0, H = 0, raf = 0, running = true;

    const isMobile = () => window.innerWidth < 768;
    const isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024;

    function getSettings(): Settings {
      // Visual/Perf tweaks per breakpoint, BUT interaction strength stays desktop-like
      if (isMobile()) {
        return {
          count: 10,
          rMin: 10,
          rMax: 18,
          alpha: 0.80,
          topKeepout: 280,
          dprCap: 1,
          maxSpeed: 0.55,
          mouseRadius: 90, // ✅ desktop values
          mouseForce: 0.9, // ✅ desktop values
        };
      }
      if (isTablet()) {
        return {
          count: 18,
          rMin: 12,
          rMax: 22,
          alpha: 0.90,
          topKeepout: 160,
          dprCap: 1.25,
          maxSpeed: 0.60,
          mouseRadius: 90,
          mouseForce: 0.9,
        };
      }
      return {
        count: 26,
        rMin: 14,
        rMax: 28,
        alpha: 0.95,
        topKeepout: 0,
        dprCap: 1.5,
        maxSpeed: 0.65,
        mouseRadius: 90,
        mouseForce: 0.9,
      };
    }

    // Unified pointer (mouse OR touch), same as desktop behavior
    const pointer = {
      x: -9999,
      y: -9999,
      r: settings.mouseRadius,
      force: settings.mouseForce,
    };

    // Cache
    const spriteCache = new Map<string, Sprite>();
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

    function getSprite(r: number, color: string): Sprite {
      const R = Math.max(6, Math.round(r));
      const key = `${color}-${R}`;
      const hit = spriteCache.get(key);
      if (hit) return hit;

      const pad = Math.round(R * 1.05);
      const w = R * 2 + pad * 2;
      const h = R * 2 + pad * 2;

      const off = document.createElement("canvas");
      off.width = Math.ceil(w * dpr);
      off.height = Math.ceil(h * dpr);
      const octx = off.getContext("2d");
      if (!octx) {
        const fallback: Sprite = { cvs: off, hw: w / 2, hh: h / 2 };
        spriteCache.set(key, fallback);
        return fallback;
      }
      octx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = pad + R;
      const cy = pad + R;

      // Shadow (slight blur)
      const rx = R * 1.05;
      const ry = Math.max(6, R * 0.45);
      const sx = cx + R * 0.30;
      const sy = cy + R * 0.66;

      octx.save();
      octx.filter = "blur(3px)";
      octx.translate(sx, sy);
      octx.scale(1, ry / rx);

      const sg = octx.createRadialGradient(0, 0, R * 0.12, 0, 0, rx);
      sg.addColorStop(0, "rgba(15,23,42,0.22)");
      sg.addColorStop(0.6, "rgba(15,23,42,0.14)");
      sg.addColorStop(1, "rgba(15,23,42,0)");
      octx.beginPath();
      octx.arc(0, 0, rx, 0, Math.PI * 2);
      octx.fillStyle = sg;
      octx.fill();
      octx.restore();
      octx.filter = "none";

      // Subtle halo
      octx.save();
      const haloR = R * 1.1;
      const halo = octx.createRadialGradient(cx, cy, R * 0.8, cx, cy, haloR);
      halo.addColorStop(0, "rgba(0,0,0,0)");
      halo.addColorStop(1, "rgba(0,0,0,0.06)");
      octx.beginPath();
      octx.fillStyle = halo;
      octx.arc(cx, cy, haloR, 0, Math.PI * 2);
      octx.fill();
      octx.restore();

      // Ball fill
      octx.beginPath();
      octx.fillStyle = color;
      octx.arc(cx, cy, R, 0, Math.PI * 2);
      octx.fill();

      // Rim shading
      const rim = octx.createRadialGradient(cx, cy, R * 0.62, cx, cy, R);
      rim.addColorStop(0, "rgba(0,0,0,0)");
      rim.addColorStop(1, "rgba(0,0,0,0.10)");
      octx.beginPath();
      octx.fillStyle = rim;
      octx.arc(cx, cy, R, 0, Math.PI * 2);
      octx.fill();

      // Highlight
      octx.beginPath();
      octx.fillStyle = "rgba(255,255,255,0.10)";
      octx.arc(cx - R * 0.33, cy - R * 0.33, R * 0.32, 0, Math.PI * 2);
      octx.fill();

      const sprite: Sprite = { cvs: off, hw: w / 2, hh: h / 2 };
      spriteCache.set(key, sprite);
      return sprite;
    }

    function resizeCanvas() {
      W = window.innerWidth;
      H = window.innerHeight;

      settings = getSettings();
      nativeDpr = window.devicePixelRatio || 1;
      dpr = Math.min(nativeDpr, settings.dprCap);

      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      pointer.r = settings.mouseRadius;
      pointer.force = settings.mouseForce;

      adjustBallCount(settings.count);

      const minY = settings.topKeepout + 1;
      for (const b of balls) {
        b.x = clamp(b.x, b.r, W - b.r);
        b.y = clamp(b.y, Math.max(b.r, minY), H - b.r);
        b.vx = clamp(b.vx, -settings.maxSpeed, settings.maxSpeed);
        b.vy = clamp(b.vy, -settings.maxSpeed, settings.maxSpeed);
      }
    }

    function adjustBallCount(target: number) {
      if (balls.length < target) {
        const toAdd = target - balls.length;
        for (let i = 0; i < toAdd; i++) {
          const r = rand(settings.rMin, settings.rMax);
          const minY = settings.topKeepout + r + 2;
          balls.push({
            x: rand(r, W - r),
            y: rand(minY, Math.max(minY, H - r)),
            vx: rand(-settings.maxSpeed, settings.maxSpeed),
            vy: rand(-settings.maxSpeed, settings.maxSpeed),
            r,
            c: colors[(Math.random() * colors.length) | 0],
          });
        }
      } else if (balls.length > target) {
        balls.length = target;
      }
    }

    function initBalls() {
      balls.length = 0;
      adjustBallCount(settings.count);
    }

    function update() {
      ctx.clearRect(0, 0, W, H);

      // movement + pointer field (desktop behavior everywhere)
      for (let i = 0; i < balls.length; i++) {
        const a = balls[i];

        // same push logic used for mouse on desktop
        const dx = a.x - pointer.x;
        const dy = a.y - pointer.y;
        const R = a.r + pointer.r;
        const rr = R * R;
        const d2 = dx * dx + dy * dy;
        if (d2 < rr) {
          const dist = Math.max(10, Math.sqrt(d2));
          const ux = dx / dist;
          const uy = dy / dist;
          const push = (1 - dist / R) * pointer.force;
          a.vx += ux * push;
          a.vy += uy * push;
        }

        a.x += a.vx;
        a.y += a.vy;

        // damping + speed cap
        a.vx = clamp(a.vx * 0.996, -settings.maxSpeed, settings.maxSpeed);
        a.vy = clamp(a.vy * 0.996, -settings.maxSpeed, settings.maxSpeed);

        // walls with top keepout band
        const minY = settings.topKeepout + a.r;
        if (a.x - a.r < 0) { a.x = a.r; a.vx *= -1; }
        if (a.x + a.r > W) { a.x = W - a.r; a.vx *= -1; }
        if (a.y - a.r < minY) { a.y = minY; a.vy *= -1; }
        if (a.y + a.r > H) { a.y = H - a.r; a.vy *= -1; }
      }

      // collisions (elastic, equal mass)
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const a = balls[i], b = balls[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const minDist = a.r + b.r;
          const d2 = dx * dx + dy * dy;
          if (d2 > 0 && d2 < minDist * minDist) {
            const dist = Math.sqrt(d2);
            const nx = dx / dist;
            const ny = dy / dist;

            const overlap = (minDist - dist) / 2;
            a.x -= nx * overlap; a.y -= ny * overlap;
            b.x += nx * overlap; b.y += ny * overlap;

            const avn = a.vx * nx + a.vy * ny;
            const atn = -a.vx * ny + a.vy * nx;
            const bvn = b.vx * nx + b.vy * ny;
            const btn = -b.vx * ny + b.vy * nx;

            const avn2 = bvn;
            const bvn2 = avn;

            a.vx = avn2 * nx + atn * -ny;
            a.vy = avn2 * ny + atn * nx;
            b.vx = bvn2 * nx + btn * -ny;
            b.vy = bvn2 * ny + btn * nx;
          }
        }
      }

      // draw
      ctx.save();
      ctx.globalAlpha = settings.alpha;
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        const sprite = getSprite(b.r, b.c);
        ctx.drawImage(sprite.cvs, Math.round(b.x - sprite.hw), Math.round(b.y - sprite.hh));
      }
      ctx.restore();

      if (running) raf = requestAnimationFrame(update);
    }

    // Pointer events (desktop & touch use the same values)
    function onPointerMove(e: PointerEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    }
    function onPointerDown(e: PointerEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    }
    function onPointerUp() {
      pointer.x = -9999;
      pointer.y = -9999;
    }
    function onResize() {
      resizeCanvas();
    }

    // Init
    resizeCanvas();
    initBalls();
    update();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}