import React from 'react';
import { Star, Share2, Music2, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface FeedItemProps {
  caption: string;
  hashtags: string[];
  musicTitle: string;
  imageUrl: string;
  likes: string;
  onSwipeMenu?: () => void;
}

export const FeedItem: React.FC<FeedItemProps> = ({
  caption,
  hashtags,
  musicTitle,
  imageUrl,
  likes,
  onSwipeMenu,
}) => {
  return (
    <div className="relative h-screen w-full bg-surface overflow-hidden snap-start">
      {/* Background Media */}
      <img
        src={imageUrl}
        alt="Feed content"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 video-overlay-gradient" />

      {/* Swipe Button - Centered Right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-50">
        <motion.button 
          drag="x"
          dragConstraints={{ left: -80, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -30) {
              onSwipeMenu?.();
            }
          }}
          onClick={onSwipeMenu}
          className="group relative flex items-center"
        >
          <div className="bg-on-surface/5 backdrop-blur-xl border-y border-l border-on-surface/10 py-6 px-1 rounded-l-2xl shadow-xl flex items-center justify-center text-on-surface/70 group-hover:bg-on-surface/10 group-hover:text-on-surface transition-all">
            <motion.div 
              animate={{ x: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronLeft size={24} strokeWidth={2.5} className="drop-shadow-[0_0_4px_rgba(0,0,0,0.1)]" />
            </motion.div>
          </div>
        </motion.button>
      </div>

      {/* Right Interaction Rail */}
      <div className="absolute right-4 bottom-16 flex flex-col items-center gap-6 z-40">
        <button className="flex flex-col items-center group transition-transform active:scale-90">
          <div className="w-14 h-14 glass-pill rounded-full flex items-center justify-center text-on-surface mb-1 border border-on-surface/10">
            <Star size={28} fill="currentColor" />
          </div>
          <span className="text-on-surface text-[10px] font-black tracking-widest uppercase text-shadow-sm">{likes}</span>
        </button>

        <button className="flex flex-col items-center group transition-transform active:scale-90">
          <div className="w-14 h-14 glass-pill rounded-full flex items-center justify-center text-on-surface mb-1 border border-on-surface/10">
            <Share2 size={28} />
          </div>
          <span className="text-on-surface text-[10px] font-black tracking-widest uppercase text-shadow-sm">Envoyer</span>
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
