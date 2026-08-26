import React, { useState } from 'react';
import {
  Search,
  Plus,
  Copy,
  Check,
  QrCode,
  ExternalLink,
  Edit2,
  Trash2,
  Radio,
  Star,
  Download,
  Filter,
  Eye,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { ClientProfile } from '../../types';
import { QrModal } from '../public/QrModal';
import { generateQrDataUrl, downloadDataUrl } from '../../lib/qrcode';
import { getThemeConfig } from '../../lib/theme';

interface ClientListProps {
  clients: ClientProfile[];
  onAddNew: () => void;
  onEdit: (client: ClientProfile) => void;
  onDelete: (id: string) => Promise<void>;
  onToggleStatus: (id: string) => Promise<void>;
  onViewClient: (slug: string) => void;
}

export const ClientList: React.FC<ClientListProps> = ({
  clients,
  onAddNew,
  onEdit,
  onDelete,
  onToggleStatus,
  onViewClient,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedQrClient, setSelectedQrClient] = useState<ClientProfile | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [copiedReviewId, setCopiedReviewId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const domainBase = typeof window !== 'undefined' ? window.location.origin : 'https://mydomain.com';

  const handleCopyUrl = (slug: string) => {
    const fullUrl = `${domainBase}/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleCopyReviewUrl = (client: ClientProfile) => {
    if (!client.google_review_url) return;
    navigator.clipboard.writeText(client.google_review_url);
    setCopiedReviewId(client.id);
    setTimeout(() => setCopiedReviewId(null), 2000);
  };

  const handleDownloadQr = async (client: ClientProfile) => {
    const fullUrl = `${domainBase}/${client.slug}`;
    const qrData = await generateQrDataUrl(fullUrl, 500);
    if (qrData) {
      downloadDataUrl(qrData, `${client.slug}-nfc-qr.png`);
    }
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div id="client-list-root" className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Client Digital Business Profiles</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Create, manage, copy NFC URLs, and export QR codes for all client business cards
          </p>
        </div>

        <button
          id="add-new-client-btn"
          onClick={onAddNew}
          className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all active:scale-98 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="client-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by business name, slug, phone, or location..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-sm outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === 'all' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({clients.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === 'active' ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active ({clients.filter((c) => c.status === 'active').length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('inactive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              statusFilter === 'inactive' ? 'bg-white text-slate-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Inactive ({clients.filter((c) => c.status === 'inactive').length})
          </button>
        </div>
      </div>

      {/* Client List Grid / Cards */}
      {filteredClients.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Radio className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No clients match your filter</h3>
          <p className="text-sm text-slate-500 mt-1 mb-5">
            {searchTerm ? `No results found for "${searchTerm}"` : 'Get started by creating your first client card.'}
          </p>
          <button
            onClick={onAddNew}
            className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Client Profile</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => {
            const isCopied = copiedSlug === client.slug;
            const fullUrl = `${domainBase}/${client.slug}`;
            const theme = getThemeConfig(client.themeColor);

            return (
              <div
                key={client.id}
                id={`client-card-${client.slug}`}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Top Card Info */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
                        {client.logo ? (
                          <img
                            src={client.logo}
                            alt={client.business_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className={`w-full h-full ${theme.bgClass} text-white font-bold flex items-center justify-center`}
                            style={theme.customHex ? { backgroundColor: theme.customHex } : undefined}
                          >
                            {client.business_name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                          {client.business_name}
                        </h3>
                        <div className="text-xs text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                          <span>/{client.slug}</span>
                          <span
                            className="w-2 h-2 rounded-full inline-block ml-1"
                            style={{ backgroundColor: theme.hex }}
                            title={`Thème: ${theme.name}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Status Pill Toggle */}
                    <button
                      type="button"
                      onClick={() => onToggleStatus(client.id)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                        client.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                      }`}
                      title="Click to toggle active status"
                    >
                      {client.status === 'active' ? '● Active' : '○ Inactive'}
                    </button>
                  </div>

                  {client.tagline && (
                    <p className="text-xs text-slate-600 font-medium mb-2.5 line-clamp-1">
                      {client.tagline}
                    </p>
                  )}

                  {/* Primary NFC Link Copy Box */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 mb-3">
                    <div className="truncate text-xs font-mono text-slate-700 select-all">
                      {fullUrl}
                    </div>
                    <button
                      id={`copy-url-btn-${client.slug}`}
                      onClick={() => handleCopyUrl(client.slug)}
                      className="shrink-0 p-1.5 rounded-lg bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200 shadow-xs transition-colors"
                      title="Copy URL to program into NFC Card"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Meta quick stats */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>{client.views_count || 0} taps / views</span>
                    </div>

                    {client.google_review_url && (
                      <button
                        onClick={() => handleCopyReviewUrl(client)}
                        className="inline-flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-800 font-semibold bg-amber-50 hover:bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-200 transition-colors"
                        title="Copy Google Review direct link"
                      >
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        <span>{copiedReviewId === client.id ? 'Copied Review URL!' : 'Review URL'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-1">
                  {/* Left: View Public Profile */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onViewClient(client.slug)}
                      className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-white transition-all text-xs font-semibold flex items-center gap-1 border border-transparent hover:border-slate-200"
                      title="Open public digital business card profile"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => setSelectedQrClient(client)}
                      className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-white transition-all text-xs font-semibold flex items-center gap-1 border border-transparent hover:border-slate-200"
                      title="Show QR Code"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>QR</span>
                    </button>

                    <button
                      onClick={() => handleDownloadQr(client)}
                      className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-white transition-all text-xs font-semibold flex items-center gap-1 border border-transparent hover:border-slate-200"
                      title="Download high-resolution QR PNG"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Right: Edit / Delete */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEdit(client)}
                      className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-white transition-all border border-transparent hover:border-slate-200"
                      title="Edit client profile"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {deleteConfirmId === client.id ? (
                      <div className="flex items-center gap-1 animate-fadeIn">
                        <button
                          onClick={async () => {
                            await onDelete(client.id);
                            setDeleteConfirmId(null);
                          }}
                          className="px-2 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors shadow-xs"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2 py-1 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-300"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(client.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-white transition-all border border-transparent hover:border-slate-200"
                        title="Delete client"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* QR Modal when clicked */}
      {selectedQrClient && (
        <QrModal
          client={selectedQrClient}
          isOpen={true}
          onClose={() => setSelectedQrClient(null)}
        />
      )}
    </div>
  );
};
