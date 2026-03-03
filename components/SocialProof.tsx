
import React from 'react';

const BUBBLES = [
  { name: '100+', desc: 'Assets delivered monthly' },
  { name: '35%', desc: 'Faster turnaround with AI' },
  { name: '96%', desc: 'On-time delivery rate' },
  { name: '10+', desc: 'Festival selections' },
  { name: '200%', desc: 'More deliverables volume' },
];

export const SocialProof: React.FC = () => {
  return (
    <section className="py-64 md:py-128 px-6 md:px-64 relative flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-0 w-full h-px bg-brand-primary/10" />

      {/* Title */}
      <div className="text-center mb-48 md:mb-128 reveal">
        <h2 className="font-serif text-[64px] md:text-80 lg:text-[110px] xl:text-[120px] leading-[0.9] font-medium tracking-tight italic">
          Systems over <span className="text-brand-accent">tasks.</span>
        </h2>
        <svg className="mx-auto mt-24 w-128 text-brand-primary opacity-20" viewBox="0 0 100 20">
          <path d="M0 10 Q25 0 50 10 T100 10" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* ── Mobile: 2×2 + 1 grid ── */}
      <div className="md:hidden w-full max-w-sm mx-auto">
        <div className="grid grid-cols-2 gap-y-32 gap-x-16">
          {BUBBLES.map((b, idx) => (
            <div
              key={b.name}
              className={`reveal flex flex-col items-center justify-center ${idx === 4 ? 'col-span-2' : ''}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Circle */}
              <div
                className="rounded-full border border-brand-primary/20 flex items-center justify-center mb-12"
                style={{ width: '38vw', height: '38vw', maxWidth: 160, maxHeight: 160 }}
              >
                <span className="font-heading font-black text-brand-accent" style={{ fontSize: 'clamp(20px, 5.5vw, 28px)' }}>
                  {b.name}
                </span>
              </div>
              {/* Label — always visible on mobile */}
              <div className="text-center">
                <div className="font-heading font-black text-14">{b.name}</div>
                <div className="text-12 leading-tight mt-4 opacity-60 max-w-[120px] mx-auto">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop: original flex wrap ── */}
      <div className="hidden md:flex flex-wrap justify-center gap-64 max-w-6xl">
        {BUBBLES.map((b, idx) => (
          <div
            key={b.name}
            className="reveal group relative flex flex-col items-center justify-center"
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            <div
              className="rounded-full border border-brand-primary/20 flex items-center justify-center transition-all duration-500 group-hover:scale-150 group-hover:bg-brand-primary group-hover:text-brand-bg cursor-pointer"
              style={{ width: 'clamp(70px, 18vw, 192px)', height: 'clamp(70px, 18vw, 192px)' }}
            >
              <span className="font-heading font-black text-16 text-brand-accent group-hover:text-brand-bg">{b.name}</span>
            </div>
            <div className="stat-bubble-label mt-16 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ minWidth: 80 }}>
              <div className="font-heading font-black text-12 whitespace-nowrap">{b.name}</div>
              <div className="text-[10px] leading-tight mt-4 opacity-60 max-w-[90px] mx-auto">{b.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 w-full h-px bg-brand-primary/10" />
    </section>
  );
};
