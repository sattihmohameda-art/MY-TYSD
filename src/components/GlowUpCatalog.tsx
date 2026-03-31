
import React, { useState } from 'react';
import { ChevronRight, Heart, ArrowRight, RefreshCw } from 'lucide-react';

const CATEGORIES = [
    { id: "meca", title: "MÉCANIQUE", subtitle: "Tout pour ta voiture", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1000", items: ["Faire la vidange", "Changer la batterie", "Pression des pneus", "Changer une ampoule"] },
    { id: "makeup", title: "MAQUILLAGE", subtitle: "Beauté & Soins", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000", items: ["Teint parfait", "Maquillage yeux", "Routine soir", "Soin des lèvres"] },
    { id: "brico", title: "BRICOLAGE", subtitle: "Maison & Déco", image: "https://images.unsplash.com/photo-1581781870027-04212e231e96?q=80&w=1000", items: ["Monter une étagère", "Peindre un mur", "Réparer une fuite"] },
];

interface GlowUpCatalogProps {
    onNavigate: (tab: string) => void;
    onSelectArticle: (article: { id: string; title: string; category: string }) => void;
}

const GlowUpCatalog: React.FC<GlowUpCatalogProps> = ({ onNavigate, onSelectArticle }) => {
    const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[0] | null>(null);

    const handleRestartOnboarding = () => {
        if (window.confirm("Êtes-vous sûr de vouloir recommencer le processus d'inscription ? Votre profil actuel sera effacé.")) {
            try {
                localStorage.removeItem('onboardingCompleted');
                localStorage.removeItem('userProfile');
                window.location.reload();
            } catch (error) {
                console.error("Failed to clear localStorage and reload.", error);
                alert("Une erreur est survenue. Impossible de réinitialiser l'application.");
            }
        }
    };

    if (selectedCategory) {
        return (
            <div className="flex-1 bg-white p-6 animate-in fade-in slide-in-from-right duration-300">
                <button onClick={() => setSelectedCategory(null)} className="text-gray-900 font-bold mb-6 flex items-center bg-gray-100 py-2 px-4 rounded-full">
                    <ChevronRight className="rotate-180 mr-1" size={20} /> Retour
                </button>
                <h1 className="text-3xl font-black text-black mb-8 uppercase italic border-b-4 border-black pb-2 w-fit">{selectedCategory.title}</h1>
                <div className="space-y-4">
                    {selectedCategory.items.map((item, index) => (
                        <div 
                            key={index} 
                            onClick={() => onSelectArticle({ id: `${selectedCategory.id}-${index}`, title: item, category: selectedCategory.title })}
                            className="flex justify-between items-center p-6 bg-gray-50 rounded-[24px] border border-gray-200 shadow-sm active:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <span className="text-lg font-bold text-black">{item}</span>
                            <ChevronRight className="text-black" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-white overflow-y-auto">
            {/* --- Menu Button --- */}
            <div className="fixed top-1/2 right-0 z-10 transform -translate-y-1/2">
                <button
                    onClick={() => onNavigate('menu')}
                    className="bg-black/50 hover:bg-black/80 rounded-l-2xl pl-2 pr-1 py-8 shadow-lg flex items-center justify-center transition-all duration-300 group"
                    aria-label="Aller au menu"
                >
                    <ChevronRight className="text-white transform group-hover:scale-125 transition-transform" size={24} />
                </button>
            </div>

            {/* --- Restart Onboarding Button --- */}
            <div className="fixed top-4 left-4 z-10">
                 <button
                    onClick={handleRestartOnboarding}
                    className="bg-red-500/80 hover:bg-red-600 rounded-full p-3 shadow-lg flex items-center justify-center transition-all duration-300 group"
                    aria-label="Recommencer l'inscription"
                >
                    <RefreshCw className="text-white" size={20} />
                </button>
            </div>

            <div className="p-4 pt-20 space-y-6">
                {CATEGORIES.map((category) => (
                    <div 
                        key={category.id} 
                        onClick={() => setSelectedCategory(category)} 
                        className="relative h-[200px] w-full rounded-[35px] overflow-hidden shadow-lg border border-gray-100 active:scale-95 transition-all cursor-pointer"
                    >
                        <img src={category.image} className="absolute inset-0 w-full h-full object-cover" alt={category.title} />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
                        <div className="relative h-full p-8 flex flex-col justify-center">
                            <h2 className="text-2xl font-black text-black tracking-tighter uppercase leading-none">{category.title}</h2>
                            <p className="text-gray-800 font-bold mt-2">{category.subtitle}</p>
                            <div className="absolute top-6 right-6">
                              <div className="bg-white/90 p-3 rounded-full shadow-sm">
                                <Heart size={20} className="text-black" fill="none" />
                              </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GlowUpCatalog;
