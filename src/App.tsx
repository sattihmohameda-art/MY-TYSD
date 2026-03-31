import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Component Imports ---
import { Onboarding } from './components/Onboarding';
import { MenuView } from './components/MenuView';
import { MapView } from './components/MapView';
import { MessagesView } from './components/MessagesView';
import { SavedView } from './components/SavedView';
import { ShopView } from './components/ShopView';
import GlowUpCatalog from './components/GlowUpCatalog';
import { BottomNav } from './components/BottomNav';
import { EditorialView } from './components/EditorialView';
import { Placeholder, ParentalPlaceholder } from './components/PlaceholderComponents';

const pageVariants = {
    initial: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0
    }),
    animate: {
        x: 0,
        opacity: 1,
        transition: { type: 'tween', ease: 'easeInOut', duration: 0.4 }
    },
    exit: (direction: number) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
        transition: { type: 'tween', ease: 'easeInOut', duration: 0.4 }
    })
};

const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
}

// --- Main App Component ---
function App() {
    // --- State Management ---
    const [isLoading, setIsLoading] = useState(true);
    const [onboardingCompleted, setOnboardingCompleted] = useState(false);
    const [profile, setProfile] = useState(null);
    const [activeTab, setActiveTab] = useState('glow');
    const [prevTab, setPrevTab] = useState('glow');
    const [activeArticle, setActiveArticle] = useState(null);

    // --- Effects ---
    useEffect(() => {
        try {
            const completed = localStorage.getItem('onboardingCompleted') === 'true';
            if (completed) {
                setOnboardingCompleted(true);
                const storedProfile = localStorage.getItem('userProfile');
                if (storedProfile) {
                    setProfile(JSON.parse(storedProfile));
                }
            }
        } catch (error) {
            console.error("Could not access localStorage. Onboarding will start.", error);
        }
        setIsLoading(false);
    }, []);

    // --- Handlers ---
    const handleOnboardingFinish = (completedProfile) => {
        try {
            localStorage.setItem('userProfile', JSON.stringify(completedProfile));
            localStorage.setItem('onboardingCompleted', 'true');
            window.location.href = window.location.pathname + '?cache-bust=' + new Date().getTime();
        } catch (error) {
            console.error("CRITICAL: Failed to save profile and reload.", error);
            setOnboardingCompleted(true);
            setProfile(completedProfile);
        }
    };
    
    const handleSelectArticle = (article) => {
        setPrevTab(activeTab);
        setActiveArticle(article);
        setActiveTab('article');
    }

    const handleTabChange = (tabId) => {
        if (tabId === 'article') {
            return;
        }
        setPrevTab(activeTab);
        setActiveArticle(null);
        setActiveTab(tabId);
    }
    
    // --- Animation Direction ---
    const getDirection = () => {
        if (prevTab === 'glow' && activeTab === 'menu') return 1;
        if (prevTab === 'menu' && activeTab === 'glow') return -1;
        if (activeTab === 'article') return 1;
        if (prevTab === 'article') return -1;
        // Add more specific navigation directions here if needed
        return 0; // Default to fade
    };
    const direction = getDirection();

    // --- Render Logic ---
    if (isLoading) {
        return <div className="w-screen h-screen bg-white" />;
    }

    if (!onboardingCompleted) {
        return <Onboarding onComplete={handleOnboardingFinish} />;
    }
    
    const renderContent = () => {
        if (activeArticle && activeTab === 'article') {
            return <EditorialView article={activeArticle} onBack={() => handleTabChange('glow')} />;
        }
        
        switch (activeTab) {
            case 'glow':
                return <GlowUpCatalog onSelectArticle={handleSelectArticle} onNavigate={handleTabChange} />;
            case 'menu':
                return <MenuView onBack={() => handleTabChange('glow')} onSelectTab={handleTabChange} />;
            case 'maps':
                return <MapView onBack={() => handleTabChange('menu')} />;
            case 'message':
                return <MessagesView onBack={() => handleTabChange('menu')} />;
            case 'enregistrement':
                return <SavedView onBack={() => handleTabChange('menu')} />;
            case 'boutique':
                return <ShopView onBack={() => handleTabChange('menu')} />;
            case 'parental':
                return <ParentalPlaceholder onBack={() => handleTabChange('menu')} />;
            default:
                return <Placeholder title={activeTab} onBack={() => handleTabChange('glow')} />;
        }
    };

    const shouldShowBottomNav = activeTab !== 'glow' && 
                              activeTab !== 'menu' && 
                              activeTab !== 'article' && 
                              activeTab !== 'enregistrement';

    return (
        <div className="relative min-h-screen bg-gray-50 font-sans overflow-hidden">
            <main className="h-full">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={activeTab === 'article' ? 'article-view' : activeTab}
                        custom={direction}
                        variants={direction !== 0 ? pageVariants : fadeVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute w-full h-full"
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* --- Bottom Navigation --- */}
            {shouldShowBottomNav && (
                 <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
            )}
        </div>
    );
}

export default App;
