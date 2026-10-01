import type { Context, ElementName, FamilyId, Rank } from "../../core/types.js";
import { ELEMENT_MEANING, FAMILIES, RANK_MEANING } from "./data.js";
import type { NamedBit } from "./data.js";

export function familyById(id: FamilyId) {
  return FAMILIES.find((family) => family.id === id)!;
}

export function bitsFor(element: ElementName, context: Context): readonly NamedBit[] {
  const meaning = ELEMENT_MEANING[element];
  if (context === "room") return meaning.places;
  if (context === "monster") return meaning.monsters;
  if (context === "trap") return meaning.traps;
  if (context === "loot") return meaning.loot;
  if (context === "npc") return meaning.npcs;
  return meaning.clues;
}

export function rankMeaning(rank: Rank) {
  return RANK_MEANING[rank];
}

export const DM_CHOICES: Record<Context, string> = {
  room: "Search the corners, pass through, or fortify the door.",
  monster: "Fight with one roll, bargain, or try to slip past.",
  trap: "Disable the device, endure it, or lure a creature into it.",
  loot: "Take it, leave it, or taste a crumb first.",
  npc: "Ask a question, offer a job, or let them leave.",
  clue: "Follow it, pocket it, or ignore it.",
  twist: "Believe it, test it, or turn it back on the party.",
};
