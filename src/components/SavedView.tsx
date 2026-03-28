import React, { useState } from 'react';
import { Bookmark, ChevronLeft, Grid, List, Trash2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FeedContent } from '../data/content';

interface SavedViewProps {
  savedItems: { item: FeedContent; category: string }[];
  onRemove: (id: string) => void;
  onBack: () => void;
}

export const SavedView: React.FC<SavedViewProps> = ({ savedItems, onRemove, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Group items by category
  const categories = savedItems.reduce((acc, { category }) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryList = Object.keys(categories);

  const filteredItems = selectedCategory 
    ? savedItems.filter(si => si.category === selectedCategory)
    : [];

  return (
    <div className="h-screen bg-surface flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-6 py-8 flex items-center justify-between border-b border-on-surface/5">
        <div className="flex items-center gap-4">
          <button 
            onClick={selectedCategory ? () => setSelectedCategory(null) : onBack}
            className="w-10 h-10 rounded-full bg-on-surface/5 flex items-center justify-center text-on-surface/60 hover:text-on-surface transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">
              {selectedCategory || 'Enregistrements'}
            </h2>
            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
              {selectedCategory ? `${filteredItems.length} éléments` : `${savedItems.length} éléments au total`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-on-surface/5 flex items-center justify-center text-on-surface/40">
            <Grid size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div 
              key="categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 gap-4"
            >
              {categoryList.length > 0 ? (
                categoryList.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="aspect-square bg-on-surface/5 rounded-3xl p-6 flex flex-col justify-between group hover:bg-on-surface/10 transition-all border border-on-surface/5"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-on-surface/10 flex items-center justify-center text-on-surface/60 group-hover:scale-110 transition-transform">
                      <Bookmark size={24} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-black uppercase italic text-sm tracking-tight leading-none mb-1">{category}</h3>
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                        {categories[category]} {categories[category] > 1 ? 'éléments' : 'élément'}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="col-span-2 py-20 flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <Bookmark size={48} strokeWidth={1} />
                  <p className="text-sm font-medium max-w-[200px]">
                    Vous n'avez pas encore d'enregistrements.
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="items"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {filteredItems.map(({ item }) => (
                <div 
                  key={item.id}
                  className="bg-on-surface/5 rounded-2xl overflow-hidden border border-on-surface/5 flex items-center p-3 gap-4 group"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-on-surface/10">
                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium line-clamp-2 leading-relaxed mb-2">
                      {item.caption}
                    </p>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-[10px] font-bold text-on-surface-variant hover:text-[#FE2C55] flex items-center gap-1 transition-colors uppercase tracking-widest"
                      >
                        <Trash2 size={12} />
                        Supprimer
                      </button>
                      <button className="text-[10px] font-bold text-on-surface-variant hover:text-on-surface flex items-center gap-1 transition-colors uppercase tracking-widest">
                        <ExternalLink size={12} />
                        Voir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
