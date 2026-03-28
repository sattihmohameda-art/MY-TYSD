import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Search, Navigation, Ghost, Users, X, MapPin, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FeedContent } from '../data/content';

// Fix Leaflet marker icons
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapViewProps {
  onBack: () => void;
  onMessage: (friendName: string) => void;
}

// Mock friends on map
const FRIENDS = [
  { 
    id: 'f1', 
    name: 'Léa', 
    lat: 48.8647, 
    lng: 2.3490, 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lea&backgroundColor=b6e3f4', 
    status: 'À la maison',
    address: '12 Rue de Rivoli, 75004 Paris',
    battery: 84,
    isOnline: true,
    lastSeen: 'Maintenant'
  },
  { 
    id: 'f2', 
    name: 'Thomas', 
    lat: 48.8534, 
    lng: 2.3488, 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas&backgroundColor=ffdfbf', 
    status: 'En ville',
    address: 'Place de l\'Hôtel de Ville, 75004 Paris',
    battery: 12,
    isOnline: false,
    lastSeen: 'Il y a 15 min'
  },
  { 
    id: 'f3', 
    name: 'Sarah', 
    lat: 43.3000, 
    lng: 5.4000, 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=c0aede', 
    status: 'Plage',
    address: 'Plage du Prado, 13008 Marseille',
    battery: 45,
    isOnline: true,
    lastSeen: 'Maintenant'
  },
  { 
    id: 'f4', 
    name: 'Kevin', 
    lat: 45.7640, 
    lng: 4.8357, 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin&backgroundColor=d1d4f9', 
    status: 'Cinéma',
    address: '12 Rue de la République, 69002 Lyon',
    battery: 92,
    isOnline: true,
    lastSeen: 'Maintenant'
  },
  { 
    id: 'f5', 
    name: 'Emma', 
    lat: 44.8378, 
    lng: -0.5792, 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=ffd5dc', 
    status: 'Shopping',
    address: 'Rue Sainte-Catherine, 33000 Bordeaux',
    battery: 67,
    isOnline: true,
    lastSeen: 'Maintenant'
  },
  { 
    id: 'f6', 
    name: 'Lucas', 
    lat: 50.6292, 
    lng: 3.0573, 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas&backgroundColor=b6e3f4', 
    status: 'Gaming',
    address: 'Grand Place, 59800 Lille',
    battery: 5,
    isOnline: false,
    lastSeen: 'Il y a 1h'
  },
];

// Component to handle map resizing after animation
const ResizeHandler = () => {
  const map = useMap();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 500);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

export const MapView: React.FC<MapViewProps> = ({ onBack, onMessage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGhostMode, setIsGhostMode] = useState(false);

  const createBitmojiIcon = (url: string) => {
    return L.divIcon({
      className: 'bitmoji-icon',
      html: `<div class="relative group">
               <div class="w-14 h-14 rounded-2xl bg-white border-2 ${isGhostMode ? 'border-blue-400' : 'border-[#FE2C55]'} shadow-2xl overflow-hidden transition-all duration-300 group-hover:scale-110">
                 <img src="${url}" class="w-full h-full object-cover ${isGhostMode ? 'grayscale' : ''}" />
               </div>
               <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isGhostMode ? 'bg-blue-400' : 'bg-green-500'} shadow-sm"></div>
             </div>`,
      iconSize: [56, 56],
      iconAnchor: [28, 56],
    });
  };

  const createTempIcon = (temp: number) => {
    return L.divIcon({
      className: 'temp-icon',
      html: `<div class="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 shadow-sm flex items-center gap-1">
               <span class="text-[10px] font-black">${temp}°</span>
             </div>`,
      iconSize: [40, 20],
      iconAnchor: [20, 10],
    });
  };

  const openGPS = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <div className="h-screen w-full relative bg-[#F8F9FA] overflow-hidden">
      {/* Map Container */}
      <MapContainer 
        center={[46.2276, 2.2137]} 
        zoom={6} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        <ResizeHandler />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Friends */}
        {FRIENDS.map(friend => (
          <Marker 
            key={friend.id} 
            position={[friend.lat, friend.lng]} 
            icon={createBitmojiIcon(friend.avatar)}
          >
            <Popup className="snap-popup" minWidth={220}>
              <div className="p-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-black/5">
                    <img src={friend.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-black text-xs uppercase tracking-tighter m-0">{friend.name}</p>
                      <div className={`w-2 h-2 rounded-full ${friend.isOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
                    </div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest m-0">
                      {friend.isOnline ? 'En ligne' : friend.lastSeen}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={12} className="text-[#FE2C55]" />
                    <p className="text-[10px] font-medium leading-tight m-0">{friend.address}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="flex items-center gap-1">
                      <div className={`w-5 h-2.5 rounded-sm border border-gray-400 relative p-0.5`}>
                        <div 
                          className={`h-full rounded-px ${friend.battery < 20 ? 'bg-red-500' : 'bg-green-500'}`} 
                          style={{ width: `${friend.battery}%` }} 
                        />
                        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1 bg-gray-400 rounded-r-sm" />
                      </div>
                      <span className="text-[9px] font-black">{friend.battery}%</span>
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">• {friend.status}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => openGPS(friend.lat, friend.lng)}
                    className="flex-1 py-2 bg-[#FE2C55] text-white rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-[#FE2C55]/20 active:scale-95 transition-transform"
                  >
                    <Navigation size={14} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-widest">GPS</span>
                  </button>
                  <button 
                    onClick={() => onMessage(friend.name)}
                    className="flex-1 py-2 bg-black text-white rounded-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
                  >
                    <MessageCircle size={14} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Message</span>
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating UI Elements */}
      
      {/* Top Search Bar */}
      <div className="absolute top-6 left-4 right-4 z-[1000] flex items-center gap-3">
        <motion.button 
          onClick={onBack}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center text-black shadow-xl"
        >
          <X size={24} />
        </motion.button>
        
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Rechercher des amis ou lieux" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 bg-white border border-black/5 rounded-full pl-12 pr-4 text-black placeholder:text-black/30 outline-none focus:ring-2 focus:ring-[#FE2C55]/20 transition-all shadow-xl font-medium text-sm"
          />
        </div>

        <motion.button 
          onClick={() => setIsGhostMode(!isGhostMode)}
          whileTap={{ scale: 0.9 }}
          className={`w-12 h-12 rounded-full border border-black/5 flex items-center justify-center shadow-xl transition-colors duration-300 ${isGhostMode ? 'bg-blue-400 text-white' : 'bg-white text-black'}`}
        >
          <Ghost size={24} className={isGhostMode ? 'animate-bounce' : ''} />
        </motion.button>
      </div>

      {/* Ghost Mode Badge */}
      <AnimatePresence>
        {isGhostMode && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-[1000] px-4 py-1 bg-blue-400 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Mode Fantôme Activé
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Controls */}
      <div className="absolute bottom-10 left-4 right-4 z-[1000] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-black text-[10px] font-black uppercase tracking-widest">Ma position</p>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 rounded-full bg-[#FE2C55] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(254,44,85,0.3)] border-4 border-white"
          >
            <Navigation size={32} fill="currentColor" />
          </motion.button>
        </div>
      </div>

      <style>{`
        .snap-popup .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 100px;
          padding: 0;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .snap-popup .leaflet-popup-tip {
          background: white;
        }
        .snap-popup .leaflet-popup-content {
          margin: 6px 12px;
        }
        .leaflet-container {
          background: #F8F9FA !important;
        }
        .temp-icon div {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
};
