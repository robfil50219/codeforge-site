// src/components/BallpitBackground.tsx
import { useEffect, useRef } from "react";

type Props = {
  colors?: string[];
  count?: number;
  minSize?: number;
  maxSize?: number;
  friction?: number;      // frame friction (0.990–0.999)
  bounce?: number;        // restitution (0.80–0.98)
  opacity?: number;       // canvas global alpha
  mouseRadius?: number;   // px
  mouseStrength?: number; // 0.05–1
  force?: boolean;        // ignore prefers-reduced-motion
  layer?: "front" | "behind";
  shadowBlur?: number;    // glow
  outlineAlpha?: number;  // thin outline for contrast
};

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  c: string; // hex
};

// --- color helpers ---
function clamp(n: number, a: number, b: number) { return Math.max(a, Math.min(b, n)); }
function hexToRgb(hex: string) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}
function rgbToStr(r: number, g: number, b: number, a = 1) {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
}
function adjustLum(hex: string, factor: number) {
  const { r, g, b } = hexToRgb(hex);
  return { r: clamp(r * factor, 0, 255), g: clamp(g * factor, 0, 255), b: clamp(b * factor, 0, 255) };
}

export default function BallpitBackground({
  colors = ["#00A0A0", "#14B8A6", "#06B6D4", "#0F4452", "#001920"],
  count,
  minSize = 12,
  maxSize = 30,
  friction = 0.995,
  bounce = 0.96,
  opacity = 1,
  mouseRadius = 180,
  mouseStrength = 0.45,
  force = true,
  layer = "behind",
  shadowBlur = 12,
  outlineAlpha = 0.25,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!force && prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // 🔧 Hard-type: sørger for at TS ikke tror ctx kan være null
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    // Hvis du vil ha runtime-guard i tillegg, fjern kommentaren under:
    // if (!ctx) return;

    let w = 0, h = 0, dpr = 1;
    let balls: Ball[] = [];
    let mouseX = 0, mouseY = 0, hasMouse = false;

    // Spatial grid for fast ball-ball collisions
    let cellSize = (maxSize * 2) | 0; // one cell ~ two diameters
    const grid = new Map<string, number[]>(); // key -> indices

    const isMobile = () => window.innerWidth < 768;
    const TARGET_COUNT = count ?? (isMobile() ? 32 : 72);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const pick = <T,>(arr: T[]) => arr[(Math.random() * arr.length) | 0];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      cellSize = Math.max(16, (maxSize * 2) | 0);

      balls = Array.from({ length: TARGET_COUNT }).map(() => {
        const r = rand(minSize, maxSize);
        return {
          x: rand(r, w - r),
          y: rand(r, h - r),
          vx: rand(-0.9, 0.9),
          vy: rand(-0.9, 0.9),
          r,
          c: pick(colors),
        };
      });
    };

    const onMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; hasMouse = true; };
    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches?.length) return;
      mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; hasMouse = true;
    };

    const cellKey = (ix: number, iy: number) => `${ix},${iy}`;

    function buildGrid() {
      grid.clear();
      const inv = 1 / cellSize;
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        const ix = Math.floor(b.x * inv);
        const iy = Math.floor(b.y * inv);
        const key = cellKey(ix, iy);
        const bucket = grid.get(key);
        if (bucket) bucket.push(i);
        else grid.set(key, [i]);
      }
    }

    function resolvePair(a: Ball, b: Ball) {
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      let dist = Math.hypot(dx, dy);
      const minDist = a.r + b.r;

      if (dist === 0) {
        // jitter to avoid NaN
        const angle = Math.random() * Math.PI * 2;
        dx = Math.cos(angle) * 0.01;
        dy = Math.sin(angle) * 0.01;
        dist = Math.hypot(dx, dy);
      }

      if (dist < minDist) {
        // push them apart equally
        const nx = dx / dist;
        const ny = dy / dist;
        const overlap = (minDist - dist) * 0.5;
        a.x -= nx * overlap; a.y -= ny * overlap;
        b.x += nx * overlap; b.y += ny * overlap;

        // elastic collision (equal mass): swap normal components (with restitution)
        const tx = -ny, ty = nx; // tangent
        const v1n = a.vx * nx + a.vy * ny;
        const v1t = a.vx * tx + a.vy * ty;
        const v2n = b.vx * nx + b.vy * ny;
        const v2t = b.vx * tx + b.vy * ty;

        const v1nAfter = v2n * bounce;
        const v2nAfter = v1n * bounce;

        a.vx = v1nAfter * nx + v1t * tx;
        a.vy = v1nAfter * ny + v1t * ty;
        b.vx = v2nAfter * nx + v2t * tx;
        b.vy = v2nAfter * ny + v2t * ty;
      }
    }

    function collide() {
      const inv = 1 / cellSize;
      for (let i = 0; i < balls.length; i++) {
        const a = balls[i];
        const ix = Math.floor(a.x * inv);
        const iy = Math.floor(a.y * inv);

        // Check current cell + neighbors (3x3)
        for (let oy = -1; oy <= 1; oy++) {
          for (let ox = -1; ox <= 1; ox++) {
            const key = cellKey(ix + ox, iy + oy);
            const bucket = grid.get(key);
            if (!bucket) continue;

            for (let k = 0; k < bucket.length; k++) {
              const j = bucket[k];
              if (j <= i) continue; // avoid double work
              resolvePair(a, balls[j]);
            }
          }
        }
      }
    }

    function drawBall(b: Ball) {
      const center = adjustLum(b.c, 1.25); // brighter middle
      const edge = adjustLum(b.c, 0.9);    // darker edge
      const grad = ctx.createRadialGradient(
        b.x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.1,
        b.x, b.y, b.r
      );
      grad.addColorStop(0, rgbToStr(center.r, center.g, center.b, 1));
      grad.addColorStop(1, rgbToStr(edge.r, edge.g, edge.b, 1));

      ctx.save();
      if (shadowBlur > 0) {
        ctx.shadowColor = rgbToStr(center.r, center.g, center.b, 0.9);
        ctx.shadowBlur = shadowBlur;
      }
      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (outlineAlpha > 0) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.lineWidth = 1.25;
        ctx.strokeStyle = `rgba(0,0,0,${outlineAlpha})`;
        ctx.stroke();
      }
    }

    const step = () => {
      // 1) integrate forces/velocities
      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];

        // mouse repulsion
        if (hasMouse) {
          const dx = b.x - mouseX;
          const dy = b.y - mouseY;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < mouseRadius) {
            const f = (1 - dist / mouseRadius) * mouseStrength;
            const nx = dx / dist, ny = dy / dist;
            b.vx += nx * f;
            b.vy += ny * f;
          }
        }

        // friction + integrate
        b.vx *= friction;
        b.vy *= friction;
        b.x += b.vx;
        b.y += b.vy;

        // wall collisions
        if (b.x - b.r < 0) { b.x = b.r; b.vx = -b.vx * bounce; }
        if (b.x + b.r > w) { b.x = w - b.r; b.vx = -b.vx * bounce; }
        if (b.y - b.r < 0) { b.y = b.r; b.vy = -b.vy * bounce; }
        if (b.y + b.r > h) { b.y = h - b.r; b.vy = -b.vy * bounce; }
      }

      // 2) build spatial grid and resolve ball-ball collisions
            buildGrid();
            collide();

      // 3) draw
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.globalAlpha = opacity;
      for (let i = 0; i < balls.length; i++) drawBall(balls[i]);
      ctx.restore();

      rafRef.current = requestAnimationFrame(step);
    };

    resize();
    step();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [
    colors, count, minSize, maxSize, friction, bounce, opacity,
    mouseRadius, mouseStrength, force, shadowBlur, outlineAlpha,
  ]);

  const zClass = layer === "front" ? "z-30" : "z-0"; // behind = z-0
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 ${zClass} pointer-events-none`}
      aria-hidden="true"
    />
  );
}