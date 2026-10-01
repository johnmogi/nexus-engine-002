import { describe, expect, it } from "vitest";
import { hashSeed, rngFrom } from "../src/core/rng.js";
import { rollDice, rollDie } from "../src/core/dice.js";

describe("rng", () => {
  it("hashes and repeats a sequence", () => {
    expect(hashSeed("42")).toBe(hashSeed("42"));
    const first = rngFrom("table");
    const second = rngFrom("table");
    expect([first.next(), first.next(), first.int(6)]).toEqual([second.next(), second.next(), second.int(6)]);
  });

  it("rolls standard dice and simple notation", () => {
    expect(rollDie(20, "42")).toBe(rollDie(20, "42"));
    expect(rollDie(6, "42")).toBeGreaterThanOrEqual(1);
    expect(rollDie(6, "42")).toBeLessThanOrEqual(6);
    const roll = rollDice("2d6+1", "42");
    expect(roll).toEqual(rollDice("2d6+1", "42"));
    expect(roll.rolls).toHaveLength(2);
    expect(roll.total).toBe(roll.rolls[0]! + roll.rolls[1]! + 1);
    expect(roll.total).toBeGreaterThanOrEqual(3);
    expect(roll.total).toBeLessThanOrEqual(13);
  });
});
