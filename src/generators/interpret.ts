import type { Card, Context, GeneratedThing } from "../core/types.js";
import { drawCard } from "../core/cards.js";
import { rngFrom } from "../core/rng.js";
import { ELEMENT_MEANING } from "../themes/dungeo/data.js";
import { DM_CHOICES, bitsFor, familyById, rankMeaning } from "../themes/dungeo/grammar.js";

export function generateThing(input: { seed: string; context: Context; card?: Card }): GeneratedThing {
  const card = input.card ?? drawCard(input.seed);
  const rng = rngFrom(`${input.seed}:${card.id}:${input.context}`);
  const meaning = ELEMENT_MEANING[card.element];
  const rank = rankMeaning(card.rank);
  const options = bitsFor(card.element, input.context);
  const familyId = rng.pick(options).family;
  const familyBits = options.filter((bit) => bit.family === familyId);
  const bit = rng.pick(familyBits.length ? familyBits : options);
  const family = familyById(bit.family);
  const sensory = rng.pick(meaning.sensoryDetails);
  const reward = rng.pick(meaning.loot).name;
  const title = input.context === "twist" ? `Twist: ${bit.name}` : `${rank.adjective} ${bit.name}`;
  const description = describe(input.context, {
    name: bit.name,
    sensory,
    role: rank.narrativeRole,
    tone: family.tone,
    reward: rank.reward,
    element: card.element,
    difficulty: rank.danger,
  });
  return {
    id: `${input.seed}:${card.id}:${input.context}`,
    seed: input.seed,
    card,
    context: input.context,
    title,
    description,
    tags: [card.element, input.context, family.id, rank.intensity, ...tagsFor(input.context, meaning)],
    difficulty: input.context === "monster" || input.context === "trap" ? rank.danger : Math.max(1, rank.danger - 1),
    rewardHint: `${reward} — ${rank.reward}.`,
    dmChoice: DM_CHOICES[input.context],
    family: family.id,
  };
}

function tagsFor(context: Context, meaning: (typeof ELEMENT_MEANING)["air"]): string[] {
  if (context === "room") return meaning.roomTags;
  if (context === "monster") return meaning.monsterTags;
  if (context === "trap") return meaning.trapTags;
  if (context === "loot") return meaning.lootTags;
  return meaning.roomTags.slice(0, 1);
}

function describe(context: Context, parts: {
  name: string;
  sensory: string;
  role: string;
  tone: string;
  reward: string;
  element: string;
  difficulty: number;
}): string {
  if (context === "room") {
    return `${parts.name} holds ${parts.sensory}. Treat the room as ${parts.role}. It feels ${parts.tone}.`;
  }
  if (context === "monster") {
    return `${parts.name} blocks the way. This is ${parts.role}, difficulty ${parts.difficulty}. It is ${parts.tone}, and the room smells of ${parts.sensory}. One roll against difficulty ${parts.difficulty} settles the clash.`;
  }
  if (context === "trap") {
    return `${parts.name} waits in the ${parts.element}. Anyone rushing through meets ${parts.sensory}. Difficulty ${parts.difficulty}. It is ${parts.role}.`;
  }
  if (context === "loot") {
    return `You find ${parts.name}. It counts as ${parts.reward}. A trace of ${parts.sensory} still clings to it.`;
  }
  if (context === "npc") {
    return `${parts.name} is here, ${parts.tone}. They mention ${parts.sensory} and want a small favor before they talk.`;
  }
  if (context === "clue") {
    return `${parts.name}: ${parts.sensory}. It points toward ${parts.reward}, if the party trusts it.`;
  }
  return `The room turns. ${parts.name} was not what it seemed. ${parts.sensory} becomes the tell. This is ${parts.role}.`;
}

export function formatThing(thing: GeneratedThing): string {
  return [
    `Card: ${thing.card.label}`,
    `Context: ${thing.context}`,
    `Title: ${thing.title}`,
    "Description:",
    thing.description,
    "DM choice:",
    thing.dmChoice,
    "Reward hint:",
    thing.rewardHint,
  ].join("\n");
}
