import React, { useState } from 'react';
import {
  ShoppingBag,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Check
} from 'lucide-react';
import { Product, SiteSettings } from '../../types';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductCatalogProps {
  products: Product[];
  settings: SiteSettings;
  lang?: 'fr' | 'en';
}

type SortOption = 'price_asc' | 'price_desc' | 'popular' | 'newest';

interface ProductCardProps {
  product: Product;
  whatsappPhone: string;
  lang: 'fr' | 'en';
  onOpenDetails: (product: Product) => void;
}

const ProductCardItem: React.FC<ProductCardProps> = ({
  product,
  whatsappPhone,
  lang,
  onOpenDetails,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const images =
    product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls
      : [product.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const orderMessage = encodeURIComponent(
    lang === 'fr'
      ? `Bonjour Touchbizz, je souhaite commander : ${product.title} (${product.price} MAD). Pouvez-vous m'indiquer la disponibilité et les modalités de livraison ?`
      : `Hello Touchbizz, I would like to order: ${product.title} (${product.price} MAD). Please let me know how to proceed with delivery.`
  );
  const waUrl = `https://wa.me/${whatsappPhone}?text=${orderMessage}`;

  // Format category to match screenshot (e.g. CARTES NFC)
  const displayCategory = product.category.toUpperCase().includes('NFC')
    ? product.category.toUpperCase()
    : `${product.category.toUpperCase()} NFC`;

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
    >
      {/* 1. Image Carousel (Exact Match to Screenshot) */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden select-none">
        <img
          src={images[currentImageIndex]}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
        />

        {/* Top-Left Badge (e.g. CLASSIQUE, SOCIAL) */}
        {product.badge && (
          <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10">
            <span className="py-0.5 px-2 rounded-md bg-white/95 backdrop-blur-md text-[9px] sm:text-[10px] font-black text-[#0066FF] shadow-xs uppercase tracking-wider">
              {product.badge}
            </span>
          </div>
        )}

        {/* Left & Right Circular Arrow Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-sm flex items-center justify-center absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform active:scale-90"
              aria-label="Image précédente"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-800" />
            </button>
            <button
              onClick={handleNext}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-sm flex items-center justify-center absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform active:scale-90"
              aria-label="Image suivante"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-800" />
            </button>

            {/* Pagination Dots (Active: elongated blue bar, inactive: white dots) */}
            <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1 z-10 pointer-events-none">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`transition-all duration-300 rounded-full ${
                    currentImageIndex === idx
                      ? 'w-4 sm:w-5 h-1 sm:h-1.5 bg-[#0066FF]'
                      : 'w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/90 shadow-xs'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* 2. Card Body Content */}
      <div className="p-3 sm:p-4.5 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
        <div className="space-y-1 sm:space-y-1.5">
          {/* Category in small uppercase blue text */}
          <span className="text-[10px] sm:text-xs font-bold text-[#0066FF] uppercase tracking-wider block">
            {displayCategory}
          </span>

          {/* Product Title */}
          <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 leading-snug line-clamp-1 sm:line-clamp-2">
            {product.title}
          </h3>

          {/* Price Area: "À partir de" above price, price in black, MAD in green */}
          <div className="pt-0.5">
            <span className="text-[10px] sm:text-xs text-slate-400 font-medium block">
              {lang === 'fr' ? 'À partir de' : 'Starting at'}
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base sm:text-lg md:text-xl font-black text-slate-950 tracking-tight">
                {product.price}
              </span>
              <span className="text-xs sm:text-sm md:text-base font-black text-[#10B981]">
                MAD
              </span>
            </div>
          </div>
        </div>

        {/* 3. Action Buttons (Stacked Exactly as Screenshot) */}
        <div className="space-y-1.5 sm:space-y-2 pt-1">
          {/* Primary Button: Solid Blue "Commander >" */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 sm:py-2.5 px-3 rounded-full bg-[#0066FF] hover:bg-blue-700 active:scale-98 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1 shadow-sm shadow-blue-600/20 transition-all cursor-pointer text-center"
          >
            <span>{lang === 'fr' ? 'Commander' : 'Order'}</span>
            <span className="text-xs font-black ml-0.5">&gt;</span>
          </a>

          {/* Secondary Button: White background with thin border "Voir détails" */}
          <button
            type="button"
            onClick={() => onOpenDetails(product)}
            className="w-full py-1.5 sm:py-2 px-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-[11px] sm:text-xs md:text-sm flex items-center justify-center transition-colors cursor-pointer"
          >
            <span>{lang === 'fr' ? 'Voir détails' : 'View details'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  settings,
  lang = 'fr',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>('price_asc');
  const [sortDropdownOpen, setSortDropdownOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Available categories list
  const categoryKeys = ['all', 'Cartes', 'Supports', 'Plaques', 'Google Reviews'];

  // Filter products by category
  let filtered = products.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'Cartes') {
      return p.category.toLowerCase().includes('carte') || p.category === 'Cartes';
    }
    if (activeCategory === 'Supports') {
      return (
        p.category.toLowerCase().includes('support') ||
        p.category.toLowerCase().includes('review') ||
        p.category === 'Supports'
      );
    }
    if (activeCategory === 'Plaques') {
      return (
        p.category.toLowerCase().includes('plaque') ||
        p.category.toLowerCase().includes('social') ||
        p.category === 'Plaques'
      );
    }
    return p.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  // Sort products
  filtered = [...filtered].sort((a, b) => {
    if (sortOption === 'price_asc') return a.price - b.price;
    if (sortOption === 'price_desc') return b.price - a.price;
    if (sortOption === 'popular') return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    return 0;
  });

  const whatsappPhone = (settings.contact_whatsapp || '+212620799395').replace(/[^0-9]/g, '') || '212620799395';

  const sortLabels = {
    price_asc: lang === 'fr' ? 'Prix : croissant ( ↗ )' : 'Price: Low to High ( ↗ )',
    price_desc: lang === 'fr' ? 'Prix : décroissant ( ↘ )' : 'Price: High to Low ( ↘ )',
    popular: lang === 'fr' ? 'Plus populaires ( ★ )' : 'Most Popular ( ★ )',
    newest: lang === 'fr' ? 'Nouveautés' : 'New Arrivals',
  };

  const getCategoryLabel = (cat: string) => {
    if (cat === 'all') return lang === 'fr' ? 'Tout' : 'All';
    if (cat === 'Cartes') return lang === 'fr' ? 'Cartes' : 'Cards';
    if (cat === 'Supports') return lang === 'fr' ? 'Supports' : 'Stands';
    if (cat === 'Plaques') return lang === 'fr' ? 'Plaques' : 'Plates';
    return cat;
  };

  return (
    <section id="catalog" className="py-12 sm:py-20 bg-slate-50/60 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Top Filter Bar: Horizontal Scroll Categories + Sort Pill */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Horizontal scrollable category pills */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none select-none">
            {categoryKeys.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`py-2 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0066FF] text-white shadow-sm shadow-blue-500/25'
                      : 'text-slate-600 hover:text-slate-900 bg-transparent hover:bg-slate-200/50'
                  }`}
                >
                  {getCategoryLabel(cat)}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown Pill */}
          <div className="relative self-end md:self-auto shrink-0">
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-semibold shadow-xs hover:border-slate-300 transition-colors cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>{sortLabels[sortOption]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>

            {sortDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setSortDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30 animate-scale-up">
                  {(['price_asc', 'price_desc', 'popular', 'newest'] as SortOption[]).map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortOption(option);
                        setSortDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                        sortOption === option ? 'text-[#0066FF] bg-blue-50/50 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>{sortLabels[option]}</span>
                      {sortOption === option && <Check className="w-3.5 h-3.5 text-[#0066FF]" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* 2-Column Grid on ALL Devices (Mobile + Tablet + Desktop) */}
        {filtered.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl border border-slate-200 text-center space-y-3">
            <ShoppingBag className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              {lang === 'fr' ? 'Aucun produit dans cette catégorie' : 'No products in this category'}
            </h3>
            <button
              onClick={() => setActiveCategory('all')}
              className="py-2 px-4 rounded-full bg-[#0066FF] text-white text-xs font-bold shadow-sm"
            >
              {lang === 'fr' ? 'Voir tous les produits' : 'View all products'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {filtered.map((product) => (
              <ProductCardItem
                key={product.id}
                product={product}
                whatsappPhone={whatsappPhone}
                lang={lang}
                onOpenDetails={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}

        {/* Custom Logo / Corporate Inquiries Banner */}
        <div className="mt-8 max-w-5xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50/70 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
              {lang === 'fr'
                ? 'Besoin d\'un logo personnalisé ou d\'une commande flotte entreprise ?'
                : 'Need a custom logo or corporate fleet order?'}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-600 max-w-xl">
              {lang === 'fr'
                ? 'Nous personnalisons vos cartes NFC avec votre charte graphique, logo gravé au laser et QR codes dynamiques pour vos équipes.'
                : 'We design custom branded NFC cards with your corporate color scheme, laser engraving, and custom QR codes for your entire team.'}
            </p>
          </div>

          <a
            href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
              lang === 'fr'
                ? 'Bonjour Touchbizz, je souhaite obtenir un devis personnalisé pour une commande entreprise.'
                : 'Hello Touchbizz, I would like a custom quote for a corporate order.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-4 sm:px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-[11px] sm:text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all shadow-sm cursor-pointer"
          >
            <span>{lang === 'fr' ? 'Devis sur WhatsApp' : 'Quote on WhatsApp'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        settings={settings}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        lang={lang}
      />
    </section>
  );
};
