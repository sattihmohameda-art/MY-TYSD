import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, Check, User, AtSign, Lock } from 'lucide-react';
import { Interest, interestsData } from '@/data/interests';
import { TransparencyScreen } from './TransparencyScreen';

const slideVariants = {
    initial: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
    animate: { x: 0, opacity: 1, transition: { type: 'tween', ease: 'circOut', duration: 0.5 } },
    exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, transition: { type: 'tween', ease: 'circIn', duration: 0.4 } })
};

interface QuestionStepProps {
    onNext: (data: any) => void;
    onBack: () => void;
    profileData: any;
}

const TydsLogo = () => (
    <div className="inline-block p-2 rounded-xl bg-black mb-4">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 4H18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 4V20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);

// --- Steps --- 

const AccountCreationStep: React.FC<{ onNext: (data: any) => void }> = ({ onNext }) => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateAndProceed = () => {
        let valid = true;
        let newErrors = { email: '', password: '' };
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Adresse e-mail invalide';
            valid = false;
        }
        if (formData.password.length < 8) {
            newErrors.password = 'Le mot de passe doit faire au moins 8 caractères';
            valid = false;
        }
        setErrors(newErrors);
        if (valid) {
            onNext(formData);
        }
    };

    return (
        <div className="p-8 text-center">
            <TydsLogo />
            <p className="text-gray-500 mt-2 mb-8">Rejoins la communauté TYDS</p>
            
            <div className="space-y-4 text-left">
                <div className="flex gap-4">
                    <InputField icon={User} placeholder="Prénom" name="firstName" onChange={handleChange} />
                    <InputField icon={User} placeholder="Nom" name="lastName" onChange={handleChange} />
                </div>
                <InputField icon={AtSign} placeholder="Email" name="email" type="email" onChange={handleChange} error={errors.email} />
                <InputField icon={Lock} placeholder="Mot de passe" name="password" type="password" onChange={handleChange} error={errors.password} />
            </div>

            <button onClick={validateAndProceed} className="w-full h-14 mt-8 bg-black text-white font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all">
                S'inscrire <ArrowRight size={20} />
            </button>
        </div>
    );
};

const AgeStep: React.FC<QuestionStepProps> = ({ onNext, profileData }) => {
    const [age, setAge] = useState(profileData.age || '');
    return (
        <div className="p-8 text-center">
            <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic">Quel âge avez-vous ?</h2>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full text-5xl font-black text-center bg-transparent focus:outline-none mt-12" placeholder="25" />
            <button onClick={() => onNext({ age })} disabled={!age} className="w-full h-14 mt-8 bg-black text-white font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all">
                Continuer
            </button>
        </div>
    )
}

const InterestsStep: React.FC<QuestionStepProps> = ({ onNext, profileData }) => {
    const [selected, setSelected] = useState<string[]>(profileData.interests || []);
    const toggleInterest = (id: string) => {
        setSelected(current => current.includes(id) ? current.filter(i => i !== id) : [...current, id]);
    };

    return (
        <div className="p-8">
            <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic text-center">Vos centres d'intérêt ?</h2>
            <p className="text-center text-gray-500 mt-2 mb-8">Sélectionnez au moins 3 thèmes.</p>
            <div className="grid grid-cols-2 gap-4">
                {interestsData.map((interest) => (
                    <div key={interest.id} onClick={() => toggleInterest(interest.id)} className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${selected.includes(interest.id) ? 'border-black bg-gray-50' : 'border-gray-100 bg-gray-50'}`}>
                        <p className="font-bold">{interest.name}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => onNext({ interests: selected })} disabled={selected.length < 3} className="w-full h-14 mt-8 bg-black text-white font-bold rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all">
                Finaliser
            </button>
        </div>
    );
};

// --- Helper Components ---

const InputField = ({ icon: Icon, placeholder, name, type = 'text', onChange, error = '' }) => (
    <div className="w-full">
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon size={20} />
            </div>
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                onChange={onChange} 
                className={`w-full h-14 bg-gray-50 border-2 rounded-xl pl-12 pr-4 font-semibold focus:outline-none ${error ? 'border-red-500' : 'border-gray-50 focus:border-black'}`} 
            />
        </div>
        {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
);

// --- Main Onboarding Component ---

export const Onboarding: React.FC<{ onComplete: (profile: any) => void }> = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [profile, setProfile] = useState({});
    const [direction, setDirection] = useState(1);

    const onboardingSteps = [
        { id: 'account', Component: AccountCreationStep },
        { id: 'transparency', Component: TransparencyScreen },
        { id: 'age', Component: AgeStep },
        { id: 'interests', Component: InterestsStep },
    ];

    const handleNext = (data = {}) => {
        setProfile(p => ({ ...p, ...data }));
        if (step < onboardingSteps.length - 1) {
            setDirection(1);
            setStep(s => s + 1);
        } else {
            onComplete({ ...profile, ...data });
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setDirection(-1);
            setStep(s => s - 1);
        }
    };

    const CurrentStep = onboardingSteps[step].Component;
    const currentStepConfig = onboardingSteps[step];
    
    // Pass `onNext` to AccountCreationStep, and `onAccepted` to TransparencyScreen
    const stepProps = {
        onNext: handleNext,
        onBack: handleBack,
        profileData: profile,
        ...(currentStepConfig.id === 'transparency' && { onAccepted: handleNext }),
    };

    return (
        <div className="relative w-screen h-screen bg-white font-sans overflow-hidden">
            {step > 1 && (
                <button onClick={handleBack} className="absolute top-8 left-8 z-10 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <ChevronLeft size={24} />
                </button>
            )}
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={step}
                    custom={direction}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full h-full absolute top-0 left-0 flex flex-col justify-center"
                >
                    <CurrentStep {...stepProps} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
