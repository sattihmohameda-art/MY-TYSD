import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingCart, Menu, ChevronRight, 
  Clock, Flame, Tag, Star, ArrowLeft,
  Smartphone, Laptop, Home, Shirt, Heart, Gift,
  Watch, Briefcase, Footprints, Wrench, Car, Baby,
  Book, Coffee, Dog, X, TrendingUp, Truck, ShieldCheck,
  Music, Flower, ShoppingBag, Utensils, Zap, BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Price {
  country: string;
  flag: string;
  value: number;
  url: string;
  shipping: number;
  deliveryTime: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  prices: Price[];
  rating: number;
  reviews: number;
  soldCount: string;
  category: string;
  isFlashSale?: boolean;
  freeShipping?: boolean;
}

interface CartItem extends Product {
  quantity: number;
  selectedPriceIndex: number;
}

const SHOP_CATEGORIES = [
  { id: 'all', label: 'Tout', icon: TrendingUp, color: '#FE2C55', url: 'https://www.amazon.fr' },
  { id: 'electronics', label: 'High-Tech', icon: Smartphone, color: '#32CD32', url: 'https://www.amazon.fr/electronics/b?node=13921051' },
  { id: 'computers', label: 'Informatique', icon: Laptop, color: '#4169E1', url: 'https://www.amazon.fr/computers/b?node=340858031' },
  { id: 'home', label: 'Cuisine & Maison', icon: Home, color: '#FFA500', url: 'https://www.amazon.fr/Home-Kitchen/b?node=57004031' },
  { id: 'beauty', label: 'Beauté', icon: Heart, color: '#FF69B4', url: 'https://www.amazon.fr/Beauty/b?node=197859031' },
  { id: 'fashion', label: 'Mode', icon: Shirt, color: '#FF1493', url: 'https://www.amazon.fr/Fashion/b?node=119615031' },
  { id: 'toys', label: 'Jeux & Jouets', icon: Gift, color: '#FF4500', url: 'https://www.amazon.fr/Toys-Games/b?node=2066175031' },
  { id: 'sports', label: 'Sports', icon: Flame, color: '#FF8C00', url: 'https://www.amazon.fr/Sports-Outdoors/b?node=325614031' },
  { id: 'pets', label: 'Animalerie', icon: Dog, color: '#A0522D', url: 'https://www.amazon.fr/Pet-Supplies/b?node=2066173031' },
  { id: 'auto', label: 'Auto & Moto', icon: Car, color: '#708090', url: 'https://www.amazon.fr/Automotive/b?node=15712441' },
  { id: 'tools', label: 'Bricolage', icon: Wrench, color: '#B22222', url: 'https://www.amazon.fr/Tools-Home-Improvement/b?node=185451031' },
  { id: 'baby', label: 'Bébé', icon: Baby, color: '#87CEEB', url: 'https://www.amazon.fr/Baby/b?node=2066177031' },
  { id: 'books', label: 'Livres', icon: BookOpen, color: '#8B4513', url: 'https://www.amazon.fr/Books/b?node=301061' },
  { id: 'music', label: 'Musique', icon: Music, color: '#9370DB', url: 'https://www.amazon.fr/Music/b?node=301062' },
  { id: 'grocery', label: 'Épicerie', icon: Utensils, color: '#228B22', url: 'https://www.amazon.fr/Grocery/b?node=2454170031' },
  { id: 'health', label: 'Santé', icon: ShieldCheck, color: '#4682B4', url: 'https://www.amazon.fr/Health-Personal-Care/b?node=197861031' },
  { id: 'garden', label: 'Jardin', icon: Flower, color: '#3CB371', url: 'https://www.amazon.fr/Garden-Outdoors/b?node=570041' },
  { id: 'office', label: 'Bureau', icon: Briefcase, color: '#696969', url: 'https://www.amazon.fr/Office-Products/b?node=192420031' },
  { id: 'lighting', label: 'Luminaire', icon: Zap, color: '#FFD700', url: 'https://www.amazon.fr/Lighting/b?node=2454172031' },
  { id: 'shoes', label: 'Chaussures', icon: Footprints, color: '#8B0000', url: 'https://www.amazon.fr/Shoes/b?node=215934031' },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Projecteur Galaxie LED - Ambiance TikTok Viral 2024',
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=500',
    category: 'electronics',
    rating: 4.9,
    reviews: 4500,
    soldCount: '15.2k+',
    isFlashSale: true,
    freeShipping: true,
    prices: [
      { country: 'France', flag: '🇫🇷', value: 24.99, url: 'https://www.amazon.fr/dp/B08Y8H5K8G', shipping: 0, deliveryTime: '2-3 jours' },
      { country: 'Allemagne', flag: '🇩🇪', value: 22.50, url: 'https://www.amazon.de/dp/B08Y8H5K8G', shipping: 4.99, deliveryTime: '3-5 jours' },
      { country: 'Espagne', flag: '🇪🇸', value: 26.00, url: 'https://www.amazon.es/dp/B08Y8H5K8G', shipping: 5.50, deliveryTime: '4-6 jours' },
      { country: 'Italie', flag: '🇮🇹', value: 25.99, url: 'https://www.amazon.it/dp/B08Y8H5K8G', shipping: 5.99, deliveryTime: '4-6 jours' },
    ]
  },
  {
    id: '2',
    name: 'Gua Sha en Quartz Rose - Soin Visage Naturel & Liftant',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=500',
    category: 'beauty',
    rating: 4.8,
    reviews: 2100,
    soldCount: '8.4k+',
    freeShipping: true,
    prices: [
      { country: 'France', flag: '🇫🇷', value: 12.99, url: 'https://www.amazon.fr/dp/B08L7G8Y7G', shipping: 0, deliveryTime: '1-2 jours' },
      { country: 'Allemagne', flag: '🇩🇪', value: 11.99, url: 'https://www.amazon.de/dp/B08L7G8Y7G', shipping: 3.50, deliveryTime: '2-4 jours' },
      { country: 'Espagne', flag: '🇪🇸', value: 13.50, url: 'https://www.amazon.es/dp/B08L7G8Y7G', shipping: 3.99, deliveryTime: '3-5 jours' },
      { country: 'Italie', flag: '🇮🇹', value: 14.00, url: 'https://www.amazon.it/dp/B08L7G8Y7G', shipping: 4.50, deliveryTime: '3-5 jours' },
    ]
  },
  {
    id: '3',
    name: 'Mini Aspirateur de Bureau Sans Fil - Puissant & Compact',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=500',
    category: 'home',
    rating: 4.7,
    reviews: 890,
    soldCount: '3.1k+',
    isFlashSale: true,
    prices: [
      { country: 'France', flag: '🇫🇷', value: 15.99, url: 'https://www.amazon.fr/dp/B09B8H5K8G', shipping: 2.99, deliveryTime: '2-3 jours' },
      { country: 'Allemagne', flag: '🇩🇪', value: 14.99, url: 'https://www.amazon.de/dp/B09B8H5K8G', shipping: 3.99, deliveryTime: '3-5 jours' },
      { country: 'Espagne', flag: '🇪🇸', value: 16.50, url: 'https://www.amazon.es/dp/B09B8H5K8G', shipping: 4.50, deliveryTime: '4-6 jours' },
      { country: 'Italie', flag: '🇮🇹', value: 17.00, url: 'https://www.amazon.it/dp/B09B8H5K8G', shipping: 4.99, deliveryTime: '4-6 jours' },
    ]
  },
  {
    id: '4',
    name: 'Écouteurs Bluetooth Pro - Réduction de Bruit Active',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=500',
    category: 'electronics',
    rating: 4.9,
    reviews: 12000,
    soldCount: '50k+',
    freeShipping: true,
    prices: [
      { country: 'France', flag: '🇫🇷', value: 49.99, url: 'https://www.amazon.fr/dp/B07ZPC9QD4', shipping: 0, deliveryTime: '1-2 jours' },
      { country: 'Allemagne', flag: '🇩🇪', value: 45.00, url: 'https://www.amazon.de/dp/B07ZPC9QD4', shipping: 4.99, deliveryTime: '2-4 jours' },
      { country: 'Espagne', flag: '🇪🇸', value: 52.00, url: 'https://www.amazon.es/dp/B07ZPC9QD4', shipping: 5.50, deliveryTime: '3-5 jours' },
      { country: 'Italie', flag: '🇮🇹', value: 55.00, url: 'https://www.amazon.it/dp/B07ZPC9QD4', shipping: 5.99, deliveryTime: '3-5 jours' },
    ]
  },
  {
    id: '5',
    name: 'Bouteille d\'eau Motivante 2L - Sans BPA avec Paille',
    image: 'https://images.unsplash.com/photo-1602143393494-721d002d3405?auto=format&fit=crop&q=80&w=500',
    category: 'home',
    rating: 4.8,
    reviews: 3400,
    soldCount: '12k+',
    isFlashSale: true,
    prices: [
      { country: 'France', flag: '🇫🇷', value: 9.99, url: 'https://www.amazon.fr/dp/B08H93ZRK9', shipping: 2.99, deliveryTime: '2-3 jours' },
      { country: 'Allemagne', flag: '🇩🇪', value: 8.99, url: 'https://www.amazon.de/dp/B08H93ZRK9', shipping: 3.99, deliveryTime: '3-5 jours' },
      { country: 'Espagne', flag: '🇪🇸', value: 10.50, url: 'https://www.amazon.es/dp/B08H93ZRK9', shipping: 4.50, deliveryTime: '4-6 jours' },
      { country: 'Italie', flag: '🇮🇹', value: 11.00, url: 'https://www.amazon.it/dp/B08H93ZRK9', shipping: 4.99, deliveryTime: '4-6 jours' },
    ]
  },
  {
    id: '6',
    name: 'Set de Maquillage Professionnel - 12 Pinceaux Doux',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=500',
    category: 'beauty',
    rating: 4.7,
    reviews: 1500,
    soldCount: '5.2k+',
    freeShipping: true,
    prices: [
      { country: 'France', flag: '🇫🇷', value: 19.99, url: 'https://www.amazon.fr/dp/B07P7Z1Z9Z', shipping: 0, deliveryTime: '1-2 jours' },
      { country: 'Allemagne', flag: '🇩🇪', value: 18.50, url: 'https://www.amazon.de/dp/B07P7Z1Z9Z', shipping: 3.99, deliveryTime: '2-4 jours' },
      { country: 'Espagne', flag: '🇪🇸', value: 21.00, url: 'https://www.amazon.es/dp/B07P7Z1Z9Z', shipping: 4.50, deliveryTime: '3-5 jours' },
      { country: 'Italie', flag: '🇮🇹', value: 22.00, url: 'https://www.amazon.it/dp/B07P7Z1Z9Z', shipping: 4.99, deliveryTime: '3-5 jours' },
    ]
  },
  {
    id: '7',
    name: 'Masseur de Cou Intelligent - Soulagement Cervical',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=500',
    category: 'beauty',
    rating: 4.6,
    reviews: 1200,
    soldCount: '4.5k+',
    prices: [
      { country: 'France', flag: '🇫🇷', value: 29.99, url: 'https://www.amazon.fr/dp/B0869C2S2L', shipping: 0, deliveryTime: '2-3 jours' },
      { country: 'Allemagne', flag: '🇩🇪', value: 27.50, url: 'https://www.amazon.de/dp/B0869C2S2L', shipping: 4.99, deliveryTime: '3-5 jours' },
      { country: 'Espagne', flag: '🇪🇸', value: 31.00, url: 'https://www.amazon.es/dp/B0869C2S2L', shipping: 5.50, deliveryTime: '4-6 jours' },
      { country: 'Italie', flag: '🇮🇹', value: 32.00, url: 'https://www.amazon.it/dp/B0869C2S2L', shipping: 5.99, deliveryTime: '4-6 jours' },
    ]
  },
  {
    id: '8',
    name: 'Lampe de Bureau LED avec Chargeur Sans Fil',
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=500',
    category: 'electronics',
    rating: 4.8,
    reviews: 2300,
    soldCount: '9.1k+',
    freeShipping: true,
    prices: [
      { country: 'France', flag: '🇫🇷', value: 34.99, url: 'https://www.amazon.fr/dp/B08Y8H5K8G', shipping: 0, deliveryTime: '2-3 jours' },
      { country: 'Allemagne', flag: '🇩🇪', value: 32.00, url: 'https://www.amazon.de/dp/B08H93ZRK9', shipping: 4.99, deliveryTime: '3-5 jours' },
      { country: 'Espagne', flag: '🇪🇸', value: 36.00, url: 'https://www.amazon.es/dp/B08H93ZRK9', shipping: 5.50, deliveryTime: '4-6 jours' },
      { country: 'Italie', flag: '🇮🇹', value: 37.00, url: 'https://www.amazon.it/dp/B08H93ZRK9', shipping: 5.99, deliveryTime: '4-6 jours' },
    ]
  }
];

interface ShopViewProps {
  onBack: () => void;
}

export const ShopView: React.FC<ShopViewProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'products' | 'cart' | 'checkout' | 'success'>('products');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProductForCart, setSelectedProductForCart] = useState<Product | null>(null);

  const addToCart = (product: Product, priceIndex: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedPriceIndex === priceIndex);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedPriceIndex === priceIndex)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedPriceIndex: priceIndex }];
    });
    setSelectedProductForCart(null);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.prices[item.selectedPriceIndex].value * item.quantity), 0);

  const categoriesToDisplay = activeCategory === 'all' 
    ? SHOP_CATEGORIES.filter(c => c.id !== 'all')
    : SHOP_CATEGORIES.filter(c => c.id === activeCategory);

  const handleBack = () => {
    if (currentView === 'success') {
      setCart([]);
      setCurrentView('products');
    } else if (currentView === 'checkout') {
      setCurrentView('cart');
    } else if (currentView === 'cart') {
      setCurrentView('products');
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col font-sans text-[#161823] relative overflow-x-hidden">
      {/* Languette (Pull Tab) for Categories Menu */}
      {currentView === 'products' && (
        <motion.button
          initial={{ x: 0 }}
          whileHover={{ x: -8 }}
          onClick={() => setIsMenuOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-[70] bg-[#FE2C55] text-white py-4 px-1.5 rounded-l-2xl shadow-[0_0_20px_rgba(254,44,85,0.3)] flex flex-col items-center gap-2 border-y border-l border-white/20"
        >
          <div className="w-1 h-8 bg-white/30 rounded-full mb-1" />
          <Menu size={18} />
          <span className="text-[9px] font-black [writing-mode:vertical-rl] rotate-180 tracking-widest uppercase">Catégories</span>
        </motion.button>
      )}

      {/* Sliding Categories Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[80] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white z-[90] shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black italic uppercase tracking-tight">Toutes les catégories</h2>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-[#F1F1F2] rounded-full">
                  <X size={24} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-2">
                {SHOP_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                      activeCategory === cat.id 
                        ? 'border-[#FE2C55] bg-[#FE2C55]/5' 
                        : 'border-[#F1F1F2] hover:border-[#FE2C55]/30'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                      <cat.icon size={24} />
                    </div>
                    <span className="text-xs font-bold text-center">{cat.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* TikTok Style Header */}
      <header className="bg-white sticky top-0 z-[60] border-b border-[#F1F1F2]">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={handleBack} className="p-1 hover:bg-[#F1F1F2] rounded-full transition-colors">
            {currentView === 'products' ? <Home size={24} /> : <ArrowLeft size={24} />}
          </button>
          
          <div className="flex-1 relative">
            {currentView === 'products' ? (
              <>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8B91]">
                  <Search size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Rechercher sur Shop" 
                  className="w-full py-2 pl-10 pr-4 bg-[#F1F1F2] rounded-full text-sm outline-none focus:ring-1 focus:ring-[#FE2C55]/30 transition-all"
                />
              </>
            ) : (
              <h1 className="text-center font-bold text-lg">
                {currentView === 'cart' ? 'Panier' : currentView === 'checkout' ? 'Paiement' : 'Succès'}
              </h1>
            )}
          </div>

          <button 
            onClick={() => setCurrentView('cart')}
            className={`relative p-2 text-[#161823] transition-colors ${currentView === 'cart' ? 'text-[#FE2C55]' : ''}`}
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-[#FE2C55] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Category Tabs - Only in products view */}
        {currentView === 'products' && (
          <div className="overflow-x-auto scrollbar-hide bg-white">
            <div className="flex px-4 gap-6">
              {SHOP_CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                    activeCategory === cat.id ? 'border-[#FE2C55] text-[#FE2C55]' : 'border-transparent text-[#8A8B91]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-screen-xl mx-auto w-full p-3 space-y-8 pb-32">
        {currentView === 'products' && (
          <>
            {/* Live Price Update Indicator */}
            <div className="bg-white rounded-xl p-3 flex items-center justify-between border border-[#F1F1F2] shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E8F9EE] flex items-center justify-center text-[#25C960]">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold">Prix Européens Comparés</p>
                  <p className="text-[10px] text-[#8A8B91]">Actualisé il y a 1 minute</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-[#E8F9EE] text-[#25C960] rounded-md text-[10px] font-bold">
                <div className="w-1.5 h-1.5 bg-[#25C960] rounded-full animate-pulse" />
                LIVE
              </div>
            </div>

            {/* Category Sections with Carousels */}
            {categoriesToDisplay.map(category => {
              const categoryProducts = MOCK_PRODUCTS.filter(p => p.category === category.id);
              if (categoryProducts.length === 0) return null;

              return (
                <section key={category.id} className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-5 bg-[#FE2C55] rounded-full" />
                      <h3 className="text-lg font-black italic uppercase tracking-tight">{category.label}</h3>
                    </div>
                    <button className="text-[#FE2C55] text-xs font-bold flex items-center gap-1">
                      Voir tout <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="overflow-x-auto scrollbar-hide -mx-3 px-3">
                    <div className="flex gap-4 pb-4">
                      {categoryProducts.map(product => (
                        <motion.div 
                          key={product.id}
                          whileTap={{ scale: 0.98 }}
                          className="min-w-[180px] w-[180px] bg-white rounded-2xl overflow-hidden shadow-sm border border-[#F1F1F2] flex flex-col group"
                        >
                          <div className="relative aspect-square">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                            {product.isFlashSale && (
                              <div className="absolute top-2 left-2 bg-[#FE2C55] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm">
                                -50%
                              </div>
                            )}
                            {product.freeShipping && (
                              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-[#25C960] text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border border-[#25C960]/20">
                                <Truck size={10} />
                                Gratuit
                              </div>
                            )}
                            <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                              <div className="bg-black/40 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                <div className="w-1 h-1 bg-[#25C960] rounded-full animate-pulse" />
                                LIVE
                              </div>
                              <div className="bg-[#FE2C55]/10 backdrop-blur-sm text-[#FE2C55] text-[8px] font-bold px-1.5 py-0.5 rounded border border-[#FE2C55]/20">
                                COUPON
                              </div>
                            </div>
                          </div>

                          <div className="p-3 flex-1 flex flex-col gap-1.5">
                            <h4 className="text-xs font-medium line-clamp-2 leading-relaxed text-[#161823] h-8">{product.name}</h4>
                            
                            <div className="flex items-center gap-1">
                              <div className="flex text-[#FFC107]">
                                <Star size={10} fill="currentColor" />
                              </div>
                              <span className="text-[10px] font-bold text-[#161823]">{product.rating}</span>
                              <span className="text-[10px] text-[#8A8B91] ml-1">| {product.soldCount}</span>
                            </div>

                            <div className="flex items-baseline gap-1 mt-1">
                              <span className="text-lg font-bold text-[#FE2C55]">{product.prices[0].value}€</span>
                              <span className="text-[10px] text-[#8A8B91] line-through">{(product.prices[0].value * 2).toFixed(2)}€</span>
                            </div>

                            {/* European Price Comparison - Compact Grid */}
                            <div className="mt-2 pt-2 border-t border-[#F1F1F2] space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <Book size={10} className="text-[#25C960] animate-pulse" />
                                  <p className="text-[8px] font-black text-[#8A8B91] uppercase tracking-wider">Prix Europe</p>
                                </div>
                                <div className="w-1.5 h-1.5 bg-[#25C960] rounded-full animate-ping" />
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                {product.prices.slice(0, 4).map((price, idx) => (
                                  <button 
                                    key={idx} 
                                    onClick={() => window.open(price.url, '_blank')}
                                    className="flex items-center justify-between bg-[#F8F8F8] px-1 py-0.5 rounded border border-[#F1F1F2]/50 hover:border-[#FE2C55]/30 transition-colors"
                                  >
                                    <span className="text-[8px]">{price.flag}</span>
                                    <span className="text-[8px] font-bold text-[#161823]">{price.value}€</span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="mt-3">
                              <button 
                                onClick={() => setSelectedProductForCart(product)}
                                className="w-full bg-[#FE2C55] text-white py-2 rounded-xl font-bold text-xs hover:bg-[#E62A4D] transition-colors flex items-center justify-center gap-2 shadow-sm shadow-[#FE2C55]/20"
                              >
                                <ShoppingCart size={14} />
                                Ajouter au panier
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </>
        )}

        {currentView === 'cart' && (
          <div className="space-y-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#8A8B91] space-y-4">
                <ShoppingBag size={64} strokeWidth={1} />
                <p className="font-medium">Votre panier est vide</p>
                <button 
                  onClick={() => setCurrentView('products')}
                  className="text-[#FE2C55] font-bold text-sm"
                >
                  Découvrir des produits
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-white rounded-2xl p-4 flex gap-4 border border-[#F1F1F2]">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-bold line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-[#8A8B91]">{item.prices[item.selectedPriceIndex].country}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#FE2C55] font-bold">{item.prices[item.selectedPriceIndex].value}€</span>
                          <div className="flex items-center gap-3 bg-[#F1F1F2] rounded-full px-3 py-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="text-lg font-bold">-</button>
                            <span className="text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="text-lg font-bold">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[#F1F1F2] space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8A8B91]">Sous-total</span>
                    <span className="font-bold">{cartTotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8A8B91]">Livraison</span>
                    <span className="text-[#25C960] font-bold">Gratuit</span>
                  </div>
                  <div className="pt-4 border-t border-[#F1F1F2] flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="text-2xl font-black text-[#FE2C55]">{cartTotal.toFixed(2)}€</span>
                  </div>
                  <button 
                    onClick={() => setCurrentView('checkout')}
                    className="w-full bg-[#FE2C55] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-[#FE2C55]/20"
                  >
                    Passer à la caisse
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {currentView === 'checkout' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#F1F1F2] space-y-6">
              <h3 className="font-black italic uppercase tracking-tight flex items-center gap-2">
                <Truck size={20} className="text-[#FE2C55]" />
                Adresse de livraison
              </h3>
              <div className="space-y-4">
                <input type="text" placeholder="Nom complet" className="w-full p-4 bg-[#F1F1F2] rounded-xl outline-none text-sm" />
                <input type="text" placeholder="Adresse" className="w-full p-4 bg-[#F1F1F2] rounded-xl outline-none text-sm" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Code postal" className="w-full p-4 bg-[#F1F1F2] rounded-xl outline-none text-sm" />
                  <input type="text" placeholder="Ville" className="w-full p-4 bg-[#F1F1F2] rounded-xl outline-none text-sm" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#F1F1F2] space-y-6">
              <h3 className="font-black italic uppercase tracking-tight flex items-center gap-2">
                <ShieldCheck size={20} className="text-[#FE2C55]" />
                Méthode de paiement
              </h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border-2 border-[#FE2C55] bg-[#FE2C55]/5 rounded-xl cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-[#161823] rounded flex items-center justify-center text-white text-[8px] font-bold">VISA</div>
                    <span className="text-sm font-bold">Carte de crédit</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-4 border-[#FE2C55] bg-white" />
                </label>
                <label className="flex items-center justify-between p-4 border-2 border-[#F1F1F2] rounded-xl cursor-not-allowed opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-[#0070BA] rounded flex items-center justify-center text-white text-[8px] font-bold italic">PayPal</div>
                    <span className="text-sm font-bold">PayPal</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-[#F1F1F2]" />
                </label>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#F1F1F2] space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-bold">Total à payer</span>
                <span className="text-2xl font-black text-[#FE2C55]">{cartTotal.toFixed(2)}€</span>
              </div>
              <button 
                onClick={() => setCurrentView('success')}
                className="w-full bg-[#161823] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
              >
                Payer maintenant
              </button>
              <p className="text-[10px] text-[#8A8B91] text-center px-4">
                En cliquant sur "Payer maintenant", vous acceptez nos conditions générales de vente.
              </p>
            </div>
          </div>
        )}

        {currentView === 'success' && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="w-24 h-24 bg-[#E8F9EE] rounded-full flex items-center justify-center text-[#25C960]">
              <ShieldCheck size={48} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black italic uppercase tracking-tight">Commande validée !</h2>
              <p className="text-sm text-[#8A8B91] px-10">
                Votre commande a été enregistrée. Vous allez être redirigé vers Amazon pour finaliser le paiement sécurisé.
              </p>
            </div>
            <div className="w-full max-w-xs space-y-3">
              <button 
                onClick={() => {
                  window.open(cart[0]?.prices[0].url, '_blank');
                  setCart([]);
                  setCurrentView('products');
                }}
                className="w-full bg-[#FE2C55] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-[#FE2C55]/20"
              >
                Aller sur Amazon
              </button>
              <button 
                onClick={() => {
                  setCart([]);
                  setCurrentView('products');
                }}
                className="w-full text-[#161823] font-bold text-sm py-2"
              >
                Retour à la boutique
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Country Selection Modal */}
      <AnimatePresence>
        {selectedProductForCart && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProductForCart(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-black text-[#161823] uppercase tracking-tight">Choisir le pays</h3>
                  <button 
                    onClick={() => setSelectedProductForCart(null)}
                    className="p-2 hover:bg-[#F1F1F2] rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  {selectedProductForCart.prices.map((price, idx) => (
                    <button
                      key={idx}
                      onClick={() => addToCart(selectedProductForCart, idx)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl border border-[#F1F1F2] hover:border-[#FE2C55] hover:bg-[#FE2C55]/5 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{price.flag}</span>
                        <div className="text-left">
                          <p className="text-sm font-bold text-[#161823]">{price.country}</p>
                          <p className="text-[10px] text-[#8A8B91]">Livraison: {price.deliveryTime || '2-3 jours'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-[#FE2C55]">{price.value}€</p>
                        <p className="text-[10px] text-[#25C960] font-bold">
                          {price.shipping === 0 || !price.shipping ? 'Livraison gratuite' : `+${price.shipping}€ livraison`}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Search Bar - TikTok Style - Only in products view */}
      {currentView === 'products' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#F1F1F2] p-4 z-[60] md:hidden">
          <div className="bg-[#F1F1F2] rounded-full flex items-center px-4 py-2 gap-3">
            <Search size={18} className="text-[#8A8B91]" />
            <input 
              type="text" 
              placeholder="Trouver des pépites..." 
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <button className="bg-[#FE2C55] text-white px-4 py-1 rounded-full text-xs font-bold">
              Rechercher
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
