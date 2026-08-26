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
  Linkedin,
  Sparkles,
  Link,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Eye,
  Smartphone,
  Palette,
  User,
  Briefcase,
  QrCode
} from 'lucide-react';
import { ClientProfile } from '../../types';
import { PublicCard } from '../public/PublicCard';
import { THEME_PRESETS } from '../../lib/theme';

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
    full_name: '',
    job_title: '',
    slug: '',
    logo: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=80',
    cover_image: '',
    tagline: '',
    description: '',
    bio: '',
    city: '',
    themeColor: 'blue',
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    instagram: '',
    facebook: '',
    tiktok: '',
    tiktok_url: '',
    linkedin: '',
    linkedin_url: '',
    google_maps_url: '',
    google_review_url: '',
    address: '',
    status: 'active',
  });

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [error, setError] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [previewTab, setPreviewTab] = useState<'form' | 'preview'>('form');
  const [showCustomHex, setShowCustomHex] = useState(false);
  const [customHex, setCustomHex] = useState('#2563eb');

  useEffect(() => {
    if (initialClient) {
      setFormData({
        business_name: initialClient.business_name || '',
        full_name: initialClient.full_name || '',
        job_title: initialClient.job_title || '',
        slug: initialClient.slug || '',
        logo: initialClient.logo || LOGO_PRESETS[0].url,
        cover_image: initialClient.cover_image || '',
        tagline: initialClient.tagline || '',
        description: initialClient.description || '',
        bio: initialClient.bio || '',
        city: initialClient.city || '',
        themeColor: initialClient.themeColor || 'blue',
        phone: initialClient.phone || '',
        whatsapp: initialClient.whatsapp || '',
        email: initialClient.email || '',
        website: initialClient.website || '',
        instagram: initialClient.instagram || '',
        facebook: initialClient.facebook || '',
        tiktok: initialClient.tiktok || initialClient.tiktok_url || '',
        tiktok_url: initialClient.tiktok_url || initialClient.tiktok || '',
        linkedin: initialClient.linkedin || initialClient.linkedin_url || '',
        linkedin_url: initialClient.linkedin_url || initialClient.linkedin || '',
        google_maps_url: initialClient.google_maps_url || '',
        google_review_url: initialClient.google_review_url || '',
        address: initialClient.address || '',
        status: initialClient.status || 'active',
      });
      if (initialClient.themeColor && initialClient.themeColor.startsWith('#')) {
        setCustomHex(initialClient.themeColor);
        setShowCustomHex(true);
      }
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
      setError('Veuillez renseigner le nom de l\'entreprise ou du profil.');
      return;
    }

    if (!formData.slug.trim()) {
      setError('Veuillez renseigner un slug valide pour la carte NFC.');
      return;
    }

    setSaving(true);
    try {
      await onSave(formData);
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de l\'enregistrement. Veuillez vérifier les champs.');
    } finally {
      setSaving(false);
    }
  };

  // Construct mock preview client
  const previewClient: ClientProfile = {
    id: initialClient?.id || 'preview-id',
    business_name: formData.business_name || 'Touchbizz Digital',
    full_name: formData.full_name,
    job_title: formData.job_title,
    slug: formData.slug || 'sample-business',
    logo: formData.logo || LOGO_PRESETS[0].url,
    cover_image: formData.cover_image,
    tagline: formData.tagline || 'Carte de Visite NFC & Profil Connecté',
    description:
      formData.description ||
      'Aperçu en temps réel de votre profil digital NFC consultable dès qu\'un smartphone touche votre carte Touchbizz.',
    bio: formData.bio,
    city: formData.city || formData.address,
    themeColor: formData.themeColor,
    phone: formData.phone || '+212620799395',
    whatsapp: formData.whatsapp || formData.phone || '+212620799395',
    email: formData.email || 'contact@touchbizz.ma',
    website: formData.website || 'https://touchbizz.ma',
    instagram: formData.instagram || 'https://instagram.com',
    facebook: formData.facebook || 'https://facebook.com',
    tiktok: formData.tiktok_url || formData.tiktok || '',
    tiktok_url: formData.tiktok_url || formData.tiktok || '',
    linkedin: formData.linkedin_url || formData.linkedin || '',
    linkedin_url: formData.linkedin_url || formData.linkedin || '',
    google_maps_url: formData.google_maps_url || 'https://maps.google.com',
    google_review_url:
      formData.google_review_url ||
      'https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4',
    address: formData.address || 'Marrakech, Maroc',
    status: formData.status,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const domainBase = typeof window !== 'undefined' ? window.location.origin : 'https://touchbizz.ma';

  return (
    <div id="client-form-root" className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {isEditing ? `Modifier : ${initialClient?.business_name}` : 'Créer un Nouveau Profil NFC'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {isEditing
                ? 'Mettez à jour le profil instantanément sans réimprimer la carte physique'
                : 'Configurez les coordonnées, les réseaux sociaux et la couleur du thème NFC'}
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
            Formulaire
          </button>
          <button
            type="button"
            onClick={() => setPreviewTab('preview')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              previewTab === 'preview' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-600'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Aperçu Direct
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
            {/* Section 0: NFC Theme Color Picker ("Couleur du Thème NFC") */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-blue-600" />
                  <span>Couleur du Thème NFC</span>
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  {THEME_PRESETS.find(p => p.id === formData.themeColor)?.name || formData.themeColor}
                </span>
              </div>

              {/* Circular Color Swatches */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {THEME_PRESETS.map((item) => {
                  const isSelected = formData.themeColor === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, themeColor: item.id });
                        setShowCustomHex(false);
                      }}
                      className={`w-10 h-10 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer relative shadow-sm ${
                        item.id === 'blue'
                          ? 'bg-[#2563eb]'
                          : item.id === 'emerald'
                          ? 'bg-[#10b981]'
                          : item.id === 'purple'
                          ? 'bg-[#9333ea]'
                          : item.id === 'dark'
                          ? 'bg-[#1e293b]'
                          : item.id === 'amber'
                          ? 'bg-[#d97706]'
                          : 'bg-[#e11d48]'
                      } ${
                        isSelected
                          ? 'ring-4 ring-offset-2 ring-slate-900 scale-110 shadow-md'
                          : 'hover:scale-105 opacity-90 hover:opacity-100'
                      }`}
                      title={item.name}
                    >
                      {isSelected && <Check className="w-5 h-5 text-white drop-shadow-md" />}
                    </button>
                  );
                })}

                {/* Custom Hex Selector Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setShowCustomHex(true);
                    setFormData({ ...formData, themeColor: customHex });
                  }}
                  className={`px-3 py-2 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    showCustomHex || (formData.themeColor && formData.themeColor.startsWith('#'))
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                  title="Code Hexadécimal Personnalisé"
                >
                  <span>Hex</span>
                </button>
              </div>

              {/* Custom Hex Input Field */}
              {showCustomHex && (
                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="color"
                    value={customHex}
                    onChange={(e) => {
                      setCustomHex(e.target.value);
                      setFormData({ ...formData, themeColor: e.target.value });
                    }}
                    className="w-9 h-9 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                  />
                  <input
                    type="text"
                    value={customHex}
                    onChange={(e) => {
                      setCustomHex(e.target.value);
                      setFormData({ ...formData, themeColor: e.target.value });
                    }}
                    placeholder="#2563eb"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-800 uppercase"
                  />
                </div>
              )}
            </div>

            {/* Section 1: Business Identity & Slug */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>1. Identité & URL de la Carte NFC</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nom de l'Entreprise / Titre *
                  </label>
                  <input
                    id="client-business-name-input"
                    type="text"
                    value={formData.business_name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="ex. Touchbizz Digital"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm font-medium outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nom & Prénom du Titulaire
                  </label>
                  <input
                    id="client-full-name-input"
                    type="text"
                    value={formData.full_name || ''}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="ex. Hamza Boaly"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm font-medium outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Poste / Fonction
                  </label>
                  <input
                    id="client-job-title-input"
                    type="text"
                    value={formData.job_title || ''}
                    onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                    placeholder="ex. Directeur Général"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Ville / Pays
                  </label>
                  <input
                    id="client-city-input"
                    type="text"
                    value={formData.city || ''}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="ex. Marrakech, Maroc"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Slug Unique du Profil / URL NFC *</span>
                  <span className="text-[11px] font-normal text-slate-400">Programmé dans la puce</span>
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
                    placeholder="hamza"
                    className="flex-1 px-3 py-3 text-slate-900 text-sm font-mono font-medium outline-none bg-white"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  URL programmée dans la carte NFC : <strong className="text-blue-600">{domainBase}/{formData.slug || 'slug'}</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Slogan / Sous-titre
                  </label>
                  <input
                    id="client-tagline-input"
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="ex. Solutions de Networking NFC"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Statut du Profil
                  </label>
                  <select
                    id="client-status-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none bg-white"
                  >
                    <option value="active">Actif (Carte fonctionnelle)</option>
                    <option value="inactive">Inactif / Suspendu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Courte Présentation / Bio
                </label>
                <textarea
                  id="client-description-input"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Présentation concise de votre activité, spécialités ou services..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                />
              </div>
            </div>

            {/* Section 2: Logo & Visual Branding */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                <span>2. Photo & Bannière</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  URL de la Photo ou Logo
                </label>
                <input
                  id="client-logo-input"
                  type="url"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                />
                
                {/* Quick Presets */}
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">Exemples :</span>
                  {LOGO_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, logo: preset.url })}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 text-xs font-medium border border-slate-200 transition-colors cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Image de Couverture (Optionnel)
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

            {/* Section 3: Contact Direct */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>3. Contact Direct</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">Boutons d'action immédiate</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Phone / Appel */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Téléphone (Appel)</span>
                  </label>
                  <input
                    id="client-phone-input"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+212 620 799 395"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Lien tel: direct</p>
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Numéro WhatsApp</span>
                  </label>
                  <input
                    id="client-whatsapp-input"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+212 620 799 395"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Discussion instantanée</p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-500" />
                    <span>Email Professionnel</span>
                  </label>
                  <input
                    id="client-email-input"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@touchbizz.ma"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Lien mailto: direct</p>
                </div>
              </div>
            </div>

            {/* Section 4: Réseaux Sociaux & Web */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-600" />
                  <span>4. Réseaux Sociaux & Web</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">Affichage automatique dans la grille</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Instagram */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-[#E4405F]" />
                    <span>Lien Instagram</span>
                  </label>
                  <input
                    id="client-instagram-input"
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="https://instagram.com/touchbizz.ma ou @touchbizz.ma"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                    <span>Lien LinkedIn</span>
                  </label>
                  <input
                    id="client-linkedin-input"
                    type="text"
                    value={formData.linkedin_url || formData.linkedin || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        linkedin_url: e.target.value,
                        linkedin: e.target.value,
                      })
                    }
                    placeholder="https://linkedin.com/in/hamzaboaly ou in/hamzaboaly"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                </div>

                {/* TikTok */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 flex items-center justify-center text-slate-900 leading-none">
                      🎵
                    </span>
                    <span>Lien TikTok</span>
                  </label>
                  <input
                    id="client-tiktok-input"
                    type="text"
                    value={formData.tiktok_url || formData.tiktok || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tiktok_url: e.target.value,
                        tiktok: e.target.value,
                      })
                    }
                    placeholder="https://tiktok.com/@touchbizz ou @touchbizz"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-teal-600" />
                    <span>Site Web / Catalogue</span>
                  </label>
                  <input
                    id="client-website-input"
                    type="text"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://touchbizz.ma"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                </div>

                {/* Facebook (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
                    <span>Lien Facebook (Optionnel)</span>
                  </label>
                  <input
                    id="client-facebook-input"
                    type="text"
                    value={formData.facebook}
                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                    placeholder="https://facebook.com/touchbizz"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                </div>

                {/* Note for QR Code */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs">
                  <QrCode className="w-5 h-5 text-slate-800 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 block">QR Code Intégré</span>
                    <span>Le bouton QR Code est automatiquement disponible dans la grille NFC.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Avis Google & Localisation */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span>5. Avis Google 5 Étoiles & Localisation</span>
              </h3>

              {/* GOOGLE REVIEWS URL */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <label className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>Lien Avis Google 5 Étoiles</span>
                </label>
                <input
                  id="client-review-url-input"
                  type="url"
                  value={formData.google_review_url}
                  onChange={(e) => setFormData({ ...formData, google_review_url: e.target.value })}
                  placeholder="https://search.google.com/local/writereview?placeid=..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900 text-sm outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-600" />
                    <span>Adresse Postale</span>
                  </label>
                  <input
                    id="client-address-input"
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Avenue Mohammed VI, Guéliz, Marrakech, Maroc"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Lien Google Maps</span>
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
              </div>
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex items-center gap-3 pt-6 border-t border-slate-200">
              <button
                id="save-client-submit-btn"
                type="submit"
                disabled={saving}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Enregistrement en cours...' : isEditing ? 'Mettre à Jour le Profil NFC' : 'Créer & Générer le Profil NFC'}</span>
              </button>

              <button
                id="cancel-client-btn"
                type="button"
                onClick={onCancel}
                className="py-3.5 px-6 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
              >
                Annuler
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
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Aperçu Smartphone en Direct</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
                Temps Réel
              </span>
            </div>

            {/* Smartphone screen mockup */}
            <div className="max-w-[360px] mx-auto rounded-[32px] overflow-hidden border-4 border-slate-700 shadow-2xl bg-white text-slate-900 max-h-[640px] overflow-y-auto custom-scrollbar">
              <PublicCard client={previewClient} previewMode={true} />
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-slate-400">
                Rendu exact visualisé par vos clients lors du contact NFC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
