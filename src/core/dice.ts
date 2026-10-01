import type { Die } from "./types.js";
import { DICE } from "./types.js";
import { rngFrom } from "./rng.js";

export interface DiceRoll {
  notation: string;
  sides: number;
  count: number;
  modifier: number;
  rolls: number[];
  total: number;
}

const NOTATION = /^(\d*)d(\d+)([+-]\d+)?$/i;

export function rollDie(sides: number, seed: string): number {
  if (!Number.isInteger(sides) || sides < 2) throw new Error("A die needs at least 2 sides");
  return rngFrom(`die:${seed}:${sides}`).int(sides) + 1;
}

export function rollDice(notation: string, seed: string): DiceRoll {
  const match = NOTATION.exec(notation.trim());
  if (!match) throw new Error(`Unsupported dice notation: ${notation}`);
  const count = match[1] ? Number(match[1]) : 1;
  const sides = Number(match[2]);
  const modifier = match[3] ? Number(match[3]) : 0;
  if (count < 1 || count > 40) throw new Error("Roll between 1 and 40 dice");
  if (!Number.isInteger(sides) || sides < 2) throw new Error("A die needs at least 2 sides");
  const rng = rngFrom(`dice:${seed}:${notation}`);
  const rolls = Array.from({ length: count }, () => rng.int(sides) + 1);
  return {
    notation: notation.trim(),
    sides,
    count,
    modifier,
    rolls,
    total: rolls.reduce((sum, roll) => sum + roll, 0) + modifier,
  };
}

export function isStandardDie(sides: number): sides is Die {
  return (DICE as readonly number[]).includes(sides);
}
