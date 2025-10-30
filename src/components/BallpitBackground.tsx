// src/components/BallpitBackground.tsx
import { useEffect, useRef } from "react";

/**
 * Allow global toggling of ballpit animation via window.__BALLPIT_DISABLED
 * (used when switching between "interactive" and "still" modes).
 */
declare global {
  interface Window {
    __BALLPIT_DISABLED?: boolean;
  }
}

/**
 * Type definitions
 */
type Ball = {
  x: number; // x-position
  y: number; // y-position
  vx: number; // velocity X
  vy: number; // velocity Y
  r: number; // radius
  c: string; // color
};

type Sprite = { cvs: HTMLCanvasElement; hw: number; hh: number };

export default function BallpitBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // === INITIAL SETUP =======================================================
    const el = canvasRef.current;
    if (!el) return;
    const ctxRaw = el.getContext("2d");
    if (!ctxRaw) return;

    const canvas = el;
    const ctx = ctxRaw;

    // detect display / device type
    const nativeDpr = window.devicePixelRatio || 1;
    const isCoarse = matchMedia("(pointer: coarse)").matches;
    const isSmall = matchMedia("(max-width: 768px)").matches;
    const isMobile = isCoarse || isSmall;

    // unified physics config for desktop & mobile
    const CONFIG = isMobile
      ? { BALLS: 26, R_MIN: 14, R_MAX: 28, DPR_CAP: 1.25, MOUSE_R: 110, MOUSE_FORCE: 1.1 }
      : { BALLS: 26, R_MIN: 14, R_MAX: 28, DPR_CAP: 1.5, MOUSE_R: 70, MOUSE_FORCE: 0.55 };

    // state variables
    let dpr = Math.min(nativeDpr, CONFIG.DPR_CAP);
    let W = 0;
    let H = 0;
    let raf = 0;
    let running = true;
    let frozen = window.__BALLPIT_DISABLED === true;

    // brand colors from CSS variables
    const rs = getComputedStyle(document.documentElement);
    const SEA = (rs.getPropertyValue("--color-brand-sea") || "#00A0A0").trim();
    const MIDNIGHT = (rs.getPropertyValue("--color-brand-midnight") || "#0F4452").trim();
    const colors = [SEA, MIDNIGHT, "#0BB3B3", "#067A7A", "#06B6D4", "#22D3EE", "#0891B2", "#38BDF8"];

    // mouse / touch interaction point
    const mouse = { x: -9999, y: -9999, r: CONFIG.MOUSE_R, force: CONFIG.MOUSE_FORCE };

    // === CANVAS SETUP ========================================================
    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

    // === SPRITE CACHE (offscreen ball rendering for performance) =============
    const spriteCache = new Map<string, Sprite>();

    function getSprite(r: number, color: string): Sprite {
      const R = Math.max(6, Math.round(r));
      const key = `${color}-${R}`;
      const hit = spriteCache.get(key);
      if (hit) return hit;

      // draw a single ball sprite with halo & shadow
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

      // subtle drop shadow
      const rx = R * 1.05;
      const ry = Math.max(6, R * 0.45);
      const sx = cx + R * 0.3;
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

      // halo & rim
      const haloR = R * 1.1;
      const halo = octx.createRadialGradient(cx, cy, R * 0.8, cx, cy, haloR);
      halo.addColorStop(0, "rgba(0,0,0,0)");
      halo.addColorStop(1, "rgba(0,0,0,0.06)");
      octx.beginPath();
      octx.fillStyle = halo;
      octx.arc(cx, cy, haloR, 0, Math.PI * 2);
      octx.fill();

      // solid color
      octx.beginPath();
      octx.fillStyle = color;
      octx.arc(cx, cy, R, 0, Math.PI * 2);
      octx.fill();

      // inner shadow rim
      const rim = octx.createRadialGradient(cx, cy, R * 0.62, cx, cy, R);
      rim.addColorStop(0, "rgba(0,0,0,0)");
      rim.addColorStop(1, "rgba(0,0,0,0.10)");
      octx.beginPath();
      octx.fillStyle = rim;
      octx.arc(cx, cy, R, 0, Math.PI * 2);
      octx.fill();

      // highlight
      octx.beginPath();
      octx.fillStyle = "rgba(255,255,255,0.10)";
      octx.arc(cx - R * 0.33, cy - R * 0.33, R * 0.32, 0, Math.PI * 2);
      octx.fill();

      const sprite: Sprite = { cvs: off, hw: w / 2, hh: h / 2 };
      spriteCache.set(key, sprite);
      return sprite;
    }

    // === BALL INITIALIZATION ================================================
    const balls: Ball[] = [];

    function initBalls() {
      balls.length = 0;
      for (let i = 0; i < CONFIG.BALLS; i++) {
        const r = rand(CONFIG.R_MIN, CONFIG.R_MAX);
        balls.push({
          x: rand(r, W - r),
          y: rand(r, H - r),
          vx: rand(-0.55, 0.55),
          vy: rand(-0.55, 0.55),
          r,
          c: colors[(Math.random() * colors.length) | 0],
        });
      }
    }

    // === MAIN UPDATE LOOP ====================================================
    function update() {
      ctx.clearRect(0, 0, W, H);

      if (!frozen) {
        // 1. Physics integration
        for (let i = 0; i < balls.length; i++) {
          const a = balls[i];

          // pointer push effect (avoidance)
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const rr = (a.r + mouse.r) * (a.r + mouse.r);
          const d2 = dx * dx + dy * dy;
          if (d2 < rr) {
            const dist = Math.max(10, Math.sqrt(d2));
            const ux = dx / dist;
            const uy = dy / dist;
            const push = (1 - dist / Math.sqrt(rr)) * mouse.force;
            a.vx += ux * push;
            a.vy += uy * push;
          }

          // position update
          a.x += a.vx;
          a.y += a.vy;

          // friction
          a.vx *= 0.996;
          a.vy *= 0.996;

          // wall bounce
          if (a.x - a.r < 0) { a.x = a.r; a.vx *= -1; }
          if (a.x + a.r > W) { a.x = W - a.r; a.vx *= -1; }
          if (a.y - a.r < 0) { a.y = a.r; a.vy *= -1; }
          if (a.y + a.r > H) { a.y = H - a.r; a.vy *= -1; }
        }

        // 2. Collision handling between balls
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            const a = balls[i];
            const b = balls[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const minDist = a.r + b.r;
            const d2 = dx * dx + dy * dy;
            if (d2 > 0 && d2 < minDist * minDist) {
              const dist = Math.sqrt(d2);
              const nx = dx / dist;
              const ny = dy / dist;
              const overlap = (minDist - dist) / 2;
              a.x -= nx * overlap;
              a.y -= ny * overlap;
              b.x += nx * overlap;
              b.y += ny * overlap;

              // basic velocity exchange
              const avn = a.vx * nx + a.vy * ny;
              const atn = -a.vx * ny + a.vy * nx;
              const bvn = b.vx * nx + b.vy * ny;
              const btn = -b.vx * ny + b.vy * nx;
              a.vx = bvn * nx + atn * -ny;
              a.vy = bvn * ny + atn * nx;
              b.vx = avn * nx + btn * -ny;
              b.vy = avn * ny + btn * nx;
            }
          }
        }
      }

      // 3. Draw all balls
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        const sprite = getSprite(b.r, b.c);
        ctx.drawImage(sprite.cvs, Math.round(b.x - sprite.hw), Math.round(b.y - sprite.hh));
      }

      if (running) raf = requestAnimationFrame(update);
    }

    // === CLICK / TAP POP LOGIC ==============================================
    function tryPopAt(x: number, y: number) {
      const isDesktop = !isMobile;

      // padding around circle + snap zone for desktop
      const PAD = isMobile ? 18 : 20;
      const SNAP_DIST = isMobile ? 0 : 30;

      let fallbackClosestIdx = -1;
      let fallbackClosestD2 = Number.POSITIVE_INFINITY;

      // loop top → bottom so topmost ball pops first
      for (let i = balls.length - 1; i >= 0; i--) {
        const b = balls[i];

        // 1️⃣ quick bounding box check
        const left = b.x - b.r - PAD;
        const right = b.x + b.r + PAD;
        const top = b.y - b.r - PAD;
        const bottom = b.y + b.r + PAD;
        if (x < left || x > right || y < top || y > bottom) {
          // if desktop, still record the nearest ball in case we "just missed"
          if (isDesktop) {
            const dx2 = x - b.x;
            const dy2 = y - b.y;
            const d22 = dx2 * dx2 + dy2 * dy2;
            if (d22 < fallbackClosestD2) {
              fallbackClosestD2 = d22;
              fallbackClosestIdx = i;
            }
          }
          continue;
        }

        // 2️⃣ circle check (for accuracy)
        const dx = x - b.x;
        const dy = y - b.y;
        const hitR = b.r + PAD;
        if (dx * dx + dy * dy <= hitR * hitR) {
          balls.splice(i, 1);
          if (balls.length === 0) initBalls();
          return;
        }
      }

      // 3️⃣ desktop "snap assist": pop nearest ball if close enough
      if (!isMobile && fallbackClosestIdx !== -1 && fallbackClosestD2 <= SNAP_DIST * SNAP_DIST) {
        balls.splice(fallbackClosestIdx, 1);
        if (balls.length === 0) initBalls();
      }
    }

    // === POINTER + TOUCH HANDLERS ============================================
    const moveTo = (x: number, y: number) => { mouse.x = x; mouse.y = y; };
    const onPointerMove = (e: PointerEvent) => moveTo(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => moveTo(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches?.[0];
      if (t) moveTo(t.clientX, t.clientY);
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const baseR = CONFIG.MOUSE_R;
    const baseF = CONFIG.MOUSE_FORCE;

    const onPointerDown = (e: PointerEvent) => {
      mouse.r = baseR * 1.15;
      mouse.force = baseF * 1.4;
      tryPopAt(e.clientX, e.clientY);
    };
    const onPointerUp = () => { mouse.r = baseR; mouse.force = baseF; };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches?.[0];
      if (t) {
        mouse.r = baseR * 1.15;
        mouse.force = baseF * 1.4;
        tryPopAt(t.clientX, t.clientY);
      }
    };

    // === WINDOW EVENTS =======================================================
    const onResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, CONFIG.DPR_CAP);
      resize();
      for (const b of balls) {
        b.x = clamp(b.x, b.r, W - b.r);
        b.y = clamp(b.y, b.r, H - b.r);
      }
    };

    const onToggle = (e: Event) => {
      const ce = e as CustomEvent<{ disabled: boolean }>;
      frozen = ce.detail.disabled;
      if (!frozen) {
        // small motion kick when resumed
        for (const b of balls) {
          if (Math.abs(b.vx) < 0.05 && Math.abs(b.vy) < 0.05) {
            b.vx += (Math.random() - 0.5) * 0.4;
            b.vy += (Math.random() - 0.5) * 0.4;
          }
        }
      }
    };

    // === INITIALIZATION ======================================================
    resize();
    requestAnimationFrame(() => {
      initBalls();
      raf = requestAnimationFrame(update);
    });

    // attach listeners
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onPointerUp, { passive: true });
    window.addEventListener("touchcancel", onLeave);
    window.addEventListener("resize", onResize);
    window.addEventListener("ballpit-toggle", onToggle);

    // cleanup on unmount
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onPointerUp);
      window.removeEventListener("touchcancel", onLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("ballpit-toggle", onToggle);
    };
  }, []);

  // === RENDER ================================================================
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}