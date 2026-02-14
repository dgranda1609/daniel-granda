
import React from 'react';

const BUBBLES = [
  { name: '100+', desc: 'Assets delivered monthly', icon: null },
  { name: '35%', desc: 'Faster turnaround with AI', icon: null },
  { name: '96%', desc: 'On-time delivery rate', icon: null },
  { name: '10+', desc: 'Festival selections', icon: null },
  { name: '200%', desc: 'More deliverables volume', icon: null },
];

export const SocialProof: React.FC = () => {
  return (
    <section className="py-128 px-6 md:px-64 relative min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-0 w-full h-px bg-brand-primary/10"></div>

      <div className="text-center mb-128 reveal">
        <h2 className="font-serif text-40 md:text-80 lg:text-[110px] xl:text-[120px] leading-[0.9] font-medium tracking-tight italic">
          Systems over <span className="text-brand-accent">tasks.</span>
        </h2>
        <svg className="mx-auto mt-24 w-128 text-brand-primary opacity-20" viewBox="0 0 100 20">
          <path d="M0 10 Q25 0 50 10 T100 10" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="flex flex-wrap justify-center gap-24 md:gap-64 max-w-6xl">
        {BUBBLES.map((b, idx) => (
          <div key={b.name} className="reveal group relative flex items-center justify-center" style={{ transitionDelay: `${idx * 150}ms` }}>
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-brand-primary/20 flex items-center justify-center transition-all duration-500 group-hover:scale-150 group-hover:bg-brand-primary group-hover:text-brand-bg cursor-pointer">
              <span className="font-heading font-black text-14 md:text-16 text-brand-accent group-hover:text-brand-bg">{b.name}</span>
            </div>
            <div className="absolute top-full mt-16 w-48 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="font-heading font-black text-12 whitespace-nowrap">{b.name}</div>
              <div className="text-[10px] w-32 mx-auto leading-tight mt-4 opacity-60">{b.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 w-full h-px bg-brand-primary/10"></div>
    </section>
  );
};
