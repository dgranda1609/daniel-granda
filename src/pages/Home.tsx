
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

export const Home: React.FC = () => {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const openContact = () => setIsContactOpen(true);
    const closeContact = () => setIsContactOpen(false);

    useEffect(() => {
        // Reveal animation logic using IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen font-body selection:bg-brand-accent selection:text-brand-primary">
            <div className="film-grain" />
            <Navbar onContactClick={openContact} />
            <main>
                <Hero />
                <Manifesto />
                <About />
                <Projects />
                <Services />
                <Clients />
                <Testimonials />
                <SocialProof />
                <Footer onContactClick={openContact} />
            </main>
            <ContactModal isOpen={isContactOpen} onClose={closeContact} />
        </div>
    );
};
