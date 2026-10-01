import { describe, expect, it } from "vitest";
import { generateMap, revealRoom } from "../src/generators/map.js";

describe("maps", () => {
  it("builds a sized grid with a path, cards, and a single reveal", () => {
    const map = generateMap("42", 4);
    expect(map).toEqual(generateMap("42", 4));
    expect(map.cells).toHaveLength(16);
    expect(map.cells.filter((cell) => cell.role === "start")).toHaveLength(1);
    expect(map.cells.filter((cell) => cell.role === "finish")).toHaveLength(1);
    expect(map.path[0]).toEqual({ x: 0, y: 0 });
    expect(map.path.at(-1)).toEqual({ x: 3, y: 3 });
    expect(map.path.length).toBeGreaterThanOrEqual(7);
    for (let index = 1; index < map.path.length; index += 1) {
      const previous = map.path[index - 1]!;
      const current = map.path[index]!;
      const distance = Math.abs(previous.x - current.x) + Math.abs(previous.y - current.y);
      expect(distance).toBe(1);
    }
    expect(map.cells.every((cell) => cell.card && cell.revealed === false)).toBe(true);
    expect(new Set(map.cells.map((cell) => cell.card.id)).size).toBe(16);

    const revealed = revealRoom(map, 1, 1);
    const flipped = revealed.cells.find((cell) => cell.x === 1 && cell.y === 1)!;
    expect(flipped.revealed).toBe(true);
    expect(flipped.card).toEqual(map.cells.find((cell) => cell.x === 1 && cell.y === 1)!.card);
    expect(revealed.cells.filter((cell) => cell.revealed)).toHaveLength(1);
    expect(generateMap("7", 3).cells).toHaveLength(9);
    expect(generateMap("7", 5).cells).toHaveLength(25);
  });
});
