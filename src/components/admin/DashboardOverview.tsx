import React from 'react';
import {
  Users,
  Radio,
  Eye,
  Star,
  Plus,
  Copy,
  Check,
  ExternalLink,
  ArrowUpRight,
  ShieldCheck,
  QrCode,
  Smartphone,
  ChevronRight
} from 'lucide-react';
import { ClientProfile } from '../../types';

interface DashboardOverviewProps {
  clients: ClientProfile[];
  onAddNew: () => void;
  onViewAll: () => void;
  onEditClient: (client: ClientProfile) => void;
  onViewClient: (slug: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  clients,
  onAddNew,
  onViewAll,
  onEditClient,
  onViewClient,
}) => {
  const [copiedSlug, setCopiedSlug] = React.useState<string | null>(null);

  const activeClients = clients.filter((c) => c.status === 'active');
  const totalViews = clients.reduce((acc, c) => acc + (c.views_count || 0), 0);
  const reviewsEnabled = clients.filter((c) => Boolean(c.google_review_url)).length;

  const domainBase = typeof window !== 'undefined' ? window.location.origin : 'https://mydomain.com';

  const handleCopyUrl = (slug: string) => {
    const fullUrl = `${domainBase}/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div id="dashboard-overview-root" className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase text-blue-100 mb-3 border border-white/20">
            <Radio className="w-3.5 h-3.5 text-blue-200 animate-pulse" />
            <span>NFC Management Center</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Manage Client Profiles & NFC Digital Cards
          </h2>
          <p className="mt-2 text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Create custom slugs, program NFC cards with 1-tap, and deliver instant vCard contacts, Google Reviews, and WhatsApp routing for your business clients.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onAddNew}
              className="py-3 px-5 rounded-xl bg-white hover:bg-slate-50 text-blue-900 font-bold text-sm shadow-md transition-all active:scale-98 flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-blue-600" />
              <span>Create New Client</span>
            </button>
            <button
              onClick={onViewAll}
              className="py-3 px-5 rounded-xl bg-blue-800/60 hover:bg-blue-800/80 text-white font-semibold text-sm border border-white/20 transition-all"
            >
              <span>View All Profiles ({clients.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Clients */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Clients</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{clients.length}</div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">Ready for NFC programming</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Active Cards */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Profiles</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">{activeClients.length}</div>
            <div className="text-xs text-slate-500 mt-1">{clients.length - activeClients.length} paused</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Radio className="w-6 h-6" />
          </div>
        </div>

        {/* Total Taps/Views */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Card Taps</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{totalViews}</div>
            <div className="text-xs text-blue-600 font-semibold mt-1">Live customer scans</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        {/* Google Reviews */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Review Buttons</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">{reviewsEnabled}</div>
            <div className="text-xs text-slate-500 mt-1">Active Google Review links</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
        </div>
      </div>

      {/* 3-Step NFC Workflow Bar */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 text-white border border-slate-800 shadow-lg">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-blue-400" />
          <span>How NFC Digital Cards Work in Production:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
            <div className="text-xs font-bold text-blue-400 font-mono mb-1">STEP 1</div>
            <div className="font-bold text-white text-sm mb-1">Create Profile & Copy URL</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Create the client in this dashboard. Click "Copy URL" (e.g. <code className="text-blue-300">mydomain.com/ahmed-car-rental</code>).
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
            <div className="text-xs font-bold text-blue-400 font-mono mb-1">STEP 2</div>
            <div className="font-bold text-white text-sm mb-1">Write to NFC Tag (5 Seconds)</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Open the free "NFC Tools" app on any smartphone, choose "Write URL", paste the URL, and tap your NFC card.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
            <div className="text-xs font-bold text-blue-400 font-mono mb-1">STEP 3</div>
            <div className="font-bold text-white text-sm mb-1">Permanent Dynamic Updates</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              If client changes phone, address or reviews, update here. The physical NFC card never needs to be reprogrammed!
            </p>
          </div>
        </div>
      </div>

      {/* Recent Client Profiles Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Active Client Profiles</h3>
            <p className="text-xs text-slate-500 mt-0.5">Quick access to client URLs, QR codes, and edits</p>
          </div>
          <button
            onClick={onViewAll}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View all ({clients.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {clients.slice(0, 5).map((client) => {
            const isCopied = copiedSlug === client.slug;
            const fullUrl = `${domainBase}/${client.slug}`;

            return (
              <div
                key={client.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
              >
                {/* Left: Info */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                    {client.logo ? (
                      <img src={client.logo} alt={client.business_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-blue-600 text-white font-bold flex items-center justify-center">
                        {client.business_name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm truncate">{client.business_name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        client.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {client.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono truncate mt-0.5">
                      {domainBase}/{client.slug}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopyUrl(client.slug)}
                    className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs font-semibold transition-all shadow-xs"
                    title="Copy NFC URL"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied!' : 'Copy NFC URL'}</span>
                  </button>

                  <button
                    onClick={() => onViewClient(client.slug)}
                    className="flex items-center gap-1 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => onEditClient(client)}
                    className="py-1.5 px-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
