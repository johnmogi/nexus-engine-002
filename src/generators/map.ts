import type { Card, GridSize } from "../core/types.js";
import { dealCards } from "../core/cards.js";
import { rngFrom, shuffle } from "../core/rng.js";

export interface Point {
  x: number;
  y: number;
}

export interface MapCell {
  x: number;
  y: number;
  card: Card;
  role: "start" | "finish" | "path" | "side";
  revealed: boolean;
}

export interface DungeonMap {
  seed: string;
  size: GridSize;
  cells: MapCell[];
  path: Point[];
}

const DIRECTIONS: readonly Point[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

function key(point: Point): string {
  return `${point.x},${point.y}`;
}

export function carvePath(size: number, seed: string): Point[] {
  const rng = rngFrom(`path:${seed}:${size}`);
  const goal = { x: size - 1, y: size - 1 };
  const visited = new Set<string>(["0,0"]);
  const path: Point[] = [{ x: 0, y: 0 }];
  while (path.length) {
    const current = path[path.length - 1]!;
    if (current.x === goal.x && current.y === goal.y) return path.map((point) => ({ ...point }));
    const options = shuffle(
      DIRECTIONS.map((step) => ({ x: current.x + step.x, y: current.y + step.y })).filter(
        (next) => next.x >= 0 && next.y >= 0 && next.x < size && next.y < size && !visited.has(key(next)),
      ),
      rng,
    );
    const next = options[0];
    if (!next) {
      path.pop();
      continue;
    }
    visited.add(key(next));
    path.push(next);
  }
  throw new Error("Map path could not reach the finish");
}

export function generateMap(seed: string, size: GridSize): DungeonMap {
  const path = carvePath(size, seed);
  const onPath = new Set(path.map(key));
  const cards = dealCards(`map:${seed}:${size}`, size * size);
  const cells: MapCell[] = [];
  let dealt = 0;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const point = { x, y };
      const card = cards[dealt]!;
      dealt += 1;
      const role = x === 0 && y === 0 ? "start" : x === size - 1 && y === size - 1 ? "finish" : onPath.has(key(point)) ? "path" : "side";
      cells.push({ x, y, card, role, revealed: false });
    }
  }
  return { seed, size, cells, path };
}

export function revealRoom(map: DungeonMap, x: number, y: number): DungeonMap {
  return {
    ...map,
    cells: map.cells.map((cell) => (cell.x === x && cell.y === y ? { ...cell, revealed: true } : cell)),
  };
}

export function formatMap(map: DungeonMap): string {
  const lines = [
    `Map ${map.size}x${map.size}`,
    `Seed ${map.seed}`,
    `Start (0,0)  Finish (${map.size - 1},${map.size - 1})`,
    `Path length ${map.path.length}`,
    "Rooms:",
  ];
  for (const cell of map.cells) {
    lines.push(`(${cell.x},${cell.y}) ${cell.role} ${cell.card.label} ${cell.revealed ? "revealed" : "face-down"}`);
  }
  return lines.join("\n");
}
