import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import type { Theme } from '../lib/useTheme';

interface NavbarProps {
  onContactClick: () => void;
  theme: Theme;
  onThemeToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick, theme, onThemeToggle }) => {
  const location = useLocation();
  const [opacity, setOpacity] = useState(1);
  const [blur, setBlur] = useState(0);
  const [bgAlpha, setBgAlpha] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeEnd = 300;
      const progress = Math.min(scrollY / fadeEnd, 1);

      setOpacity(Math.max(0, 1 - progress));
      setBlur(scrollY > 20 ? 10 : 0);
      setBgAlpha(scrollY > 20 ? 0.8 : 0);
      setTranslateY(Math.min(scrollY * 0.1, 40));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-[100] px-24 md:px-64 py-24 flex justify-between items-center transition-all duration-300 ease-out"
        style={{
          opacity: opacity,
          transform: `translateY(-${translateY}px)`,
          backdropFilter: `blur(${blur}px) saturate(180%)`,
          // @ts-ignore
          '--nav-alpha': bgAlpha,
          background: 'var(--color-navbar-bg)',
          pointerEvents: opacity < 0.1 ? 'none' : 'auto',
        } as React.CSSProperties}
      >
        {/* Left Navigation — hidden on mobile */}
        <div className="hidden md:flex flex-col gap-2 text-11 font-medium tracking-tight">
          <a href={location.pathname === '/' ? "#work" : "/#work"} className="hover:text-brand-accent transition-colors">Work</a>
          <a href={location.pathname === '/' ? "#agency" : "/#agency"} className="hover:text-brand-accent transition-colors">Agency</a>
          <a href={location.pathname === '/' ? "#services" : "/#services"} className="hover:text-brand-accent transition-colors">Services</a>
          <Link to="/articles" className="hover:text-brand-accent transition-colors">Articles</Link>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden bg-transparent border-none cursor-pointer p-0 z-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ width: 28, height: 20 }}
        >
          <span style={{
            display: 'block', width: '100%', height: 2,
            background: 'var(--color-primary)',
            transition: 'transform 0.3s, opacity 0.3s',
            transform: menuOpen ? 'translateY(9px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block', width: '80%', height: 2,
            background: 'var(--color-primary)',
            transition: 'opacity 0.3s, width 0.3s',
            marginTop: 7,
            opacity: menuOpen ? 0 : 1,
            width: menuOpen ? 0 : '80%',
          }} />
          <span style={{
            display: 'block', width: '60%', height: 2,
            background: 'var(--color-primary)',
            transition: 'transform 0.3s',
            marginTop: 7,
            transform: menuOpen ? 'translateY(-18px) rotate(-45deg)' : 'none',
          }} />
        </button>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-10">
          <img src="/sphere-logo.png" alt="Daniel Granda" className="w-32 h-32 md:w-40 md:h-40 object-contain" />
          <span className="font-serif text-28 md:text-36 font-bold tracking-tighter text-brand-primary">Daniel Granda</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-16 md:gap-24">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          <button onClick={onContactClick} className="hidden md:block text-13 border-b border-brand-accent text-brand-accent hover:opacity-80 transition-opacity bg-transparent cursor-pointer">
            Let's Talk
          </button>
          <button
            onClick={onContactClick}
            className="bg-brand-accent text-white px-16 py-8 md:px-24 md:py-12 font-serif font-black text-13 md:text-20 leading-none transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,56,49,0.3)]"
          >
            Let's Connect
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="md:hidden fixed inset-0 z-[99] flex flex-col items-center justify-center gap-32 transition-all duration-300"
        style={{
          background: 'var(--color-bg)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <a
          href={location.pathname === '/' ? "#work" : "/#work"}
          onClick={closeMenu}
          className="font-serif text-56 font-medium tracking-tight text-brand-primary hover:text-brand-accent transition-colors"
        >Work</a>
        <a
          href={location.pathname === '/' ? "#agency" : "/#agency"}
          onClick={closeMenu}
          className="font-serif text-56 font-medium tracking-tight text-brand-primary hover:text-brand-accent transition-colors"
        >Agency</a>
        <a
          href={location.pathname === '/' ? "#services" : "/#services"}
          onClick={closeMenu}
          className="font-serif text-56 font-medium tracking-tight text-brand-primary hover:text-brand-accent transition-colors"
        >Services</a>
        <Link
          to="/articles"
          onClick={closeMenu}
          className="font-serif text-56 font-medium tracking-tight text-brand-primary hover:text-brand-accent transition-colors"
        >Articles</Link>
        <button
          onClick={() => { onContactClick(); closeMenu(); }}
          className="mt-16 bg-brand-accent text-white px-48 py-16 font-serif font-black text-24 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,56,49,0.3)]"
        >
          Let's Connect
        </button>
      </div>
    </>
  );
};
