import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { Theme } from '../lib/useTheme';

// ─── Particle System for Lightspeed Tunnel ───────────────────────────────────

import { useCanvasAnimation } from '../hooks/useParticles';

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

interface ManifestoProps {
  theme: Theme;
}

export const Manifesto: React.FC<ManifestoProps> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  const canvasBg = theme === 'light' ? '#EAE8E3' : '#0F0F0F';
  const particleColor = theme === 'light' ? '#1A1A1A' : '#FFFDDB';

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

  useCanvasAnimation(canvasRef, progress, canvasBg, particleColor);

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
