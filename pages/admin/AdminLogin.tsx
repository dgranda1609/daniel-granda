import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';

export const AdminLogin: React.FC = () => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) {
      setError('API key is required');
      return;
    }
    login(key.trim());
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-brand-text mb-1">CMS Admin</h1>
          <p className="text-brand-secondary text-sm">daniel-granda.com</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="apikey" className="block text-sm text-brand-secondary mb-2">
              API Key
            </label>
            <input
              id="apikey"
              type="password"
              value={key}
              onChange={e => { setKey(e.target.value); setError(''); }}
              className="w-full bg-brand-surface border border-brand-primary/20 text-brand-text px-4 py-3 text-sm focus:outline-none focus:border-brand-accent transition-colors"
              placeholder="Enter your API key"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-brand-accent text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-brand-accent text-white py-3 text-sm font-medium hover:bg-brand-accent/90 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
