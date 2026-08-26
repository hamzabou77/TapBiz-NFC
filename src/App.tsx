import React, { useState, useEffect, useCallback } from 'react';
import {
  fetchClients,
  fetchClientBySlug,
  createClient,
  updateClient,
  deleteClient,
  toggleClientStatus,
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchSettings,
  updateSettings,
  checkAdminSession,
  setAdminSession,
} from './lib/api';
import { ClientProfile, SiteSettings, Product } from './types';
import { INITIAL_SETTINGS, INITIAL_CLIENTS, INITIAL_PRODUCTS } from './data/initialData';
import { LandingPage } from './components/landing/LandingPage';
import { PublicCard } from './components/public/PublicCard';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';
import { Radio, AlertCircle, Loader2 } from 'lucide-react';

export default function App() {
  const [clients, setClients] = useState<ClientProfile[]>(INITIAL_CLIENTS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  
  // Dynamic profile route state
  const [activeProfile, setActiveProfile] = useState<ClientProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [profileFetchDone, setProfileFetchDone] = useState<boolean>(false);

  // Sync admin session on load
  useEffect(() => {
    setIsAdminLoggedIn(checkAdminSession());

    async function loadInitialData() {
      try {
        const [loadedClients, loadedSettings, loadedProducts] = await Promise.all([
          fetchClients(),
          fetchSettings(),
          fetchProducts(),
        ]);
        if (loadedClients && loadedClients.length > 0) {
          setClients(loadedClients);
        }
        if (loadedSettings) {
          setSettings(loadedSettings);
        }
        if (loadedProducts && loadedProducts.length > 0) {
          setProducts(loadedProducts);
        }
      } catch (err) {
        console.error('Data load error:', err);
      }
    }

    loadInitialData();

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

  const cleanPath = currentPath.replace(/^\/+|\/+$/g, '');
  const isAdminRoute =
    cleanPath === 'admin-hamza-sec' ||
    cleanPath.startsWith('admin-hamza-sec/');
  const isProfileRoute = cleanPath.length > 0 && !isAdminRoute && cleanPath !== 'home';

  // Fetch dynamic profile directly from Supabase on profile route
  useEffect(() => {
    if (!isProfileRoute) {
      setActiveProfile(null);
      setProfileLoading(false);
      setProfileFetchDone(false);
      return;
    }

    let isMounted = true;
    setProfileLoading(true);
    setProfileFetchDone(false);

    // First check if already in loaded clients
    const localMatch = clients.find(
      (c) => c.slug.toLowerCase() === cleanPath.toLowerCase()
    );
    if (localMatch) {
      setActiveProfile(localMatch);
    }

    // Always query Supabase directly for dynamic real-time profile data
    fetchClientBySlug(cleanPath)
      .then((profile) => {
        if (isMounted) {
          if (profile) {
            setActiveProfile(profile);
            // Also keep clients list in sync
            setClients((prev) => {
              const exists = prev.some((c) => c.slug === profile.slug);
              return exists ? prev.map((c) => (c.slug === profile.slug ? profile : c)) : [profile, ...prev];
            });
          } else if (!localMatch) {
            setActiveProfile(null);
          }
          setProfileFetchDone(true);
          setProfileLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching profile from Supabase:', err);
        if (isMounted) {
          setProfileFetchDone(true);
          setProfileLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [cleanPath, isProfileRoute]);

  // Admin Client Handlers (Persisted to Supabase)
  const handleCreateClient = async (
    data: Omit<ClientProfile, 'id' | 'created_at' | 'updated_at'>
  ) => {
    const created = await createClient(data);
    setClients((prev) => [created, ...prev.filter((c) => c.slug !== created.slug)]);
  };

  const handleUpdateClient = async (id: string, data: Partial<ClientProfile>) => {
    const updated = await updateClient(id, data);
    setClients((prev) => prev.map((c) => (c.id === id || c.slug === updated.slug ? updated : c)));
  };

  const handleDeleteClient = async (id: string) => {
    await deleteClient(id);
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleStatus = async (id: string) => {
    const updated = await toggleClientStatus(id);
    setClients((prev) => prev.map((c) => (c.id === id || c.slug === updated.slug ? updated : c)));
  };

  const handleSaveSettings = async (newSettings: SiteSettings) => {
    const saved = await updateSettings(newSettings);
    setSettings(saved);
  };

  // Product CRUD Handlers
  const handleCreateProduct = async (
    data: Omit<Product, 'id' | 'created_at' | 'updated_at'>
  ) => {
    const created = await createProduct(data);
    setProducts((prev) => [created, ...prev.filter((p) => p.id !== created.id)]);
  };

  const handleUpdateProduct = async (id: string, data: Partial<Product>) => {
    const updated = await updateProduct(id, data);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // 1. Admin Route (Strictly /admin-hamza-sec)
  if (isAdminRoute) {
    if (!isAdminLoggedIn) {
      return (
        <AdminLogin
          onLoginSuccess={() => {
            setIsAdminLoggedIn(true);
            navigate('/admin-hamza-sec');
          }}
        />
      );
    }

    return (
      <AdminLayout
        clients={clients}
        products={products}
        settings={settings}
        onLogout={() => {
          setAdminSession(false);
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
        onCreateProduct={handleCreateProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onSaveSettings={handleSaveSettings}
        onViewClientPublic={(slug) => navigate(`/${slug}`)}
      />
    );
  }

  // 2. Public Client Profile Route (e.g. /khalid-car-rental, /ahmed-car-rental)
  if (isProfileRoute) {
    // Show spinner if currently fetching from Supabase and no active profile yet
    if (profileLoading && !activeProfile) {
      return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-white">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="text-sm font-medium text-slate-300">Loading NFC Business Profile...</p>
          </div>
        </div>
      );
    }

    if (activeProfile) {
      // Inactive Profile View
      if (activeProfile.status === 'inactive') {
        return (
          <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white text-center">
            <div className="max-w-md bg-slate-800 p-8 rounded-3xl border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">{activeProfile.business_name}</h2>
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

      return <PublicCard client={activeProfile} previewMode={false} />;
    }

    // Profile Not Found Screen
    if (profileFetchDone && !activeProfile) {
      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 text-slate-900">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Radio className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Card Profile Not Found</h2>
            <p className="text-sm text-slate-500">
              We couldn't find a digital business profile registered under the slug <code className="text-blue-600 font-mono font-bold">/{cleanPath}</code> in the database.
            </p>
            <div className="pt-4">
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  // 3. Default: Public Landing Page
  const demoClient =
    clients.find((c) => c.slug === 'ahmed-car-rental') || clients[0] || INITIAL_CLIENTS[0];

  return (
    <LandingPage
      demoClient={demoClient}
      settings={settings}
      clients={clients}
      products={products}
      onNavigateToDemo={(slug) => navigate(`/${slug}`)}
    />
  );
}
