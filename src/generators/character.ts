import type { Card, GeneratedCharacter } from "../core/types.js";
import { drawCard, elementLabel } from "../core/cards.js";
import { rngFrom } from "../core/rng.js";
import { CHARACTERS } from "../themes/dungeo/characters.js";
import { rankMeaning } from "../themes/dungeo/grammar.js";

export function generateCharacter(seed: string, card?: Card): GeneratedCharacter {
  const drawn = card ?? drawCard(seed);
  const hero = rngFrom(`${seed}:${drawn.id}:character`).pick(CHARACTERS);
  const rank = rankMeaning(drawn.rank);
  const stats = {
    hp: hero.stats.hp + Math.max(0, drawn.rank - 4),
    hunger: hero.stats.hunger,
    sweetTooth: hero.stats.sweetTooth + (drawn.element === "water" || drawn.element === "earth" ? 1 : 0),
    attack: hero.stats.attack + (drawn.element === "fire" ? 1 : 0),
    defense: hero.stats.defense + (drawn.element === "earth" ? 1 : 0),
  };
  const title = `${rank.adjective} ${hero.className}`;
  const description = `${hero.description} Their ${elementLabel(drawn.element)} card marks ${rank.narrativeRole}. They carry a ${hero.startingItem}.`;
  const character: GeneratedCharacter = {
    id: `${seed}:${drawn.id}:character`,
    seed,
    card: drawn,
    context: "character",
    title,
    className: hero.className,
    description,
    tags: [drawn.element, "character", hero.id, rank.intensity],
    difficulty: rank.danger,
    stats,
    startingItem: hero.startingItem,
    text: "",
    sources: ["dungeo.characters", "dungeo.ranks"],
  };
  character.text = formatCharacter(character);
  return character;
}

export function formatCharacter(character: GeneratedCharacter): string {
  const stats = character.stats;
  return [
    `Card: ${character.card.label}`,
    "Context: character",
    `Title: ${character.title}`,
    `Class: ${character.className}`,
    "Description:",
    character.description,
    `Stats: HP ${stats.hp}, Hunger ${stats.hunger}, Sweet Tooth ${stats.sweetTooth}, Attack ${stats.attack}, Defense ${stats.defense}`,
    `Starting item: ${character.startingItem}`,
  ].join("\n");
}
