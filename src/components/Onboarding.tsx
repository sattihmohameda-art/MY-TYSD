import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, Sparkles, Target, Bike, 
  ShoppingBag, Trophy, Star, Search, X, ShieldCheck
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

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

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const GENDERS = ["Homme", "Femme"];
const AGE_GROUPS = ["5-12", "12-18", "18+"];
const OBJECTIVES = ["Études / Examens", "Passion Technique", "Style & Mode", "Sport", "Business"];
const GRADES_5_12 = ["MS", "GS", "CP", "CE1", "CE2", "CM1", "CM2", "6ème", "5ème", "4ème"];
const GRADES_12_18 = ["6ème", "5ème", "4ème", "3ème", "Seconde", "Première", "Terminale", "Apprentissage", "Études Sup"];
const SITUATIONS_18_PLUS = ["Alternance", "Salarié", "Chômage", "Temps partiel", "Étudiant", "Indépendant"];
const INCOME_BRACKETS = ["< 1500€", "1500€ - 2500€", "2500€ - 4000€", "> 4000€"];
const HOUSING_OPTIONS = ["Maison avec jardin", "Maison sans jardin", "Appartement avec terrasse/jardin", "Appartement simple"];
const ROAD_PASSIONS = ["Motos", "Scooters", "Voitures Sport", "Trottinettes élec"];
const BRANDS_5_12 = [
  "LEGO", "Playmobil", "Nintendo", "Disney", "Marvel", "Barbie", "Hot Wheels", "VTech", 
  "Kiabi", "Okaïdi", "Petit Bateau", "Samsung (Tablettes)", "Apple (iPad)", "Nickelodeon",
  "Hasbro", "Mattel", "Crayola", "Fisher-Price"
];
const BRANDS_12_18 = [
  "Nike", "Adidas", "Zara", "H&M", "Apple (iPhone)", "Samsung", "PlayStation", "Xbox", 
  "Nintendo Switch", "Shein", "Bershka", "Pull&Bear", "Lacoste", "Supreme", "Netflix", 
  "TikTok", "Instagram", "Snapchat", "Discord", "Spotify", "Vans", "Converse", "Levi's"
];
const BRANDS_18_PLUS_BASIC = [
  "Nike", "Adidas", "Lacoste", "Zara", "H&M", "Sephora", "Apple", "Samsung", "Netflix", "Amazon", "IKEA", "Nespresso", 
  "Sony", "Microsoft", "Google", "Airbnb", "Uber", "Deliveroo", "Spotify", "Decathlon"
];
const BRANDS_18_PLUS_PREMIUM = [
  "Tesla", "BMW", "Mercedes", "Rolex", "Louis Vuitton", "Gucci", "Prada", "Dior", 
  "Chanel", "Porsche", "Ferrari", "Audi", "Range Rover", "Hermès", "Cartier", "Balenciaga"
];

const SPORTS = [
  "Foot", "Muscu", "Skate", "Gaming/Esport", "Danse", "Judo", "Tennis", "Natation", 
  "Équitation", "Basket", "Rugby", "Gymnastique", "Athlétisme", "Escrime", "Handball", 
  "Cyclisme", "Boxe", "Karaté", "Surf", "Escalade", "Yoga", "Ping-Pong", "Badminton", 
  "Volley", "VTT", "Ski", "Snowboard", "Tir à l'arc", "Aviron", "Voile", "Golf", 
  "Hockey", "Patinage", "Taekwondo", "Aïkido", "Canoë-Kayak", "Triathlon", "Crossfit", 
  "Parkour", "BMX", "Moto-Cross", "Karting"
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    gender: '',
    ageGroup: '',
    objective: '',
    vehicleModel: '',
    vehicleYear: '',
    roadPassions: [],
    favoriteBrands: [],
    sports: [],
    glowUpInterest: 0
  });
  const [brandInput, setBrandInput] = useState('');

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleFinish = () => {
    onComplete(profile);
  };

  const toggleSelection = (list: string[], item: string) => {
    return list.includes(item) 
      ? list.filter(i => i !== item) 
      : [...list, item];
  };

  const getStepCount = () => {
    if (profile.ageGroup === '18+') return 10;
    if (profile.ageGroup === '12-18') return 8;
    return 7;
  };

  const getBrandSuggestions = () => {
    if (profile.ageGroup === "5-12") return BRANDS_5_12;
    if (profile.ageGroup === "12-18") return BRANDS_12_18;
    if (profile.ageGroup === "18+") {
      const isHighIncome = profile.income === "2500€ - 4000€" || profile.income === "> 4000€";
      if (isHighIncome) {
        return [...new Set([...BRANDS_18_PLUS_BASIC, ...BRANDS_18_PLUS_PREMIUM])];
      }
      return BRANDS_18_PLUS_BASIC;
    }
    return [];
  };

  return (
    <div className="fixed inset-0 z-[200] bg-surface flex flex-col p-6 overflow-hidden text-on-surface">
      {/* Progress Bar */}
      <div className="w-full flex gap-1 mb-12">
        {Array.from({ length: getStepCount() }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-500",
              step >= i + 1 ? "bg-on-surface" : "bg-on-surface/10"
            )}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full overflow-y-auto pr-2 scrollbar-hide">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1-gender"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-on-surface/5 rounded-2xl flex items-center justify-center">
                  <Sparkles className="text-on-surface" size={24} />
                </div>
                <h1 className="font-headline text-4xl font-black tracking-tighter leading-none">
                  Es-tu un homme ou une femme ?
                </h1>
              </div>

              <div className="flex flex-col gap-3">
                {GENDERS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setProfile({ ...profile, gender: opt });
                      nextStep();
                    }}
                    className={cn(
                      "w-full py-5 rounded-2xl border-2 font-bold transition-all text-left px-6",
                      profile.gender === opt 
                        ? "border-on-surface bg-on-surface text-surface" 
                        : "border-on-surface/10 hover:border-on-surface/40"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2-age"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-on-surface/5 rounded-2xl flex items-center justify-center">
                  <Sparkles className="text-on-surface" size={24} />
                </div>
                <h1 className="font-headline text-4xl font-black tracking-tighter leading-none">
                  Quel âge avez-vous ?
                </h1>
              </div>

              <div className="flex flex-col gap-3">
                {AGE_GROUPS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setProfile({ ...profile, ageGroup: opt });
                      nextStep();
                    }}
                    className={cn(
                      "w-full py-5 rounded-2xl border-2 font-bold transition-all text-left px-6",
                      profile.ageGroup === opt 
                        ? "border-on-surface bg-on-surface text-surface" 
                        : "border-on-surface/10 hover:border-on-surface/40"
                    )}
                  >
                    {opt} ans
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3-situation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-on-surface/5 rounded-2xl flex items-center justify-center">
                  <Target className="text-on-surface" size={24} />
                </div>
                <h1 className="font-headline text-4xl font-black tracking-tighter leading-none">
                  {profile.ageGroup === "5-12" ? "Dans quelle classe es-tu ?" : 
                   profile.ageGroup === "12-18" ? "Dans quelle classe es-tu ?" :
                   "Quelle est ta situation actuelle ?"}
                </h1>
              </div>

              <div className="flex flex-wrap gap-3">
                {(profile.ageGroup === "5-12" ? GRADES_5_12 : 
                  profile.ageGroup === "12-18" ? GRADES_12_18 :
                  SITUATIONS_18_PLUS).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      if (profile.ageGroup === "5-12") {
                        setProfile({ ...profile, grade: opt, objective: 'Scolarité' });
                      } else if (profile.ageGroup === "12-18") {
                        setProfile({ ...profile, schoolLevel: opt, objective: 'Études' });
                      } else {
                        setProfile({ ...profile, situation: opt, objective: 'Professionnel' });
                      }
                      nextStep();
                    }}
                    className={cn(
                      "px-6 py-3 rounded-full border-2 font-bold transition-all",
                      (profile.ageGroup === "5-12" ? profile.grade === opt : 
                       profile.ageGroup === "12-18" ? profile.schoolLevel === opt :
                       profile.situation === opt)
                        ? "border-on-surface bg-on-surface text-surface" 
                        : "border-on-surface/10 hover:border-on-surface/40"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && profile.ageGroup === "18+" && (
            <motion.div
              key="step4-18-income"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-on-surface/5 rounded-2xl flex items-center justify-center">
                  <ShoppingBag className="text-on-surface" size={24} />
                </div>
                <h1 className="font-headline text-4xl font-black tracking-tighter leading-none">
                  Quelle est ta tranche de revenus ?
                </h1>
              </div>

              <div className="flex flex-col gap-3">
                {INCOME_BRACKETS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setProfile({ ...profile, income: opt });
                      nextStep();
                    }}
                    className={cn(
                      "w-full py-5 rounded-2xl border-2 font-bold transition-all text-left px-6",
                      profile.income === opt 
                        ? "border-on-surface bg-on-surface text-surface" 
                        : "border-on-surface/10 hover:border-on-surface/40"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && profile.ageGroup === "18+" && (
            <motion.div
              key="step5-18-housing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-on-surface/5 rounded-2xl flex items-center justify-center">
                  <Target className="text-on-surface" size={24} />
                </div>
                <h1 className="font-headline text-4xl font-black tracking-tighter leading-none">
                  Dans quel logement vis-tu ?
                </h1>
              </div>

              <div className="flex flex-col gap-3">
                {HOUSING_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setProfile({ ...profile, housing: opt });
                      nextStep();
                    }}
                    className={cn(
                      "w-full py-5 rounded-2xl border-2 font-bold transition-all text-left px-6",
                      profile.housing === opt 
                        ? "border-on-surface bg-on-surface text-surface" 
                        : "border-on-surface/10 hover:border-on-surface/40"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 6 && profile.ageGroup === "18+" && (
            <motion.div
              key="step6-18-vehicle"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-on-surface/5 rounded-2xl flex items-center justify-center">
                  <Bike className="text-on-surface" size={24} />
                </div>
                <h1 className="font-headline text-4xl font-black tracking-tighter leading-none">
                  Dans quel véhicule roules-tu ?
                </h1>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={profile.vehicleModel || ''}
                  onChange={(e) => setProfile({ ...profile, vehicleModel: e.target.value })}
                  placeholder="Modèle (ex: Golf 7, MT-07...)"
                  className="w-full bg-on-surface/5 border-2 border-on-surface/10 rounded-2xl py-4 px-6 outline-none focus:border-on-surface transition-colors text-on-surface font-bold"
                />
                <input
                  type="text"
                  value={profile.vehicleYear || ''}
                  onChange={(e) => setProfile({ ...profile, vehicleYear: e.target.value })}
                  placeholder="Année"
                  className="w-full bg-on-surface/5 border-2 border-on-surface/10 rounded-2xl py-4 px-6 outline-none focus:border-on-surface transition-colors text-on-surface font-bold"
                />
                <button
                  onClick={nextStep}
                  className="w-full py-5 rounded-2xl bg-on-surface text-surface font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
                >
                  Continuer
                  <ChevronRight size={20} />
                </button>
                <button
                  onClick={nextStep}
                  className="w-full py-2 text-on-surface/40 font-bold uppercase tracking-widest text-[10px] hover:text-on-surface transition-colors"
                >
                  Je n'ai pas de véhicule
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && profile.ageGroup === "12-18" && (
            <motion.div
              key="step4-12-18-vehicle"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-on-surface/5 rounded-2xl flex items-center justify-center">
                  <Bike className="text-on-surface" size={24} />
                </div>
                <h1 className="font-headline text-4xl font-black tracking-tighter leading-none">
                  As-tu un véhicule ?
                </h1>
                <p className="text-on-surface/40 font-medium">Scooter, moto, voiture sans permis...</p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={profile.vehicleModel || ''}
                  onChange={(e) => setProfile({ ...profile, vehicleModel: e.target.value })}
                  placeholder="Modèle et Année"
                  className="w-full bg-on-surface/5 border-2 border-on-surface/10 rounded-2xl py-4 px-6 outline-none focus:border-on-surface transition-colors text-on-surface font-bold"
                />
                <button
                  onClick={nextStep}
                  className="w-full py-5 rounded-2xl bg-on-surface text-surface font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
                >
                  Continuer
                  <ChevronRight size={20} />
                </button>
                <button
                  onClick={nextStep}
                  className="w-full py-2 text-on-surface/40 font-bold uppercase tracking-widest text-[10px] hover:text-on-surface transition-colors"
                >
                  Je n'ai pas de véhicule
                </button>
              </div>
            </motion.div>
          )}

          {((step === 4 && profile.ageGroup === "5-12") || (step === 5 && profile.ageGroup === "12-18") || (step === 7 && profile.ageGroup === "18+")) && (
            <motion.div
              key="step-road"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-on-surface/5 rounded-2xl flex items-center justify-center">
                  <Bike className="text-on-surface" size={24} />
                </div>
                <h1 className="font-headline text-4xl font-black tracking-tighter leading-none">
                  Qu'est-ce qui te passionne sur la route ?
                </h1>
                <p className="text-on-surface/40 font-medium">Sélectionne plusieurs options si tu veux.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {ROAD_PASSIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setProfile({ 
                      ...profile, 
                      roadPassions: toggleSelection(profile.roadPassions, opt) 
                    })}
                    className={cn(
                      "p-4 rounded-2xl border-2 text-center font-bold transition-all",
                      profile.roadPassions.includes(opt) 
                        ? "border-on-surface bg-on-surface text-surface" 
                        : "border-on-surface/10 hover:border-on-surface/40"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <button
                onClick={nextStep}
                disabled={profile.roadPassions.length === 0}
                className={cn(
                  "w-full py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all mt-auto",
                  profile.roadPassions.length > 0
                    ? "bg-on-surface text-surface"
                    : "bg-on-surface/5 text-on-surface/20 cursor-not-allowed"
                )}
              >
                Continuer
                <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {((step === 5 && profile.ageGroup === "5-12") || (step === 6 && profile.ageGroup === "12-18") || (step === 8 && profile.ageGroup === "18+")) && (
            <motion.div
              key="step-brands"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-on-surface/5 rounded-2xl flex items-center justify-center">
                  <ShoppingBag className="text-on-surface" size={24} />
                </div>
                <h1 className="font-headline text-4xl font-black tracking-tighter leading-none">
                  Quelles sont tes marques préférées ?
                </h1>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/20" size={20} />
                  <input
                    type="text"
                    value={brandInput}
                    onChange={(e) => setBrandInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && brandInput.trim()) {
                        setProfile({ 
                          ...profile, 
                          favoriteBrands: [...new Set([...profile.favoriteBrands, brandInput.trim()])] 
                        });
                        setBrandInput('');
                      }
                    }}
                    placeholder="Ajoute une marque..."
                    className="w-full bg-on-surface/5 border-2 border-on-surface/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-on-surface transition-colors text-on-surface font-bold"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {getBrandSuggestions().map(brand => (
                    <button
                      key={brand}
                      onClick={() => {
                        setProfile({ 
                          ...profile, 
                          favoriteBrands: [...new Set([...profile.favoriteBrands, brand])] 
                        });
                      }}
                      className={cn(
                        "px-4 py-2 rounded-full border border-on-surface/10 text-xs font-bold transition-all",
                        profile.favoriteBrands.includes(brand) ? "bg-on-surface text-surface border-on-surface" : "hover:bg-on-surface/5"
                      )}
                    >
                      {brand}
                    </button>
                  ))}
                </div>

                {profile.favoriteBrands.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4">
                    {profile.favoriteBrands.map(brand => (
                      <span key={brand} className="flex items-center gap-2 bg-on-surface text-surface px-4 py-2 rounded-full text-sm font-black">
                        {brand}
                        <button onClick={() => setProfile({
                          ...profile,
                          favoriteBrands: profile.favoriteBrands.filter(b => b !== brand)
                        })}>
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={nextStep}
                  disabled={profile.favoriteBrands.length === 0}
                  className={cn(
                    "w-full py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all",
                    profile.favoriteBrands.length > 0
                      ? "bg-on-surface text-surface"
                      : "bg-on-surface/5 text-on-surface/20 cursor-not-allowed"
                  )}
                >
                  Continuer
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {((step === 6 && profile.ageGroup === "5-12") || (step === 7 && profile.ageGroup === "12-18") || (step === 9 && profile.ageGroup === "18+")) && (
            <motion.div
              key="step-sports"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-on-surface/5 rounded-2xl flex items-center justify-center">
                  <Trophy className="text-on-surface" size={24} />
                </div>
                <h1 className="font-headline text-4xl font-black tracking-tighter leading-none">
                  Quel sport pratiques-tu ou aimerais-tu pratiquer ?
                </h1>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {SPORTS.map((sport) => (
                  <button
                    key={sport}
                    onClick={() => setProfile({ 
                      ...profile, 
                      sports: toggleSelection(profile.sports, sport) 
                    })}
                    className={cn(
                      "aspect-square rounded-3xl border-2 flex flex-col items-center justify-center gap-3 transition-all",
                      profile.sports.includes(sport) 
                        ? "border-on-surface bg-on-surface text-surface" 
                        : "border-on-surface/10 hover:border-on-surface/40"
                    )}
                  >
                    <span className="font-black text-lg uppercase tracking-tighter">{sport}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={nextStep}
                disabled={profile.sports.length === 0}
                className={cn(
                  "w-full py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all",
                  profile.sports.length > 0
                    ? "bg-on-surface text-surface"
                    : "bg-on-surface/5 text-on-surface/20 cursor-not-allowed"
                )}
              >
                Continuer
                <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {((step === 7 && profile.ageGroup === "5-12") || (step === 8 && profile.ageGroup === "12-18") || (step === 10 && profile.ageGroup === "18+")) && (
            <motion.div
              key="step-welcome"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-on-surface/5 rounded-2xl flex items-center justify-center">
                  <Sparkles className="text-on-surface" size={24} />
                </div>
                <h1 className="font-headline text-4xl font-black tracking-tighter leading-none">
                  Bienvenue dans TYDS
                </h1>
                <p className="text-on-surface/60 font-medium text-lg leading-relaxed">
                  Tu vas améliorer tes compétences grâce à TYDS et être la meilleure version de toi-même tous les jours.
                </p>
              </div>

              <div className="flex flex-col gap-4 py-8">
                <div className="p-6 rounded-3xl bg-on-surface/5 border-2 border-on-surface/10">
                  <p className="text-on-surface font-bold text-center italic">
                    "Le succès est la somme de petits efforts répétés jour après jour."
                  </p>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-5 rounded-2xl bg-on-surface text-surface font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all mt-auto"
              >
                C'est parti !
                <ChevronRight size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {step > 1 && (
          <button 
            onClick={prevStep}
            className="mt-8 text-on-surface/40 font-bold uppercase tracking-widest text-xs hover:text-on-surface transition-colors"
          >
            Retour
          </button>
        )}

        {/* Trust Badge */}
        <div className="mt-auto pt-8 flex items-center justify-center gap-2 text-on-surface/40">
          <ShieldCheck size={14} />
          <span className="text-[9px] font-bold uppercase tracking-widest">Données cryptées & hébergées en Suisse 🇨🇭</span>
        </div>
      </div>
    </div>
  );
}
