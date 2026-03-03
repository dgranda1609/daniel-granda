import React, { useMemo, useEffect, useRef, useState } from "react";

const PORTRAIT_VIDEOS = [
  "/images/me-redbg-v1.webp",
  "/images/me-redbg-v2.webp",
  "/images/me-redbg-v3-noloop.webp",
];

const TOOLS = [
  "After Effects",
  "Premiere Pro",
  "DaVinci Resolve",
  "Figma",
  "n8n",
  "OpenAI API",
  "Midjourney",
  "Python",
  "React",
  "Runway Gen-3",
  "ComfyUI",
  "Frame.io",
  "Audition",
  "Lightroom",
];

const STATS = [
  { value: 100, suffix: "+", label: "Monthly assets" },
  { value: 35, suffix: "%", label: "Faster turnaround" },
  { value: 10, suffix: "+", label: "Festival selections" },
  { value: 96, suffix: "%", label: "On-time delivery" },
];

const AnimatedStat: React.FC<{
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
}> = ({ value, suffix, label, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <div className="text-center">
      <div className="font-heading font-black text-48 md:text-64 text-brand-accent leading-none">
        {count}
        {suffix}
      </div>
      <div className="text-12 uppercase tracking-[0.2em] opacity-60 mt-8 font-heading font-medium">
        {label}
      </div>
    </div>
  );
};

export const About: React.FC = () => {
  const selectedVideo = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * PORTRAIT_VIDEOS.length);
    return PORTRAIT_VIDEOS[randomIndex];
  }, []);

  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsInView(true);
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(statsRef.current);

    // Fallback: ensure counters animate even if observer misses on some mobile browsers
    const fallback = window.setTimeout(() => setStatsInView(true), 2200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      id="agency"
      className="pb-12 md:pb-24 pt-32 md:pt-48 px-24 md:px-64 bg-brand-bg relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto text-center reveal">
        {/* Icon with Toolbox Ticker Behind */}
        <div className="mb-24 flex justify-center">
          <div className="relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] overflow-hidden">
              <div className="flex animate-ticker items-center opacity-20 whitespace-nowrap">
                {TOOLS.map((tool, i) => (
                  <span
                    key={`a-${i}`}
                    className="text-24 md:text-32 font-bold text-brand-primary mx-24"
                  >
                    {tool}
                  </span>
                ))}
                {TOOLS.map((tool, i) => (
                  <span
                    key={`b-${i}`}
                    className="text-24 md:text-32 font-bold text-brand-primary mx-24"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-[0_0_80px_rgba(255,56,49,0.4)] border-4 border-brand-accent">
              <img
                src={selectedVideo}
                alt="Daniel Granda"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-56 md:text-80 lg:text-[110px] xl:text-[120px] font-medium tracking-tight leading-[1.05] mb-24 text-brand-primary px-24">
          10 years of cinema. AI-first since day one.
        </h2>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-8 mb-32">
          <div className="h-px w-24 bg-brand-accent"></div>
          <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
          <div className="h-px w-24 bg-brand-accent"></div>
        </div>

        {/* Bio Text */}
        <div className="font-serif text-20 md:text-28 lg:text-32 leading-[1.4] opacity-90 mb-48 max-w-4xl mx-auto px-24 text-left space-y-24">
          <p>
            I'm Daniel Granda — an independent video producer and AI visual
            strategist based in South Florida. Being a photographer and
            videographer since I was little gives me that core foundation and
            view, which I now use with AI to run fast, iterate, and expand the
            possibilities. I design AI-first production systems that ship 100+
            brand assets monthly while cutting turnaround by 35%. Recent
            production partnerships include{" "}
            <strong className="text-brand-accent">DTC brands</strong>,
            international NGOs, and sports organizations.
          </p>
          <p>
            Before that: a documentary series for the{" "}
            <strong>United Nations</strong> across three ecosystems. A{" "}
            <strong>Cannes World Film Festival</strong> finalist. 150+ videos at
            Miguel Angel Productions. Campaigns for <strong>Microsoft</strong>,{" "}
            <strong>The North Face</strong>, and America Television.
          </p>
          <p className="italic opacity-80">
            I use AI every day. But AI doesn't replace knowing when to cut, how
            to light, or why a story needs silence.
          </p>
        </div>

        {/* Animated Stats Row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-32 md:gap-48 max-w-3xl mx-auto mb-48"
        >
          {STATS.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} inView={statsInView} />
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="/resume/2026_Daniel_Granda_Resume.pdf"
          download
          className="inline-block bg-brand-accent text-white px-32 py-16 font-serif font-bold text-20 md:text-36 lg:text-[44px] transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,56,49,0.3)] no-underline"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
};
