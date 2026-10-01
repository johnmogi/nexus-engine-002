import type { Card, GeneratedThing } from "../core/types.js";
import { generateThing } from "./interpret.js";

export function generateLoot(seed: string, card?: Card): GeneratedThing {
  return generateThing({ seed, context: "loot", card });
}
