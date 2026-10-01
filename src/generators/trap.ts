import type { Card, GeneratedThing } from "../core/types.js";
import { generateThing } from "./interpret.js";

export function generateTrap(seed: string, card?: Card): GeneratedThing {
  return generateThing({ seed, context: "trap", card });
}
