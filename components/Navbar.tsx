import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const location = useLocation();
  const [opacity, setOpacity] = useState(1);
  const [blur, setBlur] = useState(0);
  const [bgAlpha, setBgAlpha] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = 300;

      const progress = Math.min(scrollY / fadeEnd, 1);

      // Navbar fades out as we scroll deep into the hero
      setOpacity(Math.max(0, 1 - progress));

      // Blur and background alpha should only appear as we scroll
      // but the requirement is to keep it clean at the start
      setBlur(scrollY > 20 ? 10 : 0);
      setBgAlpha(scrollY > 20 ? 0.8 : 0);

      setTranslateY(Math.min(scrollY * 0.1, 40));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[100] px-24 md:px-64 py-24 flex justify-between items-center transition-all duration-300 ease-out"
      style={{
        opacity: opacity,
        transform: `translateY(-${translateY}px)`,
        backdropFilter: `blur(${blur}px) saturate(180%)`,
        background: `rgba(15, 15, 15, ${bgAlpha})`,
        pointerEvents: opacity < 0.1 ? 'none' : 'auto',
      }}
    >
      {/* Left Navigation */}
      <div className="flex flex-col gap-2 text-11 font-medium tracking-tight">
        <a href={location.pathname === '/' ? "#work" : "/#work"} className="hover:text-brand-accent transition-colors">Work</a>
        <a href={location.pathname === '/' ? "#agency" : "/#agency"} className="hover:text-brand-accent transition-colors">Agency</a>
        <a href={location.pathname === '/' ? "#services" : "/#services"} className="hover:text-brand-accent transition-colors">Services</a>
        <Link to="/articles" className="hover:text-brand-accent transition-colors">Articles</Link>
      </div>

      {/* Center Logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <span className="font-serif text-28 md:text-36 font-bold tracking-tighter text-brand-primary">Daniel Granda</span>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-24">
        <button onClick={onContactClick} className="hidden md:block text-13 border-b border-brand-accent text-brand-accent hover:opacity-80 transition-opacity bg-transparent cursor-pointer">
          Let's Talk
        </button>
        <button onClick={onContactClick} className="bg-brand-accent text-white px-24 py-12 font-serif font-black text-16 md:text-20 leading-none transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,56,49,0.3)]">
          Let's Connect
        </button>
      </div>
    </nav>
  );
};