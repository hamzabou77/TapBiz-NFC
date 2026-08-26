import React, { useState } from 'react';
import {
  X,
  MessageCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  Zap,
  Sparkles,
  QrCode,
  Radio
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, SiteSettings } from '../../types';

interface ProductDetailModalProps {
  product: Product | null;
  settings: SiteSettings;
  isOpen: boolean;
  onClose: () => void;
  lang?: 'fr' | 'en';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  settings,
  isOpen,
  onClose,
  lang = 'fr',
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (!isOpen || !product) return null;

  const images = product.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls
    : [product.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const whatsappPhone = (settings.contact_whatsapp || '+212620799395').replace(/[^0-9]/g, '') || '212620799395';
  const orderMessage = encodeURIComponent(
    lang === 'fr'
      ? `Bonjour Touchbizz, je souhaite commander le produit suivant : "${product.title}" au prix de ${product.price} MAD. Merci de m'indiquer la marche à suivre pour la livraison.`
      : `Hello Touchbizz, I would like to order: "${product.title}" for ${product.price} MAD. Please let me know how to proceed.`
  );
  const waUrl = `https://wa.me/${whatsappPhone}?text=${orderMessage}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden z-10 my-6 flex flex-col max-h-[92vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 md:p-8 space-y-6">
            {/* Image Gallery Showcase */}
            <div className="relative aspect-[16/10] bg-slate-900 rounded-2xl overflow-hidden group shadow-inner">
              <img
                src={images[activeImageIndex]}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                <span className="py-1 px-2.5 rounded-lg bg-white/95 backdrop-blur-md text-[11px] font-black text-[#0066FF] shadow-xs uppercase tracking-wider">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="py-1 px-2.5 rounded-lg bg-white/95 backdrop-blur-md text-[11px] font-black text-[#0066FF] shadow-xs uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
                {product.isPopular && (
                  <span className="py-1 px-2.5 rounded-lg bg-emerald-500 text-white text-[11px] font-extrabold shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {lang === 'fr' ? 'Recommandé' : 'Best Seller'}
                  </span>
                )}
              </div>

              {/* Prev / Next Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center cursor-pointer transition-transform active:scale-90"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center cursor-pointer transition-transform active:scale-90"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Pagination Dots */}
                  <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`transition-all rounded-full ${
                          activeImageIndex === idx
                            ? 'w-6 h-1.5 bg-[#0066FF]'
                            : 'w-1.5 h-1.5 bg-white/80 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Title & Price Header */}
            <div className="space-y-2 border-b border-slate-100 pb-5">
              <span className="text-xs font-bold text-[#0066FF] uppercase tracking-wider block">
                {product.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {product.title}
              </h2>

              <div className="flex items-baseline gap-1.5 pt-1">
                <span className="text-xs text-slate-400 font-medium">
                  {lang === 'fr' ? 'À partir de' : 'Starting at'}
                </span>
                <span className="text-3xl font-black text-slate-950 tracking-tight">
                  {product.price}
                </span>
                <span className="text-lg font-black text-[#10B981]">MAD</span>
                <span className="text-xs text-slate-500 font-medium ml-2">
                  {lang === 'fr' ? '(Paiement unique • Zéro abonnement)' : '(One-time • Zero recurring fees)'}
                </span>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                {lang === 'fr' ? 'Description du Produit' : 'Product Description'}
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Specifications & Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-3 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/70">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>{lang === 'fr' ? 'Caractéristiques & Avantages' : 'Key Specifications'}</span>
                </h3>
                <div className="space-y-2">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery & Security Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 font-medium">
                <Truck className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span>{lang === 'fr' ? 'Livraison rapide 24/48h partout au Maroc' : 'Fast 24/48h shipping in Morocco'}</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-slate-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{lang === 'fr' ? 'Paiement sécurisé à la livraison' : 'Cash on Delivery (Paiement à la livraison)'}</span>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Order Bar */}
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">
                {lang === 'fr' ? 'Prix Total' : 'Total Price'}
              </span>
              <div className="text-xl font-black text-slate-900">
                {product.price} <span className="text-emerald-600">MAD</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                {lang === 'fr' ? 'Fermer' : 'Close'}
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none py-3 px-6 rounded-full bg-[#0066FF] hover:bg-blue-700 active:scale-98 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Commander sur WhatsApp >' : 'Order via WhatsApp >'}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
