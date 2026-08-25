import React, { useState, useEffect } from 'react';
import {
  fetchClients,
  createClient,
  updateClient,
  deleteClient,
  toggleClientStatus,
  fetchSettings,
  updateSettings,
  checkAdminSession,
} from './lib/api';
import { ClientProfile, SiteSettings } from './types';
import { INITIAL_SETTINGS, INITIAL_CLIENTS } from './data/initialData';
import { LandingPage } from './components/landing/LandingPage';
import { PublicCard } from './components/public/PublicCard';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';
import { Radio, AlertCircle, ArrowLeft, Search } from 'lucide-react';

export default function App() {
  const [clients, setClients] = useState<ClientProfile[]>(INITIAL_CLIENTS);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [loading, setLoading] = useState<boolean>(true);

  // Sync state on load and popstate
  useEffect(() => {
    setIsAdminLoggedIn(checkAdminSession());

    async function loadData() {
      try {
        const [loadedClients, loadedSettings] = await Promise.all([
          fetchClients(),
          fetchSettings(),
        ]);
        if (loadedClients && loadedClients.length > 0) {
          setClients(loadedClients);
        }
        if (loadedSettings) {
          setSettings(loadedSettings);
        }
      } catch (err) {
        console.error('Data load error', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();

    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Navigation helper
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin Client Handlers
  const handleCreateClient = async (
    data: Omit<ClientProfile, 'id' | 'created_at' | 'updated_at'>
  ) => {
    const created = await createClient(data);
    setClients((prev) => [created, ...prev]);
  };

  const handleUpdateClient = async (id: string, data: Partial<ClientProfile>) => {
    const updated = await updateClient(id, data);
    setClients((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const handleDeleteClient = async (id: string) => {
    await deleteClient(id);
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleStatus = async (id: string) => {
    const updated = await toggleClientStatus(id);
    setClients((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const handleSaveSettings = async (newSettings: SiteSettings) => {
    const saved = await updateSettings(newSettings);
    setSettings(saved);
  };

  // Determine current view
  const cleanPath = currentPath.replace(/^\/+|\/+$/g, '');

  // 1. Admin Route
  if (cleanPath === 'admin' || cleanPath.startsWith('admin/')) {
    if (!isAdminLoggedIn) {
      return (
        <AdminLogin
          onLoginSuccess={() => {
            setIsAdminLoggedIn(true);
            navigate('/admin');
          }}
        />
      );
    }

    return (
      <AdminLayout
        clients={clients}
        settings={settings}
        onLogout={() => {
          setIsAdminLoggedIn(false);
          navigate('/');
        }}
        onRefreshClients={async () => {
          const fresh = await fetchClients();
          setClients(fresh);
        }}
        onCreateClient={handleCreateClient}
        onUpdateClient={handleUpdateClient}
        onDeleteClient={handleDeleteClient}
        onToggleStatus={handleToggleStatus}
        onSaveSettings={handleSaveSettings}
        onViewClientPublic={(slug) => navigate(`/${slug}`)}
      />
    );
  }

  // 2. Public Client Profile Route (e.g. /ahmed-car-rental, /marrakech-cars)
  if (cleanPath.length > 0 && cleanPath !== 'home') {
    const matchedClient = clients.find(
      (c) => c.slug.toLowerCase() === cleanPath.toLowerCase()
    );

    if (matchedClient) {
      // If inactive profile
      if (matchedClient.status === 'inactive') {
        return (
          <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white text-center">
            <div className="max-w-md bg-slate-800 p-8 rounded-3xl border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">{matchedClient.business_name}</h2>
              <p className="text-sm text-slate-400">
                This NFC Digital Business Card is currently paused or inactive. Please contact the business administrator.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/')}
                  className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          </div>
        );
      }

      return <PublicCard client={matchedClient} previewMode={false} />;
    }

    // Client Not Found Screen
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 text-slate-900">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Radio className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Card Profile Not Found</h2>
          <p className="text-sm text-slate-500">
            We couldn't find a digital business profile registered under the slug <code className="text-blue-600 font-mono font-bold">/{cleanPath}</code>.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
            >
              Go to Homepage
            </button>
            <button
              onClick={() => navigate('/admin')}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
            >
              Create This Client in Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Default: Public Landing Page
  const demoClient =
    clients.find((c) => c.slug === 'ahmed-car-rental') || clients[0] || INITIAL_CLIENTS[0];

  return (
    <LandingPage
      demoClient={demoClient}
      settings={settings}
      onNavigateToAdmin={() => navigate('/admin')}
      onNavigateToDemo={(slug) => navigate(`/${slug}`)}
    />
  );
}
