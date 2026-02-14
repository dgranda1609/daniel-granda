
import React, { useState } from 'react';
import PhysicsTags from './PhysicsTags';

const SERVICES = [
  {
    title: 'MOTION',
    description: 'Cinematic video from concept to color. Brand films, documentaries, animated explainers \u2014 150+ projects delivered.',
    tags: ['Video', '2D Animation', 'Storyboarding', 'Motion Design', 'Motion Identity', 'Films', 'Documentaries', 'Editing', 'Color Grading'],
    imageUrl: '/images/motion-hero.webp'
  },
  {
    title: 'AI SYSTEMS',
    description: 'Production pipelines that think. n8n automations, AI-powered post, smart review workflows. Approvals: 70% \u2192 96%.',
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

export const Services: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-64 md:py-128 px-24 md:px-64 text-center">
      <div className="reveal mb-48">
        <h3 className="font-serif text-40 md:text-80 lg:text-[110px] xl:text-[120px] font-medium tracking-tight mb-32 text-brand-primary">
          What I build.
        </h3>
      </div>

      <div className="flex flex-col gap-0 md:gap-8">
        {SERVICES.map((service, idx) => (
          <div
            key={service.title}
            className="group relative reveal"
            style={{ zIndex: hoveredIndex === idx ? 100 : 1 }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Reveal Image - Above the title, pushes content down */}
            <div className="w-full flex justify-center overflow-hidden transition-all duration-500 ease-out max-h-0 group-hover:max-h-[400px] opacity-0 group-hover:opacity-100">
              <div className="w-full max-w-xl p-8">
                <div className="glass p-8 rounded-lg rotate-3 shadow-2xl overflow-hidden">
                  <img src={service.imageUrl} className="w-full h-auto rounded" alt={service.title} />
                </div>
              </div>
            </div>

            {/* Title - Animates down when card appears above */}
            <h4 className="font-serif text-40 md:text-[120px] font-black tracking-tighter text-brand-accent transition-all duration-500 hover:tracking-tight cursor-default opacity-80 group-hover:opacity-100 relative z-0 leading-[0.85]">
              {service.title}
            </h4>

            {/* Description - Visible on hover */}
            <p className="text-14 md:text-20 font-body opacity-0 max-h-0 group-hover:opacity-70 group-hover:max-h-[100px] transition-all duration-500 max-w-xl mx-auto mt-8">
              {service.description}
            </p>

            {/* Physics Tags - Top Layer */}
            <div className="relative z-30">
              <PhysicsTags tags={service.tags} isActive={hoveredIndex === idx} />
            </div>

            <div className="relative z-20 mt-4 text-12 font-medium tracking-widest opacity-40 group-hover:text-brand-accent group-hover:opacity-100 transition-all cursor-pointer">
              LEARN MORE
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
