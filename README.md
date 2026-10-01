# Nexus DM Poker Tool

Nexus DM Poker Tool is a dungeon-master utility. A party enters a room. The tool draws an elemental poker card and turns it into a room, monster, trap, treasure, character, NPC, clue, or small map. The same seed gives the same result.

The engine inside this repo is `card-maze-core`. This version is an admin generator core, not a player game.

Canonical repo: [nexus-engine-002](https://github.com/johnmogi/nexus-engine-002).

## Run

```bash
npm install
npm run dev
npm test
npm run check
npm run build
```

Optional CLI:

```bash
npm run generate -- --seed 42 --context room
npm run generate -- --seed 42 --context character
npm run map -- --seed 42 --size 4
```

## Card grammar

Ranks Ace through 9. Elements Air, Fire, Water, and Earth. No tens. Four joker slots exist and stay inert.

A card is a seed for a context. `7 Earth` as a room is not `7 Earth` as a monster.

Data lists live in `src/themes/dungeo/data.ts` and `src/themes/dungeo/characters.ts`.

## Screens

- Dashboard: seed, theme, quick generators, session stats
- Generator: room, monster, trap, loot, character, NPC, clue, twist, or card
- Map: 3×3, 4×4, or 5×5, with start, finish, path, and a card in every room
- Codex: elements, ranks, families, and the Dungeo lists
- Dice: standard dice, notation such as `2d6+1`, and an element matchup
- Session log: copy, export JSON, clear

## Scope

Dungeo is the first theme: sugar, insects, dwarves, and food creatures. Hero classes are Kitchen Mage, Pantry Ranger, Cuisine Warrior, and Taste Tester.

What is not built yet is listed in [docs/PARKING_LOT.md](docs/PARKING_LOT.md). The lock for this pass is [docs/MVP_LOCK.md](docs/MVP_LOCK.md).
