import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowRight, Sparkles, Key } from 'lucide-react';
import { setAdminSession } from '../../lib/api';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAdminSession(true);
        onLoginSuccess();
      } else {
        // Also allow local fallback for admin123
        if (password === 'admin123' || password === 'admin') {
          setAdminSession(true);
          onLoginSuccess();
        } else {
          setError('Incorrect admin password. (Default: admin123)');
        }
      }
    } catch {
      if (password === 'admin123' || password === 'admin') {
        setAdminSession(true);
        onLoginSuccess();
      } else {
        setError('Incorrect password. Default password is admin123');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setPassword('admin123');
    setError('');
  };

  return (
    <div
      id="admin-login-root"
      className="min-h-screen bg-slate-900 flex items-center justify-center p-4 selection:bg-blue-600 selection:text-white"
    >
      <div
        id="admin-login-card"
        className="w-full max-w-md bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-700 text-white"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Dashboard Login</h1>
          <p className="text-sm text-slate-400 mt-1">
            Sign in to manage client NFC business profiles & cards
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Admin Password
            </label>
            <div className="relative">
              <input
                id="admin-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. admin123)"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder:text-slate-500 text-sm outline-none transition-all"
                required
              />
              <Key className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            id="admin-login-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <span>{loading ? 'Verifying...' : 'Access Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-700/60 text-center">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs text-slate-400 text-left">
            <div className="font-semibold text-slate-300 flex items-center justify-between mb-1">
              <span>Demo Admin Access</span>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-blue-400 hover:text-blue-300 font-semibold underline text-xs"
              >
                Auto-fill password
              </button>
            </div>
            <div>
              Default Password: <code className="text-blue-300 font-mono bg-slate-800 px-1.5 py-0.5 rounded">admin123</code>
            </div>
          </div>

          <div className="mt-4">
            <a
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Public Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
