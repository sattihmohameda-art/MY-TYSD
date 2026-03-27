import { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { BottomNav } from './components/BottomNav';
import { FeedItem } from './components/FeedItem';
import { EditorialView } from './components/EditorialView';
import { MenuView } from './components/MenuView';
import { Onboarding } from './components/Onboarding';
import { MessagesView } from './components/MessagesView';
import { motion, AnimatePresence } from 'motion/react';
import { Tab, FEED_LIBRARY, ARTICLE_LIBRARY } from './data/content';

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
  const [activeTab, setActiveTab] = useState<Tab>('glow');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedProfile = localStorage.getItem('glow_up_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    setIsLoading(false);
  }, []);

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
    setProfile(null);
    setActiveTab('glow');
  };

  if (isLoading) return null;

  return (
    <div className="relative min-h-screen bg-surface selection:bg-black selection:text-white">
      <AnimatePresence>
        {!profile && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
      </AnimatePresence>

      {profile && (
        <>
          {activeTab !== 'menu' && activeTab !== 'message' && (
            <TopNav activeTab={activeTab} onTabChange={setActiveTab} />
          )}

          <main className="h-full">
            <AnimatePresence mode="wait">
              {activeTab === 'glow' || activeTab === 'detente' ? (
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
                        caption={item.caption}
                        hashtags={item.hashtags}
                        musicTitle={item.musicTitle}
                        imageUrl={item.imageUrl}
                        likes={item.likes}
                        onSwipeMenu={() => setActiveTab('menu')}
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
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
                  <MessagesView onBack={() => setActiveTab('menu')} />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </main>

          {activeTab !== 'message' && (
            <BottomNav onResetProfile={handleResetProfile} />
          )}
        </>
      )}
    </div>
  );
}
