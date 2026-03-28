import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface TopNavProps {
  activeTab: 'glow' | 'infos' | 'detente' | 'menu';
  onTabChange: (tab: 'glow' | 'infos' | 'detente' | 'menu') => void;
  timeLeft: number;
}

export function TopNav({ activeTab, onTabChange, timeLeft }: TopNavProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-8 left-0 right-0 z-[100] px-6 flex items-center">
      {/* Tabs in top left */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onTabChange('glow')}
          className={cn(
            "px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 text-shadow-sm",
            activeTab === 'glow' ? "text-white" : "text-white/60 hover:text-white"
          )}
        >
          Glow Up
          {activeTab === 'glow' && (
            <motion.div layoutId="activeTab" className="h-[2px] bg-white mt-0.5 mx-auto w-6 rounded-full shadow-sm" />
          )}
        </button>
        <button
          onClick={() => onTabChange('infos')}
          className={cn(
            "px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 text-shadow-sm",
            activeTab === 'infos' ? "text-white" : "text-white/60 hover:text-white"
          )}
        >
          Infos
          {activeTab === 'infos' && (
            <motion.div layoutId="activeTab" className="h-[2px] bg-white mt-0.5 mx-auto w-6 rounded-full shadow-sm" />
          )}
        </button>
        <button
          onClick={() => onTabChange('detente')}
          className={cn(
            "px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 text-shadow-sm",
            activeTab === 'detente' ? "text-white" : "text-white/60 hover:text-white"
          )}
        >
          Détente
          {activeTab === 'detente' && (
            <motion.div layoutId="activeTab" className="h-[2px] bg-white mt-0.5 mx-auto w-6 rounded-full shadow-sm" />
          )}
        </button>
      </div>

      {/* Timer in top right */}
      <div className="absolute right-6 glass-pill rounded-full px-4 py-2.5 flex items-center gap-2 shadow-2xl border border-on-surface/10">
        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
        <span className="text-on-surface font-bold text-[11px] tracking-tighter">
          {formatTime(timeLeft)}
        </span>
      </div>
    </div>
  );
}
