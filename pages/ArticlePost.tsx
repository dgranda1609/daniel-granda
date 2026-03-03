import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';
import { api } from '../lib/api';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactModal } from '../components/ContactModal';
import { useTheme } from '../lib/useTheme';

export const ArticlePost: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const [isContactOpen, setIsContactOpen] = React.useState(false);
  const { theme, toggle: toggleTheme } = useTheme();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => api.getPostBySlug(slug),
    enabled: !!slug,
  });

  const media = (post as any)?.featuredImage as string | undefined;
  const isVideo = !!media && /\.(mp4|webm|ogg)$/i.test(media);

  return (
    <div className="min-h-screen font-body selection:bg-brand-accent selection:text-brand-primary bg-brand-bg text-brand-text">
      <div className="film-grain" />
      <Navbar onContactClick={() => setIsContactOpen(true)} theme={theme} onThemeToggle={toggleTheme} />

      <main className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="mb-10">
          <Link to="/articles" className="text-sm text-brand-secondary hover:text-brand-accent transition-colors">← Back to articles</Link>
        </div>

        {isLoading ? (
          <div className="text-brand-secondary">Loading article...</div>
        ) : error || !post ? (
          <div className="text-brand-accent border border-brand-accent/30 p-6">Article not found.</div>
        ) : (
          <article className="reveal active">
            {media && (
              <div className="mb-8 overflow-hidden border border-brand-primary/15 bg-black/20">
                {isVideo ? (
                  <video src={media} className="w-full max-h-[440px] object-cover" controls playsInline />
                ) : (
                  <img src={media} alt={post.title} className="w-full max-h-[440px] object-cover" />
                )}
              </div>
            )}

            <header className="mb-8">
              <p className="text-sm text-brand-secondary mb-3">
                {post.category || 'Article'} • {post.publishedAt ? format(new Date(post.publishedAt), 'MMM d, yyyy') : 'Draft'}
              </p>
              <h1 className="text-4xl md:text-6xl font-serif italic mb-4">{post.title}</h1>
              <p className="text-brand-secondary text-lg">{post.excerpt}</p>
            </header>

            <div className="prose prose-invert max-w-none prose-a:text-brand-accent prose-headings:text-brand-primary prose-p:text-brand-text">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        )}
      </main>

      <Footer onContactClick={() => setIsContactOpen(true)} theme={theme} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};
