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
} from 'lucide-react';
import { ClientProfile } from '../../types';
import { downloadVCard } from '../../lib/vcard';
import { incrementClientView } from '../../lib/api';
import { QrModal } from './QrModal';

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

  return (
    <div
      id="public-profile-root"
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-3 sm:py-10 px-2 sm:px-4 flex flex-col items-center justify-center font-sans antialiased text-slate-900 selection:bg-cyan-500 selection:text-slate-950"
    >
      {/* Container simulating smartphone layout on desktop and clean full-width on mobile */}
      <div
        id="digital-card-container"
        className="w-full max-w-md bg-white rounded-3xl sm:rounded-[40px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-100 overflow-hidden relative transition-all"
      >
        {/* Top Floating Action Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            id="share-card-btn"
            onClick={handleCopyLink}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white shadow-md hover:shadow-lg transition-all active:scale-90 border border-white/20 cursor-pointer"
            title="Copy Profile URL"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            id="open-qr-modal-btn"
            onClick={() => setShowQrModal(true)}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white shadow-md hover:shadow-lg transition-all active:scale-90 border border-white/20 cursor-pointer"
            title="Show QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Cover Banner with Dark Gradient Overlay */}
        <div className="h-40 sm:h-48 w-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
          {client.cover_image && (
            <img
              src={client.cover_image}
              alt={client.business_name}
              className="w-full h-full object-cover"
            />
          )}

          {/* Dark gradient overlay so top controls & badges stand out crisply */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/75 backdrop-blur-[0.5px]" />

          {/* NFC Tap Indicator Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide border border-white/20 shadow-md">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>NFC Active</span>
          </div>
        </div>

        {/* Profile Card Main Body */}
        <div className="relative px-5 sm:px-6 pt-0 pb-6 text-center">
          {/* 2. Floating Avatar with Sleek Border Ring & Drop-Shadow */}
          <div className="relative -mt-16 sm:-mt-20 inline-block mb-3">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-white shadow-[0_16px_35px_-8px_rgba(0,0,0,0.25)] ring-4 ring-white/95 mx-auto overflow-hidden bg-slate-50 flex items-center justify-center">
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.business_name}
                  className="w-full h-full object-cover rounded-[20px]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&auto=format&fit=crop&q=80';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 rounded-[20px] flex items-center justify-center text-white font-black text-3xl shadow-inner">
                  {client.business_name.charAt(0)}
                </div>
              )}
            </div>

            {/* Verified Profile Badge */}
            <div
              className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg border-2 border-white ring-1 ring-blue-500/20"
              title="Verified Touchbizz Profile"
            >
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          {/* Business Title & Tagline with Refined Typography */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {client.business_name}
          </h1>

          {client.tagline && (
            <p className="mt-1 text-xs sm:text-sm font-semibold text-blue-600 max-w-xs mx-auto">
              {client.tagline}
            </p>
          )}

          {client.description && (
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto font-normal">
              {client.description}
            </p>
          )}

          {client.address && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100/90 text-slate-700 text-xs font-medium max-w-xs mx-auto text-left shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">{client.address}</span>
            </div>
          )}

          {/* 3. PRIMARY CTA BUTTON: SAVE CONTACT TO PHONE */}
          <div className="mt-5 mb-3">
            <button
              id="save-contact-primary-btn"
              onClick={handleSaveContact}
              className="group relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:via-indigo-700 hover:to-cyan-700 text-white font-bold text-base shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] border border-white/20 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
              <UserPlus className="w-5 h-5 text-cyan-200 group-hover:scale-110 transition-transform" />
              <span className="tracking-tight">Save Contact to Phone</span>
            </button>
          </div>

          {/* SAVE CONTACT SUCCESS NOTIFICATION TOAST */}
          {savedContactToast && (
            <div className="mb-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Contact card (.vcf) saved! Ready to add to contacts.</span>
            </div>
          )}

          {/* 4. WHATSAPP DIRECT ACTION (Clean, Bold, and Modern) */}
          {client.whatsapp && (
            <div className="mb-4">
              <a
                id="whatsapp-action-btn"
                href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                  `Hello ${client.business_name}, I am contacting you through your Touchbizz digital business profile.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base shadow-[0_8px_20px_-4px_rgba(37,211,102,0.35)] transition-all duration-200 active:scale-[0.98] group cursor-pointer border border-emerald-400/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/25 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-extrabold leading-tight">Chat on WhatsApp</div>
                    <div className="text-emerald-100 text-xs font-medium">{client.whatsapp}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-emerald-100 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          )}

          {/* 5. SLEEK 4-BUTTON QUICK ACTION GRID */}
          <div className="grid grid-cols-4 gap-2 sm:gap-2.5 mb-4">
            {/* Call Action */}
            {client.phone ? (
              <a
                id="quick-call-btn"
                href={`tel:${cleanPhone}`}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200/90 hover:border-blue-300 text-slate-800 hover:text-blue-700 transition-all duration-200 active:scale-95 group shadow-2xs cursor-pointer"
                title="Call Phone"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center mb-1.5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-2xs">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold tracking-tight">Call</span>
              </a>
            ) : (
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50/50 border border-slate-100 text-slate-400 opacity-50 cursor-not-allowed">
                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center mb-1.5">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium">Call</span>
              </div>
            )}

            {/* Email Action */}
            {client.email ? (
              <a
                id="quick-email-btn"
                href={`mailto:${client.email}?subject=${encodeURIComponent(
                  `Inquiry from Touchbizz Profile - ${client.business_name}`
                )}`}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200/90 hover:border-indigo-300 text-slate-800 hover:text-indigo-700 transition-all duration-200 active:scale-95 group shadow-2xs cursor-pointer"
                title="Send Email"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-100/70 text-indigo-600 flex items-center justify-center mb-1.5 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-2xs">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold tracking-tight">Email</span>
              </a>
            ) : (
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50/50 border border-slate-100 text-slate-400 opacity-50 cursor-not-allowed">
                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center mb-1.5">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium">Email</span>
              </div>
            )}

            {/* Location Navigation */}
            {client.google_maps_url ? (
              <a
                id="quick-maps-btn"
                href={client.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/90 hover:border-emerald-300 text-slate-800 hover:text-emerald-700 transition-all duration-200 active:scale-95 group shadow-2xs cursor-pointer"
                title="View on Google Maps"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center mb-1.5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-2xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold tracking-tight">Location</span>
              </a>
            ) : (
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50/50 border border-slate-100 text-slate-400 opacity-50 cursor-not-allowed">
                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center mb-1.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium">Location</span>
              </div>
            )}

            {/* Official Website */}
            {client.website ? (
              <a
                id="quick-website-btn"
                href={client.website.startsWith('http') ? client.website : `https://${client.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-cyan-50 border border-slate-200/90 hover:border-cyan-300 text-slate-800 hover:text-cyan-700 transition-all duration-200 active:scale-95 group shadow-2xs cursor-pointer"
                title="Visit Website"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-100/70 text-cyan-600 flex items-center justify-center mb-1.5 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all shadow-2xs">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold tracking-tight">Website</span>
              </a>
            ) : (
              <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50/50 border border-slate-100 text-slate-400 opacity-50 cursor-not-allowed">
                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center mb-1.5">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium">Website</span>
              </div>
            )}
          </div>

          {/* 6. GOOGLE REVIEW CARD (Luxury Glassmorphism & Glowing Stars) */}
          {client.google_review_url && (
            <div className="mb-4">
              <a
                id="google-review-btn"
                href={client.google_review_url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden w-full py-3.5 px-4.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 hover:from-amber-500/15 hover:to-amber-500/15 border border-amber-300/70 hover:border-amber-400 text-slate-900 font-bold text-sm shadow-[0_4px_15px_-3px_rgba(245,158,11,0.15)] flex items-center justify-between transition-all duration-200 group active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center shrink-0 text-amber-500 shadow-inner group-hover:scale-105 transition-transform">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                  </div>
                  <div className="text-left">
                    <div className="text-slate-900 font-extrabold text-sm leading-tight flex items-center gap-1.5">
                      <span>Rate on Google</span>
                      <span className="px-1.5 py-0.5 rounded-md bg-amber-200/60 text-amber-900 text-[10px] font-extrabold">
                        5.0 ★
                      </span>
                    </div>
                    <div className="flex items-center text-amber-500 gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-slate-500 text-xs ml-1 font-normal">Leave a review</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          )}

          {/* 7. SOCIAL MEDIA BAR */}
          {(client.instagram ||
            client.facebook ||
            client.tiktok ||
            client.tiktok_url ||
            client.linkedin ||
            client.linkedin_url) && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                Social Profiles
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Instagram */}
                {client.instagram && (
                  <a
                    id="instagram-action-btn"
                    href={
                      client.instagram.startsWith('http')
                        ? client.instagram
                        : `https://${client.instagram}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 p-[2px] shadow-md hover:shadow-pink-500/25 hover:scale-110 active:scale-95 transition-all duration-200 group cursor-pointer"
                    title="Instagram Profile"
                  >
                    <div className="w-full h-full bg-white group-hover:bg-transparent rounded-[14px] flex items-center justify-center transition-colors">
                      <Instagram className="w-5 h-5 text-pink-600 group-hover:text-white transition-colors" />
                    </div>
                  </a>
                )}

                {/* Facebook */}
                {client.facebook && (
                  <a
                    id="facebook-action-btn"
                    href={
                      client.facebook.startsWith('http')
                        ? client.facebook
                        : `https://${client.facebook}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-md hover:shadow-blue-500/25 hover:scale-110 active:scale-95 transition-all duration-200 group cursor-pointer"
                    title="Facebook Page"
                  >
                    <Facebook className="w-5 h-5 fill-current" />
                  </a>
                )}

                {/* TikTok */}
                {(client.tiktok || client.tiktok_url) && (
                  <a
                    id="tiktok-action-btn"
                    href={
                      (client.tiktok || client.tiktok_url)!.startsWith('http')
                        ? (client.tiktok || client.tiktok_url)!
                        : `https://www.tiktok.com/@${(client.tiktok || client.tiktok_url)!.replace(/^@/, '')}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-md hover:shadow-slate-900/40 hover:scale-110 active:scale-95 transition-all duration-200 group cursor-pointer border border-white/10"
                    title="TikTok Profile"
                  >
                    <svg
                      className="w-5 h-5 fill-current text-white group-hover:text-cyan-300 transition-colors"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46 6.27 6.27 0 0 0 1.88-4.46V8.62a8.28 8.28 0 0 0 4.89 1.58V6.75a4.85 4.85 0 0 1-1-.06z" />
                    </svg>
                  </a>
                )}

                {/* LinkedIn */}
                {(client.linkedin || client.linkedin_url) && (
                  <a
                    id="linkedin-action-btn"
                    href={
                      (client.linkedin || client.linkedin_url)!.startsWith('http')
                        ? (client.linkedin || client.linkedin_url)!
                        : `https://www.linkedin.com/in/${(client.linkedin || client.linkedin_url)!}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0A66C2] text-white flex items-center justify-center shadow-md hover:shadow-blue-600/30 hover:scale-110 active:scale-95 transition-all duration-200 group cursor-pointer"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5 fill-current" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* 8. FOOTER / POWERED BY TOUCHBIZZ */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col items-center justify-center text-center">
            <a
              id="powered-by-nfc-link"
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Touchbizz Digital Profile Platform</span>
            </a>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Tap NFC card or scan QR code to connect instantly
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal Component */}
      <QrModal client={client} isOpen={showQrModal} onClose={() => setShowQrModal(false)} />
    </div>
  );
};

