import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react';
import { AdminApiClient } from '../../lib/adminApi';

interface Props {
  adminApi: AdminApiClient;
}

interface FormState {
  title: string;
  url: string;
  source: string;
  excerpt: string;
  category: string;
  tags: string;
  featuredImage: string;
  isPublished: boolean;
}

const empty: FormState = {
  title: '',
  url: '',
  source: '',
  excerpt: '',
  category: '',
  tags: '',
  featuredImage: '',
  isPublished: true,
};

export const CuratedEditor: React.FC<Props> = ({ adminApi }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNew = !id;

  const [form, setForm] = useState<FormState>(empty);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNew && id) {
      adminApi.getAllCurated().then(links => {
        const link = (links as any[]).find(l => l.id === id);
        if (link) {
          setForm({
            title: link.title ?? '',
            url: link.url ?? '',
            source: link.source ?? '',
            excerpt: link.excerpt ?? '',
            category: link.category ?? '',
            tags: Array.isArray(link.tags) ? link.tags.join(', ') : (link.tags ?? ''),
            featuredImage: link.featuredImage ?? '',
            isPublished: link.isPublished ?? true,
          });
        }
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [id, isNew]);

  const set = (field: keyof FormState, value: string | boolean) =>
    setForm(f => ({ ...f, [field]: value }));

  const save = useMutation({
    mutationFn: () => {
      const payload = {
        title: form.title,
        url: form.url,
        source: form.source,
        excerpt: form.excerpt || undefined,
        category: form.category || undefined,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        featured_image: form.featuredImage || undefined,
        is_published: form.isPublished,
      } as any;

      return isNew
        ? adminApi.createCurated(payload)
        : adminApi.updateCurated(id!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-curated'] });
      queryClient.invalidateQueries({ queryKey: ['articles-feed'] });
      navigate('/admin/curated');
    },
    onError: (err: any) => setError(err.message ?? 'Save failed'),
  });

  if (loading) {
    return <div className="text-brand-secondary text-sm animate-pulse">Loading...</div>;
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex items-center justify-between">
        <Link to="/admin/curated" className="flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-text transition-colors">
          <ArrowLeft size={14} /> Curated Links
        </Link>
        <button
          onClick={() => save.mutate()}
          disabled={save.isPending}
          className="flex items-center gap-2 bg-brand-accent text-white px-4 py-1.5 text-sm hover:bg-brand-accent/90 transition-colors disabled:opacity-50"
        >
          <Save size={13} /> {save.isPending ? 'Saving…' : 'Save'}
        </button>
      </div>

      {error && <p className="text-brand-accent text-sm border border-brand-accent/30 px-3 py-2">{error}</p>}

      <div className="space-y-4">
        <div>
          <label className="block text-xs text-brand-secondary mb-1">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={e => set('title', e.target.value)}
            className="w-full bg-brand-surface border border-brand-primary/20 text-brand-text px-3 py-2 text-sm focus:outline-none focus:border-brand-accent transition-colors"
            placeholder="Article title"
          />
        </div>

        <div>
          <label className="block text-xs text-brand-secondary mb-1">URL *</label>
          <input
            type="url"
            value={form.url}
            onChange={e => set('url', e.target.value)}
            className="w-full bg-brand-surface border border-brand-primary/20 text-brand-text px-3 py-2 text-sm focus:outline-none focus:border-brand-accent transition-colors"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-xs text-brand-secondary mb-1">Source</label>
          <input
            type="text"
            value={form.source}
            onChange={e => set('source', e.target.value)}
            className="w-full bg-brand-surface border border-brand-primary/20 text-brand-text px-3 py-2 text-sm focus:outline-none focus:border-brand-accent transition-colors"
            placeholder="e.g. Anthropic Blog"
          />
        </div>

        <div>
          <label className="block text-xs text-brand-secondary mb-1">Category</label>
          <input
            type="text"
            value={form.category}
            onChange={e => set('category', e.target.value)}
            className="w-full bg-brand-surface border border-brand-primary/20 text-brand-text px-3 py-2 text-sm focus:outline-none focus:border-brand-accent transition-colors"
            placeholder="e.g. Development & AI"
          />
        </div>

        <div>
          <label className="block text-xs text-brand-secondary mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            value={form.tags}
            onChange={e => set('tags', e.target.value)}
            className="w-full bg-brand-surface border border-brand-primary/20 text-brand-text px-3 py-2 text-sm focus:outline-none focus:border-brand-accent transition-colors"
            placeholder="ai, video, tools"
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
    </div>
  );
};
