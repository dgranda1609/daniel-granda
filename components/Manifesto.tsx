import React, { useEffect, useRef, useState, useCallback } from 'react';

// ─── Particle System for Lightspeed Tunnel ───────────────────────────────────

interface Particle {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
  speed: number;
  color: string;
  opacity: number;
}

const CREAM = '#FFFDDB';
const RED = '#FF3831';
const PARTICLE_COUNT = 120;
const MOBILE_PARTICLE_COUNT = 50;

function createParticle(width: number, height: number, progress: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * Math.max(width, height) * 0.6;
  const cx = width / 2;
  const cy = height / 2;

  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius,
    z: Math.random() * 1000,
    prevX: cx + Math.cos(angle) * radius,
    prevY: cy + Math.sin(angle) * radius,
    speed: 0.5 + Math.random() * 2,
    color: Math.random() > 0.7 ? RED : CREAM,
    opacity: 0.1 + Math.random() * 0.4,
  };
}

function useCanvasAnimation(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  progress: number
) {
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? MOBILE_PARTICLE_COUNT : PARTICLE_COUNT;
    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: count }, () =>
        createParticle(canvas.offsetWidth, canvas.offsetHeight, 0)
      );
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const cx = w / 2;
    const cy = h / 2;

    // Phase mapping
    // 0-0.4: slow drift (setup)
    // 0.4-0.7: acceleration into tunnel (the leap)
    // 0.7-1.0: deceleration + dissolve (landing)

    const speedMultiplier =
      progress < 0.4
        ? 0.3 + progress * 0.5
        : progress < 0.7
          ? 0.5 + (progress - 0.4) * 12
          : 4.1 - (progress - 0.7) * 12;

    const trailLength =
      progress < 0.4
        ? 0
        : progress < 0.7
          ? (progress - 0.4) * 3.33
          : 1.0 - (progress - 0.7) * 2.5;

    const globalAlpha =
      progress < 0.4
        ? 0.6
        : progress < 0.7
          ? 0.6 + (progress - 0.4) * 1.3
          : 1.0 - (progress - 0.7) * 0.5;

    // Clear with fade trail
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#0F0F0F';
    ctx.fillRect(0, 0, w, h);

    const particles = particlesRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.prevX = p.x;
      p.prevY = p.y;

      // Move particles toward/away from center based on phase
      const dx = p.x - cx;
      const dy = p.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      if (progress < 0.4) {
        // Slow drift — slight orbital motion
        const angle = Math.atan2(dy, dx) + 0.002 * p.speed;
        const newDist = dist + Math.sin(Date.now() * 0.001 + i) * 0.2;
        p.x = cx + Math.cos(angle) * newDist;
        p.y = cy + Math.sin(angle) * newDist;
      } else if (progress < 0.7) {
        // Converge toward center (tunnel effect)
        const pullStrength = speedMultiplier * p.speed * 0.8;
        p.x -= (dx / dist) * pullStrength;
        p.y -= (dy / dist) * pullStrength;

        // Respawn if too close to center
        if (Math.abs(p.x - cx) < 5 && Math.abs(p.y - cy) < 5) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.max(w, h) * 0.5 + Math.random() * 100;
          p.x = cx + Math.cos(angle) * r;
          p.y = cy + Math.sin(angle) * r;
          p.prevX = p.x;
          p.prevY = p.y;
        }
      } else {
        // Dissolve outward slowly
        const pushStrength = Math.max(0.1, speedMultiplier) * p.speed * 0.3;
        p.x += (dx / dist) * pushStrength;
        p.y += (dy / dist) * pushStrength;
        p.opacity = Math.max(0, p.opacity - 0.003);
      }

      // Draw
      const particleAlpha = p.opacity * globalAlpha;
      if (particleAlpha <= 0) continue;

      ctx.globalAlpha = particleAlpha;

      if (trailLength > 0.05) {
        // Draw trail line
        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1 + trailLength * 2;
        ctx.stroke();

        // Extended trail for peak effect
        if (trailLength > 0.5) {
          const trailDx = p.x - p.prevX;
          const trailDy = p.y - p.prevY;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + trailDx * trailLength * 3, p.y + trailDy * trailLength * 3);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.5 + trailLength;
          ctx.globalAlpha = particleAlpha * 0.3;
          ctx.stroke();
        }
      } else {
        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5 + p.speed * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
    }

    // Center glow during tunnel phase
    if (progress > 0.35 && progress < 0.85) {
      const glowIntensity =
        progress < 0.55
          ? (progress - 0.35) * 5
          : progress < 0.7
            ? 1
            : 1 - (progress - 0.7) * 6.67;

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.3);
      gradient.addColorStop(0, `rgba(255, 56, 49, ${0.15 * glowIntensity})`);
      gradient.addColorStop(0.5, `rgba(255, 56, 49, ${0.05 * glowIntensity})`);
      gradient.addColorStop(1, 'rgba(255, 56, 49, 0)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }

    ctx.globalAlpha = 1;
  }, [canvasRef, progress]);
}

// ─── Word-by-Word Reveal ─────────────────────────────────────────────────────

const WordReveal: React.FC<{
  text: string;
  progress: number;
  className?: string;
  highlightWord?: string;
}> = ({ text, progress, className = '', highlightWord }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => {
        const wordProgress = Math.min(
          1,
          Math.max(0, (progress * words.length - i) * 1.2)
        );
        const isHighlight = highlightWord && word.replace(/[^a-zA-Z]/g, '').toLowerCase() === highlightWord.toLowerCase();
        return (
          <span
            key={i}
            className={`inline-block transition-none ${isHighlight ? 'text-brand-accent' : ''}`}
            style={{
              opacity: wordProgress,
              transform: `translateY(${(1 - wordProgress) * 12}px)`,
            }}
          >
            {word}{i < words.length - 1 ? '\u00A0' : ''}
          </span>
        );
      })}
    </span>
  );
};

// ─── Credential Strip ────────────────────────────────────────────────────────

const CREDENTIALS = [
  'Cannes Finalist',
  '100+ Monthly Assets',
  '10+ Festival Selections',
  'AI-First Workflows',
  'Impact Doc Awards',
  'Microsoft',
  'United Nations',
];

// ─── Project Stills Strip ────────────────────────────────────────────────────

const PROJECT_STILLS = [
  '/images/ILO-hero.gif',
  '/images/dinamo-hero.gif',
  '/images/miami-weddings-hero.gif',
  '/images/alternative-audiovisual-hero.jpg',
  '/images/kreyolessence-3x4-img-1.jpg',
];

// ─── Main Component ─────────────────────────────────────────────────────────

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      const currentScroll = -rect.top;
      const maxScroll = containerHeight - windowHeight;
      const newProgress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);

      setProgress(newProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useCanvasAnimation(canvasRef, progress);

  // Phase opacities
  const phase1Opacity = progress < 0.35 ? Math.min(1, progress * 4) : Math.max(0, 1 - (progress - 0.35) * 6);
  const phase2Opacity = progress < 0.4 ? 0 : progress < 0.65 ? (progress - 0.4) * 4 : Math.max(0, 1 - (progress - 0.65) * 8);
  const phase3Opacity = progress < 0.7 ? 0 : Math.min(1, (progress - 0.7) * 4);
  const credentialOpacity = progress < 0.82 ? 0 : Math.min(1, (progress - 0.82) * 6);
  const stillsOpacity = progress < 0.88 ? 0 : Math.min(1, (progress - 0.88) * 8);

  // Phase 1 word reveal (spread across 0-0.35)
  const phase1WordProgress = progress < 0.35 ? progress / 0.35 : 1;
  const phase1SubProgress = progress < 0.1 ? 0 : progress < 0.35 ? (progress - 0.1) / 0.25 : 1;

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative h-[200vh] bg-brand-bg"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 1 }}
        />

        {/* Text Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-64">

          {/* Phase 1: The Setup */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-64 transition-none"
            style={{ opacity: phase1Opacity }}
          >
            <h2 className="font-serif text-32 md:text-72 lg:text-[96px] font-medium tracking-tight text-center leading-[1.1] text-brand-primary max-w-4xl">
              <WordReveal
                text="Everyone has the tools now."
                progress={phase1WordProgress}
              />
            </h2>
            <p
              className="mt-24 font-body text-16 md:text-28 text-brand-primary/50 text-center tracking-wide"
              style={{
                opacity: phase1SubProgress,
                transform: `translateY(${(1 - phase1SubProgress) * 10}px)`,
              }}
            >
              Same prompts. Same presets. Same outputs.
            </p>
          </div>

          {/* Phase 2: The Leap */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-64 transition-none"
            style={{ opacity: phase2Opacity }}
          >
            <h2 className="font-serif italic text-32 md:text-72 lg:text-[96px] font-medium tracking-tight text-center leading-[1.1] text-brand-primary max-w-5xl">
              What changes everything is the{' '}
              <span className="text-brand-accent not-italic font-bold">eye</span>{' '}
              behind it.
            </h2>
          </div>

          {/* Phase 3: The Landing */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-64 transition-none"
            style={{ opacity: phase3Opacity }}
          >
            <h2 className="font-serif text-32 md:text-72 lg:text-[110px] font-semibold tracking-tight text-center leading-[1.05] text-brand-primary max-w-5xl">
              AI made me faster.
              <br />
              <span className="italic font-normal">
                A decade of cinema makes the work{' '}
                <span className="text-brand-accent font-bold not-italic">matter.</span>
              </span>
            </h2>

            {/* Credential Strip */}
            <div
              className="mt-48 flex flex-wrap items-center justify-center gap-12 md:gap-24"
              style={{ opacity: credentialOpacity }}
            >
              {CREDENTIALS.map((cred, i) => (
                <React.Fragment key={cred}>
                  <span className="text-11 md:text-12 uppercase tracking-[0.2em] text-brand-primary/40 font-heading font-medium whitespace-nowrap">
                    {cred}
                  </span>
                  {i < CREDENTIALS.length - 1 && (
                    <span className="text-brand-primary/20 text-12">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Project Stills Strip */}
            <div
              className="mt-48 w-full overflow-hidden"
              style={{ opacity: stillsOpacity }}
            >
              <div className="flex animate-ticker items-center gap-16">
                {[...PROJECT_STILLS, ...PROJECT_STILLS].map((src, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[200px] md:w-[280px] h-[120px] md:h-[160px] overflow-hidden"
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
