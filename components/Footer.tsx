
import React, { useState, useEffect } from 'react';
import AnimatedGradientBackground from './AnimatedGradientBackground';
import type { Theme } from '../lib/useTheme';
import type { FooterCopy } from '../lib/copyVariants';

interface FooterProps {
  onContactClick: () => void;
  theme: Theme;
  copy?: FooterCopy;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick, theme, copy }) => {
  const gradientColors = theme === 'light'
    ? ['#E8734A', '#F08050', '#E8734A', '#E8E6E1', '#F0EEE9', '#F5F3EE', '#F5F3EE']
    : ['#FF3831', '#FF5A54', '#FF3831', '#2A1A1A', '#1A1A1A', '#0F0F0F', '#0F0F0F'];

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const check = () => setIsMobile(mq.matches);
    check();
    mq.addEventListener('change', check);
    return () => mq.removeEventListener('change', check);
  }, []);

  return (
    <footer className="relative py-64 md:py-128 px-24 md:px-64 bg-brand-bg overflow-hidden">
      {/* Animated Gradient Background */}
      <AnimatedGradientBackground
        Breathing={true}
        startingGap={isMobile ? 95 : 60}
        breathingRange={isMobile ? 5 : 8}
        animationSpeed={0.03}
        topOffset={isMobile ? 5 : 30}
        gradientColors={gradientColors}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto mb-64 md:mb-128 reveal">
        <p className="font-serif text-[40px] md:text-40 lg:text-[48px] font-medium tracking-tight leading-[1.1] mb-32 md:mb-48 opacity-90">
          {copy?.cta || "I love what I do - and I'd love to do it with you. Whether it's a brand film, a production system, or something we haven't figured out yet - let's start a conversation."}
        </p>

        <button onClick={onContactClick} className="bg-brand-accent text-white px-32 py-16 font-serif font-bold text-20 md:text-36 lg:text-[44px] border-beam transition-transform hover:scale-105 active:scale-95 shadow-2xl">
          {copy?.button || "Let's Talk"}
        </button>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-32 md:gap-48 lg:gap-64 items-start lg:items-end border-t border-brand-primary/10 pt-32 md:pt-64">
        <div className="md:col-span-2 lg:col-span-2 min-w-0 flex items-end gap-12 md:gap-16 lg:gap-20">
          <img src="/sphere-logo.png" alt="" className="w-28 h-28 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain mb-1 md:mb-2" />
          <h2 className="font-serif italic text-56 md:text-[86px] lg:text-[116px] xl:text-[132px] font-medium text-brand-accent leading-[0.78] tracking-tight">
            Daniel<br />Granda
          </h2>
        </div>

        <div className="space-y-32 lg:pl-8">
          <div>
            <div className="text-12 uppercase tracking-widest font-bold text-brand-accent mb-8">Contact</div>
            <a href="mailto:contact@daniel-granda.com" className="text-18 hover:text-brand-accent transition-colors">contact@daniel-granda.com</a>
            <div className="text-14 opacity-40 mt-4">786.556.7280</div>
          </div>
          <div className="text-14 opacity-60 leading-relaxed">
            {copy?.tagline || 'From Lima to Miami, making things that move people.'}
          </div>
        </div>

        <div className="space-y-16 text-18 font-medium lg:pl-8">
          <a href="https://instagram.com/danielgranda" target="_blank" rel="noopener noreferrer" className="block hover:text-brand-accent transition-colors">Instagram</a>
          <a href="https://linkedin.com/in/daniel-granda-video-producer" target="_blank" rel="noopener noreferrer" className="block hover:text-brand-accent transition-colors">LinkedIn</a>
          <a href="https://x.com/danielgranda" target="_blank" rel="noopener noreferrer" className="block hover:text-brand-accent transition-colors">X</a>
        </div>
      </div>

      <div className="mt-32 md:mt-128 flex justify-between items-center text-10 uppercase tracking-widest opacity-40">
        <div>Copyright 2026 Daniel Granda</div>
        <div className="flex gap-16">
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
    </footer>
  );
};
