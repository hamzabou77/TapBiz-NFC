import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Sparkles,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Globe,
  Radio
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ClientProfile } from '../../types';
import { PublicCard } from '../public/PublicCard';
import { FEATURED_SHOWCASE_PROFILES } from '../../data/initialData';
import { fetchClientBySlug } from '../../lib/api';

interface ShowcaseSectionProps {
  clients?: ClientProfile[];
  onNavigateToDemo: (slug: string) => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
  clients = [],
  onNavigateToDemo,
}) => {
  const [fetchedHamzaProfile, setFetchedHamzaProfile] = useState<ClientProfile | null>(null);

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

  const sampleProfiles: ClientProfile[] = FEATURED_SHOWCASE_PROFILES.map((baseProfile) => {
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
          full_name: liveHamza.full_name || baseProfile.full_name,
          job_title: liveHamza.job_title || baseProfile.job_title,
          themeColor: liveHamza.themeColor || baseProfile.themeColor,
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

  return (
    <section
      id="showcase"
      className="py-20 sm:py-28 bg-slate-900 text-white relative overflow-hidden"
    >
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header & Tabs */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Real Live Demo Profiles</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Experience the Digital Profile
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            See how different businesses across Morocco use Touchbizz to power their brand, streamline client contact, and drive 5-star Google reviews.
          </p>

          {/* Tab Selector */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {sampleProfiles.map((profile) => {
              const isSelected = selectedSlug === profile.slug;
              return (
                <button
                  key={profile.slug}
                  id={`preview-tab-${profile.slug}`}
                  onClick={() => setSelectedSlug(profile.slug)}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400/50 scale-102'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/60'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-cyan-300' : 'bg-slate-600'
                    }`}
                  />
                  <span>{profile.business_name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Business Details & CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSample.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
                    Featured Profile
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {currentSample.business_name}
                  </h3>
                  {currentSample.tagline && (
                    <p className="text-sm font-semibold text-slate-300 mt-1">
                      {currentSample.tagline}
                    </p>
                  )}
                </div>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {currentSample.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Always up-to-date contact info &amp; direct WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>1-Click Google Maps GPS navigation link</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Automated vCard phonebook download (.vcf)</span>
                  </div>
                </div>

                {/* Public Link Button */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onNavigateToDemo(currentSample.slug)}
                    className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <span>Open Live Card (/{currentSample.slug})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Realistic Mobile Phone Mockup (Strictly Matching Simulator Design) */}
          <div className="lg:col-span-6 flex justify-center sticky top-24">
            <div className="relative w-full max-w-[320px] sm:max-w-[350px] bg-slate-950 rounded-[44px] p-3.5 shadow-2xl ring-1 ring-slate-800/80 shadow-slate-900/40">
              {/* Dynamic Island / Speaker Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-12" />
              </div>

              {/* Phone Screen Container */}
              <div className="relative bg-slate-50 rounded-[34px] overflow-hidden min-h-[620px] max-h-[640px] overflow-y-auto no-scrollbar flex flex-col justify-between border border-slate-200/50 shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSample.slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full flex flex-col justify-between"
                  >
                    <PublicCard client={currentSample} previewMode={true} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
