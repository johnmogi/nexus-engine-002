import type { LogEntry } from "./types.js";
import { ELEMENTS, RANKS } from "./types.js";

export interface SessionStats {
  total: number;
  byType: Record<string, number>;
  cardsByElement: Record<string, number>;
  cardsByRank: Record<string, number>;
  maps: { size: number; pathLength: number }[];
  monsterFamilies: Record<string, number>;
  averageDifficulty: number | null;
}

export function sessionStats(log: readonly LogEntry[]): SessionStats {
  const byType: Record<string, number> = {};
  const cardsByElement = Object.fromEntries(ELEMENTS.map((element) => [element, 0]));
  const cardsByRank = Object.fromEntries(RANKS.map((rank) => [rank === 1 ? "A" : String(rank), 0]));
  const monsterFamilies: Record<string, number> = {};
  const maps: { size: number; pathLength: number }[] = [];
  const difficulties: number[] = [];

  for (const entry of log) {
    byType[entry.kind] = (byType[entry.kind] ?? 0) + 1;
    if (entry.element && entry.element in cardsByElement) cardsByElement[entry.element] = (cardsByElement[entry.element] ?? 0) + 1;
    if (entry.rank) {
      const label = entry.rank === 1 ? "A" : String(entry.rank);
      cardsByRank[label] = (cardsByRank[label] ?? 0) + 1;
    }
    if (entry.kind === "monster" && entry.family) monsterFamilies[entry.family] = (monsterFamilies[entry.family] ?? 0) + 1;
    if (entry.kind === "map" && entry.mapSize && entry.pathLength) maps.push({ size: entry.mapSize, pathLength: entry.pathLength });
    if (typeof entry.difficulty === "number") difficulties.push(entry.difficulty);
  }

  const averageDifficulty = difficulties.length
    ? Math.round((difficulties.reduce((sum, value) => sum + value, 0) / difficulties.length) * 100) / 100
    : null;

  return { total: log.length, byType, cardsByElement, cardsByRank, maps, monsterFamilies, averageDifficulty };
}
