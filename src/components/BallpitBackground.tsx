// src/components/BallpitBackground.tsx
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    __BALLPIT_DISABLED?: boolean;
  }
}

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  c: string;
};

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

    // ---- CONFIG ----------------------------------------------------
    const nativeDpr = window.devicePixelRatio || 1;
    const isCoarse = matchMedia("(pointer: coarse)").matches;
    const isSmall = matchMedia("(max-width: 768px)").matches;
    const isMobile = isCoarse || isSmall;

    // navbar height to spawn above
    const NAVBAR_H = 64; // match your h-16

    // one config for both desktop + mobile, just DPR capped a bit on mobile
    const CONFIG = {
      BALLS: 26,
      R_MIN: 14,
      R_MAX: 28,
      DPR_CAP: isMobile ? 1.25 : 1.5,
      MOUSE_R: 80,          // 👈 lowered = less panic
      MOUSE_FORCE: 0.45,    // 👈 lowered = less “run away”
    };

    let dpr = Math.min(nativeDpr, CONFIG.DPR_CAP);
    let W = 0;
    let H = 0;
    let raf = 0;
    let running = true;

    // if header said “stille bakgrunn” we start in frozen click-mode
    let frozen = window.__BALLPIT_DISABLED === true;

    // ---- COLORS ----------------------------------------------------
    const rs = getComputedStyle(document.documentElement);
    const SEA = (rs.getPropertyValue("--color-brand-sea") || "#00A0A0").trim();
    const MIDNIGHT = (rs.getPropertyValue("--color-brand-midnight") || "#0F4452").trim();
    const colors = [
      SEA,
      MIDNIGHT,
      "#0BB3B3",
      "#067A7A",
      "#06B6D4",
      "#22D3EE",
      "#0891B2",
      "#38BDF8",
    ];

    // ---- POINTER PROXY (for push + click) --------------------------
    const mouse = {
      x: -9999,
      y: -9999,
      r: CONFIG.MOUSE_R,
      force: CONFIG.MOUSE_FORCE,
      down: false,
    };

    // ---- DIMENSIONS / DPR -----------------------------------------
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

    // ---- SPRITE CACHE (for pretty balls) ---------------------------
    const spriteCache = new Map<string, Sprite>();
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
      const octx = off.getContext("2d")!;
      octx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = pad + R;
      const cy = pad + R;

      // soft shadow
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
      octx.filter = "none";

      // halo
      const haloR = R * 1.1;
      const halo = octx.createRadialGradient(cx, cy, R * 0.8, cx, cy, haloR);
      halo.addColorStop(0, "rgba(0,0,0,0)");
      halo.addColorStop(1, "rgba(0,0,0,0.06)");
      octx.beginPath();
      octx.fillStyle = halo;
      octx.arc(cx, cy, haloR, 0, Math.PI * 2);
      octx.fill();

      // body
      octx.beginPath();
      octx.fillStyle = color;
      octx.arc(cx, cy, R, 0, Math.PI * 2);
      octx.fill();

      // rim
      const rim = octx.createRadialGradient(cx, cy, R * 0.62, cx, cy, R);
      rim.addColorStop(0, "rgba(0,0,0,0)");
      rim.addColorStop(1, "rgba(0,0,0,0.10)");
      octx.beginPath();
      octx.fillStyle = rim;
      octx.arc(cx, cy, R, 0, Math.PI * 2);
      octx.fill();

      // spec
      octx.beginPath();
      octx.fillStyle = "rgba(255,255,255,0.10)";
      octx.arc(cx - R * 0.33, cy - R * 0.33, R * 0.32, 0, Math.PI * 2);
      octx.fill();

      const sprite: Sprite = { cvs: off, hw: w / 2, hh: h / 2 };
      spriteCache.set(key, sprite);
      return sprite;
    }

    // ---- BALLS -----------------------------------------------------
    const balls: Ball[] = [];

    // spawn all balls from behind the navbar (top) ← your idea
    function initBalls() {
      balls.length = 0;
      for (let i = 0; i < CONFIG.BALLS; i++) {
        const r = rand(CONFIG.R_MIN, CONFIG.R_MAX);
        balls.push({
          x: rand(r, W - r),
          y: -NAVBAR_H - rand(10, 50),
          vx: rand(-0.2, 0.2),
          vy: rand(0.3, 1),
          r,
          c: colors[(Math.random() * colors.length) | 0],
        });
      }
    }

    // if we popped all – respawn from nav
    function respawnAll() {
      initBalls();
    }

    // ---- POP LOGIC -------------------------------------------------
    function popBallAt(x: number, y: number): boolean {
      if (frozen) return false; // stille = no popping

      // desktop felt too picky → give it a little extra radius
      const EXTRA_HIT = 6;

      for (let i = balls.length - 1; i >= 0; i--) {
        const b = balls[i];
        const dx = x - b.x;
        const dy = y - b.y;
        const dist2 = dx * dx + dy * dy;
        const hitR = b.r + EXTRA_HIT;
        if (dist2 <= hitR * hitR) {
          balls.splice(i, 1);
          return true;
        }
      }
      return false;
    }

    // ---- SIMULATION ------------------------------------------------
    function update() {
      ctx.clearRect(0, 0, W, H);

      // move / physics
      for (let i = 0; i < balls.length; i++) {
        const a = balls[i];

        if (!frozen) {
          // pointer push (subtle)
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const rr = (a.r + mouse.r) * (a.r + mouse.r);
          const d2 = dx * dx + dy * dy;
          if (d2 < rr) {
            const dist = Math.max(12, Math.sqrt(d2));
            const ux = dx / dist;
            const uy = dy / dist;
            // weaker push than before
            const push = (1 - dist / Math.sqrt(rr)) * mouse.force * 0.45;
            a.vx += ux * push;
            a.vy += uy * push;
          }

          // integrate
          a.x += a.vx;
          a.y += a.vy;

          // friction
          a.vx *= 0.996;
          a.vy *= 0.996;

          // walls
          if (a.x - a.r < 0) {
            a.x = a.r;
            a.vx *= -1;
          }
          if (a.x + a.r > W) {
            a.x = W - a.r;
            a.vx *= -1;
          }
          if (a.y - a.r < 0) {
            a.y = a.r;
            a.vy *= -1;
          }
          if (a.y + a.r > H) {
            a.y = H - a.r;
            a.vy *= -1;
          }
        }

        // draw (always)
        const sprite = getSprite(a.r, a.c);
        ctx.drawImage(sprite.cvs, Math.round(a.x - sprite.hw), Math.round(a.y - sprite.hh));
      }

      // 👇 REAL COLLISIONS (after moving)
      if (!frozen) {
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

              // separate
              a.x -= nx * overlap;
              a.y -= ny * overlap;
              b.x += nx * overlap;
              b.y += ny * overlap;

              // swap normal components = simple elastic collision
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

      // if user popped them all → respawn
      if (balls.length === 0) {
        respawnAll();
      }

      if (running) raf = requestAnimationFrame(update);
    }

    // ---- INPUT HANDLERS --------------------------------------------
    const moveTo = (x: number, y: number) => {
      mouse.x = x;
      mouse.y = y;
    };

    const onPointerMove = (e: PointerEvent) => moveTo(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => moveTo(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches?.[0];
      if (t) moveTo(t.clientX, t.clientY);
    };

    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const baseR = CONFIG.MOUSE_R;
    const baseF = CONFIG.MOUSE_FORCE;

    const onPointerDown = (e: PointerEvent) => {
      mouse.down = true;
      mouse.r = baseR * 1.15;
      mouse.force = baseF * 1.4;

      // try pop at click position
      const clicked = popBallAt(e.clientX, e.clientY);
      if (clicked) return;
    };

    const onPointerUp = () => {
      mouse.down = false;
      mouse.r = baseR;
      mouse.force = baseF;
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      mouse.down = true;
      mouse.r = baseR * 1.15;
      mouse.force = baseF * 1.4;
      popBallAt(t.clientX, t.clientY);
    };

    const onTouchEnd = () => {
      mouse.down = false;
      mouse.r = baseR;
      mouse.force = baseF;
    };

    // ---- RESIZE ----------------------------------------------------
    const onResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, CONFIG.DPR_CAP);
      resize();
      // clamp all balls into view
      for (const b of balls) {
        b.x = clamp(b.x, b.r, W - b.r);
        b.y = clamp(b.y, b.r, H - b.r);
      }
    };

    // ---- LISTEN TO HEADER TOGGLE (stille / interaktiv) ------------
    const onToggle = (e: Event) => {
      const ce = e as CustomEvent<{ disabled: boolean }>;
      frozen = ce.detail.disabled;
      window.__BALLPIT_DISABLED = ce.detail.disabled;
    };
    window.addEventListener("ballpit-toggle", onToggle);

    // ---- INIT ------------------------------------------------------
    resize();
    requestAnimationFrame(() => {
      initBalls();     // spawn from behind nav
      raf = requestAnimationFrame(update);
    });

    // listeners
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onLeave);
    window.addEventListener("resize", onResize);

    // cleanup
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
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("ballpit-toggle", onToggle);
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