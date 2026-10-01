import { describe, expect, it } from "vitest";
import { addLogEntry } from "../src/core/log.js";
import { sessionStats } from "../src/core/stats.js";
import { generateMonster } from "../src/generators/monster.js";
import { generateRoom } from "../src/generators/room.js";

describe("stats", () => {
  it("counts generator types and card distribution", () => {
    const room = generateRoom("42");
    const monster = generateMonster("42");
    let log = addLogEntry([], {
      seed: "42",
      kind: "room",
      title: room.title,
      text: room.text,
      createdAt: "2026-10-01T00:00:00.000Z",
      element: room.card.element,
      rank: room.card.rank,
      difficulty: room.difficulty,
    });
    log = addLogEntry(log, {
      seed: "42",
      kind: "monster",
      title: monster.title,
      text: monster.text,
      createdAt: "2026-10-01T00:00:01.000Z",
      element: monster.card.element,
      rank: monster.card.rank,
      family: monster.family,
      difficulty: monster.difficulty,
    });
    log = addLogEntry(log, {
      seed: "42",
      kind: "map",
      title: "4x4 map",
      text: "map",
      createdAt: "2026-10-01T00:00:02.000Z",
      mapSize: 4,
      pathLength: 11,
    });
    const stats = sessionStats(log);
    expect(stats.total).toBe(3);
    expect(stats.byType.room).toBe(1);
    expect(stats.byType.monster).toBe(1);
    expect(stats.byType.map).toBe(1);
    expect(stats.cardsByElement[room.card.element]).toBeGreaterThan(0);
    expect(stats.cardsByRank[room.card.rank === 1 ? "A" : String(room.card.rank)]).toBeGreaterThan(0);
    expect(stats.monsterFamilies[monster.family]).toBe(1);
    expect(stats.maps).toEqual([{ size: 4, pathLength: 11 }]);
    expect(stats.averageDifficulty).toBeGreaterThan(0);
  });
});
