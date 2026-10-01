import type { CharacterStats } from "../../core/types.js";

export interface HeroClass {
  id: string;
  className: string;
  description: string;
  stats: CharacterStats;
  startingItem: string;
}

export const CHARACTERS: readonly HeroClass[] = [
  {
    id: "kitchen-mage",
    className: "Kitchen Mage",
    description: "Casts with steam, spice, and badly timed glamours.",
    stats: { hp: 8, hunger: 2, sweetTooth: 3, attack: 3, defense: 2 },
    startingItem: "Steam ladle",
  },
  {
    id: "pantry-ranger",
    className: "Pantry Ranger",
    description: "Tracks crumbs, drafts, and whoever ate the last tart.",
    stats: { hp: 9, hunger: 2, sweetTooth: 1, attack: 2, defense: 2 },
    startingItem: "Crumb compass",
  },
  {
    id: "cuisine-warrior",
    className: "Cuisine Warrior",
    description: "Fights with pan, peel, and unreasonable confidence.",
    stats: { hp: 12, hunger: 3, sweetTooth: 1, attack: 4, defense: 3 },
    startingItem: "Dented pan",
  },
  {
    id: "taste-tester",
    className: "Taste Tester",
    description: "Risks a bite, then tells the party if it was a trap.",
    stats: { hp: 7, hunger: 4, sweetTooth: 4, attack: 1, defense: 2 },
    startingItem: "Silver spoon",
  },
];
