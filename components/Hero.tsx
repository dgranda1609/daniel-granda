import React, { useEffect, useRef, useState } from 'react';

const Squiggle = () => (
  <svg width="48" height="12" viewBox="0 0 48 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mx-8 text-brand-accent">
    <path d="M0 6C6 0 12 0 18 6C24 12 30 12 36 6C42 0 48 0 54 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
            <h1 className="font-serif text-36 md:text-[96px] lg:text-[110px] leading-[0.85] font-semibold tracking-tighter">
              I make films, build systems, <br />
              and ship a hundred <br />
              <span className="flex items-center justify-center">
                <Squiggle />
                <span className="italic font-normal">assets a month.</span>
                <Squiggle />
              </span>
            </h1>
            {/* Credential Ticker */}
            <div className="mt-16 overflow-hidden w-full max-w-3xl mx-auto">
              <div className="flex animate-ticker items-center whitespace-nowrap opacity-40">
                {['Cannes World Film Festival', 'Microsoft', 'United Nations', 'The North Face', '100+ Monthly Assets', 'Impact Doc Awards', '10+ Festival Selections',
                  'Cannes World Film Festival', 'Microsoft', 'United Nations', 'The North Face', '100+ Monthly Assets', 'Impact Doc Awards', '10+ Festival Selections'].map((cred, i) => (
                    <span key={i} className="text-11 uppercase tracking-[0.2em] font-heading font-medium mx-16">{cred}<span className="mx-16 opacity-40">·</span></span>
                  ))}
              </div>
            </div>
          </div>

          {/* Bottom Row - Supporting text on the left */}
          <div className="mt-auto flex flex-col md:flex-row items-end justify-between w-full pb-80">

            <div
              className="max-w-xl md:w-[45%] text-left transition-all duration-75"
              style={{
                opacity: textOpacity,
                transform: `translateX(${progress * -50}px)`
              }}
            >
              <h2 className="font-serif text-24 md:text-40 lg:text-[48px] leading-[1.2] font-medium mb-32 text-brand-primary opacity-90">
                Full-stack video producer and AI visual strategist. From documentary to brand content — every frame earns its place.
              </h2>
              <div className="flex items-center gap-24">
                <a href="#work" className="bg-brand-accent text-white px-32 py-16 font-serif font-bold text-20 md:text-36 lg:text-[44px] cursor-pointer hover:scale-105 active:scale-95 transition-all tracking-tight shadow-[0_0_30px_rgba(255,56,49,0.3)] no-underline">
                  My Work
                </a>
                <p className="text-15 opacity-60 max-w-[180px] leading-snug font-medium">
                  10+ years of craft. AI-first execution.
                </p>
              </div>
            </div>

            {/* Space reserved for video position 0 */}
            <div className="hidden md:block w-1/2 h-[42vh]"></div>
          </div>
        </div>

        {/* Expanding Video Layer - Animated bottom-right card */}
        <div
          className="absolute z-0 md:z-20 overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.9)] transition-all duration-75 ease-out"
          style={{
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