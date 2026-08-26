import React, { useState, useEffect } from 'react';
import {
  Save,
  ArrowLeft,
  Building2,
  Globe,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Star,
  Instagram,
  Facebook,
  Sparkles,
  Link,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Eye,
  Smartphone
} from 'lucide-react';
import { ClientProfile } from '../../types';
import { PublicCard } from '../public/PublicCard';

interface ClientFormProps {
  initialClient?: ClientProfile | null;
  onSave: (clientData: Omit<ClientProfile, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

const LOGO_PRESETS = [
  { label: 'Car Rental', url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=80' },
  { label: 'Hotel / Riad', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop&q=80' },
  { label: 'Transport / VIP', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
  { label: 'Luxury Cars', url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&auto=format&fit=crop&q=80' },
  { label: 'Restaurant / Cafe', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=80' },
  { label: 'Real Estate / Agency', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&auto=format&fit=crop&q=80' },
];

export const ClientForm: React.FC<ClientFormProps> = ({
  initialClient,
  onSave,
  onCancel,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<Omit<ClientProfile, 'id' | 'created_at' | 'updated_at'>>({
    business_name: '',
    slug: '',
    logo: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=80',
    cover_image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&auto=format&fit=crop&q=80',
    tagline: '',
    description: '',
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    instagram: '',
    facebook: '',
    google_maps_url: '',
    google_review_url: '',
    address: '',
    status: 'active',
  });

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [error, setError] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [previewTab, setPreviewTab] = useState<'form' | 'preview'>('form');

  useEffect(() => {
    if (initialClient) {
      setFormData({
        business_name: initialClient.business_name || '',
        slug: initialClient.slug || '',
        logo: initialClient.logo || LOGO_PRESETS[0].url,
        cover_image: initialClient.cover_image || '',
        tagline: initialClient.tagline || '',
        description: initialClient.description || '',
        phone: initialClient.phone || '',
        whatsapp: initialClient.whatsapp || '',
        email: initialClient.email || '',
        website: initialClient.website || '',
        instagram: initialClient.instagram || '',
        facebook: initialClient.facebook || '',
        google_maps_url: initialClient.google_maps_url || '',
        google_review_url: initialClient.google_review_url || '',
        address: initialClient.address || '',
        status: initialClient.status || 'active',
      });
      setSlugManuallyEdited(true);
    }
  }, [initialClient]);

  // Auto-generate slug when business name changes if user hasn't manually edited slug
  const handleNameChange = (name: string) => {
    const generatedSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    setFormData((prev) => ({
      ...prev,
      business_name: name,
      slug: slugManuallyEdited ? prev.slug : generatedSlug,
    }));
  };

  const handleSlugChange = (slugValue: string) => {
    setSlugManuallyEdited(true);
    const sanitized = slugValue
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-');
    setFormData((prev) => ({ ...prev, slug: sanitized }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.business_name.trim()) {
      setError('Please provide a Business Name.');
      return;
    }

    if (!formData.slug.trim()) {
      setError('Please provide a valid Slug.');
      return;
    }

    setSaving(true);
    try {
      await onSave(formData);
    } catch (err: any) {
      setError(err?.message || 'Failed to save client. Please check details.');
    } finally {
      setSaving(false);
    }
  };

  // Construct mock preview client
  const previewClient: ClientProfile = {
    id: initialClient?.id || 'preview-id',
    business_name: formData.business_name || 'Business Name Preview',
    slug: formData.slug || 'sample-business',
    logo: formData.logo || LOGO_PRESETS[0].url,
    cover_image: formData.cover_image,
    tagline: formData.tagline || 'Your Business Tagline Here',
    description:
      formData.description ||
      'This is how your short business description will appear to your customers when they tap your NFC card or scan your QR code.',
    phone: formData.phone || '+212620799395',
    whatsapp: formData.whatsapp || formData.phone || '+212620799395',
    email: formData.email || 'boalyhicham@gmail.com',
    website: formData.website || 'https://mybusiness.ma',
    instagram: formData.instagram || 'https://instagram.com',
    facebook: formData.facebook || 'https://facebook.com',
    google_maps_url: formData.google_maps_url || 'https://maps.google.com',
    google_review_url:
      formData.google_review_url ||
      'https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4',
    address: formData.address || 'Marrakech, Morocco',
    status: formData.status,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const domainBase = typeof window !== 'undefined' ? window.location.origin : 'https://mydomain.com';

  return (
    <div id="client-form-root" className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {isEditing ? `Edit: ${initialClient?.business_name}` : 'Create New Client NFC Profile'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {isEditing
                ? 'Update client details without needing to rewrite the physical NFC card'
                : 'Configure client information, buttons, and unique NFC card URL'}
            </p>
          </div>
        </div>

        {/* Mobile toggle between Form and Live Preview */}
        <div className="flex lg:hidden items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setPreviewTab('form')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              previewTab === 'form' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-600'
            }`}
          >
            Form Details
          </button>
          <button
            type="button"
            onClick={() => setPreviewTab('preview')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              previewTab === 'preview' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-600'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Live Preview
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Two Column Layout: Left Form, Right Live Smartphone Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: FORM */}
        <div className={`lg:col-span-7 space-y-6 ${previewTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm">
            {/* Section 1: Business Identity */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>1. Business Identity & NFC Slug</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Business Name *
                </label>
                <input
                  id="client-business-name-input"
                  type="text"
                  value={formData.business_name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Ahmed Car Rental"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm font-medium outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Unique Profile Slug / URL *</span>
                  <span className="text-[11px] font-normal text-slate-400">Written to NFC card</span>
                </label>
                <div className="flex rounded-xl shadow-xs border border-slate-300 overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                  <span className="inline-flex items-center px-3 text-slate-500 bg-slate-50 text-xs font-mono border-r border-slate-200">
                    {domainBase}/
                  </span>
                  <input
                    id="client-slug-input"
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="ahmed-car-rental"
                    className="flex-1 px-3 py-3 text-slate-900 text-sm font-mono font-medium outline-none bg-white"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  This forms the exact URL programmed onto the NFC card: <strong className="text-blue-600">{domainBase}/{formData.slug || 'slug'}</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tagline / Subtitle
                  </label>
                  <input
                    id="client-tagline-input"
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. Premium Car Rental in Marrakech"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select
                    id="client-status-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none bg-white"
                  >
                    <option value="active">Active (Card works)</option>
                    <option value="inactive">Inactive / Suspended</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Business Description
                </label>
                <textarea
                  id="client-description-input"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short overview of services, vehicle fleet, or specialties..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                />
              </div>
            </div>

            {/* Section 2: Logo & Cover */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                <span>2. Logo & Visual Branding</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Logo / Profile Image URL
                </label>
                <input
                  id="client-logo-input"
                  type="url"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                />
                
                {/* Quick Presets for Admin Ease */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">Quick Presets:</span>
                  {LOGO_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, logo: preset.url })}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 text-xs font-medium border border-slate-200 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Cover Banner URL (Optional)
                </label>
                <input
                  id="client-cover-input"
                  type="url"
                  value={formData.cover_image || ''}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                />
              </div>
            </div>

            {/* Section 3: Contact & Action Buttons */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>3. Direct Action Buttons</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-700" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    id="client-phone-input"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+212 620 799 395"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Number</span>
                  </label>
                  <input
                    id="client-whatsapp-input"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+212 620 799 395"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Email Address</span>
                  </label>
                  <input
                    id="client-email-input"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="boalyhicham@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-sky-600" />
                    <span>Website URL</span>
                  </label>
                  <input
                    id="client-website-input"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://clientbusiness.ma"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-600" />
                  <span>Physical Address</span>
                </label>
                <input
                  id="client-address-input"
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Avenue Mohammed VI, Guéliz, Marrakech, Morocco"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Google Maps Location URL</span>
                </label>
                <input
                  id="client-maps-url-input"
                  type="url"
                  value={formData.google_maps_url}
                  onChange={(e) => setFormData({ ...formData, google_maps_url: e.target.value })}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                />
              </div>

              {/* GOOGLE REVIEWS URL (MANDATED FEATURE) */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>Google Review URL *</span>
                </label>
                <input
                  id="client-review-url-input"
                  type="url"
                  value={formData.google_review_url}
                  onChange={(e) => setFormData({ ...formData, google_review_url: e.target.value })}
                  placeholder="https://search.google.com/local/writereview?placeid=..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900 text-sm outline-none transition-all"
                />
                <p className="text-[11px] text-amber-800/90 mt-1.5 leading-relaxed">
                  Opens client's direct Google Review box. Allows customers to leave honest feedback easily with one tap.
                </p>
              </div>

              {/* Social Media */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    <span>Instagram Profile URL</span>
                  </label>
                  <input
                    id="client-instagram-input"
                    type="url"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="https://instagram.com/business"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Facebook className="w-3.5 h-3.5 text-blue-600" />
                    <span>Facebook Page URL</span>
                  </label>
                  <input
                    id="client-facebook-input"
                    type="url"
                    value={formData.facebook}
                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                    placeholder="https://facebook.com/business"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex items-center gap-3 pt-6 border-t border-slate-200">
              <button
                id="save-client-submit-btn"
                type="submit"
                disabled={saving}
                className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving Profile...' : isEditing ? 'Update Client Profile' : 'Create & Generate NFC Profile'}</span>
              </button>

              <button
                id="cancel-client-btn"
                type="button"
                onClick={onCancel}
                className="py-3.5 px-6 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE SMARTPHONE LIVE PREVIEW */}
        <div className={`lg:col-span-5 sticky top-6 ${previewTab === 'form' ? 'hidden lg:block' : 'block'}`}>
          <div className="bg-slate-900 p-4 sm:p-6 rounded-3xl sm:rounded-[40px] shadow-2xl border border-slate-800 text-white">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Live Smartphone Preview</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
                Real-Time
              </span>
            </div>

            {/* Smartphone screen mockup */}
            <div className="max-w-[360px] mx-auto rounded-[32px] overflow-hidden border-4 border-slate-700 shadow-2xl bg-white text-slate-900 max-h-[640px] overflow-y-auto custom-scrollbar">
              <PublicCard client={previewClient} previewMode={true} />
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-slate-400">
                Shows exact visitor view when NFC card is tapped.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
