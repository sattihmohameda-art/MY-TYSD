import { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { BottomNav } from './components/BottomNav';
import { FeedItem } from './components/FeedItem';
import { EditorialView } from './components/EditorialView';
import { MenuView } from './components/MenuView';
import { Onboarding } from './components/Onboarding';
import { MessagesView } from './components/MessagesView';
import { SideActions } from './components/SideActions';
import { ShopView } from './components/ShopView';
import { SavedView } from './components/SavedView';
import { MapView } from './components/MapView';
import { AuthView } from './components/AuthView';
import { motion, AnimatePresence } from 'motion/react';
import { Tab, FEED_LIBRARY, ARTICLE_LIBRARY, FeedContent } from './data/content';
import { MapPin, Bookmark, ShoppingBag } from 'lucide-react';

interface UserProfile {
  gender: string;
  ageGroup: string;
  objective: string;
  grade?: string;
  schoolLevel?: string;
  situation?: string;
  income?: string;
  housing?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  roadPassions: string[];
  favoriteBrands: string[];
  sports: string[];
  glowUpInterest: number;
}

export default function App() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('glow');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedItems, setSavedItems] = useState<{ item: FeedContent; category: string }[]>([]);
  const [selectedFriendName, setSelectedFriendName] = useState<string | undefined>(undefined);
  const [timeLeft, setTimeLeft] = useState<number>(2700); // 45 minutes in seconds

  useEffect(() => {
    const savedUser = localStorage.getItem('glow_up_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedProfile = localStorage.getItem('glow_up_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    
    const saved = localStorage.getItem('glow_up_saved');
    if (saved) {
      setSavedItems(JSON.parse(saved));
    }

    // Timer logic
    const resetTimer = () => {
      const now = new Date();
      const today = now.toDateString();
      const lastReset = localStorage.getItem('glow_up_last_reset');

      if (lastReset !== today) {
        setTimeLeft(2700);
        localStorage.setItem('glow_up_time_left', '2700');
        localStorage.setItem('glow_up_last_reset', today);
      } else {
        const savedTime = localStorage.getItem('glow_up_time_left');
        if (savedTime) setTimeLeft(parseInt(savedTime, 10));
      }
    };

    resetTimer();
    const interval = setInterval(resetTimer, 60000); // Check every minute for midnight reset

    setIsLoading(false);
    return () => clearInterval(interval);
  }, []);

  const handleVideoWatch = () => {
    setTimeLeft(prev => {
      const next = Math.max(0, prev - 60); // Decrease by 1 minute
      localStorage.setItem('glow_up_time_left', next.toString());
      return next;
    });
  };

  const handleSave = (id: string) => {
    const item = FEED_LIBRARY.find(f => f.id === id);
    if (!item) return;

    setSavedItems(prev => {
      const isAlreadySaved = prev.find(si => si.item.id === id);
      let next;
      if (isAlreadySaved) {
        next = prev.filter(si => si.item.id !== id);
      } else {
        // Determine category
        let category = 'Favoris';
        const tags = item.hashtags.map(t => t.toLowerCase());
        const caption = item.caption.toLowerCase();
        
        if (tags.some(t => t.includes('mecanique')) || caption.includes('mecanique') || caption.includes('voiture')) category = 'Mécanique';
        else if (tags.some(t => t.includes('maquillage') || t.includes('makeup') || t.includes('beauty'))) category = 'Maquillage';
        else if (tags.some(t => t.includes('bricolage') || t.includes('diy') || t.includes('renov'))) category = 'Bricolage';
        else if (tags.some(t => t.includes('gaming') || t.includes('esports'))) category = 'Gaming';
        else if (tags.some(t => t.includes('maths') || t.includes('learning') || t.includes('study'))) category = 'Éducation';
        else if (tags.some(t => t.includes('animaux'))) category = 'Animaux';
        else if (tags.some(t => t.includes('voyage'))) category = 'Voyage';
        else if (tags.some(t => t.includes('motos'))) category = 'Moto';
        else if (tags.some(t => t.includes('mode') || t.includes('style') || t.includes('look'))) category = 'Mode';
        else if (tags.some(t => t.includes('sport') || t.includes('fitness'))) category = 'Sport';
        else if (tags.some(t => t.includes('business') || t.includes('money'))) category = 'Business';
        
        next = [...prev, { item, category }];
      }
      localStorage.setItem('glow_up_saved', JSON.stringify(next));
      return next;
    });
  };

  const handleRemoveSaved = (id: string) => {
    setSavedItems(prev => {
      const next = prev.filter(si => si.item.id !== id);
      localStorage.setItem('glow_up_saved', JSON.stringify(next));
      return next;
    });
  };

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('glow_up_profile', JSON.stringify(newProfile));
    
    // Smart Redirection based on Content Engine Rules
    if (newProfile.objective === 'Style & Mode' || newProfile.favoriteBrands.some(b => b.toLowerCase().includes('zara'))) {
      setActiveTab('infos');
    } else if (newProfile.objective === 'Sport' || newProfile.sports.includes('Gaming/Esport')) {
      setActiveTab('detente');
    } else {
      setActiveTab('glow');
    }
  };

  // Filter feed based on profile and active tab
  const filteredFeed = FEED_LIBRARY.filter(item => {
    if (!profile) return true;
    const matchesTab = item.tab === activeTab;
    const matchesAge = item.ageGroup === profile.ageGroup || item.ageGroup === 'all';
    
    if (!matchesAge || !matchesTab) return false;

    // Content Engine Logic
    if (activeTab === 'glow') {
      if (profile.objective === 'Études / Examens') return (item.hashtags || []).some(h => h.includes('study') || h.includes('focus') || h.includes('glowup'));
      if (profile.objective === 'Business') return (item.hashtags || []).some(h => h.includes('money') || h.includes('mindset'));
      if (profile.objective === 'Passion Technique') return (item.hashtags || []).some(h => h.includes('mecanique') || h.includes('tech'));
    }
    
    if (activeTab === 'detente') {
      const hasSportMatch = (profile.sports || []).some(s => (item.hashtags || []).some(h => h.toLowerCase().includes(s.toLowerCase())));
      const hasRoadMatch = (profile.roadPassions || []).some(r => (item.hashtags || []).some(h => h.toLowerCase().includes(r.toLowerCase())));
      return hasSportMatch || hasRoadMatch || (item.hashtags || []).some(h => h.includes('gaming') || h.includes('lifestyle'));
    }

    return true;
  });

  // Get current article for Infos tab
  const currentArticle = ARTICLE_LIBRARY.find(art => {
    if (!profile) return art.ageGroup === '12-18';
    // Show releases based on favorite brands
    const matchesAge = art.ageGroup === profile.ageGroup || art.ageGroup === 'all';
    if (!matchesAge) return false;

    return (profile.favoriteBrands || []).some(brand => 
      art.title.toLowerCase().includes(brand.toLowerCase()) || 
      art.description.toLowerCase().includes(brand.toLowerCase())
    );
  }) || ARTICLE_LIBRARY.find(art => art.ageGroup === (profile?.ageGroup || '12-18')) || ARTICLE_LIBRARY[0];

  const handleResetProfile = () => {
    localStorage.removeItem('glow_up_profile');
    localStorage.removeItem('glow_up_user');
    setProfile(null);
    setUser(null);
    setActiveTab('glow');
  };

  const handleAuthSuccess = (userData: { email: string }) => {
    setUser(userData);
    localStorage.setItem('glow_up_user', JSON.stringify(userData));
  };

  if (isLoading) return null;

  return (
    <div className="relative min-h-screen bg-surface selection:bg-black selection:text-white">
      <AnimatePresence>
        {!user && (
          <AuthView onAuthSuccess={handleAuthSuccess} />
        )}
      </AnimatePresence>

      {user && (
        <>
          <AnimatePresence>
            {!profile && (
              <Onboarding onComplete={handleOnboardingComplete} />
            )}
          </AnimatePresence>

          {profile && (
            <>
          {activeTab !== 'menu' && activeTab !== 'message' && activeTab !== 'maps' && activeTab !== 'enregistrement' && activeTab !== 'boutique' && (
            <TopNav activeTab={activeTab} onTabChange={setActiveTab} timeLeft={timeLeft} />
          )}

          <main className="h-full">
            <AnimatePresence mode="wait">
              {(activeTab === 'glow' || activeTab === 'detente') ? (
                <motion.div
                  key={`${activeTab}-${profile.ageGroup}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
                >
                  {filteredFeed.length > 0 ? (
                    filteredFeed.map((item) => (
                      <FeedItem 
                        key={item.id} 
                        id={item.id}
                        caption={item.caption}
                        hashtags={item.hashtags}
                        musicTitle={item.musicTitle}
                        imageUrl={item.imageUrl}
                        likes={item.likes}
                        isSaved={!!savedItems.find(si => si.item.id === item.id)}
                        onSave={handleSave}
                        onSwipeMenu={() => setActiveTab('menu')}
                        onView={handleVideoWatch}
                      />
                    ))
                  ) : (
                    <div className="h-screen flex items-center justify-center p-12 text-center">
                      <p className="text-on-surface-variant font-medium">
                        Aucun contenu disponible pour cette catégorie pour le moment.
                      </p>
                    </div>
                  )}
                </motion.div>
              ) : activeTab === 'infos' ? (
                <motion.div
                  key={`infos-${profile.ageGroup}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EditorialView article={currentArticle} />
                </motion.div>
              ) : activeTab === 'menu' ? (
                <motion.div
                  key={`menu-${profile.ageGroup}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <MenuView onBack={() => setActiveTab('glow')} onSelectTab={setActiveTab} />
                </motion.div>
              ) : activeTab === 'message' ? (
                <motion.div
                  key={`message-${profile.ageGroup}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <MessagesView 
                    onBack={() => {
                      setActiveTab('menu');
                      setSelectedFriendName(undefined);
                    }} 
                    initialFriendName={selectedFriendName}
                  />
                </motion.div>
              ) : activeTab === 'boutique' ? (
                <motion.div
                  key={`boutique-${profile.ageGroup}`}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <ShopView onBack={() => setActiveTab('menu')} />
                </motion.div>
              ) : activeTab === 'enregistrement' ? (
                <motion.div
                  key={`saved-${profile.ageGroup}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <SavedView 
                    savedItems={savedItems} 
                    onRemove={handleRemoveSaved} 
                    onBack={() => setActiveTab('menu')} 
                  />
                </motion.div>
              ) : activeTab === 'maps' ? (
                <motion.div
                  key={`${activeTab}-${profile.ageGroup}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-screen w-full"
                >
                  <MapView 
                    onBack={() => setActiveTab('menu')} 
                    onMessage={(name) => {
                      setSelectedFriendName(name);
                      setActiveTab('message');
                    }}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </main>

          {(activeTab === 'glow' || activeTab === 'detente') && (
            <SideActions onSelectTab={setActiveTab} activeTab={activeTab} />
          )}

          {activeTab !== 'message' && activeTab !== 'maps' && activeTab !== 'enregistrement' && activeTab !== 'boutique' && (
            <BottomNav onResetProfile={handleResetProfile} />
          )}
            </>
          )}
        </>
      )}
    </div>
  );
}
