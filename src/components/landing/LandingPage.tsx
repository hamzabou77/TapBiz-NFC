import React, { useState, useEffect } from 'react';
import {
  Radio,
  Sparkles,
  Smartphone,
  ExternalLink,
  MessageCircle,
  Mail,
  ArrowRight,
  Zap,
  UserPlus,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ClientProfile, SiteSettings } from '../../types';
import { PublicCard } from '../public/PublicCard';
import { FEATURED_SHOWCASE_PROFILES } from '../../data/initialData';
import { fetchClientBySlug } from '../../lib/api';

interface LandingPageProps {
  demoClient: ClientProfile;
  settings: SiteSettings;
  clients?: ClientProfile[];
  onNavigateToDemo: (slug: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  demoClient,
  settings,
  clients = [],
  onNavigateToDemo,
}) => {
  const [fetchedHamzaProfile, setFetchedHamzaProfile] = useState<ClientProfile | null>(null);

  // Directly fetch live Hamza profile from database / API / Supabase on mount
  useEffect(() => {
    let isMounted = true;
    fetchClientBySlug('hamza')
      .then((profile) => {
        if (isMounted && profile) {
          setFetchedHamzaProfile(profile);
        }
      })
      .catch((err) => {
        console.warn('Error fetching live Hamza profile for preview:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // 4 Fixed featured showcase profiles linked dynamically to database/localStorage
  const sampleProfiles: ClientProfile[] = FEATURED_SHOWCASE_PROFILES.map((baseProfile) => {
    // 1. Dynamic sync for Hamza showcase profile
    if (baseProfile.slug === 'hamza' || baseProfile.id === 'client-hamza') {
      const liveHamza =
        clients.find(
          (c) =>
            c.slug.toLowerCase() === 'hamza' ||
            c.slug.toLowerCase() === 'hamza-touchbizz' ||
            c.id === 'client-hamza' ||
            c.business_name.toLowerCase().includes('hamza')
        ) || fetchedHamzaProfile;

      if (liveHamza) {
        return {
          ...baseProfile,
          ...liveHamza,
          business_name: liveHamza.business_name || baseProfile.business_name,
          logo: liveHamza.logo || baseProfile.logo,
          cover_image: liveHamza.cover_image || baseProfile.cover_image,
          tagline: liveHamza.tagline !== undefined ? liveHamza.tagline : baseProfile.tagline,
          description: liveHamza.description || baseProfile.description,
          phone: liveHamza.phone || baseProfile.phone,
          whatsapp: liveHamza.whatsapp || baseProfile.whatsapp,
          email: liveHamza.email || baseProfile.email,
          website: liveHamza.website || baseProfile.website,
          instagram: liveHamza.instagram || baseProfile.instagram,
          facebook: liveHamza.facebook || baseProfile.facebook,
          tiktok: liveHamza.tiktok || baseProfile.tiktok,
          linkedin: liveHamza.linkedin || baseProfile.linkedin,
          google_maps_url: liveHamza.google_maps_url || baseProfile.google_maps_url,
          google_review_url: liveHamza.google_review_url || baseProfile.google_review_url,
          address: liveHamza.address || baseProfile.address,
        };
      }
    }

    // 2. Dynamic sync for other featured profiles if updated in database
    const dynamicMatch = clients.find(
      (c) => c.slug.toLowerCase() === baseProfile.slug.toLowerCase() || c.id === baseProfile.id
    );
    if (dynamicMatch) {
      return {
        ...baseProfile,
        ...dynamicMatch,
      };
    }

    return baseProfile;
  });

  const [selectedSlug, setSelectedSlug] = useState<string>(sampleProfiles[0]?.slug || 'hamza');

  const currentSample =
    sampleProfiles.find((c) => c.slug === selectedSlug) || sampleProfiles[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cleanWhatsapp = (settings.contact_whatsapp || '+212620799395').replace(/[^0-9]/g, '');

  return (
    <div
      id="landing-page-root"
      className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950 flex flex-col relative overflow-hidden"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-blue-600/15 via-cyan-500/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-700/10 rounded-full blur-[180px]" />
      </div>

      {/* 1. Sleek, Minimal Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-2xl border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Title on Left */}
          <div className="flex items-center gap-3.5 group cursor-default">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950/90 rounded-[15px] flex items-center justify-center backdrop-blur-sm group-hover:bg-slate-900 transition-colors">
                <Radio className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white block leading-tight">
                Touchbizz
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-cyan-400/90">
                Digital Profile Platform
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 relative z-10">
        {/* 2. Hero Section */}
        <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-7">
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800/80 text-cyan-300 text-xs font-medium backdrop-blur-md shadow-inner shadow-cyan-500/5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Next-Generation Contact Sharing &amp; NFC Profiles</span>
            </div>

            {/* Bold Dynamic Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
              Touchbizz —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                Digital Profile Platform
              </span>
            </h1>

            {/* Comprehensive, Standout Hero Description */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed sm:leading-loose max-w-2xl lg:max-w-3xl mx-auto text-center font-normal tracking-wide">
              Instantly share your phone contacts, WhatsApp, social media profiles, and Google Maps location with a{' '}
              <strong className="text-cyan-400 font-semibold">single NFC tap</strong> or{' '}
              <strong className="text-blue-400 font-semibold">QR scan</strong>. Upgrade your professional networking with sleek, always-up-to-date digital business profiles —{' '}
              <strong className="text-cyan-400 font-semibold">no app required</strong>.
            </p>

            {/* Single Sample Profile Action Button */}
            <div className="pt-3 flex items-center justify-center">
              <button
                id="hero-view-sample-btn"
                onClick={() => scrollToSection('showcase')}
                className="group relative inline-flex items-center justify-center gap-2.5 py-3.5 px-7 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-semibold text-sm border border-slate-700/80 shadow-xl shadow-cyan-950/30 hover:shadow-cyan-500/10 hover:border-cyan-500/40 transition-all duration-200 active:scale-98 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
                <span>View Sample Profile</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </section>

        {/* 3. Interactive Profile Showcase Section */}
        <section
          id="showcase"
          className="py-16 sm:py-24 border-t border-slate-800/60 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950 relative"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3.5 mb-10">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-widest">
                <Smartphone className="w-4 h-4" />
                <span>Interactive Live Showcase</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Experience the Digital Profile
              </h2>
              <p className="text-sm text-slate-400 max-w-lg mx-auto">
                Explore an authentic live preview of how clients view your digital profile on their smartphone.
              </p>

              {/* 4 Fixed Featured Profile Tabs */}
              <div className="pt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto">
                {sampleProfiles.map((sample) => {
                  const isSelected = selectedSlug === sample.slug;
                  return (
                    <button
                      key={sample.slug}
                      id={`preview-tab-${sample.slug}`}
                      onClick={() => setSelectedSlug(sample.slug)}
                      className={`group relative py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/40 scale-[1.02]'
                          : 'bg-slate-900/85 text-slate-300 hover:text-white border border-slate-800/90 hover:border-slate-700 hover:bg-slate-850'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          isSelected ? 'bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]' : 'bg-slate-600 group-hover:bg-slate-500'
                        }`}
                      />
                      <span>{sample.business_name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Phone Mockup with Atmospheric Outer Glow & Drop Shadows */}
            <div className="flex flex-col items-center justify-center relative">
              {/* Outer Ambient Radial Device Glow */}
              <div className="absolute w-[440px] h-[680px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/15 to-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

              {/* Smartphone Graphic / Chassis */}
              <div className="relative w-full max-w-[370px] sm:max-w-[390px] rounded-[52px] bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 p-3 sm:p-3.5 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9),0_0_60px_-15px_rgba(6,182,212,0.25)] border-2 border-slate-700/70 ring-1 ring-white/15">
                {/* Physical side buttons accents */}
                <div className="absolute -left-[4px] top-24 w-[3px] h-7 bg-slate-700 rounded-l shadow-sm" />
                <div className="absolute -left-[4px] top-35 w-[3px] h-11 bg-slate-700 rounded-l shadow-sm" />
                <div className="absolute -right-[4px] top-28 w-[3px] h-14 bg-slate-700 rounded-r shadow-sm" />

                {/* Top Dynamic Island / Speaker Pill */}
                <div className="absolute top-4.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3 shadow-md border border-slate-800/80">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-850 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-600/80" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800" />
                </div>

                {/* Inner Screen Viewport with Smooth Scrolling and Zero Ugly Scrollbars */}
                <div className="relative rounded-[42px] overflow-hidden bg-white h-[620px] sm:h-[680px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border border-slate-800/40 shadow-inner">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSample.slug}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="w-full"
                    >
                      <PublicCard client={currentSample} previewMode={true} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Ambient Platform Shadow Underneath */}
              <div className="w-[280px] sm:w-[320px] h-5 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-xl mt-3 rounded-full pointer-events-none" />

              {/* Direct Fullscreen Link Button */}
              <div className="mt-6 flex items-center gap-3 z-10">
                <button
                  id="open-fullscreen-preview-btn"
                  onClick={() => onNavigateToDemo(currentSample.slug)}
                  className="inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700/80 hover:border-cyan-500/40 shadow-lg shadow-black/40 transition-all duration-200 active:scale-98 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Open Fullscreen ({currentSample.slug})</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. How It Works - Glassmorphism Feature Cards */}
        <section id="features" className="py-20 sm:py-28 border-t border-slate-800/60 bg-slate-950 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3.5 mb-14">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-widest">
                <Zap className="w-4 h-4" />
                <span>Simple &amp; Frictionless</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                How Touchbizz Works
              </h2>
              <p className="text-sm text-slate-400">
                A seamless, app-free connection experience built for speed and modern networking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="group relative p-7 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/70 transition-all duration-300 shadow-lg hover:shadow-cyan-500/5 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold group-hover:scale-105 group-hover:bg-cyan-500/20 transition-all duration-200">
                  <Radio className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  1. Tap or Scan
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Hold your NFC card near any smartphone or scan your dedicated QR code to launch your digital profile instantly in the browser.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group relative p-7 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-900/70 transition-all duration-300 shadow-lg hover:shadow-blue-500/5 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold group-hover:scale-105 group-hover:bg-blue-500/20 transition-all duration-200">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  2. Direct Instant Actions
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Clients connect with one touch — phone calls, WhatsApp messages, Google Maps directions, and 5-star Google review links.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group relative p-7 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-900/70 transition-all duration-300 shadow-lg hover:shadow-indigo-500/5 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold group-hover:scale-105 group-hover:bg-indigo-500/20 transition-all duration-200">
                  <UserPlus className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  3. One-Tap Save (.vcf)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Visitors can download your complete digital contact card directly into their phone contacts list with all emails, socials, and notes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Minimal Sleek Footer */}
      <footer className="border-t border-slate-800/70 bg-slate-950 py-10 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          {/* Brand Logo & Copyright */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-sm">
              <Radio className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <span className="font-bold text-white tracking-tight">Touchbizz</span>
              <span className="text-slate-500 ml-2">
                © {new Date().getFullYear()} Touchbizz. All rights reserved.
              </span>
            </div>
          </div>

          {/* Direct WhatsApp & Email Contact */}
          <div className="flex items-center gap-6">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello Touchbizz!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {settings.contact_whatsapp || '+212620799395'}</span>
            </a>
            <a
              href={`mailto:${settings.contact_email || 'boalyhicham@gmail.com'}`}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{settings.contact_email || 'boalyhicham@gmail.com'}</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
