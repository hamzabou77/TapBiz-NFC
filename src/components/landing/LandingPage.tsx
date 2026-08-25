import React, { useState } from 'react';
import {
  Radio,
  Sparkles,
  Smartphone,
  CheckCircle2,
  Star,
  UserPlus,
  MessageCircle,
  MapPin,
  QrCode,
  ShieldCheck,
  Zap,
  ArrowRight,
  ChevronDown,
  Layers,
  Phone,
  Mail,
  Lock,
  ExternalLink,
  ChevronRight,
  Award,
  Clock,
  RefreshCw
} from 'lucide-react';
import { ClientProfile, SiteSettings } from '../../types';
import { PublicCard } from '../public/PublicCard';

interface LandingPageProps {
  demoClient: ClientProfile;
  settings: SiteSettings;
  onNavigateToAdmin: () => void;
  onNavigateToDemo: (slug: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  demoClient,
  settings,
  onNavigateToAdmin,
  onNavigateToDemo,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [orderModalPlan, setOrderModalPlan] = useState<string | null>(null);
  const [orderForm, setOrderForm] = useState({
    name: '',
    business: '',
    phone: '',
    city: 'Marrakech',
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = `Hello, I would like to order the NFC Business Card (${orderModalPlan || 'Professional Plan'}).\nName: ${orderForm.name}\nBusiness: ${orderForm.business}\nPhone: ${orderForm.phone}\nCity: ${orderForm.city}`;
    const cleanAdminPhone = settings.contact_whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanAdminPhone}?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
    setOrderSubmitted(true);
    setTimeout(() => {
      setOrderSubmitted(false);
      setOrderModalPlan(null);
    }, 2000);
  };

  const faqs = [
    {
      q: 'Do my clients need to install an application to view my profile?',
      a: 'No app is required! When someone taps your NFC card or scans your QR code, your digital business profile opens instantly in their native mobile browser (Safari, Chrome, etc.).',
    },
    {
      q: 'What if my phone number, address, or social media links change?',
      a: 'You can update your information at any time from your admin dashboard. The changes appear on your profile instantly. You do NOT need to rewrite or buy a new physical NFC card!',
    },
    {
      q: 'How does the "Save Contact" button work?',
      a: 'When a visitor clicks "Save Contact", our platform automatically generates and downloads a standard vCard (.vcf) file containing your business name, phone, email, website, and address directly into their phone contacts with one tap.',
    },
    {
      q: 'How does the Google Review integration work?',
      a: 'We connect your profile directly to your verified Google Business review page. Visitors tap the button and can immediately leave an authentic 5-star review, boosting your local SEO ranking.',
    },
    {
      q: 'Which smartphones are compatible with NFC cards?',
      a: 'Almost all modern smartphones are 100% compatible. iPhones (XR, XS, 11, 12, 13, 14, 15, 16) and virtually all modern Android devices support native NFC background reading. Plus, the QR code on the back ensures compatibility with 100% of all devices.',
    },
  ];

  return (
    <div id="landing-page-root" className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-white text-xs py-2.5 px-4 text-center border-b border-slate-800 font-medium flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 text-blue-400 font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          Smart NFC Cards for Moroccan Businesses:
        </span>
        <span>Delivery across Marrakech, Casablanca, Rabat, Tangier & Agadir.</span>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-600/20">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">{settings.site_name}</span>
              <span className="block text-[11px] font-semibold text-blue-600 uppercase tracking-wider">NFC Business Solutions</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#demo" className="hover:text-blue-600 transition-colors">Live Demo</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              id="admin-login-nav-btn"
              onClick={onNavigateToAdmin}
              className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 text-xs font-bold border border-slate-200 transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>

            <a
              href="#pricing"
              className="hidden sm:inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all active:scale-98"
            >
              Get Your NFC Card
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-gradient-to-b from-blue-50/60 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Text & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold tracking-wide uppercase">
                <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                <span>Next-Gen Smart Networking</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
                Your Business Card.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  One Tap Away.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Share your contact information, WhatsApp, social media and business location instantly with one NFC card. Never print paper cards again.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  id="hero-get-card-btn"
                  href="#pricing"
                  className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <span>Get Your NFC Card</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <button
                  id="hero-view-demo-btn"
                  onClick={() => onNavigateToDemo(demoClient.slug)}
                  className="w-full sm:w-auto py-4 px-7 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-blue-500 text-slate-800 font-bold text-base shadow-xs flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  <span>View Ahmed Car Rental Demo</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-semibold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Instant vCard (.vcf) Save</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Google Review 5★ Booster</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Dynamic Updates Forever</span>
                </div>
              </div>
            </div>

            {/* Right: Realistic Smartphone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Decorative glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[44px] opacity-20 blur-xl" />

                {/* Smartphone Shell */}
                <div className="relative rounded-[40px] border-4 border-slate-800 bg-slate-900 p-2 shadow-2xl">
                  {/* Phone notch */}
                  <div className="w-28 h-4 bg-slate-800 rounded-b-xl mx-auto mb-2 flex items-center justify-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                    <div className="w-8 h-1 rounded-full bg-slate-700" />
                  </div>

                  {/* Public Card Mockup Container */}
                  <div className="rounded-[30px] overflow-hidden bg-white max-h-[580px] overflow-y-auto custom-scrollbar">
                    <PublicCard client={demoClient} previewMode={true} />
                  </div>
                </div>

                {/* Floating Floating Tap Badge */}
                <div className="absolute -bottom-5 -left-5 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">One Tap Connection</div>
                    <div className="text-[11px] text-emerald-600 font-semibold">No App Required</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">Simplicity First</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How Smart NFC Cards Work
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              A frictionless 3-step experience designed for effortless customer interactions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700/80 relative flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-6">
                  <Radio className="w-7 h-7" />
                </div>
                <div className="text-xs font-mono text-blue-400 font-bold mb-1">STEP 01</div>
                <h3 className="text-xl font-bold text-white mb-2">Tap Card or Scan QR</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Hold your NFC card near any smartphone. The embedded NFC chip triggers the client's unique URL instantly.
                </p>
              </div>
              <div className="mt-6 text-xs text-slate-400 font-mono bg-slate-900 p-2.5 rounded-xl">
                NFC Card → Unique Client URL
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700/80 relative flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mb-6">
                  <Smartphone className="w-7 h-7" />
                </div>
                <div className="text-xs font-mono text-indigo-400 font-bold mb-1">STEP 02</div>
                <h3 className="text-xl font-bold text-white mb-2">Instant Profile Opens</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The client's branded digital card loads immediately in the phone's browser with zero apps to install.
                </p>
              </div>
              <div className="mt-6 text-xs text-slate-400 font-mono bg-slate-900 p-2.5 rounded-xl">
                https://smartnfc.ma/ahmed-car-rental
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/80 p-8 rounded-3xl border border-slate-700/80 relative flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-6">
                  <UserPlus className="w-7 h-7" />
                </div>
                <div className="text-xs font-mono text-emerald-400 font-bold mb-1">STEP 03</div>
                <h3 className="text-xl font-bold text-white mb-2">Save Contact & Connect</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The customer saves your vCard to contacts, starts a WhatsApp chat, gets GPS directions, or leaves a Google review.
                </p>
              </div>
              <div className="mt-6 text-xs text-emerald-400 font-medium bg-slate-900 p-2.5 rounded-xl">
                ✓ vCard + WhatsApp + Maps + Reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Comprehensive Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Feature-Packed</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything Your Business Needs On One Card
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Engineered specifically for agencies, car rentals, hotels, clinics, and service professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Save Contact */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <UserPlus className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">One-Tap "Save Contact" (.vcf)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Generates a clean mobile vCard file including business name, phones, email, address, and website directly into iOS/Android Contacts.
              </p>
            </div>

            {/* Feature 2: WhatsApp Chat */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Direct WhatsApp Trigger</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Opens a pre-filled WhatsApp conversation with your business instantly with one tap without the customer having to manually type your number.
              </p>
            </div>

            {/* Feature 3: Google Reviews */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">⭐ Direct Google Review Booster</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Boost your local Google search ranking by inviting happy customers to leave an authentic review right from your digital card.
              </p>
            </div>

            {/* Feature 4: Google Maps */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Google Maps GPS Directions</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Customers can open live GPS navigation straight to your car rental office, riad, showroom, or agency with a single click.
              </p>
            </div>

            {/* Feature 5: Dynamic Updates */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Lifetime Dynamic Updates</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Update phone numbers, links, or logos at any time from your admin dashboard. The physical NFC card will always reflect your latest information.
              </p>
            </div>

            {/* Feature 6: Dual NFC + QR */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">High-Resolution QR Code</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every profile automatically generates a crisp QR code that can be printed on the back of your card, table standees, or invoices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Live Demo Ahmed Car Rental Showcase */}
      <section id="demo" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase">
                <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                <span>Live Interactive Demo</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Experience the Ahmed Car Rental Digital Card
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                This is the exact mobile profile template that opens when a client taps your NFC card. Try clicking the buttons to test the vCard download, WhatsApp chat, and Google Review triggers!
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                    URL
                  </div>
                  <div className="text-xs font-mono text-slate-700 truncate">
                    https://mydomain.com/ahmed-car-rental
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0">
                    5★
                  </div>
                  <div className="text-xs text-slate-700">
                    Direct Google Review link included
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigateToDemo(demoClient.slug)}
                  className="py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all"
                >
                  <span>Open Full Screen Profile</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-sm rounded-[36px] bg-slate-900 p-3 shadow-2xl border-4 border-slate-800">
                <div className="rounded-[28px] overflow-hidden bg-white max-h-[580px] overflow-y-auto custom-scrollbar">
                  <PublicCard client={demoClient} previewMode={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Transparent Pricing</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Order Your NFC Digital Business Card
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              No monthly subscription fees. One-time payment with lifetime profile hosting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {settings.pricing_plans.map((plan) => (
              <div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                className={`rounded-3xl p-8 border flex flex-col justify-between transition-all ${
                  plan.popular
                    ? 'border-blue-600 bg-gradient-to-b from-blue-50/50 via-white to-white shadow-xl ring-2 ring-blue-600/20 relative'
                    : 'border-slate-200 bg-white shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  {plan.popular && (
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider mb-4 shadow-sm">
                      Most Popular Choice
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.description}</p>

                  <div className="my-6 pb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">{plan.price}</span>
                      <span className="text-sm font-bold text-slate-600">{plan.currency}</span>
                    </div>
                    <div className="text-xs text-slate-400 font-medium mt-1">{plan.billing_period}</div>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  id={`order-plan-btn-${plan.id}`}
                  onClick={() => setOrderModalPlan(plan.name)}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>Order {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Got Questions?</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact & Support Section */}
      <section id="contact" className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ready to upgrade your business cards?
              </h2>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                Contact our Moroccan sales team on WhatsApp or phone for customized bulk orders, enterprise staff packs, or immediate delivery.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start md:justify-end gap-3">
              <a
                href={`https://wa.me/${settings.contact_whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello SmartNFC, I want to order NFC business cards for my company.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${settings.contact_phone.replace(/[^0-9+]/g, '')}`}
                className="py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{settings.contact_phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">
              NFC
            </div>
            <span className="font-bold text-white">{settings.site_name}</span>
            <span>— Next-Gen Digital Business Cards</span>
          </div>

          <div>
            <span>© {new Date().getFullYear()} {settings.site_name}. All rights reserved. Designed for Moroccan & International businesses.</span>
          </div>
        </div>
      </footer>

      {/* Quick Order Modal */}
      {orderModalPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setOrderModalPlan(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-slate-900 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Order {orderModalPlan}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Enter your details to finalize your NFC card order with our team
            </p>

            {orderSubmitted ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-sm font-semibold text-center animate-fadeIn">
                ✓ Connecting to WhatsApp...
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                    placeholder="Ahmed Benali"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Business / Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={orderForm.business}
                    onChange={(e) => setOrderForm({ ...orderForm, business: e.target.value })}
                    placeholder="Ahmed Car Rental Marrakech"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    placeholder="+212 661 234 567"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    City / Delivery Location
                  </label>
                  <select
                    value={orderForm.city}
                    onChange={(e) => setOrderForm({ ...orderForm, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 text-sm outline-none bg-white"
                  >
                    <option value="Marrakech">Marrakech</option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Tangier">Tangier</option>
                    <option value="Agadir">Agadir</option>
                    <option value="Fes">Fes</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Order via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderModalPlan(null)}
                    className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
