import React, { useState } from 'react';
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
import { ClientProfile, SiteSettings } from '../../types';
import { PublicCard } from '../public/PublicCard';
import { INITIAL_CLIENTS } from '../../data/initialData';

interface LandingPageProps {
  demoClient: ClientProfile;
  settings: SiteSettings;
  onNavigateToDemo: (slug: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  demoClient,
  settings,
  onNavigateToDemo,
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string>(demoClient?.slug || 'ahmed-car-rental');

  // Available sample profiles for live demonstration
  const sampleProfiles: ClientProfile[] = [
    demoClient,
    ...INITIAL_CLIENTS.filter((c) => c.slug !== demoClient?.slug),
  ].filter(Boolean);

  const currentSample =
    sampleProfiles.find((c) => c.slug === selectedSlug) || sampleProfiles[0] || demoClient;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cleanWhatsapp = (settings.contact_whatsapp || '+212660000111').replace(/[^0-9]/g, '');

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
            <p className="text-lg sm:text-xl text-slate-300/95 leading-relaxed max-w-3xl mx-auto font-normal">
              Instantly share your phone contacts, WhatsApp, social media profiles, and Google Maps location with a single NFC tap or QR scan. Upgrade your professional networking with sleek, always-up-to-date digital business profiles — no app required.
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
            <div className="text-center max-w-2xl mx-auto space-y-3.5 mb-12">
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

              {/* Sample Profile Selector Chips */}
              {sampleProfiles.length > 1 && (
                <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5">
                  {sampleProfiles.map((sample) => {
                    const isSelected = selectedSlug === sample.slug;
                    return (
                      <button
                        key={sample.slug}
                        onClick={() => setSelectedSlug(sample.slug)}
                        className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/30'
                            : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {sample.business_name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Phone Mockup with Atmospheric Outer Glow & Drop Shadows */}
            <div className="flex flex-col items-center justify-center relative">
              {/* Outer Ambient Radial Device Glow */}
              <div className="absolute w-[440px] h-[680px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/15 to-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

              {/* Phone Device Shell */}
              <div className="relative w-full max-w-[390px] rounded-[48px] bg-slate-900/90 p-3.5 shadow-[0_0_80px_-20px_rgba(6,182,212,0.25)] border-2 border-slate-700/60 backdrop-blur-2xl ring-1 ring-white/10">
                {/* Speaker Notch / Dynamic Island */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-slate-950 rounded-full z-30 flex items-center justify-center shadow-inner border border-slate-800/80">
                  <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-blue-500/60" />
                  </div>
                </div>

                {/* Inner Screen Viewport */}
                <div className="relative rounded-[38px] overflow-hidden bg-slate-950 min-h-[640px] max-h-[720px] overflow-y-auto custom-scrollbar border border-slate-800/80 shadow-2xl">
                  <PublicCard client={currentSample} previewMode={true} />
                </div>
              </div>

              {/* Direct Fullscreen Link Button */}
              <div className="mt-8 flex items-center gap-3 z-10">
                <button
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
              <span>WhatsApp: {settings.contact_whatsapp || '+212 660 000 111'}</span>
            </a>
            <a
              href={`mailto:${settings.contact_email || 'contact@touchbizz.ma'}`}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{settings.contact_email || 'contact@touchbizz.ma'}</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
