import { describe, expect, it } from "vitest";
import { makeCard } from "../src/core/cards.js";
import { generateRoom } from "../src/generators/room.js";
import { generateLoot } from "../src/generators/loot.js";
import { generateMonster } from "../src/generators/monster.js";

describe("rooms", () => {
  it("repeats a quick room for the same seed", () => {
    expect(generateRoom("42")).toEqual(generateRoom("42"));
  });

  it("reads the same card differently as a monster and as loot", () => {
    const card = makeCard(3, "air");
    const monster = generateMonster("42", card);
    const loot = generateLoot("42", card);
    expect(monster.card).toEqual(loot.card);
    expect(monster.context).toBe("monster");
    expect(loot.context).toBe("loot");
    expect(monster.description).not.toBe(loot.description);
    expect(monster.title).not.toBe(loot.title);
  });
});
