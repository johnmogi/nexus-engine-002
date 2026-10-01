import { describe, expect, it } from "vitest";
import { makeCard } from "../src/core/cards.js";
import { generateClue, generateNpc, generateTwist } from "../src/generators/npc.js";
import { generateLoot } from "../src/generators/loot.js";
import { generateMonster } from "../src/generators/monster.js";
import { generateTrap } from "../src/generators/trap.js";
import { FAMILIES } from "../src/themes/dungeo/data.js";

describe("dungeo", () => {
  it("generates a monster, trap, loot, npc, and clue from the theme tables", () => {
    const card = makeCard(4, "fire");
    const results = [
      generateMonster("kitchen", card),
      generateTrap("kitchen", card),
      generateLoot("kitchen", card),
      generateNpc("kitchen", card),
      generateClue("kitchen", card),
      generateTwist("kitchen", card),
    ];
    for (const result of results) {
      expect(result.title.length).toBeGreaterThan(3);
      expect(result.description.length).toBeGreaterThan(12);
      expect(FAMILIES.map((family) => family.id)).toContain(result.family);
      expect(result.card.label).toBe("4 Fire");
    }
    expect(new Set(results.map((result) => result.context)).size).toBe(results.length);
  });
});
