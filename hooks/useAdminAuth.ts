import { useState, useCallback } from 'react';

const STORAGE_KEY = 'cms_api_key';

export function useAdminAuth() {
  const [apiKey, setApiKey] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEY)
  );

  const login = useCallback((key: string) => {
    localStorage.setItem(STORAGE_KEY, key);
    setApiKey(key);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey(null);
  }, []);

  return {
    apiKey,
    isLoggedIn: Boolean(apiKey),
    login,
    logout,
  };
}
