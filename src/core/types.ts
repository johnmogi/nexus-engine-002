export const ELEMENTS = ["air", "fire", "water", "earth"] as const;
export const RANKS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export const CONTEXTS = ["room", "monster", "trap", "loot", "npc", "clue", "twist"] as const;
export const GRID_SIZES = [3, 4, 5] as const;
export const DICE = [4, 6, 8, 10, 12, 20, 100] as const;

export type ElementName = (typeof ELEMENTS)[number];
export type Rank = (typeof RANKS)[number];
export type Context = (typeof CONTEXTS)[number];
export type GridSize = (typeof GRID_SIZES)[number];
export type Die = (typeof DICE)[number];
export type FamilyId = "insects" | "dwarves" | "food";

export interface Card {
  id: string;
  rank: Rank;
  element: ElementName;
  label: string;
}

export interface JokerSlot {
  id: string;
  index: number;
  enabled: false;
  reserved: true;
}

export interface GeneratedThing {
  id: string;
  seed: string;
  card: Card;
  context: Context;
  title: string;
  description: string;
  tags: string[];
  difficulty: number;
  rewardHint: string;
  dmChoice: string;
  family: FamilyId;
}

export interface LogEntry {
  id: string;
  seed: string;
  kind: string;
  title: string;
  text: string;
  createdAt: string;
}
