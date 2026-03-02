
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../lib/useTheme';

export const CaseStudy: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [isContactOpen, setIsContactOpen] = useState(false);
    const { theme, toggle: toggleTheme } = useTheme();

    const { data: project, isLoading } = useQuery({
        queryKey: ['project', slug],
        queryFn: () => api.getProjectBySlug(slug || ''),
        enabled: !!slug
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log('CaseStudy mounted, slug:', slug);
    }, [slug]);

    if (isLoading) {
        return <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-primary">Loading...</div>;
    }

    if (!project) {
        console.log('Project not found for slug:', slug);
        return <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-primary">Project not found</div>;
    }

    console.log('Rendering project:', project.title);

    return (
        <div className="min-h-screen bg-brand-bg text-brand-primary font-body selection:bg-brand-accent selection:text-brand-primary">
            <div className="film-grain" />

            <Navbar onContactClick={() => setIsContactOpen(true)} theme={theme} onThemeToggle={toggleTheme} />

            {/* HERO SECTION - Blurred BG + Big Bold Text */}
            <header className="relative w-full h-screen flex items-center justify-center overflow-hidden">
                {/* Blurred Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={project.image_url}
                        alt=""
                        className="w-full h-full object-cover filter blur-xl scale-110 opacity-60"
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/20 via-transparent to-brand-bg" />
                </div>

                {/* Big Bold Text */}
                <div className="relative z-10 text-center px-6 animate-pulse-slow">
                    <h1 className="font-heading font-black text-6xl md:text-9xl uppercase tracking-tighter leading-none mb-4 text-transparent bg-clip-text bg-gradient-to-br from-brand-primary to-brand-secondary/50"
                        style={{ textShadow: '0 0 40px rgba(255,56,49,0.3)' }}>
                        {project.title}
                    </h1>
                    <p className="font-serif italic text-2xl md:text-3xl text-brand-accent mt-4">
                        {project.client}
                    </p>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
                    <span className="text-xs uppercase tracking-widest opacity-50">Scroll to Explore</span>
                </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24">
                <Link to="/" className="inline-flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Works
                </Link>

                {/* 3 IMAGES LAYOUT */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {project.images && project.images.length > 0 ? (
                        project.images.slice(0, 3).map((img: string, index: number) => (
                            <div key={index} className={`relative aspect-[3/4] overflow-hidden rounded-lg border border-brand-primary/10`}>
                                <img
                                    src={img}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        ))
                    ) : (
                        // Fallback if images array is empty (use main image 3 times or placeholders)
                        [1, 2, 3].map((_, i) => (
                            <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-lg border border-brand-primary/10 bg-brand-primary/5">
                                <img src={project.image_url} alt="" className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all" />
                            </div>
                        ))
                    )}
                </section>

                {/* COPY (Text Content) */}
                <section className="max-w-3xl mx-auto text-center mb-32">
                    <div className="w-12 h-1 bg-brand-accent mx-auto mb-12" />
                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">The Challenge & Outcome</h2>
                    <p className="text-lg md:text-xl leading-relaxed text-brand-secondary/90 text-justify md:text-center">
                        {project.full_description}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-12">
                        {project.tags.map((tag: string) => (
                            <span key={tag} className="border border-brand-primary/10 px-4 py-2 rounded-full text-xs uppercase tracking-widest text-brand-primary/60">
                                {tag}
                            </span>
                        ))}
                    </div>
                </section>

            </main>

            <Footer onContactClick={() => setIsContactOpen(true)} theme={theme} />
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
    );
};
