import React, { useEffect, useRef, useState } from 'react';
import type { HeroCopy } from '../lib/copyVariants';

const Squiggle = () => (
  <svg width="48" height="12" viewBox="0 0 48 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mx-8 text-brand-accent">
    <path d="M0 6C6 0 12 0 18 6C24 12 30 12 36 6C42 0 48 0 54 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

interface HeroProps {
  copy?: HeroCopy;
}

export const Hero: React.FC<HeroProps> = ({ copy }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const check = () => setIsMobile(mq.matches);
    check();
    mq.addEventListener('change', check);
    return () => mq.removeEventListener('change', check);
  }, []);

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

  // Text layers fade out as user scrolls
  const textOpacity = Math.max(0, 1 - progress * 2.5);

  // Video expansion values
  // Start: partial width/height at bottom right
  // End: full bleed
  const videoWidth = 48 + progress * 52;
  const videoHeight = 42 + progress * 58;
  const videoBottom = (1 - progress) * 8;
  const videoRight = (1 - progress) * 6;
  const videoBorderRadius = 24 * (1 - progress);


  return (
    <section ref={containerRef} className="relative h-[300vh] bg-brand-bg">
      {/* Sticky viewport wrapper */}
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">

        {/* Content Layer - Redesigned for zero overlap initially */}
        <div className="relative w-full h-full flex flex-col px-24 md:px-64 z-10 max-w-[1920px] mx-auto">

          {/* Top Headline - Pushed down to start clearly below any navbar elements */}
          <div
            className="w-full text-center pt-[22vh] transition-all duration-75"
            style={{
              opacity: textOpacity,
              transform: `translateY(${progress * -100}px)`
            }}
          >
            <h1 className="font-serif text-32 md:text-[80px] lg:text-[94px] leading-[0.9] font-semibold tracking-tight">
              {copy ? (
                <>
                  {copy.headline[0]} <br />
                  {copy.headline[1]} <br />
                  <span className="flex items-center justify-center">
                    <Squiggle />
                    <span className="italic font-normal">{copy.headline[2]}</span>
                    <Squiggle />
                  </span>
                </>
              ) : (
                <>
                  I grew up on film sets. <br />
                  Now I build the systems <br />
                  <span className="flex items-center justify-center">
                    <Squiggle />
                    <span className="italic font-normal">that run them.</span>
                    <Squiggle />
                  </span>
                </>
              )}
            </h1>
            {/* Credential Ticker */}
            <div className="mt-16 overflow-hidden w-full max-w-3xl mx-auto">
              <div className="flex animate-ticker items-center whitespace-nowrap opacity-40">
                {['Microsoft', 'United Nations', 'The North Face', '100+ Monthly Assets', 'Impact Doc Awards', '10+ Festival Selections',
                  'Microsoft', 'United Nations', 'The North Face', '100+ Monthly Assets', 'Impact Doc Awards', '10+ Festival Selections'].map((cred, i) => (
                    <span key={i} className="text-11 uppercase tracking-[0.2em] font-heading font-medium mx-16">{cred}<span className="mx-16 opacity-40">·</span></span>
                  ))}
              </div>
            </div>
          </div>

          {/* Bottom Row - Supporting text on the left */}
          <div className="mt-auto flex flex-col md:flex-row items-start md:items-end justify-between w-full pb-32 md:pb-80">

            <div
              className="max-w-xl md:w-[45%] text-left transition-all duration-75"
              style={{
                opacity: textOpacity,
                transform: `translateX(${progress * -50}px)`
              }}
            >
              <h2 className="font-serif text-22 md:text-32 lg:text-[40px] leading-[1.15] font-medium mb-24 text-brand-primary opacity-90">
                {copy?.subtitle || "From commercial shoots in Perú to AI-powered creation in Miami - I make things that move people. A decade of craft in every frame and workflow."}
              </h2>
              <div className="flex flex-wrap items-center gap-24">
                <a href="#work" className="bg-brand-accent text-white px-32 py-16 font-serif font-bold text-20 md:text-36 lg:text-[44px] cursor-pointer hover:scale-105 active:scale-95 transition-all tracking-tight shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.3)] no-underline">
                  {copy?.cta || 'See My Work'}
                </a>
                <p className="text-15 opacity-60 max-w-[180px] leading-snug font-medium">
                  {copy?.caption || 'Lima -> Miami. Camera to code.'}
                </p>
              </div>
            </div>

            {/* Space reserved for video position 0 */}
            <div className="hidden md:block w-1/2 h-[42vh]"></div>
          </div>
        </div>

        {/* Expanding Video Layer - Animated bottom-right on desktop, centered on mobile */}
        <div
          className={`absolute z-5 md:z-20 overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.9)] ${isMobile ? '' : 'transition-all duration-75 ease-out'}`}
          style={isMobile ? {
            width: '88vw',
            height: '49.5vw',
            top: '54%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '12px',
          } : {
            width: `${videoWidth}%`,
            height: `${videoHeight}%`,
            right: `${videoRight}%`,
            bottom: `${videoBottom}%`,
            borderRadius: `${videoBorderRadius}px`,
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/2lVc9S2FZ6E?autoplay=1&mute=1&loop=1&playlist=2lVc9S2FZ6E&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full object-cover pointer-events-none"
            style={{ border: 'none' }}
            title="Hero Video"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
};
