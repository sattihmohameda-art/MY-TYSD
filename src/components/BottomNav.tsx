import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Map, MessageCircle, User, Grid3x3 } from 'lucide-react';
import { cn } from '../lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const NAV_ITEMS = [
  { id: 'glow', icon: Sparkles },
  { id: 'maps', icon: Map },
  { id: 'message', icon: MessageCircle },
  { id: 'menu', icon: Grid3x3 },
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-24 bg-transparent z-[100] flex items-center justify-center pointer-events-none">
      <div className="flex items-end gap-3 p-3 bg-white/60 backdrop-blur-xl border border-black/5 rounded-3xl shadow-2xl shadow-black/10 pointer-events-auto">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "relative flex flex-col items-center justify-center text-black/40 w-16 h-16 hover:text-black transition-colors group",
              { '!text-black': activeTab === item.id }
            )}
          >
            <item.icon size={28} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-nav-indicator"
                className="absolute bottom-1 w-5 h-1 bg-black rounded-full"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
