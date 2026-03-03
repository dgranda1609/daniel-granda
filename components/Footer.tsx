
import React, { useState, useEffect } from 'react';
import AnimatedGradientBackground from './AnimatedGradientBackground';
import type { Theme } from '../lib/useTheme';

interface FooterProps {
  onContactClick: () => void;
  theme: Theme;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick, theme }) => {
  const gradientColors = theme === 'light'
    ? ['#FF3831', '#FF5A54', '#FF3831', '#E8E6E1', '#F0EEE9', '#F5F3EE', '#F5F3EE']
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
          Cinematic video. Intelligent systems. Marketing that converts. Let's build something that actually works.
        </p>

        <button onClick={onContactClick} className="bg-brand-accent text-white px-32 py-16 font-serif font-bold text-20 md:text-36 lg:text-[44px] border-beam transition-transform hover:scale-105 active:scale-95 shadow-2xl">
          Let's Connect
        </button>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-32 md:gap-64 items-end border-t border-brand-primary/10 pt-32 md:pt-64">
        <div className="lg:col-span-2 flex items-end gap-16">
          <img src="/sphere-logo.png" alt="" className="w-48 h-48 md:w-[120px] md:h-[120px] object-contain mb-2 md:mb-4" />
          <h2 className="font-heading text-64 md:text-[180px] font-black text-brand-accent leading-[0.8] tracking-tighter">
            Daniel<br />Granda
          </h2>
        </div>

        <div className="space-y-32">
          <div>
            <div className="text-12 uppercase tracking-widest font-bold text-brand-accent mb-8">Contact</div>
            <a href="mailto:contact@daniel-granda.com" className="text-18 hover:text-brand-accent transition-colors">contact@daniel-granda.com</a>
            <div className="text-14 opacity-40 mt-4">786.556.7280</div>
          </div>
          <div className="text-14 opacity-60 leading-relaxed">
            Visual production meets intelligent systems.
          </div>
        </div>

        <div className="space-y-16 text-18 font-medium">
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
