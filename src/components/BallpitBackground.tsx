// src/components/BallpitBackground.tsx
import { useEffect, useRef } from "react";

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;   // visual radius
  c: string;   // color
};

type Sprite = {
  cvs: HTMLCanvasElement;
  hw: number;  // half width
  hh: number;  // half height
};

type Settings = {
  count: number;
  rMin: number;
  rMax: number;
  mouseRadius: number;
  mouseForce: number;
  alpha: number;          // global alpha for balls
  topKeepout: number;     // "no balls" band at top (px)
  dprCap: number;         // cap devicePixelRatio
  maxSpeed: number;       // clamp speed
  // Touch extras
  touchRadius: number;    // influence radius while touching
  touchForce: number;     // base force while touching
  touchBurst: number;     // extra impulse on touch start
  swipeBoost: number;     // extra force along swipe direction
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

    // Brand colors from :root with fallbacks
    const rs = getComputedStyle(document.documentElement);
    const SEA = (rs.getPropertyValue("--color-brand-sea") || "#00A0A0").trim();
    const MIDNIGHT = (rs.getPropertyValue("--color-brand-midnight") || "#0F4452").trim();

    const colors = [
      SEA, MIDNIGHT,
      "#0BB3B3", "#067A7A",
      "#06B6D4", "#22D3EE",
      "#0891B2", "#38BDF8",
    ];

    // ------- Responsive settings -------
    const balls: Ball[] = [];
    let settings: Settings = getSettings();
    let nativeDpr = window.devicePixelRatio || 1;
    let dpr = Math.min(nativeDpr, settings.dprCap);

    let W = 0, H = 0, raf = 0, running = true;

    function isMobile() { return window.innerWidth < 768; }
    function isTablet() { return window.innerWidth >= 768 && window.innerWidth < 1024; }

    function getSettings(): Settings {
      if (isMobile()) {
        return {
          count: 10,
          rMin: 10,
          rMax: 18,
          mouseRadius: 70,
          mouseForce: 0.6,
          alpha: 0.80,
          topKeepout: 280,
          dprCap: 1,
          maxSpeed: 0.55,
          touchRadius: 130,
          touchForce: 1.6,  // strong base force on touch
          touchBurst: 2.0,  // burst impulse at touchstart
          swipeBoost: 0.035 // extra push along swipe vector
        };
      }
      if (isTablet()) {
        return {
          count: 18,
          rMin: 12,
          rMax: 22,
          mouseRadius: 85,
          mouseForce: 0.8,
          alpha: 0.88,
          topKeepout: 160,
          dprCap: 1.25,
          maxSpeed: 0.6,
          touchRadius: 140,
          touchForce: 1.4,
          touchBurst: 1.6,
          swipeBoost: 0.03
        };
      }
      return {
        count: 26,
        rMin: 14,
        rMax: 28,
        mouseRadius: 90,
        mouseForce: 0.9,
        alpha: 0.95,
        topKeepout: 0,
        dprCap: 1.5,
        maxSpeed: 0.65,
        touchRadius: 150,
        touchForce: 1.2,
        touchBurst: 1.2,
        swipeBoost: 0.025
      };
    }

    // Interaction point (mouse OR touch)
    const pointer = {
      x: -9999,
      y: -9999,
      r: settings.mouseRadius,
      force: settings.mouseForce,
      active: false,
      lastX: -9999,
      lastY: -9999
    };

    // Sprite cache
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

      // Shadow
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

      // Halo
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

      // Ball
      octx.beginPath();
      octx.fillStyle = color;
      octx.arc(cx, cy, R, 0, Math.PI * 2);
      octx.fill();

      // Rim
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

    // --- Touch helpers: big burst + swipe push ---
    function burstImpulse(cx: number, cy: number, radius: number, power: number) {
      const R2 = radius * radius;
      for (const b of balls) {
        const dx = b.x - cx;
        const dy = b.y - cy;
        const d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          const d = Math.max(10, Math.sqrt(d2));
          const ux = dx / d;
          const uy = dy / d;
          const k = (1 - d / radius) * power; // stronger near center
          b.vx += ux * k;
          b.vy += uy * k;
        }
      }
    }

    function swipeImpulse(cx: number, cy: number, dx: number, dy: number, radius: number, boost: number) {
      const len = Math.max(1, Math.hypot(dx, dy));
      const ux = dx / len;
      const uy = dy / len;
      const R2 = radius * radius;
      for (const b of balls) {
        const bx = b.x - cx;
        const by = b.y - cy;
        const d2 = bx * bx + by * by;
        if (d2 < R2) {
          const d = Math.max(10, Math.sqrt(d2));
          const falloff = (1 - d / radius);
          const k = falloff * boost * len * 0.15; // scale with swipe distance
          b.vx += ux * k;
          b.vy += uy * k;
        }
      }
    }

    function update() {
      ctx.clearRect(0, 0, W, H);

      // movement + pointer/touch field
      for (let i = 0; i < balls.length; i++) {
        const a = balls[i];

        // base field (mouse on desktop, touch when active)
        const dx = a.x - pointer.x;
        const dy = a.y - pointer.y;
        const R = (pointer.active ? settings.touchRadius : pointer.r) + a.r;
        const rr = R * R;
        const d2 = dx * dx + dy * dy;
        if (d2 < rr) {
          const dist = Math.max(10, Math.sqrt(d2));
          const ux = dx / dist;
          const uy = dy / dist;
          const force = pointer.active ? settings.touchForce : pointer.force;
          const push = (1 - dist / R) * force;
          a.vx += ux * push;
          a.vy += uy * push;
        }

        a.x += a.vx;
        a.y += a.vy;

        // damping
        a.vx *= 0.996;
        a.vy *= 0.996;

        // speed cap
        a.vx = clamp(a.vx, -settings.maxSpeed, settings.maxSpeed);
        a.vy = clamp(a.vy, -settings.maxSpeed, settings.maxSpeed);

        // walls with top keepout
        const minY = settings.topKeepout + a.r;
        if (a.x - a.r < 0) { a.x = a.r; a.vx *= -1; }
        if (a.x + a.r > W) { a.x = W - a.r; a.vx *= -1; }
        if (a.y - a.r < minY) { a.y = minY; a.vy *= -1; }
        if (a.y + a.r > H) { a.y = H - a.r; a.vy *= -1; }
      }

      // collisions
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

    // Pointer (mouse/touch unified) — attach to window, canvas stays pointer-events-none
    function onPointerDown(e: PointerEvent) {
      pointer.active = true;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.lastX = e.clientX;
      pointer.lastY = e.clientY;

      // Big burst on touch-capable devices
      if (e.pointerType === "touch") {
        burstImpulse(pointer.x, pointer.y, settings.touchRadius, settings.touchBurst);
      }
    }

    function onPointerMove(e: PointerEvent) {
      const prevX = pointer.x;
      const prevY = pointer.y;

      pointer.x = e.clientX;
      pointer.y = e.clientY;

      // Swipe push while finger moves
      if (pointer.active && e.pointerType === "touch") {
        const dx = pointer.x - prevX;
        const dy = pointer.y - prevY;
        if (dx !== 0 || dy !== 0) {
          swipeImpulse(pointer.x, pointer.y, dx, dy, settings.touchRadius, settings.swipeBoost);
        }
      }
    }

    function onPointerUp() {
      pointer.active = false;
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

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
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