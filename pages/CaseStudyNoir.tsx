import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api, FALLBACK_PROJECTS } from '../lib/api';
import { PosterSection } from '../components/case-study-noir/PosterSection';
import { GrainOverlay } from '../components/case-study-noir/GrainOverlay';
import { Sidebar } from '../components/case-study-noir/Sidebar';
import { CaseStudyContent } from '../components/case-study-noir/CaseStudyContent';
import { ArrowLeft } from 'lucide-react';

export const CaseStudyNoir: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [activeView, setActiveView] = useState<'poster' | 'details'>('poster');

    // Fetch project data (mimicking logic from original CaseStudy)
    const { data: project, isLoading } = useQuery({
        queryKey: ['project', slug],
        queryFn: async () => {
            // Fallback to static data if API fails or for specific slugs (dev helper)
            if (slug && FALLBACK_PROJECTS[slug]) return FALLBACK_PROJECTS[slug];
            return api.getProjectBySlug(slug || '');
        },
        enabled: !!slug
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (isLoading) {
        return <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-primary">Loading...</div>;
    }

    // Attempt to use fallback if API returned null (or just handle missing project)
    const displayProject = project || (slug && FALLBACK_PROJECTS[slug]) || FALLBACK_PROJECTS['default'];

    if (!displayProject) {
        return <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-primary">Project not found</div>;
    }

    return (
        <div className="relative min-h-screen bg-brand-bg selection:bg-brand-accent selection:text-brand-bg transition-colors duration-700 overflow-x-hidden">
            <GrainOverlay />

            {/* Nav Back - Absolute so it doesn't interfere with fixed sidebar */}
            <Link to="/" className="fixed top-8 left-8 z-[60] inline-flex items-center gap-2 text-brand-primary hover:text-brand-accent transition-colors group">
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                <span className="font-heading hidden md:inline">Back</span>
            </Link>

            <Sidebar onToggle={() => setActiveView(prev => prev === 'poster' ? 'details' : 'poster')} view={activeView} />

            <main className="relative z-10 w-full">
                {activeView === 'poster' ? (
                    <PosterSection project={displayProject} />
                ) : (
                    <CaseStudyContent project={displayProject} />
                )}
            </main>

            {/* Decorative dots */}
            <div className="fixed left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-brand-accent rounded-full blur-[1px] opacity-70 z-20 pointer-events-none" />
            <div className="fixed right-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-brand-accent rounded-full blur-[1px] opacity-70 z-20 pointer-events-none" />
        </div>
    );
};
