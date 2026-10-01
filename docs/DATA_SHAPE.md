# Data shape

Cards are Ace–9 of Air, Fire, Water, and Earth. `Card` is `{ id, rank, element, label }`. Four `JokerSlot` records stay `{ enabled: false, reserved: true }`.

Theme lists in `src/themes/dungeo/data.ts`:

- Rooms, monsters, traps, loot, NPCs, and clues are named bits: `{ family, name }`, grouped by element
- Ranks carry intensity, danger, reward, and narrative role
- Families are insects, dwarves, and food creatures

Characters in `src/themes/dungeo/characters.ts`:

- `{ id, className, description, stats, startingItem }`
- Stats are HP, Hunger, Sweet Tooth, Attack, and Defense

A generated room, monster, trap, loot, NPC, or clue is a `GeneratedThing`:

- `id`, `seed`, `card`, `context`, `title`, `description`, `tags`
- `difficulty`, `rewardHint`, `dmChoice`, `family`
- `text` for the log, and `sources` for the tables used

A character is a `GeneratedCharacter` with `className`, `stats`, `startingItem`, and `text`.

A log entry stores `kind`, `title`, `text`, and optional `element`, `rank`, `family`, `difficulty`, `mapSize`, and `pathLength` so stats can count them.
