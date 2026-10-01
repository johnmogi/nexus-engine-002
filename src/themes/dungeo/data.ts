import type { ElementName, FamilyId, Rank } from "../../core/types.js";

export interface NamedBit {
  family: FamilyId;
  name: string;
}

export interface ElementMeaning {
  element: ElementName;
  roomTags: string[];
  monsterTags: string[];
  trapTags: string[];
  lootTags: string[];
  sensoryDetails: string[];
  places: NamedBit[];
  monsters: NamedBit[];
  traps: NamedBit[];
  loot: NamedBit[];
  npcs: NamedBit[];
  clues: NamedBit[];
}

export interface RankMeaning {
  rank: Rank;
  intensity: string;
  danger: number;
  reward: string;
  narrativeRole: string;
  adjective: string;
}

export interface Family {
  id: FamilyId;
  name: string;
  tone: string;
  elements: ElementName[];
}

export const FAMILIES: readonly Family[] = [
  { id: "insects", name: "Insects", tone: "skittering, sweet, and hard to swat", elements: ["air", "earth"] },
  { id: "dwarves", name: "Dwarves", tone: "stubborn, flour-dusted, and proud of a bad recipe", elements: ["earth", "fire"] },
  { id: "food", name: "Food creatures", tone: "edible, offended, and slightly alive", elements: ["water", "fire"] },
];

export const OBJECTIVES = [
  "Recover the stolen sugar",
  "Collect three missing ingredients",
  "Find the torn recipe page",
  "Reach the final kitchen",
  "Defeat the kitchen boss",
] as const;

export const HERO_CLASSES = [
  { name: "Kitchen Mage", note: "Casts with steam, spice, and badly timed glamours." },
  { name: "Pantry Ranger", note: "Tracks crumbs, drafts, and whoever ate the last tart." },
  { name: "Cuisine Warrior", note: "Fights with pan, peel, and unreasonable confidence." },
  { name: "Taste Tester", note: "Risks a bite, then tells the party if it was a trap." },
] as const;

export const SAMPLE_STATS = ["HP", "Hunger", "Sweet Tooth", "Attack", "Defense", "Inventory", "Ingredients"] as const;

export const RANK_MEANING: Record<Rank, RankMeaning> = {
  1: { rank: 1, intensity: "origin", danger: 1, reward: "a small clue", narrativeRole: "weak start", adjective: "Seed" },
  2: { rank: 2, intensity: "fork", danger: 2, reward: "a minor choice", narrativeRole: "a small fork", adjective: "Forked" },
  3: { rank: 3, intensity: "unstable", danger: 3, reward: "a first challenge", narrativeRole: "an unstable event", adjective: "Unstable" },
  4: { rank: 4, intensity: "structure", danger: 4, reward: "a guarded find", narrativeRole: "a locked structure", adjective: "Locked" },
  5: { rank: 5, intensity: "pressure", danger: 5, reward: "a pressured prize", narrativeRole: "a complication", adjective: "Pressed" },
  6: { rank: 6, intensity: "strong", danger: 6, reward: "meaningful treasure", narrativeRole: "a strong encounter", adjective: "Elite" },
  7: { rank: 7, intensity: "rare", danger: 7, reward: "a strange prize", narrativeRole: "something hidden", adjective: "Hidden" },
  8: { rank: 8, intensity: "deep", danger: 8, reward: "a dangerous cache", narrativeRole: "a deep danger", adjective: "Deep" },
  9: { rank: 9, intensity: "climax", danger: 9, reward: "a relic or revelation", narrativeRole: "the climax", adjective: "Climactic" },
};

export const ELEMENT_MEANING: Record<ElementName, ElementMeaning> = {
  air: {
    element: "air",
    roomTags: ["draft", "height", "sound"],
    monsterTags: ["flying", "nuisance"],
    trapTags: ["gust", "confusion"],
    lootTags: ["light", "spice"],
    sensoryDetails: ["a cold draft", "whistling vents", "flour hanging in the air", "a sweet high note"],
    places: [
      { family: "insects", name: "Moth Pantry" },
      { family: "food", name: "High Pastry Shelf" },
      { family: "dwarves", name: "Bellows Landing" },
    ],
    monsters: [
      { family: "insects", name: "Crumb Moth" },
      { family: "insects", name: "Sugar Gnat" },
      { family: "food", name: "Pastry Bat" },
      { family: "dwarves", name: "Bellows Scout" },
    ],
    traps: [
      { family: "insects", name: "Flour Burst" },
      { family: "food", name: "Scent Confusion" },
      { family: "dwarves", name: "Gust Grate" },
    ],
    loot: [
      { family: "food", name: "Feather Whisk" },
      { family: "food", name: "Cloud Meringue" },
      { family: "dwarves", name: "Breeze Spice Vial" },
      { family: "insects", name: "Gnat-Silk Thread" },
    ],
    npcs: [
      { family: "insects", name: "Nervous Kitchen Sprite" },
      { family: "dwarves", name: "Breathless Scout" },
      { family: "food", name: "Gossiping Messenger Tart" },
    ],
    clues: [
      { family: "food", name: "Smell Trail" },
      { family: "insects", name: "Note Blown Under the Door" },
      { family: "dwarves", name: "Whispered Warning" },
    ],
  },
  fire: {
    element: "fire",
    roomTags: ["heat", "spice", "urgency"],
    monsterTags: ["burning", "angry"],
    trapTags: ["blast", "sear"],
    lootTags: ["cooked", "crystal"],
    sensoryDetails: ["pepper smoke", "caramel heat", "a ticking sizzle", "sugar threatening to burn"],
    places: [
      { family: "dwarves", name: "Pepper Furnace" },
      { family: "food", name: "Caramel Kiln" },
      { family: "insects", name: "Chili Ant Hearth" },
    ],
    monsters: [
      { family: "insects", name: "Chili Ant" },
      { family: "insects", name: "Coal Beetle" },
      { family: "food", name: "Frying Imp" },
      { family: "dwarves", name: "Scorched Baker" },
    ],
    traps: [
      { family: "dwarves", name: "Pepper Furnace Vent" },
      { family: "food", name: "Popping Oil" },
      { family: "insects", name: "Spark Latch" },
    ],
    loot: [
      { family: "food", name: "Cracked Sugar Crystal" },
      { family: "dwarves", name: "Ember Spoon" },
      { family: "insects", name: "Chili Oil" },
    ],
    npcs: [
      { family: "dwarves", name: "Impatient Saucier" },
      { family: "food", name: "Soot Courier" },
      { family: "insects", name: "Hearth Ant Speaker" },
    ],
    clues: [
      { family: "dwarves", name: "Scorch Mark" },
      { family: "food", name: "Burnt Recipe Scrap" },
      { family: "insects", name: "Heat Shimmer" },
    ],
  },
  water: {
    element: "water",
    roomTags: ["slime", "memory", "ferment"],
    monsterTags: ["slick", "soft"],
    trapTags: ["splash", "rot"],
    lootTags: ["broth", "pearl"],
    sensoryDetails: ["warm broth", "sour ferment", "a sweet drip", "steam on cold stone"],
    places: [
      { family: "food", name: "Syrup Cistern" },
      { family: "dwarves", name: "Soup Canal" },
      { family: "insects", name: "Ferment Cellar" },
    ],
    monsters: [
      { family: "food", name: "Glaze Slug" },
      { family: "food", name: "Broth Leech" },
      { family: "insects", name: "Jelly Newt" },
      { family: "dwarves", name: "Brine Cook" },
    ],
    traps: [
      { family: "food", name: "Slick Syrup" },
      { family: "dwarves", name: "Drowning Bowl" },
      { family: "insects", name: "Sour Splash" },
    ],
    loot: [
      { family: "food", name: "Healing Broth" },
      { family: "dwarves", name: "Fermented Pearl" },
      { family: "insects", name: "Syrup Key" },
    ],
    npcs: [
      { family: "dwarves", name: "Weepy Steward" },
      { family: "food", name: "Ferment Monk" },
      { family: "insects", name: "Label Floater" },
    ],
    clues: [
      { family: "food", name: "Salty Tear Stain" },
      { family: "dwarves", name: "Floating Label" },
      { family: "insects", name: "Ripple Message" },
    ],
  },
  earth: {
    element: "earth",
    roomTags: ["stone", "tunnel", "weight"],
    monsterTags: ["buried", "sturdy"],
    trapTags: ["collapse", "stick"],
    lootTags: ["crystal", "bread"],
    sensoryDetails: ["yeast and stone", "sugar grit", "old bread", "a low sweet rumble"],
    places: [
      { family: "dwarves", name: "Root Tunnel" },
      { family: "food", name: "Bread Vault" },
      { family: "insects", name: "Sugar Mine" },
    ],
    monsters: [
      { family: "food", name: "Crumb Golem" },
      { family: "insects", name: "Root Beetle" },
      { family: "dwarves", name: "Dough Warden" },
      { family: "food", name: "Rye Crab" },
    ],
    traps: [
      { family: "food", name: "Collapsing Crust" },
      { family: "dwarves", name: "Sticky Sugar Floor" },
      { family: "insects", name: "Buried Grate" },
    ],
    loot: [
      { family: "dwarves", name: "Sugar Crystal" },
      { family: "food", name: "Rye Shield" },
      { family: "insects", name: "Buried Spice" },
    ],
    npcs: [
      { family: "dwarves", name: "Tunnel Mason" },
      { family: "food", name: "Buried Taster" },
      { family: "insects", name: "Mine Cricket" },
    ],
    clues: [
      { family: "insects", name: "Crumb Trail" },
      { family: "dwarves", name: "Carved Recipe" },
      { family: "food", name: "Sugar Coin" },
    ],
  },
};
