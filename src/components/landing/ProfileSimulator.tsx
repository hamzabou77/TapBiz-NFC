import React, { useState } from 'react';
import {
  Smartphone,
  Sparkles,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Globe,
  UserPlus,
  Star,
  CheckCircle2,
  Share2,
  QrCode,
  ShieldCheck,
  Zap,
  Building2,
  Briefcase,
  User,
  Instagram,
  Linkedin,
  ExternalLink,
  Check,
  Palette,
  Image as ImageIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { THEME_PRESETS, getThemeConfig } from '../../lib/theme';

interface ProfileSimulatorProps {
  lang?: 'fr' | 'en';
}

export const ProfileSimulator: React.FC<ProfileSimulatorProps> = ({ lang = 'fr' }) => {
  const [name, setName] = useState<string>('Hamza Boaly');
  const [role, setRole] = useState<string>(lang === 'fr' ? 'Directeur Général' : 'Founder & CEO');
  const [company, setCompany] = useState<string>('Touchbizz Digital');
  const [location, setLocation] = useState<string>('Marrakech, Maroc');
  const [bio, setBio] = useState<string>(
    lang === 'fr'
      ? 'Pionnier des cartes de visite connectées NFC & solutions de networking digital au Maroc.'
      : 'Pioneering smart NFC business cards & digital networking solutions across Morocco.'
  );
  const [avatarType, setAvatarType] = useState<'monogram' | 'photo'>('monogram');
  const [photoUrl, setPhotoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
  );

  // Theme color state
  const [themeColor, setThemeColor] = useState<string>('blue');
  const [customHex, setCustomHex] = useState<string>('#2563eb');
  const [showCustomHex, setShowCustomHex] = useState<boolean>(false);

  // Social & Contact links
  const [whatsapp, setWhatsapp] = useState<string>('+212 620-799395');
  const [phone, setPhone] = useState<string>('+212 620-799395');
  const [email, setEmail] = useState<string>('contact@touchbizz.ma');
  const [instagram, setInstagram] = useState<string>('@touchbizz.ma');
  const [linkedin, setLinkedin] = useState<string>('in/hamzaboaly');
  const [tiktok, setTiktok] = useState<string>('@touchbizz');
  const [website, setWebsite] = useState<string>('touchbizz.ma');

  // Interaction feedback states
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const activeTheme = getThemeConfig(themeColor === 'custom' ? customHex : themeColor);

  const getInitials = (str: string) => {
    if (!str.trim()) return 'TB';
    const parts = str.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleSimulateAction = (label: string) => {
    setCopiedNotification(label);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  return (
    <div id="simulator" className="py-16 sm:py-24 bg-slate-100/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-[#0066FF] text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>{lang === 'fr' ? 'Simulateur NFC en Temps Réel' : 'Real-Time NFC Profile Simulator'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {lang === 'fr' ? 'Personnalisez votre Profil NFC' : 'Customize Your NFC Profile'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'fr'
              ? 'Choisissez la couleur de votre thème, saisissez vos coordonnées et vos réseaux sociaux pour voir votre profil s\'animer en direct !'
              : 'Choose your theme color, enter your contact details and social media links to see your NFC profile come to life in real-time!'}
          </p>
        </div>

        {/* 2-Column Grid: Left Controls Form, Right Smartphone Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Form Controls */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#0066FF]" />
                <span>{lang === 'fr' ? 'Configuration du Profil' : 'Profile Configuration'}</span>
              </h3>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                {lang === 'fr' ? 'Aperçu Direct' : 'Live Preview'}
              </span>
            </div>

            {/* 1. NFC Theme Color Picker ("Couleur du Thème NFC") */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">
                  {lang === 'fr' ? 'Couleur du Thème NFC' : 'NFC Theme Color'}
                </label>
                <span className="text-[11px] font-semibold text-slate-500">
                  {themeColor === 'custom' ? customHex : (THEME_PRESETS.find(p => p.id === themeColor)?.name || 'Bleu')}
                </span>
              </div>

              {/* Circular Color Swatches */}
              <div className="flex flex-wrap items-center gap-3">
                {THEME_PRESETS.map((item) => {
                  const isSelected = themeColor === item.id || themeColor === item.hex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setThemeColor(item.id);
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
                      title={lang === 'fr' ? item.name : item.nameEn}
                    >
                      {isSelected && <Check className="w-5 h-5 text-white drop-shadow-md" />}
                    </button>
                  );
                })}

                {/* Custom Hex Selector Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setThemeColor('custom');
                    setShowCustomHex(true);
                  }}
                  className={`px-3 py-2 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    themeColor === 'custom'
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                  title="Code Couleur Personnalisé"
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
                      setThemeColor('custom');
                    }}
                    className="w-9 h-9 rounded-lg cursor-pointer border border-slate-300 p-0.5"
                  />
                  <input
                    type="text"
                    value={customHex}
                    onChange={(e) => {
                      setCustomHex(e.target.value);
                      setThemeColor('custom');
                    }}
                    placeholder="#2563eb"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-800 uppercase"
                  />
                </div>
              )}
            </div>

            {/* 2. Personal & Business Information */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                {lang === 'fr' ? 'Informations Principales' : 'Main Information'}
              </h4>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'fr' ? 'Nom et Prénom' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex. Hamza Boaly"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'fr' ? 'Titre / Profession' : 'Job Title / Role'}
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="ex. Directeur Général"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'fr' ? 'Entreprise' : 'Company Name'}
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="ex. Touchbizz Digital"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'fr' ? 'Ville & Pays' : 'City & Location'}
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="ex. Marrakech, Maroc"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'fr' ? 'Courte Présentation / Bio' : 'Short Bio / Presentation'}
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Présentez votre activité en quelques mots..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Avatar Type Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'fr' ? 'Photo de Profil ou Monogramme' : 'Profile Picture or Monogram'}
                </label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setAvatarType('monogram')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      avatarType === 'monogram'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{lang === 'fr' ? 'Monogramme Initials' : 'Initials Monogram'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvatarType('photo')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      avatarType === 'photo'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{lang === 'fr' ? 'Photo de profil' : 'Photo URL'}</span>
                  </button>
                </div>

                {avatarType === 'photo' && (
                  <input
                    type="url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                )}
              </div>
            </div>

            {/* 3. Social Media & Contact Links */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                {lang === 'fr' ? 'Réseaux Sociaux & Contact' : 'Social Media & Contact Links'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* WhatsApp */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </label>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+212 6..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900"
                  />
                </div>

                {/* Direct Phone */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>{lang === 'fr' ? 'Téléphone' : 'Phone'}</span>
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-600" />
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@exemple.ma"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900"
                  />
                </div>

                {/* Instagram */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    <span>Instagram</span>
                  </label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@touchbizz.ma"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900"
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                    <span>LinkedIn</span>
                  </label>
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="in/votre-nom"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900"
                  />
                </div>

                {/* TikTok */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <span className="text-xs">🎵</span>
                    <span>TikTok</span>
                  </label>
                  <input
                    type="text"
                    value={tiktok}
                    onChange={(e) => setTiktok(e.target.value)}
                    placeholder="@touchbizz"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900"
                  />
                </div>

                {/* Website */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{lang === 'fr' ? 'Site Web / Catalogue' : 'Website / Store'}</span>
                  </label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://touchbizz.ma"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Card Action Link */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                {lang === 'fr' ? 'Sans abonnement • Modifiable 24/7' : 'Zero subscription • 24/7 editable'}
              </span>
              <a
                href="#catalog"
                className="py-2.5 px-5 rounded-full bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer"
              >
                {lang === 'fr' ? 'Commander cette carte (150 MAD) >' : 'Order this card (150 MAD) >'}
              </a>
            </div>
          </div>

          {/* Right Column: Realistic Mobile Phone Mockup (Strictly Matching image_66f04a.png) */}
          <div className="lg:col-span-6 flex justify-center sticky top-24">
            <div className="relative w-full max-w-[320px] sm:max-w-[350px] bg-slate-950 rounded-[44px] p-3.5 shadow-2xl ring-1 ring-slate-800/80 shadow-slate-900/40">
              {/* Dynamic Island / Speaker Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-12" />
              </div>

              {/* Phone Screen Container */}
              <div className="relative bg-slate-50 rounded-[34px] overflow-hidden min-h-[620px] flex flex-col justify-between border border-slate-200/50 shadow-inner">
                {/* 1. Header Banner styled with Selected Theme Color Gradient */}
                <div
                  className={`h-32 bg-gradient-to-br ${activeTheme.gradient} relative flex items-end justify-end p-3 transition-all duration-300`}
                  style={activeTheme.customHex ? { backgroundColor: activeTheme.customHex } : undefined}
                >
                  {/* Small pill tag inside the header saying "⚡ NFC LIVE" */}
                  <div className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-black text-white flex items-center gap-1.5 border border-white/20 shadow-xs">
                    <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                    <span>NFC LIVE</span>
                  </div>
                </div>

                {/* 2. Main Profile Info */}
                <div className="px-5 pt-0 pb-5 flex-1 flex flex-col items-center text-center -mt-12 relative z-10 space-y-3.5">
                  {/* Overlapping Circular Monogram / Avatar with Slim Elegant White Border */}
                  <div className="w-22 h-22 rounded-full bg-white p-0.5 shadow-xl border-2 border-white ring-2 ring-white/80 flex items-center justify-center overflow-hidden">
                    {avatarType === 'photo' && photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-full"
                        onError={() => setAvatarType('monogram')}
                      />
                    ) : (
                      <div
                        className={`w-full h-full rounded-full ${activeTheme.bgClass} flex items-center justify-center text-white font-black text-2xl tracking-wider shadow-inner transition-colors duration-300`}
                        style={activeTheme.customHex ? { backgroundColor: activeTheme.customHex } : undefined}
                      >
                        {getInitials(name)}
                      </div>
                    )}
                  </div>

                  {/* Name, Job Title in Primary Accent Color, Company Name */}
                  <div className="space-y-0.5">
                    <h4 className="font-black text-slate-900 text-lg tracking-tight">
                      {name || 'Votre Nom'}
                    </h4>
                    <p
                      className={`text-xs font-bold ${activeTheme.textClass} tracking-wide`}
                      style={activeTheme.customHex ? { color: activeTheme.customHex } : undefined}
                    >
                      {role || 'Votre Poste'}
                    </p>
                    <p className="text-[11px] font-semibold text-slate-500">
                      {company || 'Votre Entreprise'}
                    </p>
                  </div>

                  {/* Location Badge with Map Icon (Clickable Google Maps link) */}
                  {location && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 font-medium bg-slate-100/90 hover:bg-slate-200/90 px-3 py-1 rounded-full border border-slate-200/60 max-w-xs transition-colors cursor-pointer group shadow-2xs"
                      title="Ouvrir dans Google Maps"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <MapPin className="w-3 h-3 text-rose-500 shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="truncate">{location}</span>
                    </a>
                  )}

                  {/* Bio */}
                  {bio && (
                    <p className="text-[11px] text-slate-600 leading-relaxed max-w-[260px] font-normal">
                      {bio}
                    </p>
                  )}

                  {/* 1-Click "Enregistrer le Contact" (vCard) CTA Button */}
                  <button
                    onClick={() => handleSimulateAction('vCard téléchargé avec succès !')}
                    className={`w-full py-2.5 px-4 rounded-xl ${activeTheme.bgClass} text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-95 active:scale-95 transition-all cursor-pointer`}
                    style={activeTheme.customHex ? { backgroundColor: activeTheme.customHex } : undefined}
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{lang === 'fr' ? 'Enregistrer le Contact' : 'Save Contact'}</span>
                  </button>

                  {/* Interaction Toast */}
                  {copiedNotification && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full shadow-xs flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>{copiedNotification}</span>
                    </motion.div>
                  )}

                  {/* Modern Clickable Social Media Icons Grid / List (WhatsApp, Phone, Email, Instagram, LinkedIn, TikTok, Website) */}
                  <div className="w-full space-y-2 pt-1">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 text-center">
                      {lang === 'fr' ? 'LIENS & RÉSEAUX SOCIAUX' : 'LINKS & SOCIAL PROFILES'}
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                      {/* Phone */}
                      {phone && (
                        <button
                          type="button"
                          onClick={() => handleSimulateAction(`Appel vers ${phone}`)}
                          className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:bg-slate-50 transition-all active:scale-95 cursor-pointer text-center group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform shadow-2xs">
                            <Phone className="w-3.5 h-3.5 text-[#0066FF]" />
                          </div>
                          <span className="text-[9px] font-bold text-slate-800 tracking-tight leading-tight">Appel</span>
                        </button>
                      )}

                      {/* WhatsApp */}
                      {whatsapp && (
                        <button
                          type="button"
                          onClick={() => handleSimulateAction(`Discussion WhatsApp ouverte`)}
                          className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:bg-slate-50 transition-all active:scale-95 cursor-pointer text-center group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform shadow-2xs">
                            <MessageCircle className="w-3.5 h-3.5 fill-[#25D366]/20 text-[#25D366]" />
                          </div>
                          <span className="text-[9px] font-bold text-slate-800 tracking-tight leading-tight">WhatsApp</span>
                        </button>
                      )}

                      {/* Email */}
                      {email && (
                        <button
                          type="button"
                          onClick={() => handleSimulateAction(`Email vers ${email}`)}
                          className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:bg-slate-50 transition-all active:scale-95 cursor-pointer text-center group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform shadow-2xs">
                            <Mail className="w-3.5 h-3.5 text-amber-500" />
                          </div>
                          <span className="text-[9px] font-bold text-slate-800 tracking-tight leading-tight">Email</span>
                        </button>
                      )}

                      {/* Instagram */}
                      {instagram && (
                        <button
                          type="button"
                          onClick={() => handleSimulateAction(`Instagram : ${instagram}`)}
                          className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:bg-slate-50 transition-all active:scale-95 cursor-pointer text-center group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#E4405F] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform shadow-2xs">
                            <Instagram className="w-3.5 h-3.5 text-[#E4405F]" />
                          </div>
                          <span className="text-[9px] font-bold text-slate-800 tracking-tight leading-tight">Instagram</span>
                        </button>
                      )}

                      {/* LinkedIn */}
                      {linkedin && (
                        <button
                          type="button"
                          onClick={() => handleSimulateAction(`LinkedIn : ${linkedin}`)}
                          className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:bg-slate-50 transition-all active:scale-95 cursor-pointer text-center group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0A66C2] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform shadow-2xs">
                            <Linkedin className="w-3.5 h-3.5 fill-current text-[#0A66C2]" />
                          </div>
                          <span className="text-[9px] font-bold text-slate-800 tracking-tight leading-tight">LinkedIn</span>
                        </button>
                      )}

                      {/* TikTok */}
                      {tiktok && (
                        <button
                          type="button"
                          onClick={() => handleSimulateAction(`TikTok : ${tiktok}`)}
                          className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:bg-slate-50 transition-all active:scale-95 cursor-pointer text-center group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-purple-50 text-slate-900 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform shadow-2xs">
                            <svg className="w-3.5 h-3.5 fill-current text-slate-900" viewBox="0 0 24 24">
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46 6.27 6.27 0 0 0 1.88-4.46V8.62a8.28 8.28 0 0 0 4.89 1.58V6.75a4.85 4.85 0 0 1-1-.06z" />
                            </svg>
                          </div>
                          <span className="text-[9px] font-bold text-slate-800 tracking-tight leading-tight">TikTok</span>
                        </button>
                      )}

                      {/* Website */}
                      {website && (
                        <button
                          type="button"
                          onClick={() => handleSimulateAction(`Site web : ${website}`)}
                          className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:bg-slate-50 transition-all active:scale-95 cursor-pointer text-center group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform shadow-2xs">
                            <Globe className="w-3.5 h-3.5 text-teal-600" />
                          </div>
                          <span className="text-[9px] font-bold text-slate-800 tracking-tight leading-tight">Site Web</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Phone Bottom Footer Bar */}
                <div className="p-3 bg-white border-t border-slate-200/70 text-center flex items-center justify-between px-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-800">Touchbizz NFC</span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-medium">touchbizz.ma</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
