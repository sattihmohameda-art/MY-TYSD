    import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PlaceholderProps {
    title: string;
    onBack: () => void;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ title, onBack }) => {
    return (
        <div className="min-h-screen bg-white pt-6 px-6 pb-32 flex flex-col">
            <div className="max-w-screen-md mx-auto w-full flex-grow">
                <div className="relative flex items-center justify-center mb-12 py-4">
                    <div className="absolute left-0">
                        <button 
                            onClick={onBack}
                            className="flex items-center gap-2 text-black font-bold uppercase tracking-widest text-[9px] hover:opacity-70 transition-opacity"
                        >
                            <ArrowLeft size={16} />
                            Retour
                        </button>
                    </div>
                    <h1 className="font-headline text-lg font-black tracking-tighter text-black capitalize">
                        {title}
                    </h1>
                </div>
                <div className="text-center py-20">
                    <h2 className="text-xl font-bold text-gray-800">Page en construction</h2>
                    <p className="text-gray-500 mt-2">Cette section sera bientôt disponible.</p>
                </div>
            </div>
        </div>
    );
};

interface ParentalPlaceholderProps {
    onBack: () => void;
}

export const ParentalPlaceholder: React.FC<ParentalPlaceholderProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-white pt-6 px-6 pb-32 flex flex-col">
            <div className="max-w-screen-md mx-auto w-full flex-grow">
                <div className="relative flex items-center justify-center mb-12 py-4">
                    <div className="absolute left-0">
                        <button 
                            onClick={onBack}
                            className="flex items-center gap-2 text-black font-bold uppercase tracking-widest text-[9px] hover:opacity-70 transition-opacity"
                        >
                            <ArrowLeft size={16} />
                            Retour
                        </button>
                    </div>
                    <h1 className="font-headline text-lg font-black tracking-tighter text-black">
                        Mode Parental
                    </h1>
                </div>
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                    <h2 className="text-xl font-bold text-gray-800">Mode Parental</h2>
                    <p className="text-gray-500 mt-2 px-4">Cette section est en cours de construction et sera bientôt disponible.</p>
                </div>
            </div>
        </div>
    );
};
