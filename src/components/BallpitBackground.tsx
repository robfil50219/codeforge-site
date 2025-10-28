// src/components/BallpitBackground.tsx
import { useEffect, useRef } from "react";

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;   // visual radius (sprites quantized to px)
  c: string;   // color
};

type Sprite = {
  cvs: HTMLCanvasElement;
  hw: number;  // half width
  hh: number;  // half height
};

export default function BallpitBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Bind a non-null canvas and ctx once
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (!canvas) return;

    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    // --- DPR (cap for performance) ---
    const nativeDpr = window.devicePixelRatio || 1;
    let dpr = nativeDpr > 1.5 ? 1.5 : nativeDpr; // cap retina a bit for FPS

    let W = 0;
    let H = 0;
    let raf = 0;
    let running = true;

    // --- Brand colors from :root with fallbacks ---
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

    // --- Params ---
    const BALLS_COUNT = 26;
    const R_MIN = 14;
    const R_MAX = 28;

    // mouse repulsion
    const mouse = { x: -9999, y: -9999, r: 90, force: 0.9 };

    // --- Resize using non-null canvas & ctx ---
        function resize() {
          W = window.innerWidth;
          H = window.innerHeight;
          canvas!.style.width = `${W}px`;
          canvas!.style.height = `${H}px`;
          canvas!.width = Math.floor(W * dpr);
          canvas!.height = Math.floor(H * dpr);
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

    // --- Utils ---
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

    // --- Sprite cache keyed by color-radius ---
    const spriteCache = new Map<string, Sprite>();

    function getSprite(r: number, color: string): Sprite {
      // quantize radius to reduce sprite variants
      const R = Math.max(6, Math.round(r));
      const key = `${color}-${R}`;

      const hit = spriteCache.get(key);
      if (hit) return hit;

      // padding for shadow
      const pad = Math.round(R * 1.05); // a bit more room for bigger shadow
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

      // --- Shadow: stronger + a little blur (offscreen, so cheap at runtime) ---
      const rx = R * 1.05;
      const ry = Math.max(6, R * 0.45);
      const sx = cx + R * 0.30;
      const sy = cy + R * 0.66;

      octx.save();
      // small blur ONLY for the shadow sprite drawing
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

      // Optional: a faint ambient halo to blend a touch
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

      // --- Ball: crisp rim (solid), subtle rim shading, small highlight ---
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

    // --- Balls ---
    const balls: Ball[] = [];

    function initBalls() {
      balls.length = 0;
      for (let i = 0; i < BALLS_COUNT; i++) {
        const r = rand(R_MIN, R_MAX);
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

    // --- Sim/Render loop ---
    function update() {
      ctx.clearRect(0, 0, W, H);

      // movement + mouse repulsion
      for (let i = 0; i < balls.length; i++) {
        const a = balls[i];

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

        a.x += a.vx;
        a.y += a.vy;

        // light damping for stability
        a.vx *= 0.996;
        a.vy *= 0.996;

        // wall collisions
        if (a.x - a.r < 0) { a.x = a.r; a.vx *= -1; }
        if (a.x + a.r > W) { a.x = W - a.r; a.vx *= -1; }
        if (a.y - a.r < 0) { a.y = a.r; a.vy *= -1; }
        if (a.y + a.r > H) { a.y = H - a.r; a.vy *= -1; }
      }

      // ball–ball collisions (equal mass, elastic)
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

            // separate
            const overlap = (minDist - dist) / 2;
            a.x -= nx * overlap; a.y -= ny * overlap;
            b.x += nx * overlap; b.y += ny * overlap;

            // swap normal components (elastic, equal mass)
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

      // draw via sprites (fast)
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        const sprite = getSprite(b.r, b.c);
        ctx.drawImage(sprite.cvs, Math.round(b.x - sprite.hw), Math.round(b.y - sprite.hh));
      }

      if (running) raf = requestAnimationFrame(update);
    }

    // --- Events ---
    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onResize() {
      // adjust DPR on huge areas to keep FPS up
      const area = window.innerWidth * window.innerHeight;
      dpr = nativeDpr;
      if (area > 2_000_000 && nativeDpr > 1.25) dpr = 1.25;
      if (area > 3_500_000 && nativeDpr > 1) dpr = 1;
      resize();
      for (const b of balls) {
        b.x = clamp(b.x, b.r, W - b.r);
        b.y = clamp(b.y, b.r, H - b.r);
      }
    }

    // --- Init ---
    resize();
    setTimeout(() => {
      initBalls();
      update();
    }, 0);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
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