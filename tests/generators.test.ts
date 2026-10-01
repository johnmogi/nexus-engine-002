import { describe, expect, it } from "vitest";
import { makeCard } from "../src/core/cards.js";
import { generateCharacter } from "../src/generators/character.js";
import { generateClue, generateNpc } from "../src/generators/npc.js";
import { generateLoot } from "../src/generators/loot.js";
import { generateMonster } from "../src/generators/monster.js";
import { generateRoom } from "../src/generators/room.js";
import { generateTrap } from "../src/generators/trap.js";
import { rollDice } from "../src/core/dice.js";
import { drawCard } from "../src/core/cards.js";

describe("generators", () => {
  it("returns the same structured result for the same seed", () => {
    expect(generateRoom("42")).toEqual(generateRoom("42"));
    expect(generateMonster("42")).toEqual(generateMonster("42"));
    expect(generateTrap("42")).toEqual(generateTrap("42"));
    expect(generateLoot("42")).toEqual(generateLoot("42"));
    expect(generateCharacter("42")).toEqual(generateCharacter("42"));
    expect(generateNpc("42")).toEqual(generateNpc("42"));
    expect(generateClue("42")).toEqual(generateClue("42"));
    expect(drawCard("42")).toEqual(drawCard("42"));
    expect(rollDice("2d6+1", "42")).toEqual(rollDice("2d6+1", "42"));
  });

  it("returns a title, description, card, and log text for each kind", () => {
    const card = makeCard(3, "air");
    const rows = [
      generateRoom("kitchen", card),
      generateMonster("kitchen", card),
      generateTrap("kitchen", card),
      generateLoot("kitchen", card),
      generateNpc("kitchen", card),
      generateClue("kitchen", card),
    ];
    for (const row of rows) {
      expect(row.title.length).toBeGreaterThan(2);
      expect(row.description.length).toBeGreaterThan(8);
      expect(row.card.id).toBe("3-air");
      expect(row.text).toContain(row.title);
      expect(row.sources.length).toBeGreaterThan(0);
    }
    const monster = generateMonster("kitchen", card);
    expect(monster.family).toMatch(/insects|dwarves|food/);
    expect(monster.difficulty).toBeGreaterThan(0);
    const trap = generateTrap("kitchen", card);
    expect(trap.difficulty).toBe(3);
    expect(trap.description.toLowerCase()).toContain("difficulty");
    const loot = generateLoot("kitchen", card);
    expect(loot.rewardHint.length).toBeGreaterThan(3);
    const hero = generateCharacter("42", card);
    expect(hero.className.length).toBeGreaterThan(3);
    expect(hero.stats.hp).toBeGreaterThan(0);
    expect(hero.startingItem.length).toBeGreaterThan(2);
    expect(hero.text).toContain(hero.className);
  });
});
