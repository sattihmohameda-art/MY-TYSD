import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const be = twMerge;

const Header = ({ activeTab, onTabChange, timeLeft }) => {
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const activeClass = "text-black";
    const inactiveClass = "hover:text-black";
    const baseButtonClass = "px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300";
    const pillClass = "bg-black";

    return (
        <div className="fixed top-8 left-0 right-0 z-[100] px-6 flex items-center justify-between">
            <div className="flex items-center gap-1">
                <button onClick={() => onTabChange('glow')} className={be(baseButtonClass, activeTab === 'glow' ? activeClass : `text-black/60 ${inactiveClass}`)}>
                    Glow Up
                    {activeTab === 'glow' && <motion.div layoutId="activeTab" className={be("h-[2px] mt-0.5 mx-auto w-6 rounded-full shadow-sm", pillClass)} />}
                </button>
                <button onClick={() => onTabChange('infos')} className={be(baseButtonClass, activeTab === 'infos' ? activeClass : `text-black/60 ${inactiveClass}`)}>
                    Infos
                    {activeTab === 'infos' && <motion.div layoutId="activeTab" className={be("h-[2px] mt-0.5 mx-auto w-6 rounded-full shadow-sm", pillClass)} />}
                </button>
                <button onClick={() => onTabChange('detente')} className={be(baseButtonClass, activeTab === 'detente' ? activeClass : `text-black/60 ${inactiveClass}`)}>
                    Détente
                    {activeTab === 'detente' && <motion.div layoutId="activeTab" className={be("h-[2px] mt-0.5 mx-auto w-6 rounded-full shadow-sm", pillClass)} />}
                </button>
            </div>
            <div className="flex items-center gap-4">
                <div className="glass-pill rounded-full px-4 py-2.5 flex items-center gap-2 shadow-2xl border border-on-surface/10">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                    <span className={be("font-bold text-[11px] tracking-tighter", "text-black")}>{formatTime(timeLeft)}</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
