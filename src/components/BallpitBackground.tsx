// src/components/BallpitBackground.tsx
/**
 * -------------------------------------------------------
 *  CodeForge Studio — BallpitBackground
 *  The living background of our site.
 *  Elegant, reactive, and just slightly chaotic — like us.
 *
 *  Tip: If it feels alive... that’s because it is. ✨
 * -------------------------------------------------------
 */
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
    // 🧠 Secret handshake for devs
    const DEV_MODE = import.meta?.env?.MODE !== "production";
    if (DEV_MODE && typeof window !== "undefined") {
      console.log(
        "%c🪄 CodeForge Ballpit Online",
        "padding:6px 10px;border-radius:8px;background:#0F4452;color:#00A0A0;font-weight:700;",
        "\n✨ A living canvas — because static backgrounds are boring."
      );
    }

    // Grab canvas/context once and bail early if missing
    const canvasMaybe = canvasRef.current;
    if (!canvasMaybe) return;
    const canvas = canvasMaybe as HTMLCanvasElement;
    const ctxMaybe = canvas.getContext("2d");
    if (!ctxMaybe) return;
    const ctx: CanvasRenderingContext2D = ctxMaybe;

    // 🧩 Device profile — tuned for smoothness vs battery 🔋
    const nativeDpr = window.devicePixelRatio || 1;
    const isCoarse = matchMedia("(pointer: coarse)").matches;
    const isSmall = matchMedia("(max-width: 768px)").matches;
    const isMobile = isCoarse || isSmall;

    const CONFIG = isMobile
      ? { BALLS: 14, R_MIN: 12, R_MAX: 22, DPR_CAP: 1.25, MOUSE_R: 120, MOUSE_FORCE: 1.25 }
      : { BALLS: 26, R_MIN: 14, R_MAX: 28, DPR_CAP: 1.5, MOUSE_R: 90, MOUSE_FORCE: 0.9 };

    let dpr = Math.min(nativeDpr, CONFIG.DPR_CAP); // recomputed on resize
    let W = 0, H = 0;
    let raf = 0;
    let running = true;
    let frozen = window.__BALLPIT_DISABLED === true; // must be let (updated by toggle)

    // 🎨 Brand palette — our signature glow
    const rs = getComputedStyle(document.documentElement);
    const SEA = (rs.getPropertyValue("--color-brand-sea") || "#00A0A0").trim();
    const MIDNIGHT = (rs.getPropertyValue("--color-brand-midnight") || "#0F4452").trim();
    const colors = [SEA, MIDNIGHT, "#0BB3B3", "#067A7A", "#06B6D4", "#22D3EE", "#0891B2", "#38BDF8"];

    // 🖱️ The mouse — feared by all spheres
    const mouse = { x: -9999, y: -9999, r: CONFIG.MOUSE_R, force: CONFIG.MOUSE_FORCE };

    // 🛠️ Utils
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

    function resize() {
      // recalc DPR for huge screens to save battery
      const area = window.innerWidth * window.innerHeight;
      dpr = Math.min(nativeDpr, CONFIG.DPR_CAP);
      if (area > 3_500_000) dpr = Math.min(dpr, 1);

      W = window.innerWidth;
      H = window.innerHeight;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // 🧱 Sprite cache — glossy look without re-drawing paint each frame
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

      // body + rim + spec
      octx.beginPath();
      octx.fillStyle = color;
      octx.arc(cx, cy, R, 0, Math.PI * 2);
      octx.fill();

      const rim = octx.createRadialGradient(cx, cy, R * 0.62, cx, cy, R);
      rim.addColorStop(0, "rgba(0,0,0,0)");
      rim.addColorStop(1, "rgba(0,0,0,0.10)");
      octx.beginPath();
      octx.fillStyle = rim;
      octx.arc(cx, cy, R, 0, Math.PI * 2);
      octx.fill();

      octx.beginPath();
      octx.fillStyle = "rgba(255,255,255,0.10)";
      octx.arc(cx - R * 0.33, cy - R * 0.33, R * 0.32, 0, Math.PI * 2);
      octx.fill();

      const sprite: Sprite = { cvs: off, hw: w / 2, hh: h / 2 };
      spriteCache.set(key, sprite);
      return sprite;
    }

    // 🎱 Balls
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

    // 🧪 Dev shortcut: Shift + B => spawn 5 new balls
    function addBalls(n = 5) {
      for (let i = 0; i < n; i++) {
        const r = rand(CONFIG.R_MIN, CONFIG.R_MAX);
        balls.push({
          x: rand(r, W - r),
          y: rand(r, H - r),
          vx: rand(-1.25, 1.25),
          vy: rand(-1.25, 1.25),
          r,
          c: colors[(Math.random() * colors.length) | 0],
        });
      }
      if (DEV_MODE) {
        console.log(
          `%c✨ +${n} new friends joined the chaos!`,
          "padding:3px 8px;border-radius:8px;background:#00A0A0;color:#fff;font-weight:600;"
        );
      }
    }

    // 🔀 Toggle handler (from Navbar): window.dispatchEvent(new CustomEvent("ballpit-toggle", { detail: { disabled: boolean } }))
    const onToggle = (e: Event) => {
      const ce = e as CustomEvent<{ disabled: boolean }>;
      frozen = !!ce.detail.disabled; // update local state
      window.__BALLPIT_DISABLED = frozen; // keep global in sync
      if (!frozen) {
        // nudge balls a bit when resuming to avoid “dead still” look
        for (const b of balls) {
          if (Math.abs(b.vx) < 0.05 && Math.abs(b.vy) < 0.05) {
            b.vx += (Math.random() - 0.5) * 0.4;
            b.vy += (Math.random() - 0.5) * 0.4;
          }
        }
      }
    };

    // ⚙️ Main animation loop
    function update() {
      ctx.clearRect(0, 0, W, H);

      if (!frozen) {
        for (let i = 0; i < balls.length; i++) {
          const a = balls[i];

          // Pointer repulsion — friendly nudge
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const rr = (a.r + mouse.r) ** 2;
          const d2 = dx * dx + dy * dy;
          if (d2 < rr) {
            const dist = Math.max(10, Math.sqrt(d2));
            const ux = dx / dist;
            const uy = dy / dist;
            const push = (1 - dist / Math.sqrt(rr)) * mouse.force;
            a.vx += ux * push;
            a.vy += uy * push;
          }

          a.x += a.vx;
          a.y += a.vy;
          a.vx *= 0.996;
          a.vy *= 0.996;

          // Walls
          if (a.x - a.r < 0) { a.x = a.r; a.vx *= -1; }
          if (a.x + a.r > W) { a.x = W - a.r; a.vx *= -1; }
          if (a.y - a.r < 0) { a.y = a.r; a.vy *= -1; }
          if (a.y + a.r > H) { a.y = H - a.r; a.vy *= -1; }
        }

        // Simple collisions
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            const a = balls[i], b = balls[j];
            const dx = b.x - a.x, dy = b.y - a.y;
            const minDist = a.r + b.r;
            const d2 = dx * dx + dy * dy;
            if (d2 > 0 && d2 < minDist * minDist) {
              const dist = Math.sqrt(d2);
              const nx = dx / dist, ny = dy / dist;
              const overlap = (minDist - dist) / 2;
              a.x -= nx * overlap; a.y -= ny * overlap;
              b.x += nx * overlap; b.y += ny * overlap;

              // swap velocity along the normal
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

      // Draw
      for (const b of balls) {
        const sprite = getSprite(b.r, b.c);
        ctx.drawImage(sprite.cvs, Math.round(b.x - sprite.hw), Math.round(b.y - sprite.hh));
      }

      if (running) raf = requestAnimationFrame(update);
    }

    // 🖱️ Inputs
    const moveTo = (x: number, y: number) => { mouse.x = x; mouse.y = y; };
    const onPointerMove = (e: PointerEvent) => moveTo(e.clientX, e.clientY);
    const onPointerDown = () => { mouse.r = CONFIG.MOUSE_R * 1.15; mouse.force = CONFIG.MOUSE_FORCE * 1.4; };
    const onPointerUp = () => { mouse.r = CONFIG.MOUSE_R; mouse.force = CONFIG.MOUSE_FORCE; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const onResize = () => {
      resize();
      // keep all balls inside after a resize (uses clamp -> satisfy lints)
      for (const b of balls) {
        b.x = clamp(b.x, b.r, W - b.r);
        b.y = clamp(b.y, b.r, H - b.r);
      }
    };

    // 🎹 Dev shortcut
    const onKeyDown = (e: KeyboardEvent) => {
      if (DEV_MODE && e.shiftKey && e.key.toLowerCase() === "b") addBalls(5);
    };

    // 🚀 Init
    resize();
    requestAnimationFrame(() => {
      initBalls();
      raf = requestAnimationFrame(update);
    });

    // 🎧 Events
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("ballpit-toggle", onToggle);

    // 🧹 Cleanup
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("ballpit-toggle", onToggle);
    };
  }, []);

  return <canvas ref={canvasRef} className="ballpit-canvas" aria-hidden="true" />;
}
