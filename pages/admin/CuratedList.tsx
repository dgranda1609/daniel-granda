import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, EyeOff, PlusCircle, ExternalLink } from 'lucide-react';
import { AdminApiClient } from '../../lib/adminApi';
import { format } from 'date-fns';

interface Props {
  adminApi: AdminApiClient;
}

export const CuratedList: React.FC<Props> = ({ adminApi }) => {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: links, isLoading } = useQuery({
    queryKey: ['admin-curated'],
    queryFn: () => adminApi.getAllCurated(),
  });

  const togglePublish = useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      adminApi.updateCurated(id, { is_published: !isPublished } as any),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-curated'] }),
  });

  const deleteLink = useMutation({
    mutationFn: (id: string) => adminApi.deleteCurated(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-curated'] });
      queryClient.invalidateQueries({ queryKey: ['articles-feed'] });
      setDeletingId(null);
    },
  });

  if (isLoading) {
    return <div className="text-brand-secondary text-sm animate-pulse">Loading links...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-brand-text">Curated Links</h2>
        <Link
          to="/admin/curated/new"
          className="flex items-center gap-2 bg-brand-accent text-white px-4 py-2 text-sm hover:bg-brand-accent/90 transition-colors"
        >
          <PlusCircle size={14} /> Add Link
        </Link>
      </div>

      {!links || links.length === 0 ? (
        <p className="text-brand-secondary text-sm">No curated links yet.</p>
      ) : (
        <div className="border border-brand-primary/10 divide-y divide-brand-primary/10">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2 text-xs text-brand-secondary uppercase tracking-wider">
            <span>Title</span>
            <span>Date</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {(links as any[]).map(link => (
            <div key={link.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-4 py-3 hover:bg-brand-primary/5 transition-colors">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  <p className="text-sm font-medium text-brand-text truncate">{link.title}</p>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:text-brand-accent shrink-0">
                    <ExternalLink size={11} />
                  </a>
                </div>
                {link.source && (
                  <p className="text-xs text-brand-secondary mt-0.5">{link.source}</p>
                )}
              </div>

              <span className="text-xs text-brand-secondary whitespace-nowrap">
                {link.curatedAt ? format(new Date(link.curatedAt), 'MMM d, yyyy') : '—'}
              </span>

              <button
                onClick={() => togglePublish.mutate({ id: link.id, isPublished: link.isPublished })}
                title={link.isPublished ? 'Hide' : 'Publish'}
                className={`flex items-center gap-1 text-xs px-2 py-1 transition-colors ${
                  link.isPublished
                    ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                    : 'bg-brand-primary/10 text-brand-secondary hover:bg-brand-primary/20'
                }`}
              >
                {link.isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                {link.isPublished ? 'Live' : 'Hidden'}
              </button>

              <div className="flex items-center gap-2">
                <Link
                  to={`/admin/curated/${link.id}/edit`}
                  className="p-1.5 text-brand-secondary hover:text-brand-accent transition-colors"
                  title="Edit"
                >
                  <Edit size={14} />
                </Link>

                {deletingId === link.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => deleteLink.mutate(link.id)}
                      className="text-xs text-red-400 hover:text-red-300 px-2 py-1 border border-red-400/30"
                      disabled={deleteLink.isPending}
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
                    onClick={() => setDeletingId(link.id)}
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
