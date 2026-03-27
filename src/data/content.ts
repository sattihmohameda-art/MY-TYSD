export type Tab = 'glow' | 'infos' | 'detente' | 'menu' | 'message';
export type AgeGroup = '5-12' | '12-18' | '18+';

export interface FeedContent {
  id: string;
  tab: Tab;
  ageGroup: AgeGroup | 'all';
  caption: string;
  hashtags: string[];
  musicTitle: string;
  imageUrl: string;
  likes: string;
}

export interface ArticleContent {
  id: string;
  ageGroup: AgeGroup | 'all';
  category: string;
  tag: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const FEED_LIBRARY: FeedContent[] = [
  // --- CHILDREN (5-12) ---
  {
    id: 'child-glow-1',
    tab: 'glow',
    ageGroup: '5-12',
    caption: 'Apprendre les divisions en s\'amusant ! ➗✨',
    hashtags: ['ecoledufutur', 'maths', 'learning'],
    musicTitle: 'Upbeat Study - Kids Edition',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000',
    likes: '12.4K'
  },
  {
    id: 'child-detente-1',
    tab: 'detente',
    ageGroup: '5-12',
    caption: 'Le chiot le plus mignon du monde ! 🐶💖',
    hashtags: ['animaux', 'rires', 'cute'],
    musicTitle: 'Funny Moments - Instrumental',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=1000',
    likes: '89.2K'
  },

  // --- TEENS (12-18) ---
  {
    id: 'teen-glow-1',
    tab: 'glow',
    ageGroup: '12-18',
    caption: '3 astuces pour booster ta confiance en public ! 🎤🔥',
    hashtags: ['softskills', 'publicspeaking', 'glowup'],
    musicTitle: 'Confidence Boost - LoFi',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1000',
    likes: '25.6K'
  },
  {
    id: 'teen-glow-2',
    tab: 'glow',
    ageGroup: '12-18',
    caption: 'Comment réviser efficacement pour tes examens 📚✨',
    hashtags: ['study', 'focus', 'glowup'],
    musicTitle: 'Study Beats',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000',
    likes: '18.2K'
  },
  {
    id: 'teen-detente-1',
    tab: 'detente',
    ageGroup: '12-18',
    caption: 'Ce clutch était incroyable ! 🏆🎮',
    hashtags: ['esports', 'gaming', 'trends'],
    musicTitle: 'Cyberpunk Beats - Night City',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000',
    likes: '145K'
  },
  {
    id: 'teen-detente-2',
    tab: 'detente',
    ageGroup: '12-18',
    caption: 'Nouvelle Yamaha R1 : Un monstre sur la route 🏍️💨',
    hashtags: ['motos', 'yamaha', 'vitesse'],
    musicTitle: 'Engine Roar',
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=1000',
    likes: '210K'
  },

  // --- ADULTS (18+) ---
  {
    id: 'adult-glow-1',
    tab: 'glow',
    ageGroup: '18+',
    caption: 'Tuto : Vidange complète sur C3 en 10min ! 🔧🚗',
    hashtags: ['mecanique', 'bricolage', 'expertise'],
    musicTitle: 'Workshop Vibes - Rock',
    imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=1000',
    likes: '15.2K'
  },
  {
    id: 'adult-detente-1',
    tab: 'detente',
    ageGroup: '18+',
    caption: 'Le calme absolu après une semaine pro intense. 🌊🧘',
    hashtags: ['voyage', 'bienetre', 'evasion'],
    musicTitle: 'Ocean Waves - Meditation',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000',
    likes: '56.7K'
  }
];

export const ARTICLE_LIBRARY: ArticleContent[] = [
  {
    id: 'art-child-1',
    ageGroup: '5-12',
    category: 'Succès & Positivisme',
    tag: 'Inventions',
    title: 'Les 5 inventions créées par des enfants !',
    description: 'Découvre comment des enfants comme toi ont changé le monde avec leurs idées géniales.',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'art-teen-1',
    ageGroup: '12-18',
    category: 'Lifestyle & Tech',
    tag: 'Tendances',
    title: 'iPhone vs Android : Le match de 2026',
    description: 'Analyse complète des nouveaux modèles et des tendances tech pour ton setup.',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'art-teen-2',
    ageGroup: '12-18',
    category: 'Mode & Style',
    tag: 'Nouveauté',
    title: 'Zara : La nouvelle collection Printemps 2026',
    description: 'Découvre les pièces incontournables de la saison pour ton look Glow Up.',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'art-adult-1',
    ageGroup: '18+',
    category: 'Projets & Investissement',
    tag: 'Immobilier',
    title: 'Immobilier : Pourquoi investir en 2026 ?',
    description: 'Analyse prospective des marchés urbains et des nouvelles opportunités de placement.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000'
  }
];
