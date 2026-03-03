import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, EyeOff, PlusCircle } from 'lucide-react';
import { AdminApiClient } from '../../lib/adminApi';
import { format } from 'date-fns';

interface Props {
  adminApi: AdminApiClient;
}

export const PostsList: React.FC<Props> = ({ adminApi }) => {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: posts, isLoading } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: () => adminApi.getAllPosts(),
  });

  const togglePublish = useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      adminApi.updatePost(id, { is_published: !isPublished } as any),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-posts'] }),
  });

  const deletePost = useMutation({
    mutationFn: (id: string) => adminApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      queryClient.invalidateQueries({ queryKey: ['articles-feed'] });
      setDeletingId(null);
    },
  });

  if (isLoading) {
    return <div className="text-brand-secondary text-sm animate-pulse">Loading posts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-brand-text">Posts</h2>
        <Link
          to="/admin/posts/new"
          className="flex items-center gap-2 bg-brand-accent text-white px-4 py-2 text-sm hover:bg-brand-accent/90 transition-colors"
        >
          <PlusCircle size={14} /> New Post
        </Link>
      </div>

      {!posts || posts.length === 0 ? (
        <p className="text-brand-secondary text-sm">No posts yet. Create your first post.</p>
      ) : (
        <div className="border border-brand-primary/10 divide-y divide-brand-primary/10">
          {/* Header */}
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2 text-xs text-brand-secondary uppercase tracking-wider">
            <span>Title</span>
            <span>Date</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {(posts as any[]).map(post => (
            <div key={post.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-4 py-3 hover:bg-brand-primary/5 transition-colors">
              <div className="min-w-0">
                <p className="text-sm font-medium text-brand-text truncate">{post.title}</p>
                {post.category && (
                  <p className="text-xs text-brand-secondary mt-0.5">{post.category}</p>
                )}
              </div>

              <span className="text-xs text-brand-secondary whitespace-nowrap">
                {post.publishedAt
                  ? format(new Date(post.publishedAt), 'MMM d, yyyy')
                  : post.createdAt
                  ? format(new Date(post.createdAt), 'MMM d, yyyy')
                  : '—'}
              </span>

              <button
                onClick={() => togglePublish.mutate({ id: post.id, isPublished: post.isPublished })}
                title={post.isPublished ? 'Unpublish' : 'Publish'}
                className={`flex items-center gap-1 text-xs px-2 py-1 transition-colors ${
                  post.isPublished
                    ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                    : 'bg-brand-primary/10 text-brand-secondary hover:bg-brand-primary/20'
                }`}
              >
                {post.isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                {post.isPublished ? 'Live' : 'Draft'}
              </button>

              <div className="flex items-center gap-2">
                <Link
                  to={`/admin/posts/${post.id}/edit`}
                  className="p-1.5 text-brand-secondary hover:text-brand-accent transition-colors"
                  title="Edit"
                >
                  <Edit size={14} />
                </Link>

                {deletingId === post.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => deletePost.mutate(post.id)}
                      className="text-xs text-red-400 hover:text-red-300 px-2 py-1 border border-red-400/30"
                      disabled={deletePost.isPending}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeletingId(null)}
                      className="text-xs text-brand-secondary hover:text-brand-text px-2 py-1"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeletingId(post.id)}
                    className="p-1.5 text-brand-secondary hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
