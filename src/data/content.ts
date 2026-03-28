export type Tab = 'glow' | 'infos' | 'detente' | 'menu' | 'message' | 'maps' | 'enregistrement' | 'boutique';
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
  },
  {
    id: 'all-glow-makeup-1',
    tab: 'glow',
    ageGroup: 'all',
    caption: 'Routine makeup "No Makeup" pour un look naturel ✨💄',
    hashtags: ['maquillage', 'beauty', 'glowup'],
    musicTitle: 'Soft Beauty - Chill',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1000',
    likes: '42.1K'
  },
  {
    id: 'all-glow-bricolage-1',
    tab: 'glow',
    ageGroup: 'all',
    caption: 'Rénovation de ma cuisine : Le résultat final ! 🔨🏠',
    hashtags: ['bricolage', 'diy', 'renovation'],
    musicTitle: 'Workshop Beats',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1000',
    likes: '128K'
  },
  {
    id: 'all-glow-mode-1',
    tab: 'glow',
    ageGroup: 'all',
    caption: '3 tenues Zara pour le printemps 👗✨',
    hashtags: ['mode', 'style', 'zara'],
    musicTitle: 'Fashion Week - House',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000',
    likes: '67.4K'
  },
  // --- NEW VIDEOS GLOW UP ---
  {
    id: 'glow-up-v1',
    tab: 'glow',
    ageGroup: 'all',
    caption: 'Routine matinale pour une productivité maximale ☀️🚀',
    hashtags: ['glowup', 'productivity', 'morningroutine'],
    musicTitle: 'Morning Energy - LoFi',
    imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1000',
    likes: '45.2K'
  },
  {
    id: 'glow-up-v2',
    tab: 'glow',
    ageGroup: 'all',
    caption: 'Comment s\'habiller avec style avec un petit budget 👗💸',
    hashtags: ['mode', 'budget', 'glowup'],
    musicTitle: 'Stylish Beats',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000',
    likes: '32.1K'
  },
  {
    id: 'glow-up-v3',
    tab: 'glow',
    ageGroup: 'all',
    caption: 'Apprendre une nouvelle langue en 30 jours 🌍📚',
    hashtags: ['langues', 'learning', 'glowup'],
    musicTitle: 'Global Vibes',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1000',
    likes: '28.9K'
  },
  {
    id: 'glow-up-v4',
    tab: 'glow',
    ageGroup: 'all',
    caption: 'Maîtriser l\'art de la méditation pour débutants 🧘‍♂️✨',
    hashtags: ['meditation', 'zen', 'glowup'],
    musicTitle: 'Peaceful Mind',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000',
    likes: '54.3K'
  },
  {
    id: 'glow-up-v5',
    tab: 'glow',
    ageGroup: 'all',
    caption: 'Conseils pour booster sa confiance en soi 💪 #mindset #confidence #glowup',
    hashtags: ['mindset', 'confidence', 'glowup', 'motivation'],
    musicTitle: 'Power Up - Motivation',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500',
    likes: '20.3k'
  },
  // --- NEW VIDEOS DETENTE ---
  {
    id: 'detente-v1',
    tab: 'detente',
    ageGroup: 'all',
    caption: 'Session gaming chill sur mon setup 🎮 #gaming #setup #chill',
    hashtags: ['gaming', 'setup', 'chill', 'lifestyle'],
    musicTitle: 'Game On - Synthwave',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=500',
    likes: '5.4k'
  },
  {
    id: 'detente-v2',
    tab: 'detente',
    ageGroup: 'all',
    caption: 'Balade en moto au coucher du soleil 🏍️ #moto #sunset #freedom',
    hashtags: ['moto', 'sunset', 'freedom', 'travel'],
    musicTitle: 'Ride Free - Rock',
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=500',
    likes: '11.2k'
  },
  {
    id: 'detente-v3',
    tab: 'detente',
    ageGroup: 'all',
    caption: 'Recette facile pour un goûter gourmand 🍪 #food #cooking #chill',
    hashtags: ['food', 'cooking', 'chill', 'lifestyle'],
    musicTitle: 'Sweet Treats - Happy Mix',
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=500',
    likes: '7.8k'
  },
  {
    id: 'detente-v4',
    tab: 'detente',
    ageGroup: 'all',
    caption: 'Moment de calme avec mon chat 🐱 #cat #chill #pets',
    hashtags: ['cat', 'chill', 'pets', 'animals'],
    musicTitle: 'Purrfect Day - Relax',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500',
    likes: '14.5k'
  },
  {
    id: 'detente-v5',
    tab: 'detente',
    ageGroup: 'all',
    caption: 'Découverte d\'un lieu secret en ville 🏙️ #travel #explore #hidden',
    hashtags: ['travel', 'explore', 'hidden', 'city'],
    musicTitle: 'Urban Explorer - Lo-fi',
    imageUrl: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=500',
    likes: '9.1k'
  },
  // --- NEW VIDEOS INFOS ---
  {
    id: 'infos-v1',
    tab: 'infos',
    ageGroup: 'all',
    caption: 'Les dernières actus tech à ne pas manquer 📱 #tech #news #infos',
    hashtags: ['tech', 'news', 'infos', 'future'],
    musicTitle: 'Tech News - Digital',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=500',
    likes: '3.4k'
  },
  {
    id: 'infos-v2',
    tab: 'infos',
    ageGroup: 'all',
    caption: 'Comment protéger ses données en ligne 🔒 #security #privacy #infos',
    hashtags: ['security', 'privacy', 'infos', 'tips'],
    musicTitle: 'Safe & Sound - Security',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=500',
    likes: '6.2k'
  },
  {
    id: 'infos-v3',
    tab: 'infos',
    ageGroup: 'all',
    caption: 'L\'impact de l\'IA sur notre quotidien 🤖 #ai #future #infos',
    hashtags: ['ai', 'future', 'infos', 'tech'],
    musicTitle: 'Future is Now - AI',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=500',
    likes: '12.1k'
  },
  {
    id: 'infos-v4',
    tab: 'infos',
    ageGroup: 'all',
    caption: 'Les tendances mode de la saison 👗 #fashion #trends #infos',
    hashtags: ['fashion', 'trends', 'infos', 'style'],
    musicTitle: 'Fashion Week - Runway',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=500',
    likes: '8.5k'
  },
  {
    id: 'infos-v5',
    tab: 'infos',
    ageGroup: 'all',
    caption: 'Guide pour voyager éco-responsable 🌍 #travel #eco #infos',
    hashtags: ['travel', 'eco', 'infos', 'planet'],
    musicTitle: 'Green Earth - Nature',
    imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=500',
    likes: '10.3k'
  },
  {
    id: 'glow-up-v6',
    tab: 'glow',
    ageGroup: 'all',
    caption: 'Transformer sa chambre en sanctuaire de paix 🛏️🌿',
    hashtags: ['deco', 'home', 'glowup'],
    musicTitle: 'Cozy Home - Chill',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000',
    likes: '39.8K'
  },
  // --- NEW VIDEOS DETENTE ---
  {
    id: 'detente-v6',
    tab: 'detente',
    ageGroup: 'all',
    caption: 'Voyage au coeur des Alpes suisses 🏔️❄️',
    hashtags: ['voyage', 'nature', 'detente'],
    musicTitle: 'Mountain Echoes',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000',
    likes: '112K'
  },
  {
    id: 'detente-v7',
    tab: 'detente',
    ageGroup: 'all',
    caption: 'ASMR : Le son de la pluie sur une vitre 🌧️🎧',
    hashtags: ['asmr', 'relax', 'detente'],
    musicTitle: 'Rainy Night - ASMR',
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=1000',
    likes: '87.5K'
  },
  {
    id: 'detente-v8',
    tab: 'detente',
    ageGroup: 'all',
    caption: 'Recette facile : Cookies au chocolat fondant 🍪🍫',
    hashtags: ['cuisine', 'food', 'detente'],
    musicTitle: 'Sweet Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=1000',
    likes: '245K'
  },
  {
    id: 'detente-v9',
    tab: 'detente',
    ageGroup: 'all',
    caption: 'Une journée à la plage sans personne 🏖️🌊',
    hashtags: ['plage', 'solo', 'detente'],
    musicTitle: 'Summer Breeze',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000',
    likes: '156K'
  },
  {
    id: 'detente-v10',
    tab: 'detente',
    ageGroup: 'all',
    caption: 'Peinture intuitive : Laisse parler ton imagination 🎨✨',
    hashtags: ['art', 'creativite', 'detente'],
    musicTitle: 'Creative Flow',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4ce18a802b?auto=format&fit=crop&q=80&w=1000',
    likes: '93.2K'
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
  },
  // --- NEW ARTICLES DETENTE ---
  {
    id: 'art-detente-1',
    ageGroup: 'all',
    category: 'Voyage & Evasion',
    tag: 'Destinations',
    title: 'Les 10 plus beaux villages de France à visiter',
    description: 'Un guide complet pour vos prochaines escapades le temps d\'un week-end.',
    imageUrl: 'https://images.unsplash.com/photo-1508824717784-73445ae14934?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'art-detente-2',
    ageGroup: 'all',
    category: 'Bien-être',
    tag: 'Santé',
    title: 'Comment améliorer son sommeil naturellement',
    description: 'Des conseils simples et efficaces pour retrouver des nuits paisibles.',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'art-detente-3',
    ageGroup: 'all',
    category: 'Gastronomie',
    tag: 'Recettes',
    title: 'Le secret du vrai chocolat chaud à l\'ancienne',
    description: 'Une recette réconfortante pour les après-midis d\'hiver.',
    imageUrl: 'https://images.unsplash.com/photo-1544787210-228394c3d3e2?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'art-detente-4',
    ageGroup: 'all',
    category: 'Culture',
    tag: 'Cinéma',
    title: 'Les films qui font du bien au moral',
    description: 'Notre sélection de "feel-good movies" à voir absolument.',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'art-detente-5',
    ageGroup: 'all',
    category: 'Nature',
    tag: 'Randonnée',
    title: 'Marcher en forêt : Les bienfaits insoupçonnés',
    description: 'Pourquoi une simple balade peut transformer votre état d\'esprit.',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000'
  }
];
