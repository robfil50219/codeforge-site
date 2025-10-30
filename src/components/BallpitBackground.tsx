// src/components/BallpitBackground.tsx
import { useEffect, useRef } from "react";

declare global {
  interface Window { __BALLPIT_DISABLED?: boolean; }
}

type Ball = {
  x:number;
  y:number;
  vx:number;
  vy:number;
  r:number;
  m:number;
  c:string;
};

type Sprite = { cvs:HTMLCanvasElement; hw:number; hh:number };

export default function BallpitBackground() {
  const canvasRef = useRef<HTMLCanvasElement|null>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctxRaw = el.getContext("2d");
    if (!ctxRaw) return;

    const canvas = el;
    const ctx = ctxRaw;

    // --- config (tuned for orbit look) ---
    const nativeDpr = window.devicePixelRatio || 1;
    const isCoarse = matchMedia("(pointer: coarse)").matches;
    const isSmall = matchMedia("(max-width: 768px)").matches;
    const isMobile = isCoarse || isSmall;

    const CFG = {
      BALLS: isMobile ? 16 : 26,
      R_MIN: 14,
      R_MAX: 28,
      DPR_CAP: isMobile ? 1.25 : 1.5,

      // “sun” in center
      CENTER_STRENGTH: 140,         // pull toward center
      CENTER_SOFTEN: 80,            // prevents insta-pull

      // small ball-to-ball repulsion so they don’t clump
      REPEL_STRENGTH: 22,
      REPEL_RADIUS: 90,

      // motion
      FRICTION: 0.996,
      MAX_SPEED: 6,

      // pointer avoidance
      POINTER_R: isMobile ? 120 : 90,
      POINTER_FORCE: isMobile ? 1.25 : 1.0,

      // dragging
      PICK_MULT: 1.25,
    };

    let dpr = Math.min(nativeDpr, CFG.DPR_CAP);
    let W = 0, H = 0;
    let raf = 0;
    let running = true;
    let frozen = window.__BALLPIT_DISABLED === true;

    // brand colors
    const rs = getComputedStyle(document.documentElement);
    const SEA = (rs.getPropertyValue("--color-brand-sea") || "#00A0A0").trim();
    const MID = (rs.getPropertyValue("--color-brand-midnight") || "#0F4452").trim();
    const colors = [SEA, MID, "#0BB3B3", "#067A7A", "#06B6D4", "#22D3EE", "#0891B2", "#38BDF8"];

    // size
    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }

    const rand = (a:number,b:number)=>Math.random()*(b-a)+a;
    const clamp = (v:number,lo:number,hi:number)=>v<lo?lo:v>hi?hi:v;
    const dist2 = (dx:number,dy:number)=>dx*dx+dy*dy;

    // sprite cache
    const spriteCache = new Map<string,Sprite>();
    function getSprite(r:number,color:string):Sprite {
      const R = Math.max(6,Math.round(r));
      const key = `${color}-${R}-${dpr.toFixed(2)}`;
      const hit = spriteCache.get(key);
      if (hit) return hit;

      const pad = Math.round(R*1.05);
      const w = R*2 + pad*2;
      const h = R*2 + pad*2;

      const off = document.createElement("canvas");
      off.width = Math.ceil(w*dpr);
      off.height = Math.ceil(h*dpr);
      const octx = off.getContext("2d")!;
      octx.setTransform(dpr,0,0,dpr,0,0);

      const cx = pad + R;
      const cy = pad + R;

      // shadow
      const rx = R*1.04;
      const ry = Math.max(6,R*0.42);
      const sx = cx + R*0.3;
      const sy = cy + R*0.66;
      octx.save();
      octx.filter = "blur(3px)";
      octx.translate(sx,sy);
      octx.scale(1,ry/rx);
      const sg = octx.createRadialGradient(0,0,R*0.1,0,0,rx);
      sg.addColorStop(0,"rgba(15,23,42,0.22)");
      sg.addColorStop(1,"rgba(15,23,42,0)");
      octx.beginPath();
      octx.arc(0,0,rx,0,Math.PI*2);
      octx.fillStyle = sg;
      octx.fill();
      octx.restore();
      octx.filter = "none";

      // halo
      const halo = octx.createRadialGradient(cx,cy,R*0.8,cx,cy,R*1.12);
      halo.addColorStop(0,"rgba(0,0,0,0)");
      halo.addColorStop(1,"rgba(0,0,0,0.06)");
      octx.beginPath();
      octx.fillStyle = halo;
      octx.arc(cx,cy,R*1.12,0,Math.PI*2);
      octx.fill();

      // body
      octx.beginPath();
      octx.fillStyle = color;
      octx.arc(cx,cy,R,0,Math.PI*2);
      octx.fill();

      // rim
      const rim = octx.createRadialGradient(cx,cy,R*0.6,cx,cy,R);
      rim.addColorStop(0,"rgba(0,0,0,0)");
      rim.addColorStop(1,"rgba(0,0,0,0.12)");
      octx.beginPath();
      octx.fillStyle = rim;
      octx.arc(cx,cy,R,0,Math.PI*2);
      octx.fill();

      // spec
      octx.beginPath();
      octx.fillStyle = "rgba(255,255,255,0.14)";
      octx.arc(cx - R*0.33, cy - R*0.33, R*0.28, 0, Math.PI*2);
      octx.fill();

      const sprite:Sprite = { cvs:off, hw:w/2, hh:h/2 };
      spriteCache.set(key,sprite);
      return sprite;
    }

    // balls
    const balls:Ball[] = [];
    function initBalls() {
      balls.length = 0;
      const cx = W*0.5;
      const cy = H*0.5;

      for (let i=0;i<CFG.BALLS;i++) {
        // place around center in a ring-ish pattern
        const angle = Math.random()*Math.PI*2;
        const radius = rand(90, Math.min(W,H)*0.45);
        const x = cx + Math.cos(angle)*radius;
        const y = cy + Math.sin(angle)*radius;
        const r = rand(CFG.R_MIN,CFG.R_MAX);
        const m = r*r;

        // give tangential velocity so it “orbits”
        const speed = Math.sqrt(CFG.CENTER_STRENGTH / radius) * 0.35;
        const vx = -Math.sin(angle) * speed;
        const vy =  Math.cos(angle) * speed;

        balls.push({
          x, y, vx, vy, r, m,
          c: colors[(Math.random()*colors.length)|0],
        });
      }
    }

    // pointer proxy
    let pointerX = -9999;
    let pointerY = -9999;
    let draggingIndex: number | null = null;
    let dragDX = 0;
    let dragDY = 0;
    let lastPX = 0;
    let lastPY = 0;
    let throwVX = 0;
    let throwVY = 0;

    function getXY(e:PointerEvent|MouseEvent|TouchEvent):{x:number;y:number} {
      if ("touches" in e && e.touches.length>0) {
        return { x:e.touches[0].clientX, y:e.touches[0].clientY };
      }
      if ("changedTouches" in e && e.changedTouches.length>0) {
        return { x:e.changedTouches[0].clientX, y:e.changedTouches[0].clientY };
      }
      return { x:(e as MouseEvent).clientX, y:(e as MouseEvent).clientY };
    }

    // physics step
    function step() {
      const cx = W*0.5;
      const cy = H*0.5;

      if (!frozen) {
        for (let i=0;i<balls.length;i++) {
          const b = balls[i];

          // skip position integration if dragging
          if (i === draggingIndex) continue;

          // 1) attraction to center (the “sun”)
          const dxC = cx - b.x;
          const dyC = cy - b.y;
          const d2C = dxC*dxC + dyC*dyC + CFG.CENTER_SOFTEN*CFG.CENTER_SOFTEN;
          const distC = Math.sqrt(d2C);
          const pull = CFG.CENTER_STRENGTH / d2C; // weaker when further
          const axC = (dxC / distC) * pull;
          const ayC = (dyC / distC) * pull;

          // 2) pointer avoidance (mouse/finger)
          let axP = 0;
          let ayP = 0;
          if (pointerX > -9000) {
            const dxP = b.x - pointerX;
            const dyP = b.y - pointerY;
            const rr = CFG.POINTER_R + b.r;
            const d2P = dxP*dxP + dyP*dyP;
            if (d2P < rr*rr) {
              const dP = Math.max(12, Math.sqrt(d2P));
              const push = (1 - dP/rr) * CFG.POINTER_FORCE;
              axP += (dxP/dP) * push;
              ayP += (dyP/dP) * push;
            }
          }

          // 3) light mutual repulsion
          let axR = 0;
          let ayR = 0;
          for (let j=0;j<balls.length;j++) {
            if (i === j) continue;
            const o = balls[j];
            const dx = b.x - o.x;
            const dy = b.y - o.y;
            const d2B = dx*dx + dy*dy;
            if (d2B <= 0) continue;
            const d = Math.sqrt(d2B);
            if (d < CFG.REPEL_RADIUS) {
              const force = (1 - d/CFG.REPEL_RADIUS) * CFG.REPEL_STRENGTH;
              axR += (dx/d) * force;
              ayR += (dy/d) * force;
            }
          }

          // accumulate accelerations
          const ax = axC + axP + axR;
          const ay = ayC + ayP + ayR;

          // integrate
          b.vx = (b.vx + ax) * CFG.FRICTION;
          b.vy = (b.vy + ay) * CFG.FRICTION;

          const sp = Math.hypot(b.vx, b.vy);
          if (sp > CFG.MAX_SPEED) {
            b.vx = (b.vx / sp) * CFG.MAX_SPEED;
            b.vy = (b.vy / sp) * CFG.MAX_SPEED;
          }

          b.x += b.vx;
          b.y += b.vy;

          // walls
          if (b.x - b.r < 0) { b.x = b.r; b.vx *= -1; }
          if (b.x + b.r > W) { b.x = W - b.r; b.vx *= -1; }
          if (b.y - b.r < 0) { b.y = b.r; b.vy *= -1; }
          if (b.y + b.r > H) { b.y = H - b.r; b.vy *= -1; }
        }
      }

      // draw
      ctx.clearRect(0,0,W,H);
      for (let i=0;i<balls.length;i++) {
        const b = balls[i];
        const sp = getSprite(b.r, b.c);
        ctx.drawImage(sp.cvs, Math.round(b.x - sp.hw), Math.round(b.y - sp.hh));
      }
    }

    function loop() {
      step();
      if (running) raf = requestAnimationFrame(loop);
    }

    // --- pointer handlers (grab + throw) ---
    const onPointerDown = (e:PointerEvent) => {
      const {x,y} = getXY(e);
      pointerX = x; pointerY = y;
      lastPX = x; lastPY = y;
      throwVX = 0; throwVY = 0;

      // find nearest ball within pick radius
      let picked: number | null = null;
      let bestD = Infinity;
      for (let i=0;i<balls.length;i++) {
        const b = balls[i];
        const pr = b.r * CFG.PICK_MULT;
        const d2B = dist2(x - b.x, y - b.y);
        if (d2B < pr*pr && d2B < bestD) {
          bestD = d2B;
          picked = i;
        }
      }
      if (picked !== null) {
        draggingIndex = picked;
        const b = balls[picked];
        dragDX = x - b.x;
        dragDY = y - b.y;
        b.vx = 0; b.vy = 0;
      }
    };

    const onPointerMove = (e:PointerEvent) => {
      const {x,y} = getXY(e);
      pointerX = x; pointerY = y;
      if (draggingIndex !== null) {
        const b = balls[draggingIndex];
        const nx = x - dragDX;
        const ny = y - dragDY;
        b.x = clamp(nx, b.r, W - b.r);
        b.y = clamp(ny, b.r, H - b.r);

        // capture velocity for throw
        const vx = x - lastPX;
        const vy = y - lastPY;
        throwVX = throwVX * 0.6 + vx * 0.4;
        throwVY = throwVY * 0.6 + vy * 0.4;
      }
      lastPX = x; lastPY = y;
    };

    const onPointerUp = () => {
      if (draggingIndex !== null) {
        const b = balls[draggingIndex];
        const maxThrow = CFG.MAX_SPEED * 1.3;
        b.vx = clamp(throwVX, -maxThrow, maxThrow);
        b.vy = clamp(throwVY, -maxThrow, maxThrow);
        draggingIndex = null;
      }
      // if we let go outside canvas, stop pointer repulsion
      pointerX = -9999; pointerY = -9999;
    };

    const onTouchStart = (e:TouchEvent)=>onPointerDown(e as unknown as PointerEvent);
    const onTouchMove  = (e:TouchEvent)=>onPointerMove(e as unknown as PointerEvent);
    const onTouchEnd   = ()=>onPointerUp();
    const onTouchCancel= ()=>onPointerUp();

    const onLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
      onPointerUp();
    };

    const onResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, CFG.DPR_CAP);
      resize();
      // keep balls in bounds
      for (const b of balls) {
        b.x = clamp(b.x, b.r, W - b.r);
        b.y = clamp(b.y, b.r, H - b.r);
      }
    };

    const onToggle = (e:Event) => {
      const ce = e as CustomEvent<{disabled:boolean}>;
      frozen = ce.detail.disabled;
      if (!frozen) {
        // wake them a bit
        for (const b of balls) {
          if (Math.abs(b.vx) < 0.05 && Math.abs(b.vy) < 0.05) {
            b.vx += (Math.random()-0.5)*0.4;
            b.vy += (Math.random()-0.5)*0.4;
          }
        }
      }
    };

    // init
    resize();
    requestAnimationFrame(() => {
      initBalls();
      raf = requestAnimationFrame(loop);
    });

    // listeners
    window.addEventListener("pointerdown", onPointerDown, { passive:true });
    window.addEventListener("pointermove", onPointerMove, { passive:true });
    window.addEventListener("pointerup", onPointerUp, { passive:true });
    window.addEventListener("mouseleave", onLeave, { passive:true });

    window.addEventListener("touchstart", onTouchStart, { passive:true });
    window.addEventListener("touchmove", onTouchMove, { passive:true });
    window.addEventListener("touchend", onTouchEnd, { passive:true });
    window.addEventListener("touchcancel", onTouchCancel, { passive:true });

    window.addEventListener("resize", onResize);
    window.addEventListener("ballpit-toggle", onToggle);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("mouseleave", onLeave);

      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);

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