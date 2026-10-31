export type TabType = 'drop' | 'menu' | 'custom' | 'vibes' | 'bag';

export interface BaseOption {
  id: string;
  name: string;
  desc: string;
  price: number;
  chefPick?: boolean;
  icon: string;
}

export interface ProteinOption {
  id: string;
  name: string;
  desc: string;
  price: number;
  tag: string;
  tagColor?: string;
}

export interface SauceOption {
  id: string;
  name: string;
  desc: string;
  colorHex: string;
}

export interface AddonOption {
  id: string;
  name: string;
  desc: string;
  price: number;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  optionsSummary?: string;
  base?: string;
  protein?: string;
  sauce?: string;
  heatLevel?: number;
  addons?: string[];
  notes?: string;
}

export interface DishItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  desc: string;
  heatScore: string;
  heatLevel: number;
  prepTime: string;
  calories: string;
  dietTags: string[];
  promoTag?: string;
  isHalal?: boolean;
  isVegan?: boolean;
  category: 'mashup' | 'noodles' | 'baos' | 'boba' | 'vegan';
  image: string;
  altText: string;
}

export interface SquadPackItem {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  badge: string;
  savings: string;
  desc: string;
  items: { icon: string; name: string }[];
  readyIn: string;
}
