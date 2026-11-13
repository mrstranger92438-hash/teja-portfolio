import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface ParticleBackdropProps {
  introReady: boolean;
}

interface AirNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  depth: number;
  color: string;
  phase: number;
}

const NODE_COLORS = ['#8B5CF6', '#3B82F6', '#EC4899', '#F97316', '#06B6D4'];

export default function ParticleBackdrop({ introReady }: ParticleBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced = useReducedMotion();
  const shockwaveRef = useRef({ active: false, progress: 0 });

  useEffect(() => {
    if (introReady) {
      shockwaveRef.current = { active: true, progress: 0 };
    } else {
      shockwaveRef.current = { active: false, progress: 0 };
    }
  }, [introReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const count = Math.min(54, Math.max(24, Math.floor(width / 28)));
    const nodes: AirNode[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.42,
      vy: (Math.random() - 0.5) * 0.42,
      baseRadius: 1.6 + Math.random() * 2.2,
      depth: 0.4 + Math.random() * 0.8,
      color: NODE_COLORS[i % NODE_COLORS.length],
      phase: Math.random() * Math.PI * 2,
    }));

    const pointer = { x: -9999, y: -9999, active: false };

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', resize);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.012;

      // Unexpected expanding zero-gravity shockwave ring right after intro lifts
      if (shockwaveRef.current.active && !prefersReduced) {
        shockwaveRef.current.progress += 0.018;
        const p = shockwaveRef.current.progress;
        const maxR = Math.max(width, height) * 0.72;
        const currentR = p * maxR;
        const alpha = Math.max(0, 0.35 * (1 - p));

        if (alpha > 0.005) {
          const cx = width * 0.68;
          const cy = height * 0.42;
          const ringGrad = ctx.createRadialGradient(
            cx,
            cy,
            Math.max(1, currentR * 0.82),
            cx,
            cy,
            Math.max(2, currentR)
          );
          ringGrad.addColorStop(0, 'rgba(139, 92, 246, 0)');
          ringGrad.addColorStop(0.5, `rgba(236, 72, 153, ${alpha})`);
          ringGrad.addColorStop(0.85, `rgba(6, 182, 212, ${alpha * 0.8})`);
          ringGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');

          ctx.beginPath();
          ctx.arc(cx, cy, currentR, 0, Math.PI * 2);
          ctx.strokeStyle = ringGrad;
          ctx.lineWidth = 28 * (1 - p * 0.6);
          ctx.stroke();
        } else {
          shockwaveRef.current.active = false;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!prefersReduced) {
          // Weightless sinusoidal air-drift (zero gravity)
          n.x += n.vx + Math.sin(time * 0.9 + n.phase) * 0.16 * n.depth;
          n.y += n.vy + Math.cos(time * 0.8 + n.phase) * 0.16 * n.depth;

          // Gentle fluid cursor repulsion swirl
          if (pointer.active) {
            const dx = n.x - pointer.x;
            const dy = n.y - pointer.y;
            const dist = Math.hypot(dx, dy);
            const influenceRadius = 155;
            if (dist < influenceRadius && dist > 0.1) {
              const force = ((influenceRadius - dist) / influenceRadius) * 0.95;
              const angle = Math.atan2(dy, dx);
              // Slight tangential swirl + radial push so particles glide around cursor like air
              n.vx += (Math.cos(angle) * 0.16 - Math.sin(angle) * 0.08) * force;
              n.vy += (Math.sin(angle) * 0.16 + Math.cos(angle) * 0.08) * force;
            }
          }

          // Smooth air damping so velocity stays calm & weightless
          n.vx *= 0.988;
          n.vy *= 0.988;

          // Maintain minimum gentle drift
          if (Math.hypot(n.vx, n.vy) < 0.15) {
            n.vx += (Math.random() - 0.5) * 0.04;
            n.vy += (Math.random() - 0.5) * 0.04;
          }

          // Seamless edge wrap
          if (n.x < -20) n.x = width + 20;
          if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          if (n.y > height + 20) n.y = -20;
        }

        const pulseR = n.baseRadius * (0.9 + 0.18 * Math.sin(time * 2 + n.phase));

        // Soft glow halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseR * 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}22`;
        ctx.fill();

        // Crisp luminous core
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = `${n.color}CC`;
        ctx.fill();

        // Constellation filaments between nearby floating nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 135) {
            const lineAlpha = 0.18 * (1 - dist / 135);
            const grad = ctx.createLinearGradient(n.x, n.y, m.x, m.y);
            grad.addColorStop(0, `${n.color}${Math.round(lineAlpha * 255).toString(16).padStart(2, '0')}`);
            grad.addColorStop(1, `${m.color}${Math.round(lineAlpha * 255).toString(16).padStart(2, '0')}`);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Subtle magnetic thread toward cursor
        if (!prefersReduced && pointer.active) {
          const pdx = n.x - pointer.x;
          const pdy = n.y - pointer.y;
          const pDist = Math.hypot(pdx, pdy);
          if (pDist < 170) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - pDist / 170)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      if (!prefersReduced) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReduced]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full opacity-25 blur-[130px]"
        style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-[15%] right-[-10%] h-[480px] w-[480px] rounded-full opacity-22 blur-[130px]"
        style={{ background: 'radial-gradient(circle, #EC4899 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-[48%] left-[-8%] h-[420px] w-[420px] rounded-full opacity-20 blur-[130px]"
        style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-10%] right-[12%] h-[480px] w-[480px] rounded-full opacity-20 blur-[130px]"
        style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[20%] left-[35%] h-[380px] w-[380px] rounded-full opacity-18 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
