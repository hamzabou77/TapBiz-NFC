import React, { useState } from 'react';
import { Lock, ArrowRight, Key, ShieldAlert, Eye, EyeOff } from 'lucide-react';
import { setAdminSession } from '../../lib/api';

const REQUIRED_ADMIN_PASSWORD = 'Hamza2005@';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Direct strict match check
      if (password === REQUIRED_ADMIN_PASSWORD) {
        setAdminSession(true);
        // Also inform backend
        fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        }).catch(() => {});

        onLoginSuccess();
        return;
      }

      // Check backend endpoint
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAdminSession(true);
        onLoginSuccess();
      } else {
        setError('Incorrect password');
      }
    } catch {
      if (password === REQUIRED_ADMIN_PASSWORD) {
        setAdminSession(true);
        onLoginSuccess();
      } else {
        setError('Incorrect password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="admin-login-root"
      className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-blue-600 selection:text-white"
    >
      <div
        id="admin-login-card"
        className="w-full max-w-md bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 text-white"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20 mb-4 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Console Gate</h1>
          <p className="text-sm text-slate-400 mt-1.5 font-mono text-xs">
            /admin-hamza-sec
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Please enter your security password to access the console.
          </p>
        </div>

        {error && (
          <div
            id="admin-login-error"
            className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-medium flex items-center gap-3 animate-fadeIn"
          >
            <ShieldAlert className="w-5 h-5 flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin-password-input"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
            >
              Console Password
            </label>
            <div className="relative">
              <input
                id="admin-password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter password"
                className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder:text-slate-500 text-sm outline-none transition-all"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            id="admin-login-submit-btn"
            type="submit"
            disabled={loading || !password}
            className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{loading ? 'Verifying...' : 'Unlock Admin Console'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
          >
            ← Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};
