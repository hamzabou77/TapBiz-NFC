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
  QrCode,
  Share2,
  Check,
  Sparkles,
  ShieldCheck,
  Radio,
  ExternalLink,
  ChevronRight
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

  const fullShareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${client.slug}`
    : `https://mydomain.com/${client.slug}`;

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
      className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200/80 py-4 sm:py-10 px-3 sm:px-4 flex flex-col items-center justify-center font-sans antialiased text-slate-900 selection:bg-blue-600 selection:text-white"
    >
      {/* Container simulating smartphone layout on desktop and clean full-width on mobile */}
      <div
        id="digital-card-container"
        className="w-full max-w-md bg-white rounded-3xl sm:rounded-[36px] shadow-xl sm:shadow-2xl border border-slate-200/80 overflow-hidden relative transition-all"
      >
        {/* Top Floating Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            id="share-card-btn"
            onClick={handleCopyLink}
            className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-blue-600 shadow-md hover:shadow-lg transition-all active:scale-95 border border-slate-100"
            title="Copy Profile URL"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            id="open-qr-modal-btn"
            onClick={() => setShowQrModal(true)}
            className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-blue-600 shadow-md hover:shadow-lg transition-all active:scale-95 border border-slate-100"
            title="Show QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>

        {/* Cover Banner */}
        <div className="h-36 sm:h-44 w-full bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 relative overflow-hidden">
          {client.cover_image ? (
            <img
              src={client.cover_image}
              alt={client.business_name}
              className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/30 via-transparent to-black/30" />
          )}

          {/* NFC Tap Indicator Pill */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-medium tracking-wide border border-white/20">
            <Radio className="w-3 h-3 text-blue-300 animate-pulse" />
            <span>NFC Card Active</span>
          </div>
        </div>

        {/* Profile Card Header */}
        <div className="relative px-6 pt-0 pb-6 text-center">
          {/* Client Logo / Avatar */}
          <div className="relative -mt-16 sm:-mt-20 inline-block mb-3">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-white shadow-xl ring-4 ring-white/60 mx-auto overflow-hidden bg-slate-50 flex items-center justify-center">
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.business_name}
                  className="w-full h-full object-cover rounded-2xl"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&auto=format&fit=crop&q=80';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white font-bold text-3xl">
                  {client.business_name.charAt(0)}
                </div>
              )}
            </div>
            {/* Verified Badge */}
            <div
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-blue-600 text-white shadow-md border-2 border-white"
              title="Verified Business Profile"
            >
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          {/* Business Title & Tagline */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {client.business_name}
          </h1>

          {client.tagline && (
            <p className="mt-1 text-sm font-semibold text-blue-700 max-w-xs mx-auto">
              {client.tagline}
            </p>
          )}

          {client.description && (
            <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              {client.description}
            </p>
          )}

          {client.address && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 text-slate-600 text-xs font-medium max-w-xs mx-auto text-left">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">{client.address}</span>
            </div>
          )}

          {/* PRIMARY TOUCH CALL-TO-ACTION: SAVE CONTACT */}
          <div className="mt-6 mb-4">
            <button
              id="save-contact-primary-btn"
              onClick={handleSaveContact}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2.5 transition-all transform active:scale-[0.98] border border-blue-400/30"
            >
              <UserPlus className="w-5 h-5 text-blue-100" />
              <span>Save Contact to Phone</span>
            </button>
          </div>

          {/* SAVE CONTACT SUCCESS NOTIFICATION TOAST */}
          {savedContactToast && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Contact file (.vcf) downloaded! Tap to add to your contacts.</span>
            </div>
          )}

          {/* GOOGLE REVIEWS DIRECT BUTTON (HONEST 5-STAR CALLOUT) */}
          {client.google_review_url && (
            <div className="mb-5">
              <a
                id="google-review-btn"
                href={client.google_review_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border-2 border-amber-200/90 text-amber-950 font-bold text-sm shadow-xs flex items-center justify-between transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-slate-900 font-bold">Leave us a Google Review</span>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          )}

          {/* MAIN COMMUNICATION ACTION BUTTONS (LARGE TOUCH TARGETS) */}
          <div className="space-y-2.5 text-left">
            {/* WhatsApp Direct Chat */}
            {client.whatsapp && (
              <a
                id="whatsapp-action-btn"
                href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(`Hello ${client.business_name}, I saw your digital business card and would like to get in touch.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base shadow-md shadow-emerald-600/20 transition-all active:scale-[0.98] group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-white font-bold leading-tight">Chat on WhatsApp</div>
                    <div className="text-emerald-100 text-xs">{client.whatsapp}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-emerald-200 group-hover:translate-x-1 transition-transform" />
              </a>
            )}

            {/* Direct Phone Call */}
            {client.phone && (
              <a
                id="phone-action-btn"
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base shadow-md shadow-slate-900/20 transition-all active:scale-[0.98] group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-blue-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-bold leading-tight">Call Now</div>
                    <div className="text-slate-300 text-xs">{client.phone}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </a>
            )}

            {/* Google Maps Location Navigation */}
            {client.google_maps_url && (
              <a
                id="maps-action-btn"
                href={client.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-sm sm:text-base shadow-xs transition-all active:scale-[0.98] group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-slate-900 font-bold leading-tight">Find Location (Google Maps)</div>
                    <div className="text-slate-500 text-xs truncate max-w-[200px] sm:max-w-[240px]">
                      {client.address || 'Get directions & navigation'}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </a>
            )}

            {/* Direct Email */}
            {client.email && (
              <a
                id="email-action-btn"
                href={`mailto:${client.email}?subject=${encodeURIComponent(`Inquiry from Digital Business Card - ${client.business_name}`)}`}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-sm sm:text-base shadow-xs transition-all active:scale-[0.98] group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-slate-900 font-bold leading-tight">Send an Email</div>
                    <div className="text-slate-500 text-xs truncate max-w-[200px] sm:max-w-[240px]">{client.email}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </a>
            )}

            {/* Official Website */}
            {client.website && (
              <a
                id="website-action-btn"
                href={client.website.startsWith('http') ? client.website : `https://${client.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-semibold text-sm sm:text-base shadow-xs transition-all active:scale-[0.98] group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0 text-sky-600">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-slate-900 font-bold leading-tight">Visit Website</div>
                    <div className="text-slate-500 text-xs truncate max-w-[200px] sm:max-w-[240px]">{client.website.replace(/^https?:\/\//, '')}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
              </a>
            )}
          </div>

          {/* SOCIAL MEDIA SECTION */}
          {(client.instagram || client.facebook) && (
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Follow Us
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {client.instagram && (
                  <a
                    id="instagram-action-btn"
                    href={client.instagram.startsWith('http') ? client.instagram : `https://${client.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 hover:from-pink-500/20 hover:via-purple-500/20 hover:to-amber-500/20 text-pink-700 font-semibold text-xs border border-pink-200/60 transition-all active:scale-95"
                  >
                    <Instagram className="w-4 h-4 text-pink-600 shrink-0" />
                    <span>Instagram</span>
                  </a>
                )}
                {client.facebook && (
                  <a
                    id="facebook-action-btn"
                    href={client.facebook.startsWith('http') ? client.facebook : `https://${client.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-blue-50 hover:bg-blue-100/80 text-blue-700 font-semibold text-xs border border-blue-200/80 transition-all active:scale-95"
                  >
                    <Facebook className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Facebook</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* FOOTER / POWERED BY SMART NFC */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col items-center justify-center text-center">
            <a
              id="powered-by-nfc-link"
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-medium transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Smart NFC Digital Card Platform</span>
            </a>
            <div className="text-[10px] text-slate-400 mt-1">
              Tap card or scan QR to connect instantly
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal Component */}
      <QrModal
        client={client}
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
      />
    </div>
  );
};
