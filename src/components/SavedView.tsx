import React from 'react';
import { Bookmark, ChevronLeft, ArrowRight } from 'lucide-react';

// Mocks - Remplacer par les vraies données plus tard
const savedItemsData = [
    {
        id: 'video1',
        type: 'video',
        title: 'Comment faire une vidange',
        category: 'Mécanique',
        thumbnail: 'https://images.unsplash.com/photo-1599796015033-0010c7858c67?q=80&w=1000'
    },
    {
        id: 'article1',
        type: 'article',
        title: 'Le guide du maquillage parfait',
        category: 'Maquillage',
        thumbnail: 'https://images.unsplash.com/photo-1620464264627-6c8ac55531b6?q=80&w=1000'
    },
];

interface SavedViewProps {
  onBack: () => void;
}

export const SavedView: React.FC<SavedViewProps> = ({ onBack }) => {
    // Pour l'instant, on utilise les données mock. Plus tard, cela viendra des props.
    const savedItems = savedItemsData;

    return (
        <div className="h-screen bg-white flex flex-col overflow-hidden">
            {/* Header */}
            <header className="px-4 py-5 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={onBack}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-black tracking-tighter uppercase leading-none">
                            Enregistrements
                        </h1>
                        <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">
                            {savedItems.length} {savedItems.length > 1 ? 'éléments' : 'élément'}
                        </p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4">
                {savedItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4 pt-20">
                        <Bookmark size={48} strokeWidth={1.5} />
                        <p className="text-lg font-bold">Aucun élément enregistré</p>
                        <p className="max-w-xs mx-auto text-sm">
                            Appuyez sur l'icône de signet sur une vidéo ou un article pour le sauvegarder ici.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {savedItems.map((item) => (
                            <div 
                                key={item.id}
                                className="bg-gray-50 rounded-2xl p-3 flex items-center gap-4 shadow-sm border border-gray-100 cursor-pointer active:bg-gray-100 transition-colors"
                            >
                                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0 pr-4">
                                    <p className="text-xs font-bold uppercase tracking-widest text-blue-500">{item.category}</p>
                                    <h3 className="text-md font-bold text-black truncate">{item.title}</h3>
                                </div>
                                <ArrowRight className="text-gray-300" size={24} />
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};
