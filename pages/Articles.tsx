
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api, BlogPost, CuratedLink } from '../lib/api';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { format } from 'date-fns';

export const Articles: React.FC = () => {
    const [isContactOpen, setIsContactOpen] = React.useState(false);

    const { data: feed, isLoading, error } = useQuery({
        queryKey: ['articles-feed'],
        queryFn: api.getFeed
    });

    return (
        <div className="min-h-screen font-body selection:bg-brand-accent selection:text-brand-primary bg-brand-bg text-brand-text">
            <div className="film-grain" />
            <Navbar onContactClick={() => setIsContactOpen(true)} />

            <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                <header className="mb-16 reveal active">
                    <h1 className="text-5xl md:text-7xl font-serif italic mb-6">
                        Insights <span className="text-brand-accent">&</span> Curations
                    </h1>
                    <p className="text-xl md:text-2xl text-brand-secondary max-w-2xl">
                        Thoughts on AI, audiovisual storytelling, and the future of digital creation.
                    </p>
                </header>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-pulse text-brand-secondary">Loading feed...</div>
                    </div>
                ) : error ? (
                    <div className="text-red-500">Error loading articles. Please try again later.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {feed?.map((item) => (
                            <article
                                key={item.id}
                                className="group relative border border-white/5 bg-white/5 p-6 rounded-lg hover:border-brand-accent/50 transition-colors duration-300 reveal active"
                            >
                                <div className="mb-4 flex items-center justify-between text-sm text-brand-secondary">
                                    <span>{item.category}</span>
                                    <span>{format(new Date(item.type === 'post' ? item.published_at : item.curated_at), 'MMM d, yyyy')}</span>
                                </div>

                                <h2 className="text-2xl font-bold mb-3 group-hover:text-brand-accent transition-colors">
                                    {item.type === 'link' ? (
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                            {item.title}
                                            <span className="text-xs border border-brand-secondary px-1 rounded">EXT</span>
                                        </a>
                                    ) : (
                                        item.title
                                    )}
                                </h2>

                                <p className="text-gray-400 mb-6 line-clamp-3">
                                    {item.excerpt}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="text-xs bg-white/5 px-2 py-1 rounded text-brand-secondary">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>

            <Footer onContactClick={() => setIsContactOpen(true)} />
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
    );
};
