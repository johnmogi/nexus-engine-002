import type { Card, ElementName, JokerSlot, Rank } from "./types.js";
import { ELEMENTS, RANKS } from "./types.js";
import { rngFrom, shuffle } from "./rng.js";

export const JOKER_SLOTS: readonly JokerSlot[] = [1, 2, 3, 4].map((index) => ({
  id: `joker-${index}`,
  index,
  enabled: false,
  reserved: true,
}));

export function rankLabel(rank: Rank): string {
  return rank === 1 ? "A" : String(rank);
}

export function elementLabel(element: ElementName): string {
  return element.charAt(0).toUpperCase() + element.slice(1);
}

export function makeCard(rank: Rank, element: ElementName): Card {
  return {
    id: `${rankLabel(rank)}-${element}`,
    rank,
    element,
    label: `${rankLabel(rank)} ${elementLabel(element)}`,
  };
}

export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const element of ELEMENTS) {
    for (const rank of RANKS) deck.push(makeCard(rank, element));
  }
  return deck;
}

export function drawCard(seed: string): Card {
  return shuffle(createDeck(), rngFrom(`draw:${seed}`))[0]!;
}

export function dealCards(seed: string, count: number): Card[] {
  const deck = shuffle(createDeck(), rngFrom(`deal:${seed}`));
  if (count > deck.length) throw new Error(`Cannot deal ${count} cards from a ${deck.length} card deck`);
  return deck.slice(0, count);
}
