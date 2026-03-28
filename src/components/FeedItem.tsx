import React, { useState, useEffect, useRef } from 'react';
import { Share, Music2, ChevronLeft, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';

interface FeedItemProps {
  id: string;
  caption: string;
  hashtags: string[];
  musicTitle: string;
  imageUrl: string;
  likes: string;
  isSaved?: boolean;
  onSave?: (id: string) => void;
  onSwipeMenu?: () => void;
  onView?: () => void;
}

export const FeedItem: React.FC<FeedItemProps> = ({
  id,
  caption,
  hashtags,
  musicTitle,
  imageUrl,
  likes,
  isSaved = false,
  onSave,
  onSwipeMenu,
  onView,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasViewed = useRef(false);

  useEffect(() => {
    if (!onView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasViewed.current) {
          onView();
          hasViewed.current = true;
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [onView]);

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-surface overflow-hidden snap-start">
      {/* Background Media */}
      <img
        src={imageUrl}
        alt="Feed content"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 video-overlay-gradient" />

      {/* Right Interaction Rail */}
      <div className="absolute right-4 bottom-16 flex flex-col items-center gap-6 z-40">
        <button 
          onClick={() => onSave?.(id)}
          className="flex flex-col items-center group transition-transform active:scale-90"
        >
          <div className={`w-14 h-14 glass-pill rounded-full flex items-center justify-center mb-1 border border-on-surface/10 transition-colors ${isSaved ? 'text-[#FE2C55] bg-on-surface/10' : 'text-on-surface'}`}>
            <Bookmark size={28} fill={isSaved ? "currentColor" : "none"} />
          </div>
          <span className="text-on-surface text-[10px] font-black tracking-widest uppercase text-shadow-sm">
            {isSaved ? 'Enregistré' : 'Enregistrer'}
          </span>
        </button>

        <button className="flex flex-col items-center group transition-transform active:scale-90">
          <div className="w-14 h-14 glass-pill rounded-full flex items-center justify-center text-on-surface mb-1 border border-on-surface/10">
            <Share size={28} />
          </div>
          <span className="text-on-surface text-[10px] font-black tracking-widest uppercase text-shadow-sm">Partager</span>
        </button>
      </div>

      {/* Bottom Content Info */}
      <div className="absolute left-6 bottom-16 z-40 max-w-[70%]">
        <div className="mb-4">
          <p className="text-on-surface/90 text-sm font-medium mt-1 leading-relaxed text-shadow-sm">
            {caption} {hashtags.map(tag => <span key={tag} className="font-bold">#{tag} </span>)}
          </p>
        </div>
        <div className="glass-pill px-4 py-2 rounded-full inline-flex items-center gap-2 border border-on-surface/10">
          <Music2 size={14} className="text-on-surface" />
          <span className="text-on-surface text-[10px] font-black uppercase tracking-wider overflow-hidden whitespace-nowrap">
            {musicTitle}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-0 w-full h-1 bg-on-surface/20 px-6 z-40">
        <div className="relative w-full h-full bg-on-surface/30 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "33%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 h-full bg-on-surface shadow-[0_0_10px_rgba(0,0,0,0.2)]"
          />
        </div>
      </div>
    </div>
  );
}
