
import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { Clients } from '../components/Clients';
import { Services } from '../components/Services';
import { About } from '../components/About';
import { Manifesto } from '../components/Manifesto';
import { Testimonials } from '../components/Testimonials';
import { SocialProof } from '../components/SocialProof';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { useTheme } from '../lib/useTheme';
import { Scene, GalleryProject } from '../components/Gallery/Scene';

const customGalleryProjects: GalleryProject[] = [
  { id: '1', title: 'Levitation', category: 'Motion Design', image: '/images/selected-works/s1_shot5_levitation_1771633131236.png', year: '2026' },
  { id: '2', title: 'Masterpiece', category: 'Art Direction', image: '/images/selected-works/s1_shot9_masterpiece_1771633199713.png', year: '2026' },
  { id: '3', title: 'Grid', category: 'VFX', image: '/images/selected-works/s2_shot5_grid_1771633315783.png', year: '2026' },
  { id: '4', title: 'Torrent', category: '3D Animation', image: '/images/selected-works/s2_shot2_torrent_1771633269371.png', year: '2026' },
  { id: '5', title: 'Convergence', category: 'Direction', image: '/images/selected-works/s1_shot7_convergence_1771633164764.png', year: '2026' },
  { id: '6', title: 'Material', category: 'Look Dev', image: '/images/selected-works/s2_shot4_material_1771633300053.png', year: '2026' }
];

export const Home: React.FC = () => {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const openContact = () => setIsContactOpen(true);
    const closeContact = () => setIsContactOpen(false);
    const { theme, toggle: toggleTheme } = useTheme();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.15 });

        // Observe all current .reveal elements
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Watch for dynamically-added .reveal elements (e.g. after API data loads)
        const mutation = new MutationObserver((mutations) => {
            mutations.forEach(m => {
                m.addedNodes.forEach(node => {
                    if (node instanceof HTMLElement) {
                        if (node.classList.contains('reveal')) observer.observe(node);
                        node.querySelectorAll('.reveal').forEach(el => observer.observe(el));
                    }
                });
            });
        });
        mutation.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutation.disconnect();
        };
    }, []);

    return (
        <div className="min-h-screen font-body selection:bg-brand-accent selection:text-brand-primary">
            <div className="film-grain" />
            <Navbar onContactClick={openContact} theme={theme} onThemeToggle={toggleTheme} />
            <main>
                <Hero />
                <Manifesto theme={theme} />
                <About />
                <Scene projects={customGalleryProjects} />
                <Projects />
                <Services />
                <Clients />
                <Testimonials theme={theme} />
                <SocialProof />
                <Footer onContactClick={openContact} theme={theme} />
            </main>
            <ContactModal isOpen={isContactOpen} onClose={closeContact} />
        </div>
    );
};
