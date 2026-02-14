
import React from 'react';
import AnimatedGradientBackground from './AnimatedGradientBackground';

interface FooterProps {
  onContactClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  return (
    <footer className="relative py-128 px-24 md:px-64 bg-brand-bg overflow-hidden">
      {/* Animated Gradient Background */}
      <AnimatedGradientBackground
        Breathing={true}
        startingGap={60}
        breathingRange={8}
        animationSpeed={0.03}
        topOffset={30}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto mb-128 reveal">
        <p className="font-serif text-24 md:text-40 lg:text-[48px] font-medium tracking-tight mb-48 leading-[1.2] opacity-90">
          Cinematic video. Intelligent systems. Marketing that converts. Let's build something that actually works.
        </p>

        <button onClick={onContactClick} className="bg-brand-accent text-white px-32 py-16 font-serif font-bold text-20 md:text-36 lg:text-[44px] border-beam transition-transform hover:scale-105 active:scale-95 shadow-2xl">
          Let's Connect
        </button>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-64 items-end border-t border-brand-primary/10 pt-64">
        <div className="lg:col-span-2">
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

      <div className="mt-128 flex justify-between items-center text-10 uppercase tracking-widest opacity-40">
        <div>Copyright 2026 Daniel Granda</div>
        <div className="flex gap-16">
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
    </footer>
  );
};
