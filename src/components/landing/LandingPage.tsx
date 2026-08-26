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
  Menu,
  X,
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  Leaf,
  Star,
  Users,
  Award,
  ChevronDown,
  HelpCircle,
  Phone,
  MapPin,
  Lock,
  Globe,
  Truck,
  Layers,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ClientProfile, SiteSettings, Product } from '../../types';
import { ProfileSimulator } from './ProfileSimulator';
import { ProductCatalog } from './ProductCatalog';
import { ShowcaseSection } from './ShowcaseSection';

interface LandingPageProps {
  demoClient: ClientProfile;
  settings: SiteSettings;
  clients?: ClientProfile[];
  products?: Product[];
  onNavigateToDemo: (slug: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  settings,
  clients = [],
  products = [],
  onNavigateToDemo,
}) => {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappPhone = (settings.contact_whatsapp || '+212620799395').replace(/[^0-9]/g, '') || '212620799395';
  const orderWhatsAppUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    lang === 'fr'
      ? 'Bonjour Touchbizz, je souhaite commander une carte de visite connectée NFC ou avoir plus d\'informations.'
      : 'Hello Touchbizz, I would like to order a smart NFC card or learn more about your digital profiles.'
  )}`;

  const faqs = lang === 'fr' ? [
    {
      q: 'Mes clients ont-ils besoin d\'installer une application pour voir mon profil ?',
      a: 'Non, aucune application n\'est requise ! Lorsque votre client approche son smartphone de votre carte NFC Touchbizz ou scanne votre QR code dynamique, votre profil s\'ouvre directement et instantanément dans son navigateur web.',
    },
    {
      q: 'Comment modifier mes coordonnées ou mes liens par la suite ?',
      a: 'Vous pouvez modifier vos numéros de téléphone, liens réseaux sociaux, photos et informations professionnelles à tout moment en ligne sans avoir à racheter ou réimprimer une nouvelle carte physique.',
    },
    {
      q: 'Les cartes Touchbizz sont-elles compatibles avec tous les téléphones ?',
      a: 'Oui, nos cartes sont compatibles à 100% avec l\'ensemble des smartphones modernes (iPhone et Android) grâce à la technologie sans contact NFC intégrée et au QR code de secours haute définition.',
    },
    {
      q: 'Quels sont les délais et modalités de livraison au Maroc ?',
      a: 'Nous livrons dans toutes les villes du Maroc (Casablanca, Marrakech, Rabat, Tanger, Fès, Agadir, etc.) sous 24 à 48 heures. Le paiement s\'effectue à la livraison en toute sécurité.',
    },
    {
      q: 'Comment fonctionne la plaque / carte Google Reviews ?',
      a: 'La carte ou plaque Google Reviews est configurée avec le lien direct vers le formulaire d\'avis de votre établissement Google Maps. En 1 seconde, votre client arrive sur l\'écran pour vous attribuer 5 étoiles.',
    },
  ] : [
    {
      q: 'Do my clients need to install an app to view my profile?',
      a: 'No app is required! When someone taps your physical Touchbizz NFC card or scans your dynamic QR code, your complete digital profile opens instantly in their native mobile web browser.',
    },
    {
      q: 'How do I update my phone number or social links in the future?',
      a: 'You can update your contact information, links, and photos anytime directly from your dashboard without needing to reprint or replace your physical NFC card.',
    },
    {
      q: 'Are Touchbizz smart cards compatible with all smartphones?',
      a: 'Yes, Touchbizz cards work natively with all modern iPhones and Android smartphones with NFC. Each card also comes with a high-definition backup QR code for older devices.',
    },
    {
      q: 'What is the delivery time across Morocco?',
      a: 'We deliver throughout Morocco (Casablanca, Marrakech, Rabat, Tangier, Agadir, and all regions) within 24 to 48 hours with cash-on-delivery payment options available.',
    },
    {
      q: 'How does the Google Reviews NFC card work?',
      a: 'The Google Reviews card is pre-configured with your direct Google Maps business review link. When customers tap the card or stand, the 5-star review page launches in 1 second.',
    },
  ];

  return (
    <div
      id="landing-page-root"
      className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-[#0066FF] selection:text-white flex flex-col relative pb-24 md:pb-0"
    >
      {/* 1. Sticky Modern Header with Brand & Language Switcher */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 transition-all shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Name on Left */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#0066FF] flex items-center justify-center text-white shadow-md shadow-blue-600/25 group-hover:scale-105 transition-transform">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-slate-900 block leading-tight">
                Touchbizz
              </span>
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#0066FF]">
                Smart NFC &amp; Digital Cards
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-bold text-slate-600">
            <button
              onClick={() => scrollToSection('catalog')}
              className="hover:text-[#0066FF] transition-colors cursor-pointer"
            >
              {lang === 'fr' ? 'Boutique & Produits' : 'Store & Products'}
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-[#0066FF] transition-colors cursor-pointer"
            >
              {lang === 'fr' ? 'Comment ça marche' : 'How It Works'}
            </button>
            <button
              onClick={() => scrollToSection('simulator')}
              className="hover:text-[#0066FF] transition-colors cursor-pointer"
            >
              {lang === 'fr' ? 'Simulateur en direct' : 'Live Simulator'}
            </button>
            <button
              onClick={() => scrollToSection('why-touchbizz')}
              className="hover:text-[#0066FF] transition-colors cursor-pointer"
            >
              {lang === 'fr' ? 'Pourquoi Touchbizz' : 'Why Touchbizz'}
            </button>
            <button
              onClick={() => scrollToSection('showcase')}
              className="hover:text-[#0066FF] transition-colors cursor-pointer"
            >
              {lang === 'fr' ? 'Exemples de profils' : 'Demo Profiles'}
            </button>
          </nav>

          {/* Right Header: Language Switcher (FR / EN) & WhatsApp CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher Toggle */}
            <div className="flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setLang('fr')}
                className={`py-1 px-2.5 rounded-full transition-all cursor-pointer ${
                  lang === 'fr'
                    ? 'bg-white text-[#0066FF] shadow-xs font-black'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Français"
              >
                FR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`py-1 px-2.5 rounded-full transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-white text-[#0066FF] shadow-xs font-black'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Desktop WhatsApp CTA */}
            <a
              href={orderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-[#10B981] hover:bg-emerald-600 active:scale-98 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Commander sur WhatsApp' : 'Order on WhatsApp'}</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-slate-200 bg-white px-4 py-6 space-y-3"
            >
              <button
                onClick={() => scrollToSection('catalog')}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>{lang === 'fr' ? 'Boutique & Produits' : 'Store & Products'}</span>
                <ShoppingBag className="w-4 h-4 text-[#0066FF]" />
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>{lang === 'fr' ? 'Comment ça marche' : 'How It Works'}</span>
                <Zap className="w-4 h-4 text-[#0066FF]" />
              </button>
              <button
                onClick={() => scrollToSection('simulator')}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>{lang === 'fr' ? 'Simulateur de profil' : 'Profile Simulator'}</span>
                <Smartphone className="w-4 h-4 text-[#0066FF]" />
              </button>
              <button
                onClick={() => scrollToSection('why-touchbizz')}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>{lang === 'fr' ? 'Pourquoi Touchbizz' : 'Why Touchbizz'}</span>
                <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
              </button>
              <button
                onClick={() => scrollToSection('showcase')}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>{lang === 'fr' ? 'Exemples de profils' : 'Demo Profiles'}</span>
                <Users className="w-4 h-4 text-[#0066FF]" />
              </button>

              <div className="pt-2">
                <a
                  href={orderWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'fr' ? 'Commander sur WhatsApp' : 'Order on WhatsApp'}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. Hero Section */}
      <main className="flex-1">
        <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden bg-gradient-to-b from-blue-50/50 via-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8 relative z-10">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-100/80 border border-blue-200 text-[#0066FF] text-xs font-black shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {lang === 'fr'
                  ? 'Solution N°1 de Cartes de Visite Connectées au Maroc'
                  : '#1 Smart NFC Digital Business Cards in Morocco'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
              {lang === 'fr' ? (
                <>
                  Partagez vos coordonnées en <span className="text-[#0066FF]">1 seconde</span> par simple contact NFC
                </>
              ) : (
                <>
                  Share your contacts in <span className="text-[#0066FF]">1 second</span> with a simple NFC tap
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {lang === 'fr'
                ? 'Une seule carte NFC haut de gamme pour transmettre instantanément votre numéro WhatsApp, coordonnées complètes, réseaux sociaux et catalogue. Zéro application requise.'
                : 'One premium NFC card to instantly transmit your WhatsApp, vCard contact info, social profiles, and business links. Zero app required.'}
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 max-w-md mx-auto">
              <button
                onClick={() => scrollToSection('catalog')}
                className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-[#0066FF] hover:bg-blue-700 active:scale-98 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Découvrir la Boutique (150 MAD)' : 'Explore Store (150 MAD)'}</span>
              </button>

              <button
                onClick={() => scrollToSection('simulator')}
                className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-white hover:bg-slate-50 active:scale-98 text-slate-800 font-bold text-sm border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-[#0066FF]" />
                <span>{lang === 'fr' ? 'Tester le profil digital' : 'Test Digital Profile'}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-bold text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{lang === 'fr' ? 'Sans abonnement (Paiement unique)' : 'Zero subscription (One-time fee)'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#0066FF]" />
                <span>{lang === 'fr' ? 'Livraison 24/48h partout au Maroc' : 'Fast 24/48h delivery in Morocco'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>{lang === 'fr' ? 'Paiement à la livraison' : 'Cash on delivery'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Product Catalog Section (Matching Screenshot Exactly) */}
        <ProductCatalog
          products={products}
          settings={settings}
          lang={lang}
        />

        {/* 4. How It Works (3 Steps) */}
        <section id="how-it-works" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0066FF] text-xs font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Simple & Rapide' : 'Fast & Effortless'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {lang === 'fr' ? 'Comment ça marche ?' : 'How Does It Work?'}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {lang === 'fr'
                  ? 'Passez au digital en 3 étapes simples et faites forte impression lors de vos réunions.'
                  : 'Upgrade to smart digital networking in 3 easy steps.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4 relative">
                <div className="w-12 h-12 rounded-2xl bg-[#0066FF] text-white flex items-center justify-center font-black text-lg shadow-md shadow-blue-600/20">
                  1
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {lang === 'fr' ? '1. Choisissez votre Carte' : '1. Select Your Smart Card'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === 'fr'
                    ? 'Commandez votre carte NFC Noire, Blanche ou Plaque Google Reviews au tarif unique de 150 MAD avec paiement à la livraison.'
                    : 'Order your Black, White, or Google Reviews NFC Card for 150 MAD with cash on delivery anywhere in Morocco.'}
                </p>
              </div>

              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4 relative">
                <div className="w-12 h-12 rounded-2xl bg-[#0066FF] text-white flex items-center justify-center font-black text-lg shadow-md shadow-blue-600/20">
                  2
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {lang === 'fr' ? '2. Personnalisez votre Profil' : '2. Setup Your Profile Online'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === 'fr'
                    ? 'Ajoutez votre photo, fonction, WhatsApp, téléphone, réseaux sociaux et liens utiles en 2 minutes via votre tableau de bord.'
                    : 'Add your photo, job title, WhatsApp, contact numbers, and social links in 2 minutes.'}
                </p>
              </div>

              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4 relative">
                <div className="w-12 h-12 rounded-2xl bg-[#0066FF] text-white flex items-center justify-center font-black text-lg shadow-md shadow-blue-600/20">
                  3
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {lang === 'fr' ? '3. Touchez et Partagez' : '3. Tap & Connect Instantly'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === 'fr'
                    ? 'Approchez simplement votre carte de n\'importe quel smartphone. Votre interlocuteur enregistre votre contact en 1 clic !'
                    : 'Simply tap your card against any smartphone. Your interlocutor saves your contact with a single tap.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Live Simulator */}
        <ProfileSimulator lang={lang} />

        {/* 6. Why Touchbizz / Trust Features Grid */}
        <section id="why-touchbizz" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Avantages Exclusifs' : 'Exclusive Advantages'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {lang === 'fr' ? 'Pourquoi choisir Touchbizz ?' : 'Why Choose Touchbizz?'}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {lang === 'fr'
                  ? 'Fini le gaspillage des cartes de visite papier obsolètes dès qu\'un numéro change.'
                  : 'Say goodbye to wasted paper cards that become outdated the moment info changes.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0066FF] flex items-center justify-center">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {lang === 'fr' ? 'Modifiable à l\'infini' : 'Unlimited Updates'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'fr'
                    ? 'Changez de numéro ou de poste sans jamais avoir à réimprimer une nouvelle carte physique.'
                    : 'Update your contact details or role anytime without ever ordering new physical cards.'}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {lang === 'fr' ? '100% Universel' : '100% Universal'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'fr'
                    ? 'Fonctionne sur iPhone et Android via NFC sans contact et QR code de secours haute définition.'
                    : 'Works seamlessly on iPhones and Android via contactless NFC and backup QR code.'}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {lang === 'fr' ? 'Enregistrement 1-Clic' : '1-Click vCard Save'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'fr'
                    ? 'Votre client clique sur "Enregistrer" et vos coordonnées complètes s\'intègrent dans son carnet d\'adresses.'
                    : 'Your client taps "Save Contact" and all your details are stored directly in their phone address book.'}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {lang === 'fr' ? 'Zéro Abonnement' : 'Zero Recurring Fees'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'fr'
                    ? 'Tarif unique de 150 MAD à l\'achat, sans frais cachés mensuels ni annuels.'
                    : 'One-time 150 MAD payment with zero hidden monthly or annual subscription fees.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Showcase / Demo Profiles */}
        <div id="showcase">
          <ShowcaseSection clients={clients} onNavigateToDemo={onNavigateToDemo} />
        </div>

        {/* 8. FAQ Section */}
        <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {lang === 'fr' ? 'Questions Fréquemment Posées' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm">
                {lang === 'fr'
                  ? 'Tout ce que vous devez savoir sur vos cartes connectées Touchbizz'
                  : 'Everything you need to know about Touchbizz NFC business cards'}
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#0066FF] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        openFaq === idx ? 'rotate-180 text-[#0066FF]' : 'text-slate-400'
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 9. Modern Footer */}
      <footer className="bg-slate-950 text-white py-12 sm:py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#0066FF] flex items-center justify-center text-white">
                  <Radio className="w-5 h-5" />
                </div>
                <span className="font-black text-xl tracking-tight text-white">
                  Touchbizz
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
                {lang === 'fr'
                  ? 'Pionnier des solutions de networking NFC et profils professionnels digitaux au Maroc. Cartes intelligentes, plaques d\'avis Google et supports sans contact.'
                  : 'Smart NFC digital business card solutions across Morocco. Connected smart cards, Google Reviews stands, and contactless profiles.'}
              </p>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Marrakech &amp; Casablanca, Maroc</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                {lang === 'fr' ? 'Navigation' : 'Quick Links'}
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button onClick={() => scrollToSection('catalog')} className="hover:text-white cursor-pointer">
                    {lang === 'fr' ? 'Boutique NFC (150 MAD)' : 'NFC Store (150 MAD)'}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white cursor-pointer">
                    {lang === 'fr' ? 'Comment ça marche' : 'How It Works'}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('simulator')} className="hover:text-white cursor-pointer">
                    {lang === 'fr' ? 'Simulateur en direct' : 'Live Simulator'}
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                {lang === 'fr' ? 'Service Client & Commandes' : 'Customer Support & Orders'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === 'fr'
                  ? 'Commandes express et assistance WhatsApp 7j/7 :'
                  : 'WhatsApp support & express ordering:'}
              </p>
              <a
                href={orderWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{settings.contact_whatsapp || '+212 620-799395'}</span>
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} Touchbizz. {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
            <div className="flex items-center gap-4">
              <span>{lang === 'fr' ? 'Paiement à la livraison au Maroc' : 'Cash on delivery in Morocco'}</span>
              <span>•</span>
              <span>{lang === 'fr' ? 'Livraison 24/48h' : '24/48h Delivery'}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 10. Sticky Bottom Bar on Mobile for Instant Ordering / Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-2.5 px-4 flex items-center justify-between gap-3 shadow-lg">
        <button
          onClick={() => scrollToSection('catalog')}
          className="flex-1 py-2 px-3 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-[#0066FF]" />
          <span>{lang === 'fr' ? 'Boutique' : 'Catalog'}</span>
        </button>

        <a
          href={orderWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-3 rounded-full bg-[#10B981] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20 text-center"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{lang === 'fr' ? 'Commander' : 'WhatsApp'}</span>
        </a>
      </div>
    </div>
  );
};
