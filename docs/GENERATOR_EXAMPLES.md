# Generator examples

Seed `42`. Card draws for a single generate call are `7 Earth` unless the command is a map.

## Room

```
Card: 7 Earth
Context: room
Title: Hidden Sugar Mine
Description:
Sugar Mine holds sugar grit. Treat the room as something hidden. It feels skittering, sweet, and hard to swat.
DM choice:
Search the corners, pass through, or fortify the door.
Reward hint:
Rye Shield — a strange prize.
```

## Monster

```
Title: Hidden Crumb Golem
Family: food
Difficulty: 7
Crumb Golem blocks the way. This is something hidden, difficulty 7.
```

## Trap

```
Title: Hidden Collapsing Crust
Collapsing Crust waits in the earth. Anyone rushing through meets a low sweet rumble. Difficulty 7.
```

## Loot

```
Title: Hidden Sugar Crystal
You find Sugar Crystal. It counts as a strange prize.
```

## Character

```
Title: Hidden Kitchen Mage
Class: Kitchen Mage
Stats: HP 11, Hunger 2, Sweet Tooth 4, Attack 3, Defense 3
Starting item: Steam ladle
```

## Map 4×4

Path length 11. Start `(0,0)` is 6 Fire. Finish `(3,3)` is 5 Fire. Every cell has one face-down card.

## Exported log sample

```json
[
  {
    "id": "001",
    "seed": "42",
    "kind": "room",
    "title": "Hidden Sugar Mine",
    "text": "Card: 7 Earth\nContext: room\nTitle: Hidden Sugar Mine",
    "createdAt": "2026-10-01T00:00:00.000Z",
    "element": "earth",
    "rank": 7,
    "family": "insects",
    "difficulty": 6
  }
]
```
