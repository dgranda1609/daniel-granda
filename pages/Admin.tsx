import React, { useMemo, useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Link as LinkIcon, RefreshCw, LogOut } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { AdminApiClient } from '../lib/adminApi';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { PostsList } from './admin/PostsList';
import { PostEditor } from './admin/PostEditor';
import { CuratedList } from './admin/CuratedList';
import { CuratedEditor } from './admin/CuratedEditor';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={15} />, exact: true },
  { to: '/admin/posts', label: 'Posts', icon: <FileText size={15} /> },
  { to: '/admin/curated', label: 'Curated Links', icon: <LinkIcon size={15} /> },
];

const AdminShell: React.FC<{ adminApi: AdminApiClient; onLogout: () => void }> = ({ adminApi, onLogout }) => {
  const location = useLocation();
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');

  const handleSync = async () => {
    setSyncing(true);
    setSyncMsg('');
    try {
      const result = await adminApi.syncMarkdown();
      setSyncMsg(`Synced ${result.synced ?? 0} file(s)`);
    } catch (err: any) {
      setSyncMsg(err.message ?? 'Sync failed');
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncMsg(''), 3000);
    }
  };

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex">
      {/* Sidebar */}
      <aside className="w-52 shrink-0 border-r border-brand-primary/10 flex flex-col">
        <div className="px-5 py-6 border-b border-brand-primary/10">
          <p className="text-xs font-mono text-brand-secondary">CMS</p>
          <p className="text-sm font-medium text-brand-text mt-0.5">daniel-granda.com</p>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                isActive(item.to, item.exact)
                  ? 'text-brand-text bg-brand-primary/10'
                  : 'text-brand-secondary hover:text-brand-text hover:bg-brand-primary/5'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 space-y-2 border-t border-brand-primary/10">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 w-full px-3 py-2 text-xs text-brand-secondary hover:text-brand-text border border-brand-primary/15 hover:border-brand-primary/30 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={12} className={syncing ? 'animate-spin' : ''} />
            {syncing ? 'Syncing…' : 'Sync from Markdown'}
          </button>
          {syncMsg && (
            <p className="text-xs text-brand-secondary px-1">{syncMsg}</p>
          )}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-xs text-brand-secondary hover:text-red-400 transition-colors"
          >
            <LogOut size={12} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Routes>
          <Route index element={<AdminDashboard adminApi={adminApi} />} />
          <Route path="posts" element={<PostsList adminApi={adminApi} />} />
          <Route path="posts/new" element={<PostEditor adminApi={adminApi} />} />
          <Route path="posts/:id/edit" element={<PostEditor adminApi={adminApi} />} />
          <Route path="curated" element={<CuratedList adminApi={adminApi} />} />
          <Route path="curated/new" element={<CuratedEditor adminApi={adminApi} />} />
          <Route path="curated/:id/edit" element={<CuratedEditor adminApi={adminApi} />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export const Admin: React.FC = () => {
  const { apiKey, isLoggedIn, login, logout } = useAdminAuth();

  const adminApi = useMemo(
    () => (apiKey ? new AdminApiClient(apiKey) : null),
    [apiKey]
  );

  if (!isLoggedIn || !adminApi) {
    return <AdminLogin />;
  }

  return <AdminShell adminApi={adminApi} onLogout={logout} />;
};
