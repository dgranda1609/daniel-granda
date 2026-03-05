
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
  { id: '1', title: 'First Look', category: 'Childhood', image: '/images/selected-works/story-01-child-bolex-camera.png', year: '2003' },
  { id: '2', title: 'Daniel D.', category: 'Film Set', image: '/images/selected-works/story-02-child-director-chair.png', year: '2005' },
  { id: '3', title: 'On Set', category: 'Early Years', image: '/images/selected-works/story-03-child-film-set-lights.jpeg', year: '2004' },
  { id: '4', title: 'Camera Ready', category: 'Behind the Scenes', image: '/images/selected-works/story-04-child-camera-dolly.png', year: '2006' },
  { id: '5', title: 'Peru Tiene Talento', category: 'Live Television', image: '/images/selected-works/story-05-live-tv-control-room.jpeg', year: '2012' },
  { id: '6', title: 'On the Floor', category: 'Live Production', image: '/images/selected-works/story-06-live-tv-set-crew.jpeg', year: '2013' },
  { id: '7', title: 'In Control', category: 'Broadcast', image: '/images/selected-works/story-07-broadcast-control-room.png', year: '2018' },
  { id: '8', title: 'Coast Line', category: 'Documentary', image: '/images/selected-works/story-08-field-ocean-filming.jpeg', year: '2020' },
  { id: '9', title: 'Andes', category: 'ILO Documentary', image: '/images/selected-works/story-09-andes-documentary.jpeg', year: '2022' },
  { id: '10', title: 'The Moment', category: 'Cinematic', image: '/images/selected-works/story-10-wedding-bw-documentary.png', year: '2024' },
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
