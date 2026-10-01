import type { Card, Context, ElementName } from "../core/types.js";
import { CONTEXTS, ELEMENTS } from "../core/types.js";
import { elementLabel } from "../core/cards.js";
import { rngFrom } from "../core/rng.js";

export interface Matchup {
  left: ElementName;
  right: ElementName;
  title: string;
  prompt: string;
}

const PAIR_TEXT: Record<string, { title: string; prompt: string }> = {
  "air+fire": { title: "Flare", prompt: "Air feeds the fire. Spice smoke spreads one room farther than the party hoped." },
  "air+water": { title: "Mist", prompt: "Air lifts the water into mist. Sounds and smells travel, sight does not." },
  "air+earth": { title: "Dust", prompt: "Air worries the earth into flour-dust. Tracks vanish. Coughing starts." },
  "fire+water": { title: "Steam", prompt: "Fire meets water and the room fills with steam. Heat stays. Edges blur." },
  "fire+earth": { title: "Bake", prompt: "Fire works the earth. Dough, sugar, or stone sets hard. Something is cooking whether they like it or not." },
  "water+earth": { title: "Ferment", prompt: "Water soaks the earth. Roots, bread, or mortar turn soft, sour, and useful." },
};

function pairKey(left: ElementName, right: ElementName): string {
  return [left, right].sort().join("+");
}

export function matchup(left: ElementName, right: ElementName): Matchup {
  if (left === right) {
    return {
      left,
      right,
      title: `${elementLabel(left)} doubled`,
      prompt: `Both sides are ${left}. The effect is louder, not new. Push the existing danger one step further.`,
    };
  }
  const text = PAIR_TEXT[pairKey(left, right)]!;
  return { left, right, title: text.title, prompt: text.prompt };
}

export function randomEventType(seed: string): Context {
  return rngFrom(`event:${seed}`).pick(CONTEXTS);
}

export function randomElement(seed: string): ElementName {
  return rngFrom(`element:${seed}`).pick(ELEMENTS);
}

export function contextForRank(card: Card): Context {
  if (card.rank <= 2) return "clue";
  if (card.rank === 3 || card.rank === 6) return "monster";
  if (card.rank === 4) return "room";
  if (card.rank === 5 || card.rank === 8) return "trap";
  if (card.rank === 7) return "loot";
  return "twist";
}
