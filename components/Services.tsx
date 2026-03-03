
import React, { useState } from 'react';
import PhysicsTags from './PhysicsTags';

const SERVICES = [
  {
    title: 'MOTION',
    description: 'Cinematic video from concept to color. Brand films, documentaries, animated explainers — 150+ projects delivered.',
    tags: ['Video', '2D Animation', 'Storyboarding', 'Motion Design', 'Motion Identity', 'Films', 'Documentaries', 'Editing', 'Color Grading'],
    imageUrl: '/images/motion-hero.webp'
  },
  {
    title: 'AI SYSTEMS',
    description: 'Production pipelines that think. n8n automations, AI-powered post, smart review workflows. Approvals: 70% → 96%.',
    tags: ['Workflow Automation', 'n8n Pipelines', 'GPT Tools', 'Image Generation', 'AI Integration', 'Prompt Engineering', 'System Design'],
    imageUrl: '/images/ai-systems-hero.webp'
  },
  {
    title: 'BRANDING',
    description: 'Visual identity and marketing systems. From Shark Tank brands to UN campaigns.',
    tags: ['Brand Strategy', 'Visual Identity', 'Logo Design', 'Brand Guidelines', 'Positioning', 'Messaging', 'Brand Systems', 'Packaging'],
    imageUrl: '/images/kreyolessence-3x4-img-1.jpg'
  },
];

// Detect touch/coarse pointer device
const isTouch = () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

export const Services: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleEnter = (idx: number) => {
    if (!isTouch()) setHoveredIndex(idx);
  };

  const handleLeave = () => {
    if (!isTouch()) setHoveredIndex(null);
  };

  const handleClick = (idx: number) => {
    if (isTouch()) {
      setHoveredIndex(prev => prev === idx ? null : idx);
    }
  };

  return (
    <section id="services" className="py-64 md:py-128 px-24 md:px-64 text-center">
      <div className="reveal mb-48">
        <h3 className="font-serif text-40 md:text-80 lg:text-[110px] xl:text-[120px] font-medium tracking-tight mb-32 text-brand-primary">
          What I build.
        </h3>
      </div>

      <div className="flex flex-col gap-0 md:gap-8">
        {SERVICES.map((service, idx) => {
          const isActive = hoveredIndex === idx;
          return (
            <div
              key={service.title}
              className="relative reveal service-item"
              style={{ zIndex: isActive ? 100 : 1 }}
              onMouseEnter={() => handleEnter(idx)}
              onMouseLeave={handleLeave}
              onClick={() => handleClick(idx)}
            >
              {/* Reveal Image — shown when active */}
              <div className={`w-full flex justify-center overflow-hidden transition-all duration-500 ease-out ${isActive ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="w-full max-w-xl p-8">
                  <div className="glass p-8 rounded-lg rotate-3 shadow-2xl overflow-hidden">
                    <img src={service.imageUrl} className="w-full h-auto rounded" alt={service.title} />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h4 className={`font-serif text-40 md:text-[120px] font-black text-brand-accent transition-all duration-500 cursor-default leading-[0.85] ${isActive ? 'tracking-tight opacity-100' : 'tracking-tighter opacity-80'}`}>
                {service.title}
              </h4>

              {/* Description — shown when active */}
              <p className={`text-14 md:text-20 font-body transition-all duration-500 max-w-xl mx-auto mt-8 overflow-hidden ${isActive ? 'opacity-70 max-h-[100px]' : 'opacity-0 max-h-0'}`}>
                {service.description}
              </p>

              {/* Physics Tags */}
              <div className="relative z-30">
                <PhysicsTags tags={service.tags} isActive={isActive} />
              </div>

              <div className={`relative z-20 mt-4 text-12 font-medium tracking-widest transition-all cursor-pointer ${isActive ? 'text-brand-accent opacity-100' : 'opacity-40'}`}>
                {isActive ? 'CLOSE' : 'LEARN MORE'}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
