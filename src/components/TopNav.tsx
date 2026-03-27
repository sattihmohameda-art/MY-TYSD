import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface TopNavProps {
  activeTab: 'glow' | 'infos' | 'detente' | 'menu';
  onTabChange: (tab: 'glow' | 'infos' | 'detente' | 'menu') => void;
}

export function TopNav({ activeTab, onTabChange }: TopNavProps) {
  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-auto flex items-center gap-3">
      <div className="glass-pill rounded-full px-2 py-1.5 flex items-center gap-1 shadow-2xl border border-on-surface/10">
        <button
          onClick={() => onTabChange('glow')}
          className={cn(
            "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
            activeTab === 'glow' ? "text-on-surface" : "text-on-surface/60 hover:text-on-surface"
          )}
        >
          Glow Up
          {activeTab === 'glow' && (
            <motion.div layoutId="activeTab" className="h-[2px] bg-on-surface mt-0.5 mx-auto w-8 rounded-full" />
          )}
        </button>
        <button
          onClick={() => onTabChange('infos')}
          className={cn(
            "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
            activeTab === 'infos' ? "text-on-surface" : "text-on-surface/60 hover:text-on-surface"
          )}
        >
          Infos
          {activeTab === 'infos' && (
            <motion.div layoutId="activeTab" className="h-[2px] bg-on-surface mt-0.5 mx-auto w-8 rounded-full" />
          )}
        </button>
        <button
          onClick={() => onTabChange('detente')}
          className={cn(
            "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
            activeTab === 'detente' ? "text-on-surface" : "text-on-surface/60 hover:text-on-surface"
          )}
        >
          Détente
          {activeTab === 'detente' && (
            <motion.div layoutId="activeTab" className="h-[2px] bg-on-surface mt-0.5 mx-auto w-8 rounded-full" />
          )}
        </button>
      </div>

      <div className="glass-pill rounded-full px-4 py-2.5 flex items-center gap-2 shadow-2xl border border-on-surface/10">
        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
        <span className="text-on-surface font-bold text-[11px] tracking-tighter">0:42</span>
      </div>
    </div>
  );
}
