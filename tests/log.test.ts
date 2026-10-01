import { describe, expect, it } from "vitest";
import { addLogEntry, exportLogJson, exportLogText } from "../src/core/log.js";
import { generateRoom } from "../src/generators/room.js";
import { formatThing } from "../src/generators/interpret.js";

describe("logs", () => {
  it("stores a generated room and exports text and json", () => {
    const room = generateRoom("42");
    const log = addLogEntry([], {
      seed: "42",
      kind: "room",
      title: room.title,
      text: formatThing(room),
      createdAt: "2026-10-01T00:00:00.000Z",
    });
    expect(log).toHaveLength(1);
    expect(log[0]?.id).toBe("001");
    const text = exportLogText(log);
    const json = exportLogJson(log);
    expect(text).toContain(room.title);
    expect(text).toContain("seed 42");
    expect(JSON.parse(json)).toEqual(log);
  });
});
