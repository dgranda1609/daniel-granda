
import React from 'react';
import { Quote } from 'lucide-react';
import { useTestimonials } from '../lib/hooks/useApi';
import type { Theme } from '../lib/useTheme';

// Fallback data
const FALLBACK_TESTIMONIALS = [
  {
    text: "Daniel's video work completely reframed how we present our product. Every frame feels intentional — the storytelling is sharp and the production quality is top-tier.",
    author: "Marketing Director",
    role: "DTC Beauty Brand",
    color: "accent"
  },
  {
    text: "He doesn't just produce video — he builds systems around it. The automation pipeline he set up saved us weeks of manual work and the output is consistently high quality.",
    author: "Production Manager",
    role: "International NGO",
    color: "primary"
  },
  {
    text: "Daniel thinks like a marketer and executes like a filmmaker. That combination is rare. The brand film he delivered exceeded what we thought was possible with our budget.",
    author: "Creative Director",
    role: "Sports Brand",
    color: "accent"
  },
  {
    text: "The AI workflow he built for our content pipeline cut production time in half. It's not just automation — it's smart automation that actually understands the creative brief.",
    author: "Head of Content",
    role: "E-commerce Platform",
    color: "accent"
  },
  {
    text: "Working with Daniel feels like having a co-founder on the creative side. He owns the process end-to-end and delivers without the back-and-forth most agencies require.",
    author: "CEO",
    role: "Creative Agency",
    color: "primary"
  },
  {
    text: "The motion graphics and brand identity he created for us became the foundation of our entire marketing stack. Measurable lift in engagement within the first month.",
    author: "VP Marketing",
    role: "Consumer Brand",
    color: "accent"
  }
];

const TestimonialCard: React.FC<{ testimonial: any; index: number }> = ({ testimonial, index }) => {
  const rotations = ['rotate-[1deg]', 'rotate-[-1deg]', 'rotate-[0.5deg]', 'rotate-[-0.5deg]'];
  const rotation = rotations[index % rotations.length];

  const isAccent = testimonial.color === 'accent';
  const bgColor = isAccent ? 'bg-brand-accent text-brand-bg' : 'bg-brand-primary text-brand-accent';
  const quoteColor = isAccent ? 'text-brand-bg/20' : 'text-brand-accent/20';
  const glowShadow = isAccent
    ? 'hover:shadow-[0_0_50px_12px_rgba(255,56,49,0.25)]'
    : 'hover:shadow-[0_0_50px_12px_rgba(255,56,49,0.35)]';

  return (
    <div className={`flex-shrink-0 w-[280px] md:w-[320px] mx-12 md:mx-20 ${rotation}`}>
      <div
        className={`relative pt-16 px-20 pb-16 md:pt-20 md:px-24 md:pb-20 rounded-lg shadow-xl ${bgColor} ${glowShadow} select-none border border-black/5 transition-all duration-500 hover:scale-105 hover:z-50`}
      >
        <div className="flex justify-between items-start">
          <Quote size={14} className={quoteColor} />
          <Quote size={14} className={`${quoteColor} rotate-180`} />
        </div>

        <p className="text-13 md:text-14 font-medium leading-snug font-body mt-6">
          {testimonial.text}
        </p>

        <div className="mt-16 pt-10 border-t border-current/10">
          <div className="font-serif font-black text-13 md:text-15 uppercase tracking-tighter">{testimonial.author}</div>
          <div className="text-10 opacity-60 font-body uppercase tracking-widest mt-1">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
};

interface TestimonialsProps {
  theme: Theme;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ theme }) => {
  // Fetch testimonials from API
  const { data: apiTestimonials, error } = useTestimonials();

  // Map API data to component format, fallback on error
  const testimonials = React.useMemo(() => {
    if (!apiTestimonials || error) {
      return FALLBACK_TESTIMONIALS;
    }
    return apiTestimonials.map((t: any) => ({
      text: t.text,
      author: t.author,
      role: t.role,
      color: t.color
    }));
  }, [apiTestimonials, error]);

  // Triple the data to ensure the ticker never gaps even on large screens
  const fullRow = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-64 md:py-128 overflow-hidden relative" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="text-center mb-16 px-24 reveal">
        <h2 className="font-serif text-56 md:text-80 lg:text-[110px] xl:text-[120px] leading-[0.85] font-semibold tracking-tighter text-brand-primary">
          What they say.
        </h2>
      </div>

      <div className="relative">
        {/* Single Row Ticker */}
        <div className="flex overflow-hidden py-12">
          <div className="flex animate-ticker hover:[animation-play-state:paused] items-center">
            {fullRow.map((t, i) => (
              <TestimonialCard key={`testimonial-${i}`} testimonial={t} index={i} />
            ))}
          </div>
          {/* Duplicate for seamless infinite loop */}
          <div className="flex animate-ticker hover:[animation-play-state:paused] items-center" aria-hidden="true">
            {fullRow.map((t, i) => (
              <TestimonialCard key={`testimonial-dup-${i}`} testimonial={t} index={i} />
            ))}
          </div>
        </div>

        {/* Edge Fades for visual depth */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-200 z-30 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--color-surface), var(--color-surface) 20%, transparent)' }}></div>
        <div className="absolute inset-y-0 right-0 w-32 md:w-200 z-30 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--color-surface), var(--color-surface) 20%, transparent)' }}></div>
      </div>
    </section>
  );
};
