import React, { useState } from 'react';
import { Home, MessageSquare, MapPin, Bookmark, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tab } from '../data/content';

interface SideActionsProps {
  onSelectTab: (tab: Tab) => void;
  activeTab: Tab;
}

export const SideActions: React.FC<SideActionsProps> = ({ onSelectTab, activeTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center pointer-events-none">
      {/* Languette (Pull Tab) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={false}
        animate={{ x: isOpen ? -60 : 0 }}
        className="pointer-events-auto bg-on-surface/10 backdrop-blur-xl border border-on-surface/20 py-8 px-1.5 rounded-l-2xl shadow-lg text-on-surface/60 hover:text-on-surface transition-colors flex flex-col items-center gap-1 group"
      >
        <div className="w-1 h-8 bg-on-surface/20 rounded-full group-hover:bg-on-surface/40 transition-colors" />
        {isOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </motion.button>

      {/* Side Actions Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-on-surface/5 backdrop-blur-2xl border-y border-l border-on-surface/10 py-6 px-2 rounded-l-3xl shadow-2xl flex flex-col gap-8 items-center text-on-surface/70 pointer-events-auto"
          >
            <button 
              onClick={() => onSelectTab('menu')} 
              className={`hover:text-on-surface transition-all transform hover:scale-110 ${activeTab === 'menu' ? 'text-on-surface' : ''}`}
              title="Accueil"
            >
              <Home size={22} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => onSelectTab('message')} 
              className={`hover:text-on-surface transition-all transform hover:scale-110 ${activeTab === 'message' ? 'text-on-surface' : ''}`}
              title="Messages"
            >
              <MessageSquare size={22} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => onSelectTab('maps')} 
              className={`hover:text-on-surface transition-all transform hover:scale-110 ${activeTab === 'maps' ? 'text-on-surface' : ''}`}
              title="Carte"
            >
              <MapPin size={22} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => onSelectTab('enregistrement')} 
              className={`hover:text-on-surface transition-all transform hover:scale-110 ${activeTab === 'enregistrement' ? 'text-on-surface' : ''}`}
              title="Enregistrements"
            >
              <Bookmark size={22} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => onSelectTab('boutique')} 
              className={`hover:text-on-surface transition-all transform hover:scale-110 ${activeTab === 'boutique' ? 'text-on-surface' : ''}`}
              title="Boutique"
            >
              <ShoppingBag size={22} strokeWidth={2.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
