
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { format } from 'date-fns';
import { useTheme } from '../lib/useTheme';

export const Articles: React.FC = () => {
    const [isContactOpen, setIsContactOpen] = React.useState(false);
    const { theme, toggle: toggleTheme } = useTheme();

    const { data: feed, isLoading, error } = useQuery({
        queryKey: ['articles-feed'],
        queryFn: () => api.getFeed()
    });

    return (
        <div className="min-h-screen font-body selection:bg-brand-accent selection:text-brand-primary bg-brand-bg text-brand-text">
            <div className="film-grain" />
            <Navbar onContactClick={() => setIsContactOpen(true)} theme={theme} onThemeToggle={toggleTheme} />

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
                    <div className="text-brand-accent border border-brand-accent/30 p-6">Error loading articles. Please try again later.</div>
                ) : !feed || feed.length === 0 ? (
                    <div className="text-brand-secondary text-lg">No articles yet. Check back soon.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {feed.map((rawItem) => {
                            // API client runs snakeToCamel(), so runtime keys are camelCase
                            // despite the shared FeedItem type declaring snake_case
                            const item = rawItem as any;
                            const media = item.featuredImage as string | undefined;
                            const isVideo = !!media && /\.(mp4|webm|ogg)$/i.test(media);

                            return (
                            <article
                                key={item.id}
                                className="group relative border border-brand-primary/10 bg-brand-primary/5 p-6 hover:border-brand-accent/50 transition-colors duration-300 reveal active"
                            >
                                {media && (
                                    <div className="mb-4 overflow-hidden border border-brand-primary/15 bg-black/20">
                                        {isVideo ? (
                                            <video
                                                src={media}
                                                className="w-full h-44 object-cover"
                                                muted
                                                loop
                                                autoPlay
                                                playsInline
                                                controls
                                            />
                                        ) : (
                                            <img src={media} alt={item.title} className="w-full h-44 object-cover" loading="lazy" />
                                        )}
                                    </div>
                                )}

                                <div className="mb-4 flex items-center justify-between text-sm text-brand-secondary">
                                    <span>{item.category}</span>
                                    <span>{format(new Date(item.date), 'MMM d, yyyy')}</span>
                                </div>

                                <h2 className="text-2xl font-bold mb-3 group-hover:text-brand-accent transition-colors">
                                    {item.type === 'curated' ? (
                                        <a href={item.slugOrUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                            {item.title}
                                            <span className="text-xs border border-brand-secondary px-1">EXT</span>
                                        </a>
                                    ) : (
                                        <Link to={`/articles/${item.slugOrUrl}`} className="hover:text-brand-accent transition-colors">
                                            {item.title}
                                        </Link>
                                    )}
                                </h2>

                                <p className="text-brand-secondary mb-6 line-clamp-3">
                                    {item.excerpt}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {item.tags.map((tag: string) => (
                                        <span key={tag} className="text-xs bg-brand-primary/5 px-2 py-1 text-brand-secondary">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                            );
                        })}
                    </div>
                )}
            </main>

            <Footer onContactClick={() => setIsContactOpen(true)} theme={theme} />
            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
    );
};
