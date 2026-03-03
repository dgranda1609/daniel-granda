import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, Link as LinkIcon } from 'lucide-react';
import { AdminApiClient } from '../../lib/adminApi';
import { format } from 'date-fns';

interface Props {
  adminApi: AdminApiClient;
}

export const AdminDashboard: React.FC<Props> = ({ adminApi }) => {
  const { data: posts } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: () => adminApi.getAllPosts(),
  });

  const { data: curated } = useQuery({
    queryKey: ['admin-curated'],
    queryFn: () => adminApi.getAllCurated(),
  });

  const publishedPosts = posts?.filter((p: any) => p.isPublished) ?? [];
  const draftPosts = posts?.filter((p: any) => !p.isPublished) ?? [];
  const recentPosts = [...(posts ?? [])].sort((a: any, b: any) =>
    new Date(b.updatedAt ?? b.createdAt).getTime() - new Date(a.updatedAt ?? a.createdAt).getTime()
  ).slice(0, 3);

  const recentCurated = [...(curated ?? [])].sort((a: any, b: any) =>
    new Date(b.curatedAt).getTime() - new Date(a.curatedAt).getTime()
  ).slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-brand-text">Dashboard</h2>
        <div className="flex gap-3">
          <Link
            to="/admin/posts/new"
            className="flex items-center gap-2 bg-brand-accent text-white px-4 py-2 text-sm hover:bg-brand-accent/90 transition-colors"
          >
            <PlusCircle size={14} /> New Post
          </Link>
          <Link
            to="/admin/curated/new"
            className="flex items-center gap-2 border border-brand-primary/20 text-brand-text px-4 py-2 text-sm hover:border-brand-accent/50 transition-colors"
          >
            <PlusCircle size={14} /> Add Link
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Posts', value: posts?.length ?? '—' },
          { label: 'Published', value: publishedPosts.length || '—' },
          { label: 'Drafts', value: draftPosts.length || '—' },
          { label: 'Curated Links', value: curated?.length ?? '—' },
        ].map(stat => (
          <div key={stat.label} className="border border-brand-primary/10 bg-brand-primary/5 p-5">
            <p className="text-3xl font-bold text-brand-text mb-1">{stat.value}</p>
            <p className="text-xs text-brand-secondary">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="border border-brand-primary/10 bg-brand-primary/5 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-medium text-brand-text">
              <FileText size={14} /> Recent Posts
            </div>
            <Link to="/admin/posts" className="text-xs text-brand-secondary hover:text-brand-accent transition-colors">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentPosts.length === 0 && (
              <p className="text-sm text-brand-secondary">No posts yet.</p>
            )}
            {recentPosts.map((post: any) => (
              <div key={post.id} className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <Link
                    to={`/admin/posts/${post.id}/edit`}
                    className="text-sm text-brand-text hover:text-brand-accent transition-colors truncate block"
                  >
                    {post.title}
                  </Link>
                  <p className="text-xs text-brand-secondary mt-0.5">
                    {post.updatedAt ? format(new Date(post.updatedAt), 'MMM d, yyyy') : '—'}
                  </p>
                </div>
                <span className={`text-xs px-2 py-0.5 shrink-0 ${post.isPublished ? 'bg-green-500/10 text-green-400' : 'bg-brand-primary/10 text-brand-secondary'}`}>
                  {post.isPublished ? 'Live' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Curated */}
        <div className="border border-brand-primary/10 bg-brand-primary/5 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-medium text-brand-text">
              <LinkIcon size={14} /> Recent Links
            </div>
            <Link to="/admin/curated" className="text-xs text-brand-secondary hover:text-brand-accent transition-colors">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentCurated.length === 0 && (
              <p className="text-sm text-brand-secondary">No curated links yet.</p>
            )}
            {recentCurated.map((link: any) => (
              <div key={link.id} className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <Link
                    to={`/admin/curated/${link.id}/edit`}
                    className="text-sm text-brand-text hover:text-brand-accent transition-colors truncate block"
                  >
                    {link.title}
                  </Link>
                  <p className="text-xs text-brand-secondary mt-0.5">{link.source}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 shrink-0 ${link.isPublished ? 'bg-green-500/10 text-green-400' : 'bg-brand-primary/10 text-brand-secondary'}`}>
                  {link.isPublished ? 'Live' : 'Hidden'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
