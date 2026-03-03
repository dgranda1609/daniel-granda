import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AdminApiClient } from '../../lib/adminApi';

interface Props {
  adminApi: AdminApiClient;
}

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  featuredImage: string;
  publishedAt: string;
  isPublished: boolean;
}

const empty: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: '',
  tags: '',
  featuredImage: '',
  publishedAt: new Date().toISOString().split('T')[0],
  isPublished: false,
};

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const PostEditor: React.FC<Props> = ({ adminApi }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNew = !id;

  const [form, setForm] = useState<FormState>(empty);
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState('');

  // Load existing post
  useEffect(() => {
    if (!isNew && id) {
      // getAllPosts and find by id
      adminApi.getAllPosts().then(posts => {
        const post = (posts as any[]).find(p => p.id === id);
        if (post) {
          setForm({
            title: post.title ?? '',
            slug: post.slug ?? '',
            excerpt: post.excerpt ?? '',
            content: post.content ?? '',
            category: post.category ?? '',
            tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags ?? ''),
            featuredImage: post.featuredImage ?? '',
            publishedAt: post.publishedAt ? post.publishedAt.split('T')[0] : new Date().toISOString().split('T')[0],
            isPublished: post.isPublished ?? false,
          });
        }
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [id, isNew]);

  const set = (field: keyof FormState, value: string | boolean) =>
    setForm(f => ({ ...f, [field]: value }));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    set('title', title);
    if (isNew) set('slug', toSlug(title));
  };

  const save = useMutation({
    mutationFn: () => {
      const payload = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        featured_image: form.featuredImage || undefined,
        published_at: form.publishedAt || undefined,
        is_published: form.isPublished,
      } as any;

      return isNew
        ? adminApi.createPost(payload)
        : adminApi.updatePost(id!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      queryClient.invalidateQueries({ queryKey: ['articles-feed'] });
      navigate('/admin/posts');
    },
    onError: (err: any) => setError(err.message ?? 'Save failed'),
  });

  if (loading) {
    return <div className="text-brand-secondary text-sm animate-pulse">Loading post...</div>;
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <Link to="/admin/posts" className="flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-text transition-colors">
          <ArrowLeft size={14} /> Posts
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreview(v => !v)}
            className="flex items-center gap-2 border border-brand-primary/20 text-brand-secondary px-3 py-1.5 text-sm hover:border-brand-primary/40 transition-colors"
          >
            {preview ? <EyeOff size={13} /> : <Eye size={13} />}
            {preview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={() => save.mutate()}
            disabled={save.isPending}
            className="flex items-center gap-2 bg-brand-accent text-white px-4 py-1.5 text-sm hover:bg-brand-accent/90 transition-colors disabled:opacity-50"
          >
            <Save size={13} /> {save.isPending ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      {error && <p className="text-brand-accent text-sm border border-brand-accent/30 px-3 py-2">{error}</p>}

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* Left: Metadata fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-brand-secondary mb-1">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={handleTitleChange}
              className="w-full bg-brand-surface border border-brand-primary/20 text-brand-text px-3 py-2 text-sm focus:outline-none focus:border-brand-accent transition-colors"
              placeholder="Post title"
            />
          </div>

          <div>
            <label className="block text-xs text-brand-secondary mb-1">Slug *</label>
            <input
              type="text"
              value={form.slug}
              onChange={e => set('slug', e.target.value)}
              className="w-full bg-brand-surface border border-brand-primary/20 text-brand-text px-3 py-2 text-sm font-mono focus:outline-none focus:border-brand-accent transition-colors"
              placeholder="post-url-slug"
            />
          </div>

          <div>
            <label className="block text-xs text-brand-secondary mb-1">Category</label>
            <input
              type="text"
              value={form.category}
              onChange={e => set('category', e.target.value)}
              className="w-full bg-brand-surface border border-brand-primary/20 text-brand-text px-3 py-2 text-sm focus:outline-none focus:border-brand-accent transition-colors"
              placeholder="e.g. Design & AI"
            />
          </div>

          <div>
            <label className="block text-xs text-brand-secondary mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={e => set('tags', e.target.value)}
              className="w-full bg-brand-surface border border-brand-primary/20 text-brand-text px-3 py-2 text-sm focus:outline-none focus:border-brand-accent transition-colors"
              placeholder="ai, design, video"
            />
          </div>

          <div>
            <label className="block text-xs text-brand-secondary mb-1">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={e => set('excerpt', e.target.value)}
              rows={3}
              className="w-full bg-brand-surface border border-brand-primary/20 text-brand-text px-3 py-2 text-sm focus:outline-none focus:border-brand-accent transition-colors resize-none"
              placeholder="Short description shown in the feed"
            />
          </div>

          <div>
            <label className="block text-xs text-brand-secondary mb-1">Featured Image URL</label>
            <input
              type="text"
              value={form.featuredImage}
              onChange={e => set('featuredImage', e.target.value)}
              className="w-full bg-brand-surface border border-brand-primary/20 text-brand-text px-3 py-2 text-sm focus:outline-none focus:border-brand-accent transition-colors"
              placeholder="/images/hero.jpg"
            />
          </div>

          <div>
            <label className="block text-xs text-brand-secondary mb-1">Publish Date</label>
            <input
              type="date"
              value={form.publishedAt}
              onChange={e => set('publishedAt', e.target.value)}
              className="w-full bg-brand-surface border border-brand-primary/20 text-brand-text px-3 py-2 text-sm focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => set('isPublished', !form.isPublished)}
              className={`w-10 h-5 rounded-full transition-colors relative ${form.isPublished ? 'bg-brand-accent' : 'bg-brand-primary/20'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${form.isPublished ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-sm text-brand-text">Published</span>
          </label>
        </div>

        {/* Right: Content editor or preview */}
        <div className="flex flex-col min-h-0">
          {preview ? (
            <div className="flex-1 border border-brand-primary/10 bg-brand-surface p-6 overflow-y-auto prose prose-invert max-w-none prose-headings:font-bold prose-a:text-brand-accent">
              <h1 className="text-2xl font-bold text-brand-text mb-4">{form.title || 'Untitled'}</h1>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {form.content || '*No content yet.*'}
              </ReactMarkdown>
            </div>
          ) : (
            <textarea
              value={form.content}
              onChange={e => set('content', e.target.value)}
              className="flex-1 bg-brand-surface border border-brand-primary/20 text-brand-text px-4 py-4 text-sm font-mono focus:outline-none focus:border-brand-accent transition-colors resize-none"
              placeholder="Write your post content in Markdown..."
              style={{ minHeight: '500px' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
