import React from 'react';
import { ArrowLeft, MessageSquare, Bookmark, ShoppingBag, MapPin, Users, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface MenuViewProps {
  onBack: () => void;
  onSelectTab: (tab: any) => void;
}

const CATEGORIES = [
  { id: 'message', label: 'Message', icon: MessageSquare },
  { id: 'enregistrement', label: 'Enregistrement', icon: Bookmark },
  { id: 'boutique', label: 'TYDS SHOP', icon: ShoppingBag },
  { id: 'maps', label: 'Maps', icon: MapPin },
  { id: 'parental', label: 'Mode Parental', icon: Users },
] as const;

export const MenuView: React.FC<MenuViewProps> = ({ onBack, onSelectTab }) => {
  return (
    <div className="min-h-screen bg-white pt-6 px-6 pb-32 relative flex flex-col">
      <div className="max-w-screen-md mx-auto w-full flex-grow">
        {/* Header with centered MY TYSD */}
        <div className="relative flex items-center justify-center mb-20 py-4">
          <div className="absolute left-0">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-black font-bold uppercase tracking-widest text-[9px] hover:opacity-70 transition-opacity"
            >
              <ArrowLeft size={16} />
              Retour
            </button>
          </div>

          <h1 className="font-headline text-lg font-black tracking-tighter text-black">
            MY TYSD
          </h1>

          <div className="absolute right-0">
            <div className="flex items-center gap-2 bg-on-surface/[0.03] px-3 py-1.5 rounded-full border border-on-surface/5">
              <div className="w-5 h-5 bg-on-surface rounded-full flex items-center justify-center text-surface font-black text-[10px]">
                T
              </div>
              <span className="font-headline font-bold text-on-surface text-[10px] tracking-tight">1,250</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-12 mb-20 pl-2">
          {CATEGORIES.map((cat, index) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectTab(cat.id)}
              className="group flex items-center gap-6 text-left w-full"
            >
              <div className="w-8 flex justify-center items-center">
                <cat.icon size={22} className="text-on-surface/30 group-hover:text-on-surface transition-colors" strokeWidth={2} />
              </div>
              <h3 className="font-headline text-xl font-black text-on-surface hover:opacity-50 transition-opacity uppercase tracking-[0.05em]">
                {cat.label}
              </h3>
            </motion.button>
          ))}
        </div>

        <div className="flex justify-center mb-16">
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 bg-on-surface text-surface px-10 py-3.5 rounded-2xl font-headline font-bold uppercase tracking-widest text-[11px] hover:opacity-90 transition-opacity shadow-lg shadow-on-surface/10"
          >
            <Users size={16} />
            Communauté
          </motion.button>
        </div>
      </div>

      <div className="max-w-screen-md mx-auto w-full mt-auto pb-10 px-6">
        <div className="h-[1px] bg-on-surface/[0.03] w-full mb-6" />
        <div className="flex items-center justify-center gap-3 text-on-surface/20 text-[8px] font-bold uppercase tracking-[0.4em]">
          <span>CH</span>
          <span className="text-[10px] grayscale-0">🇨🇭</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={10} strokeWidth={1.5} />
            Stockage de données en suisse protection
          </span>
          <span className="text-[10px] grayscale-0">🇨🇭</span>
          <span>CH</span>
        </div>
      </div>
    </div>
  );
};
