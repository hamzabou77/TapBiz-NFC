import React, { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  Star,
  Check,
  X,
  ExternalLink,
  MessageSquare,
  Tag,
  Sparkles,
  Search,
  Image as ImageIcon,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Product, SiteSettings } from '../../types';

interface ProductManagementProps {
  products: Product[];
  settings: SiteSettings;
  onCreateProduct: (data: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onUpdateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
}

export const ProductManagement: React.FC<ProductManagementProps> = ({
  products,
  settings,
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Form State
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(150);
  const [category, setCategory] = useState<string>('Cartes');
  const [badge, setBadge] = useState<string>('');
  const [imageUrlsText, setImageUrlsText] = useState<string>('');
  const [isPopular, setIsPopular] = useState<boolean>(false);
  const [featuresText, setFeaturesText] = useState<string>('');

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const openCreateModal = () => {
    setEditingProduct(null);
    setTitle('');
    setDescription('');
    setPrice(150);
    setCategory('Cartes');
    setBadge('');
    setImageUrlsText(
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80\nhttps://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80'
    );
    setIsPopular(false);
    setFeaturesText(
      'Puce NFC haute sensibilité 100% smartphones\nQR Code dynamique haute définition\nProfil digital modifiable en ligne sans réimpression\nBouton 1-clic Enregistrer le Contact (vCard)'
    );
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category);
    setBadge(product.badge || '');
    const imgs = product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls
      : [product.imageUrl || ''];
    setImageUrlsText(imgs.filter(Boolean).join('\n'));
    setIsPopular(Boolean(product.isPopular));
    setFeaturesText((product.features || []).join('\n'));
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSaving(true);
    try {
      const parsedImageUrls = imageUrlsText
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const parsedFeatures = featuresText
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const defaultImg =
        parsedImageUrls[0] ||
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';

      const payload = {
        title: title.trim(),
        description: description.trim(),
        price: Number(price) || 150,
        category: category.trim(),
        badge: badge.trim() || undefined,
        imageUrl: defaultImg,
        imageUrls: parsedImageUrls.length > 0 ? parsedImageUrls : [defaultImg],
        isPopular,
        features: parsedFeatures,
      };

      if (editingProduct) {
        await onUpdateProduct(editingProduct.id, payload);
      } else {
        await onCreateProduct(payload);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving product:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, productTitle: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${productTitle}" ?`)) {
      await onDeleteProduct(id);
    }
  };

  const handleTogglePopular = async (product: Product) => {
    await onUpdateProduct(product.id, { isPopular: !product.isPopular });
  };

  const whatsappPhone = settings.contact_whatsapp.replace(/[^0-9]/g, '') || '212620799395';

  return (
    <div id="product-management-root" className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Catalogue &amp; E-commerce Touchbizz</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Gestion de la Boutique &amp; Produits NFC
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Gérez vos cartes NFC, plaques d'avis Google Reviews et accessoires affichés sur la page d'accueil.
          </p>
        </div>

        <button
          id="add-new-product-btn"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-[#0066FF] hover:bg-blue-700 active:scale-98 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un Produit</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-2 px-4 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'Tous les Produits' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Aucun produit trouvé</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? `Aucun produit ne correspond à "${searchQuery}".`
              : 'Ajoutez votre premier produit NFC pour commencer à vendre.'}
          </p>
          <button
            onClick={openCreateModal}
            className="py-2.5 px-5 rounded-xl bg-[#0066FF] text-white text-xs font-bold shadow-md shadow-blue-600/20 cursor-pointer"
          >
            Créer un Produit
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const waLink = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
              `Bonjour Touchbizz, je souhaite commander : ${product.title} (${product.price} MAD)`
            )}`;

            const displayImage =
              (product.imageUrls && product.imageUrls[0]) ||
              product.imageUrl ||
              'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';

            return (
              <div
                key={product.id}
                id={`admin-product-card-${product.id}`}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                {/* Product Image & Badges */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={displayImage}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="py-1 px-2.5 rounded-lg bg-white/90 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-sm">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="py-1 px-2.5 rounded-lg bg-blue-600 text-white text-[11px] font-bold shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    {product.isPopular && (
                      <span className="py-1 px-2.5 rounded-lg bg-emerald-500 text-white text-[11px] font-bold shadow-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Recommandé
                      </span>
                    )}
                  </div>

                  {/* Quick toggle star */}
                  <button
                    onClick={() => handleTogglePopular(product)}
                    title={product.isPopular ? 'Retirer la recommandation' : 'Marquer comme Best Seller'}
                    className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-colors cursor-pointer ${
                      product.isPopular
                        ? 'bg-amber-400 text-slate-950 shadow-md'
                        : 'bg-white/80 text-slate-400 hover:text-amber-500'
                    }`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <h3 className="text-base font-bold text-slate-900 leading-snug">{product.title}</h3>
                      <div className="text-lg font-extrabold text-[#10B981] shrink-0">
                        {product.price} <span className="text-xs">MAD</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    {product.imageUrls && product.imageUrls.length > 1 && (
                      <div className="mt-2 text-[11px] text-blue-600 font-semibold flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        <span>{product.imageUrls.length} photos dans le carrousel</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors"
                      title="Tester la commande WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Test WhatsApp</span>
                    </a>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Modifier"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.title)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal / Dialog Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-scale-up">
            {/* Modal Header */}
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0066FF] text-white flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingProduct ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Titre du Produit *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex. Carte NFC Simple Noire"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Prix (MAD) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#10B981] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Catégorie *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  >
                    <option value="Cartes">Cartes</option>
                    <option value="Supports">Supports</option>
                    <option value="Plaques">Plaques</option>
                    <option value="Google Reviews">Google Reviews</option>
                    <option value="Bracelets">Bracelets</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Badge Optionnel (ex. CLASSIQUE, SOCIAL, NOUVEAU)
                </label>
                <input
                  type="text"
                  placeholder="ex. CLASSIQUE ou SOCIAL"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Images du Carrousel (1 URL par ligne)
                </label>
                <textarea
                  rows={3}
                  placeholder="https://images.unsplash.com/photo-1...&#10;https://images.unsplash.com/photo-2..."
                  value={imageUrlsText}
                  onChange={(e) => setImageUrlsText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description Complète
                </label>
                <textarea
                  rows={3}
                  placeholder="Description détaillée du produit pour le bouton 'Voir détails'..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Caractéristiques &amp; Avantages (1 ligne par point)
                </label>
                <textarea
                  rows={3}
                  placeholder="Puce NFC universelle 100% compatible&#10;QR Code dynamique au verso&#10;Profil modifiable en ligne sans réimpression"
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Mettre en avant comme "Produit Recommandé / Populaire"
                  </span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="py-2.5 px-6 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? 'Enregistrement...' : editingProduct ? 'Enregistrer les Modifications' : 'Créer le Produit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
