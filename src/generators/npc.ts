import type { Card, Context, GeneratedThing } from "../core/types.js";
import { generateThing } from "./interpret.js";

export function generateNpc(seed: string, card?: Card): GeneratedThing {
  return generateThing({ seed, context: "npc", card });
}

export function generateClue(seed: string, card?: Card): GeneratedThing {
  return generateThing({ seed, context: "clue", card });
}

export function generateTwist(seed: string, card?: Card): GeneratedThing {
  return generateThing({ seed, context: "twist", card });
}

export function generatePrompt(seed: string, context: Extract<Context, "npc" | "clue" | "twist">, card?: Card): GeneratedThing {
  return generateThing({ seed, context, card });
}
