import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Star,
  UserPlus,
  Mail,
  Globe,
  Instagram,
  Facebook,
  Linkedin,
  QrCode,
  Share2,
  Check,
  Sparkles,
  ShieldCheck,
  Radio,
  ExternalLink,
  ChevronRight,
  Navigation,
  Building2,
  Briefcase
} from 'lucide-react';
import { ClientProfile } from '../../types';
import { downloadVCard } from '../../lib/vcard';
import { incrementClientView } from '../../lib/api';
import { QrModal } from './QrModal';
import { getThemeConfig } from '../../lib/theme';

interface PublicCardProps {
  client: ClientProfile;
  previewMode?: boolean;
}

export const PublicCard: React.FC<PublicCardProps> = ({ client, previewMode = false }) => {
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedContactToast, setSavedContactToast] = useState(false);

  useEffect(() => {
    if (!previewMode && client.slug) {
      incrementClientView(client.slug);
    }
  }, [client.slug, previewMode]);

  // Clean and prepare action URLs
  const cleanPhone = client.phone ? client.phone.replace(/[^0-9+]/g, '') : '';
  const cleanWhatsApp = client.whatsapp
    ? client.whatsapp.replace(/[^0-9]/g, '')
    : cleanPhone.replace(/[^0-9]/g, '');

  const fullShareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/${client.slug}`
      : `https://touchbizz.ma/${client.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullShareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveContact = () => {
    downloadVCard(client);
    setSavedContactToast(true);
    setTimeout(() => setSavedContactToast(false), 3500);
  };

  const theme = getThemeConfig(client.themeColor);

  return (
    <div
      id="public-profile-root"
      className={
        previewMode
          ? 'w-full bg-white font-sans antialiased text-slate-900 selection:bg-cyan-500 selection:text-slate-950 relative'
          : 'min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-3 sm:py-10 px-2 sm:px-4 flex flex-col items-center justify-center font-sans antialiased text-slate-900 selection:bg-cyan-500 selection:text-slate-950'
      }
    >
      {/* Container simulating smartphone layout on desktop and clean full-width on mobile */}
      <div
        id="digital-card-container"
        className={
          previewMode
            ? 'w-full bg-white overflow-hidden relative transition-all'
            : 'w-full max-w-md bg-white rounded-3xl sm:rounded-[40px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-100 overflow-hidden relative transition-all'
        }
      >
        {/* Top Floating Action Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            id="share-card-btn"
            onClick={handleCopyLink}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white shadow-md hover:shadow-lg transition-all active:scale-90 border border-white/20 cursor-pointer"
            title="Copier le lien du profil"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            id="open-qr-modal-btn"
            onClick={() => setShowQrModal(true)}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white shadow-md hover:shadow-lg transition-all active:scale-90 border border-white/20 cursor-pointer"
            title="Afficher le QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Cover Banner with Dynamic Theme Gradient */}
        <div
          className={`${
            previewMode ? 'h-32' : 'h-40 sm:h-48'
          } w-full bg-gradient-to-br ${theme.gradient} relative overflow-hidden flex items-end justify-end p-3`}
          style={theme.customHex ? { backgroundColor: theme.customHex } : undefined}
        >
          {client.cover_image && (
            <img
              src={client.cover_image}
              alt={client.business_name}
              className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
            />
          )}

          {/* NFC Tap Indicator Badge */}
          <div className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-black text-white flex items-center gap-1.5 border border-white/20 shadow-xs relative z-10">
            <Radio className="w-3 h-3 text-yellow-300 animate-pulse" />
            <span>NFC LIVE</span>
          </div>
        </div>

        {/* Profile Card Main Body */}
        <div className={`relative ${previewMode ? 'px-4 pt-0 pb-4' : 'px-5 sm:px-6 pt-0 pb-6'} text-center`}>
          {/* 2. Floating Avatar with Elegant Circular Border */}
          <div className={`relative ${previewMode ? '-mt-12' : '-mt-14 sm:-mt-16'} inline-block mb-2.5`}>
            <div
              className={`${
                previewMode ? 'w-22 h-22 p-0.5' : 'w-28 h-28 sm:w-32 sm:h-32 p-1'
              } rounded-full border-2 border-white shadow-xl mx-auto overflow-hidden bg-white flex items-center justify-center ring-2 ring-white/80`}
            >
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.business_name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&auto=format&fit=crop&q=80';
                  }}
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${theme.gradient} ${
                    previewMode ? 'text-2xl' : 'text-3xl'
                  } rounded-full flex items-center justify-center text-white font-black shadow-inner`}
                  style={theme.customHex ? { backgroundColor: theme.customHex } : undefined}
                >
                  {client.full_name ? client.full_name.charAt(0) : client.business_name.charAt(0)}
                </div>
              )}
            </div>

            {/* Verified Profile Badge */}
            <div
              className={`absolute bottom-0 right-0 ${
                previewMode ? 'p-1' : 'p-1.5'
              } rounded-full ${theme.bgClass} text-white shadow-md border-2 border-white`}
              title="Profil Touchbizz Vérifié"
              style={theme.customHex ? { backgroundColor: theme.customHex } : undefined}
            >
              <ShieldCheck className={previewMode ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
            </div>
          </div>

          {/* Full Name & Job Title or Business Name */}
          <h1
            className={`${
              previewMode ? 'text-lg font-black' : 'text-2xl sm:text-3xl font-extrabold'
            } text-slate-900 tracking-tight leading-tight`}
          >
            {client.full_name || client.business_name}
          </h1>

          {(client.job_title || client.tagline) && (
            <p
              className={`mt-0.5 ${
                previewMode ? 'text-xs font-bold' : 'text-xs sm:text-sm font-bold'
              } ${theme.textClass} max-w-xs mx-auto`}
              style={theme.customHex ? { color: theme.customHex } : undefined}
            >
              {client.job_title || client.tagline}
            </p>
          )}

          {client.full_name && client.business_name && (
            <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
              {client.business_name}
            </p>
          )}

          {(client.description || client.bio) && (
            <p
              className={`mt-1.5 ${
                previewMode ? 'text-[11px] max-w-[260px]' : 'text-xs sm:text-sm max-w-sm'
              } text-slate-600 leading-relaxed mx-auto font-normal`}
            >
              {client.description || client.bio}
            </p>
          )}

          {(client.address || client.city) && (
            <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-slate-600 font-medium bg-slate-100/90 px-3 py-1 rounded-full border border-slate-200/60 max-w-xs mx-auto text-left shadow-2xs">
              <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
              <span className="truncate">{client.address || client.city}</span>
            </div>
          )}

          {/* 3. PRIMARY CTA BUTTON: SAVE CONTACT TO PHONE */}
          <div className={previewMode ? 'mt-3 mb-2' : 'mt-5 mb-3'}>
            <button
              id="save-contact-primary-btn"
              onClick={handleSaveContact}
              className={`group relative w-full ${
                previewMode ? 'py-2.5 px-4 rounded-xl text-xs font-bold shadow-md' : 'py-4 px-6 rounded-2xl text-base font-bold shadow-lg'
              } bg-gradient-to-r ${theme.gradient} text-white flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] border border-white/20 cursor-pointer overflow-hidden`}
              style={theme.customHex ? { backgroundColor: theme.customHex } : undefined}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
              <UserPlus className={`${previewMode ? 'w-4 h-4' : 'w-5 h-5'} text-white/90 group-hover:scale-110 transition-transform`} />
              <span className="tracking-tight">Enregistrer le Contact</span>
            </button>
          </div>

          {/* SAVE CONTACT SUCCESS NOTIFICATION TOAST */}
          {savedContactToast && (
            <div className="mb-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold flex items-center justify-center gap-1.5 animate-fadeIn">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Contact (.vcf) prêt à être enregistré !</span>
            </div>
          )}

          {/* 4. LIENS & RÉSEAUX SOCIAUX - 4-COLUMN GRID */}
          <div className={previewMode ? 'my-3 space-y-2' : 'my-5'}>
            <h3 className="text-center text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              LIENS & RÉSEAUX SOCIAUX
            </h3>

            <div className={`grid grid-cols-4 ${previewMode ? 'gap-1.5 sm:gap-2' : 'gap-2 sm:gap-2.5'}`}>
              {/* Phone / Appel */}
              {client.phone && (
                <a
                  id="grid-action-phone"
                  href={`tel:${cleanPhone}`}
                  className={`flex flex-col items-center justify-center ${
                    previewMode ? 'p-2 rounded-2xl' : 'p-2 sm:p-2.5 rounded-2xl'
                  } bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all duration-200 active:scale-95 group cursor-pointer text-center`}
                >
                  <div
                    className={`${
                      previewMode ? 'w-8 h-8 rounded-xl mb-1' : 'w-11 h-11 sm:w-12 sm:h-12 rounded-xl mb-1.5'
                    } bg-blue-50 text-[#0066FF] flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs`}
                  >
                    <Phone className={`${previewMode ? 'w-3.5 h-3.5' : 'w-5 h-5'} text-[#0066FF]`} />
                  </div>
                  <span
                    className={`${
                      previewMode ? 'text-[9px]' : 'text-[11px] sm:text-xs'
                    } font-bold text-slate-800 tracking-tight leading-tight`}
                  >
                    Appel
                  </span>
                </a>
              )}

              {/* WhatsApp */}
              {(client.whatsapp || client.phone) && (
                <a
                  id="grid-action-whatsapp"
                  href={`https://wa.me/${cleanWhatsApp || cleanPhone}?text=${encodeURIComponent(
                    `Bonjour ${client.full_name || client.business_name}, je vous contacte suite à votre profil digital Touchbizz.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center ${
                    previewMode ? 'p-2 rounded-2xl' : 'p-2 sm:p-2.5 rounded-2xl'
                  } bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all duration-200 active:scale-95 group cursor-pointer text-center`}
                >
                  <div
                    className={`${
                      previewMode ? 'w-8 h-8 rounded-xl mb-1' : 'w-11 h-11 sm:w-12 sm:h-12 rounded-xl mb-1.5'
                    } bg-emerald-50 text-[#25D366] flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs`}
                  >
                    <MessageCircle className={`${previewMode ? 'w-3.5 h-3.5' : 'w-5 h-5'} fill-[#25D366]/20 text-[#25D366]`} />
                  </div>
                  <span
                    className={`${
                      previewMode ? 'text-[9px]' : 'text-[11px] sm:text-xs'
                    } font-bold text-slate-800 tracking-tight leading-tight`}
                  >
                    WhatsApp
                  </span>
                </a>
              )}

              {/* Email */}
              {client.email && (
                <a
                  id="grid-action-email"
                  href={`mailto:${client.email}?subject=${encodeURIComponent(
                    `Contact - ${client.business_name}`
                  )}`}
                  className={`flex flex-col items-center justify-center ${
                    previewMode ? 'p-2 rounded-2xl' : 'p-2 sm:p-2.5 rounded-2xl'
                  } bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all duration-200 active:scale-95 group cursor-pointer text-center`}
                >
                  <div
                    className={`${
                      previewMode ? 'w-8 h-8 rounded-xl mb-1' : 'w-11 h-11 sm:w-12 sm:h-12 rounded-xl mb-1.5'
                    } bg-amber-50 text-amber-500 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs`}
                  >
                    <Mail className={`${previewMode ? 'w-3.5 h-3.5' : 'w-5 h-5'} text-amber-500`} />
                  </div>
                  <span
                    className={`${
                      previewMode ? 'text-[9px]' : 'text-[11px] sm:text-xs'
                    } font-bold text-slate-800 tracking-tight leading-tight`}
                  >
                    Email
                  </span>
                </a>
              )}

              {/* Instagram */}
              {client.instagram && (
                <a
                  id="grid-action-instagram"
                  href={
                    client.instagram.startsWith('http')
                      ? client.instagram
                      : `https://instagram.com/${client.instagram.replace(/^@/, '')}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center ${
                    previewMode ? 'p-2 rounded-2xl' : 'p-2 sm:p-2.5 rounded-2xl'
                  } bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all duration-200 active:scale-95 group cursor-pointer text-center`}
                >
                  <div
                    className={`${
                      previewMode ? 'w-8 h-8 rounded-xl mb-1' : 'w-11 h-11 sm:w-12 sm:h-12 rounded-xl mb-1.5'
                    } bg-pink-50 text-[#E4405F] flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs`}
                  >
                    <Instagram className={`${previewMode ? 'w-3.5 h-3.5' : 'w-5 h-5'} text-[#E4405F]`} />
                  </div>
                  <span
                    className={`${
                      previewMode ? 'text-[9px]' : 'text-[11px] sm:text-xs'
                    } font-bold text-slate-800 tracking-tight leading-tight`}
                  >
                    Instagram
                  </span>
                </a>
              )}

              {/* LinkedIn */}
              {(client.linkedin || client.linkedin_url) && (
                <a
                  id="grid-action-linkedin"
                  href={
                    (client.linkedin || client.linkedin_url)!.startsWith('http')
                      ? (client.linkedin || client.linkedin_url)!
                      : `https://www.linkedin.com/in/${(client.linkedin || client.linkedin_url)!.replace(/^in\//, '')}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center ${
                    previewMode ? 'p-2 rounded-2xl' : 'p-2 sm:p-2.5 rounded-2xl'
                  } bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all duration-200 active:scale-95 group cursor-pointer text-center`}
                >
                  <div
                    className={`${
                      previewMode ? 'w-8 h-8 rounded-xl mb-1' : 'w-11 h-11 sm:w-12 sm:h-12 rounded-xl mb-1.5'
                    } bg-sky-50 text-[#0A66C2] flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs`}
                  >
                    <Linkedin className={`${previewMode ? 'w-3.5 h-3.5' : 'w-5 h-5'} fill-current text-[#0A66C2]`} />
                  </div>
                  <span
                    className={`${
                      previewMode ? 'text-[9px]' : 'text-[11px] sm:text-xs'
                    } font-bold text-slate-800 tracking-tight leading-tight`}
                  >
                    LinkedIn
                  </span>
                </a>
              )}

              {/* TikTok */}
              {(client.tiktok || client.tiktok_url) && (
                <a
                  id="grid-action-tiktok"
                  href={
                    (client.tiktok || client.tiktok_url)!.startsWith('http')
                      ? (client.tiktok || client.tiktok_url)!
                      : `https://www.tiktok.com/@${(client.tiktok || client.tiktok_url)!.replace(/^@/, '')}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center ${
                    previewMode ? 'p-2 rounded-2xl' : 'p-2 sm:p-2.5 rounded-2xl'
                  } bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all duration-200 active:scale-95 group cursor-pointer text-center`}
                >
                  <div
                    className={`${
                      previewMode ? 'w-8 h-8 rounded-xl mb-1' : 'w-11 h-11 sm:w-12 sm:h-12 rounded-xl mb-1.5'
                    } bg-purple-50 text-slate-900 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs`}
                  >
                    <svg className={`${previewMode ? 'w-3.5 h-3.5' : 'w-5 h-5'} fill-current text-slate-900`} viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46 6.27 6.27 0 0 0 1.88-4.46V8.62a8.28 8.28 0 0 0 4.89 1.58V6.75a4.85 4.85 0 0 1-1-.06z" />
                    </svg>
                  </div>
                  <span
                    className={`${
                      previewMode ? 'text-[9px]' : 'text-[11px] sm:text-xs'
                    } font-bold text-slate-800 tracking-tight leading-tight`}
                  >
                    TikTok
                  </span>
                </a>
              )}

              {/* Website / Site Web */}
              {client.website && (
                <a
                  id="grid-action-website"
                  href={
                    client.website.startsWith('http')
                      ? client.website
                      : `https://${client.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center ${
                    previewMode ? 'p-2 rounded-2xl' : 'p-2 sm:p-2.5 rounded-2xl'
                  } bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all duration-200 active:scale-95 group cursor-pointer text-center`}
                >
                  <div
                    className={`${
                      previewMode ? 'w-8 h-8 rounded-xl mb-1' : 'w-11 h-11 sm:w-12 sm:h-12 rounded-xl mb-1.5'
                    } bg-teal-50 text-teal-600 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs`}
                  >
                    <Globe className={`${previewMode ? 'w-3.5 h-3.5' : 'w-5 h-5'} text-teal-600`} />
                  </div>
                  <span
                    className={`${
                      previewMode ? 'text-[9px]' : 'text-[11px] sm:text-xs'
                    } font-bold text-slate-800 tracking-tight leading-tight`}
                  >
                    Site Web
                  </span>
                </a>
              )}

              {/* Facebook (if provided) */}
              {client.facebook && (
                <a
                  id="grid-action-facebook"
                  href={
                    client.facebook.startsWith('http')
                      ? client.facebook
                      : `https://facebook.com/${client.facebook}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center ${
                    previewMode ? 'p-2 rounded-2xl' : 'p-2 sm:p-2.5 rounded-2xl'
                  } bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all duration-200 active:scale-95 group cursor-pointer text-center`}
                >
                  <div
                    className={`${
                      previewMode ? 'w-8 h-8 rounded-xl mb-1' : 'w-11 h-11 sm:w-12 sm:h-12 rounded-xl mb-1.5'
                    } bg-blue-50 text-[#1877F2] flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-2xs`}
                  >
                    <Facebook className={`${previewMode ? 'w-3.5 h-3.5' : 'w-5 h-5'} fill-current text-[#1877F2]`} />
                  </div>
                  <span
                    className={`${
                      previewMode ? 'text-[9px]' : 'text-[11px] sm:text-xs'
                    } font-bold text-slate-800 tracking-tight leading-tight`}
                  >
                    Facebook
                  </span>
                </a>
              )}
            </div>
          </div>
          {/* 5. GOOGLE REVIEW CARD */}
          {client.google_review_url && (
            <div className={previewMode ? 'mb-2.5' : 'mb-4'}>
              <a
                id="google-review-btn"
                href={client.google_review_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative overflow-hidden w-full ${
                  previewMode
                    ? 'p-2.5 rounded-xl text-xs'
                    : 'py-3.5 px-4.5 rounded-2xl text-sm'
                } bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 hover:from-amber-500/15 hover:to-amber-500/15 border border-amber-300/70 hover:border-amber-400 text-slate-900 font-bold shadow-[0_4px_15px_-3px_rgba(245,158,11,0.15)] flex items-center justify-between transition-all duration-200 group active:scale-[0.98] cursor-pointer`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`${
                      previewMode ? 'w-8 h-8 rounded-lg' : 'w-10 h-10 rounded-xl'
                    } bg-amber-400/20 border border-amber-300/40 flex items-center justify-center shrink-0 text-amber-500 shadow-inner group-hover:scale-105 transition-transform`}
                  >
                    <Star className={`${previewMode ? 'w-4 h-4' : 'w-5 h-5'} fill-amber-400 text-amber-500`} />
                  </div>
                  <div className="text-left">
                    <div className={`text-slate-900 font-extrabold ${previewMode ? 'text-xs' : 'text-sm'} leading-tight flex items-center gap-1`}>
                      <span>Avis Google</span>
                      <span className="px-1.5 py-0.2 rounded-md bg-amber-200/60 text-amber-900 text-[10px] font-extrabold">
                        5.0 ★
                      </span>
                    </div>
                    <div className="flex items-center text-amber-500 gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-slate-500 text-[10px] ml-1 font-normal">Déposer un avis</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className={`${previewMode ? 'w-4 h-4' : 'w-5 h-5'} text-amber-600 group-hover:translate-x-1 transition-transform`} />
              </a>
            </div>
          )}

          {/* 8. FOOTER / POWERED BY TOUCHBIZZ */}
          {previewMode ? (
            <div className="mt-3 -mx-4 -mb-4 p-3 bg-white border-t border-slate-200/70 flex items-center justify-between px-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-700">Touchbizz NFC</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">touchbizz.ma</span>
            </div>
          ) : (
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col items-center justify-center text-center">
              <a
                id="powered-by-nfc-link"
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span>Plateforme Touchbizz NFC Maroc</span>
              </a>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Approchez une carte NFC ou scannez le QR code pour vous connecter
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QR Modal Component */}
      <QrModal client={client} isOpen={showQrModal} onClose={() => setShowQrModal(false)} />
    </div>
  );
};
