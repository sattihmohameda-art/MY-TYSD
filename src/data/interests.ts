import React from 'react';

export interface Interest {
  id: string;
  name: string;
  icon: React.ElementType;
}

export const interestsData: Interest[] = [
  { id: 'mecanique', name: 'Mécanique', icon: () => null },
  { id: 'maquillage', name: 'Maquillage', icon: () => null },
  { id: 'bricolage', name: 'Bricolage', icon: () => null },
  { id: 'jardinage', name: 'Jardinage', icon: () => null },
  { id: 'cuisine', name: 'Cuisine', icon: () => null },
  { id: 'decoration', name: 'Décoration', icon: () => null },
  { id: 'technologie', name: 'Technologie', icon: () => null },
  { id: 'sante', name: 'Santé & Bien-être', icon: () => null },
];
