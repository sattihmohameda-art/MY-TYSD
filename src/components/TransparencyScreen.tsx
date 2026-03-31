import React, { useState } from 'react';
import { ArrowRight, Check, Shield, HelpCircle, UserCheck } from 'lucide-react';

interface TransparencyScreenProps {
    onAccepted: () => void;
}

export const TransparencyScreen: React.FC<TransparencyScreenProps> = ({ onAccepted }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="p-8 flex flex-col justify-center h-full text-left">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic">🇨🇭 Transparence & Sécurité</h2>
                <p className="text-gray-600 mt-4 text-md max-w-md mx-auto">
                    Pour vous offrir une expérience sur mesure, nous avons besoin de mieux vous connaître. Vos données sont en sécurité.
                </p>
            </div>

            <div className="space-y-6 bg-gray-50 p-6 rounded-2xl">
                <div>
                    <div className="flex items-center gap-3">
                        <HelpCircle size={20} className="text-black"/>
                        <h3 className="font-bold text-lg text-black">Les questions que nous posons</h3>
                    </div>
                    <p className="text-gray-600 mt-1 ml-8">
                        Nous vous posons des questions sur votre situation (âge, travail, budget) pour personnaliser nos recommandations.
                    </p>
                </div>
                <div>
                     <div className="flex items-center gap-3">
                        <UserCheck size={20} className="text-black"/>
                        <h3 className="font-bold text-lg text-black">Ce que nous ne demandons jamais</h3>
                    </div>
                    <p className="text-gray-600 mt-1 ml-8">
                        Nous ne collectons aucune donnée de santé ou information sensible non nécessaire à l'application, conformément au RGPD.
                    </p>
                </div>
            </div>

            <div className="my-6 flex items-center justify-center">
                <div 
                    onClick={() => setIsChecked(!isChecked)} 
                    className="flex items-center cursor-pointer select-none p-4"
                >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center mr-4 transition-all ${isChecked ? 'bg-black' : 'bg-gray-200'}`}>
                        {isChecked && <Check size={18} className="text-white" />}
                    </div>
                    <span className="font-semibold text-gray-800">J'ai lu et j'accepte les conditions.</span>
                </div>
            </div>

            <button 
                onClick={onAccepted} 
                disabled={!isChecked} 
                className="w-full h-14 mt-auto bg-black text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all disabled:bg-gray-300 active:scale-95"
            >
                Continuer <ArrowRight size={20} />
            </button>
        </div>
    );
};
