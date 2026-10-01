import type { Card, GeneratedThing } from "../core/types.js";
import { generateThing } from "./interpret.js";

export function generateRoom(seed: string, card?: Card): GeneratedThing {
  return generateThing({ seed, context: "room", card });
}
