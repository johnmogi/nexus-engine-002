declare const process: { argv: string[]; exit: (code: number) => never };

import type { Context } from "./core/types.js";
import { CONTEXTS } from "./core/types.js";
import { formatCharacter, generateCharacter } from "./generators/character.js";
import { formatThing, generateThing } from "./generators/interpret.js";
import { formatMap, generateMap } from "./generators/map.js";
import type { GridSize } from "./core/types.js";

function option(args: string[], name: string, fallback: string): string {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1]! : fallback;
}

const [command, ...args] = process.argv.slice(2);

if (command === "generate") {
  const seed = option(args, "--seed", "42");
  const context = option(args, "--context", "room");
  if (context === "character") {
    console.log(formatCharacter(generateCharacter(seed)));
  } else if (!CONTEXTS.includes(context as Context)) {
    console.error(`Unknown context ${context}. Use ${CONTEXTS.join(", ")}, character.`);
    process.exit(1);
  } else {
    console.log(formatThing(generateThing({ seed, context: context as Context })));
  }
} else if (command === "map") {
  const seed = option(args, "--seed", "42");
  const size = Number(option(args, "--size", "4"));
  if (size !== 3 && size !== 4 && size !== 5) {
    console.error("Size must be 3, 4, or 5.");
    process.exit(1);
  }
  console.log(formatMap(generateMap(seed, size as GridSize)));
} else {
  console.error("Use generate or map.");
  process.exit(1);
}
