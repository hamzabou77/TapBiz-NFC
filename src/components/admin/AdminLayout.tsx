import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Radio,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Globe,
  ShoppingBag
} from 'lucide-react';
import { ClientProfile, SiteSettings, Product } from '../../types';
import { DashboardOverview } from './DashboardOverview';
import { ClientList } from './ClientList';
import { ClientForm } from './ClientForm';
import { NfcGuide } from './NfcGuide';
import { SettingsView } from './SettingsView';
import { ProductManagement } from './ProductManagement';
import { setAdminSession } from '../../lib/api';

type AdminTab = 'overview' | 'clients' | 'products' | 'add-client' | 'edit-client' | 'nfc-guide' | 'settings';

interface AdminLayoutProps {
  clients: ClientProfile[];
  products: Product[];
  settings: SiteSettings;
  onLogout: () => void;
  onRefreshClients: () => Promise<void>;
  onCreateClient: (data: Omit<ClientProfile, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onUpdateClient: (id: string, data: Partial<ClientProfile>) => Promise<void>;
  onDeleteClient: (id: string) => Promise<void>;
  onToggleStatus: (id: string) => Promise<void>;
  onCreateProduct: (data: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onUpdateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
  onSaveSettings: (settings: SiteSettings) => Promise<void>;
  onViewClientPublic: (slug: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  clients,
  products,
  settings,
  onLogout,
  onCreateClient,
  onUpdateClient,
  onDeleteClient,
  onToggleStatus,
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct,
  onSaveSettings,
  onViewClientPublic,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [editingClient, setEditingClient] = useState<ClientProfile | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleEditClick = (client: ClientProfile) => {
    setEditingClient(client);
    setActiveTab('edit-client');
  };

  const handleCreateSuccess = async (data: Omit<ClientProfile, 'id' | 'created_at' | 'updated_at'>) => {
    await onCreateClient(data);
    setActiveTab('clients');
  };

  const handleUpdateSuccess = async (data: Omit<ClientProfile, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingClient) {
      await onUpdateClient(editingClient.id, data);
      setEditingClient(null);
      setActiveTab('clients');
    }
  };

  const navItems = [
    { id: 'overview' as AdminTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'clients' as AdminTab, label: 'Clients', icon: Users, badge: clients.length },
    { id: 'products' as AdminTab, label: 'Boutique / Produits', icon: ShoppingBag, badge: products.length },
    { id: 'add-client' as AdminTab, label: 'Add Client', icon: UserPlus },
    { id: 'nfc-guide' as AdminTab, label: 'NFC Programming', icon: Radio },
    { id: 'settings' as AdminTab, label: 'Settings & Pricing', icon: Settings },
  ];

  return (
    <div id="admin-layout-root" className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900 font-sans antialiased">
      {/* Mobile Top Navbar */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
            NFC
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">Admin Console</div>
            <div className="text-[10px] text-blue-400">Digital Cards Platform</div>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <aside
        id="admin-sidebar"
        className={`${
          mobileMenuOpen ? 'fixed inset-0 z-50 bg-slate-900 block' : 'hidden md:flex'
        } md:w-64 flex-col justify-between bg-slate-900 text-white p-6 border-r border-slate-800 shrink-0 sticky top-0 h-screen`}
      >
        <div className="space-y-8">
          {/* Logo & Platform Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/30">
                <Radio className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-base tracking-tight text-white">{settings.site_name}</h1>
                <div className="text-xs text-blue-400 font-medium">Admin Control Panel</div>
              </div>
            </div>

            {/* Mobile close */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeTab === item.id ||
                (item.id === 'clients' && activeTab === 'edit-client');

              return (
                <button
                  key={item.id}
                  id={`admin-nav-${item.id}`}
                  onClick={() => {
                    if (item.id === 'add-client') {
                      setEditingClient(null);
                    }
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-semibold text-sm transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white text-blue-600' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-slate-800/80 space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Public Homepage</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          <button
            id="admin-logout-btn"
            onClick={() => {
              setAdminSession(false);
              onLogout();
            }}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl">
        {activeTab === 'overview' && (
          <DashboardOverview
            clients={clients}
            onAddNew={() => {
              setEditingClient(null);
              setActiveTab('add-client');
            }}
            onViewAll={() => setActiveTab('clients')}
            onEditClient={handleEditClick}
            onViewClient={onViewClientPublic}
          />
        )}

        {activeTab === 'clients' && (
          <ClientList
            clients={clients}
            onAddNew={() => {
              setEditingClient(null);
              setActiveTab('add-client');
            }}
            onEdit={handleEditClick}
            onDelete={onDeleteClient}
            onToggleStatus={onToggleStatus}
            onViewClient={onViewClientPublic}
          />
        )}

        {activeTab === 'products' && (
          <ProductManagement
            products={products}
            settings={settings}
            onCreateProduct={onCreateProduct}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
          />
        )}

        {activeTab === 'add-client' && (
          <ClientForm
            initialClient={null}
            isEditing={false}
            onSave={handleCreateSuccess}
            onCancel={() => setActiveTab('clients')}
          />
        )}

        {activeTab === 'edit-client' && (
          <ClientForm
            initialClient={editingClient}
            isEditing={true}
            onSave={handleUpdateSuccess}
            onCancel={() => {
              setEditingClient(null);
              setActiveTab('clients');
            }}
          />
        )}

        {activeTab === 'nfc-guide' && <NfcGuide />}

        {activeTab === 'settings' && (
          <SettingsView
            settings={settings}
            onSaveSettings={onSaveSettings}
          />
        )}
      </main>
    </div>
  );
};
