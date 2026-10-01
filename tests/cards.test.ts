import { describe, expect, it } from "vitest";
import { JOKER_SLOTS, createDeck, drawCard } from "../src/core/cards.js";
import { FUTURE_HOOKS } from "../src/core/hooks.js";

describe("cards", () => {
  it("builds an ace-to-nine deck of four elements and no tens", () => {
    const deck = createDeck();
    expect(deck).toHaveLength(36);
    expect(new Set(deck.map((card) => card.element))).toEqual(new Set(["air", "fire", "water", "earth"]));
    expect(deck.filter((card) => card.element === "fire")).toHaveLength(9);
    expect(deck.some((card) => card.label.includes("10") || card.rank > 9)).toBe(false);
    expect(deck.map((card) => card.id)).toContain("A-air");
    expect(deck.map((card) => card.id)).toContain("9-earth");
  });

  it("keeps four joker slots reserved and disabled", () => {
    expect(JOKER_SLOTS).toHaveLength(4);
    expect(JOKER_SLOTS.every((slot) => slot.enabled === false && slot.reserved)).toBe(true);
    expect(FUTURE_HOOKS.jokers.enabled).toBe(false);
  });

  it("draws the same card from the same seed", () => {
    expect(drawCard("42")).toEqual(drawCard("42"));
    expect(drawCard("42").id).not.toBe(drawCard("43").id);
  });
});
