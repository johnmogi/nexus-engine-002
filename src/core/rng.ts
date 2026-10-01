export interface Rng {
  next(): number;
  int(max: number): number;
  pick<T>(items: readonly T[]): T;
}

export function hashSeed(input: string): number {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let next = Math.imul(state ^ (state >>> 15), 1 | state);
    next = (next + Math.imul(next ^ (next >>> 7), 61 | next)) ^ next;
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

export function rngFrom(seed: string): Rng {
  const next = mulberry32(hashSeed(seed));
  return {
    next,
    int(max: number) {
      if (max <= 0) throw new Error("int max must be positive");
      return Math.floor(next() * max);
    },
    pick(items) {
      if (!items.length) throw new Error("cannot pick from an empty list");
      return items[Math.floor(next() * items.length)]!;
    },
  };
}

export function shuffle<T>(items: readonly T[], rng: Rng): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = rng.int(index + 1);
    const current = copy[index]!;
    copy[index] = copy[swap]!;
    copy[swap] = current;
  }
  return copy;
}
