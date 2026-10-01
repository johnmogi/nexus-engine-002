import { useMemo, useState } from "react";
import type { GridSize } from "../../core/types";
import { GRID_SIZES } from "../../core/types";
import { formatThing, generateThing } from "../../generators/interpret";
import { formatMap, generateMap, revealRoom, type DungeonMap } from "../../generators/map";
import { contextForRank } from "../../generators/oracle";
import { copyText } from "../clipboard";
import { useSession } from "../session";

export function MapScreen() {
  const { seed, addEntry } = useSession();
  const [size, setSize] = useState<GridSize>(4);
  const [showPath, setShowPath] = useState(true);
  const [map, setMap] = useState<DungeonMap>(() => generateMap(seed, 4));
  const [selected, setSelected] = useState<{ x: number; y: number } | null>(null);
  const active = map.seed === seed && map.size === size ? map : generateMap(seed, size);
  const cell = selected ? active.cells.find((item) => item.x === selected.x && item.y === selected.y) : undefined;
  const detail = useMemo(() => {
    if (!cell) return null;
    return generateThing({
      seed: `${active.seed}:${cell.x}:${cell.y}`,
      card: cell.card,
      context: cell.role === "start" || cell.role === "finish" ? "room" : contextForRank(cell.card),
    });
  }, [cell, active.seed]);

  function open(x: number, y: number) {
    const next = revealRoom(active, x, y);
    setMap(next);
    setSelected({ x, y });
  }

  return (
    <div className="grid">
      <section className="panel grid">
        <h2>Map</h2>
        <div className="actions">
          {GRID_SIZES.map((option) => (
            <button key={option} className={option === size ? "" : "quiet"} onClick={() => { setSize(option); setSelected(null); setMap(generateMap(seed, option)); }}>
              {option}x{option}
            </button>
          ))}
          <label>
            <span>Show path</span>
            <input type="checkbox" checked={showPath} onChange={(event) => setShowPath(event.target.checked)} />
          </label>
          <button className="quiet" onClick={() => { void copyText(formatMap(active)); }}>Copy summary</button>
          <button className="quiet" onClick={() => addEntry({ seed, kind: "map", title: `${size}x${size} map`, text: formatMap(active), mapSize: size, pathLength: active.path.length })}>Add to log</button>
        </div>
        <p className="note">Start is the top-left room. Finish is the bottom-right. Path length {active.path.length}. Side rooms stay on the grid. A click flips only that room.</p>
        <div className="map-grid" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
          {active.cells.map((room) => (
            <button
              key={`${room.x}-${room.y}`}
              className={`room${room.revealed ? " revealed" : ""}${showPath && room.role !== "side" ? " on-path" : ""}`}
              onClick={() => open(room.x, room.y)}
            >
              <small>{room.role} {room.x},{room.y}</small>
              {room.revealed ? room.card.label : "face down"}
            </button>
          ))}
        </div>
      </section>
      {detail && cell && (
        <section className="panel">
          <h2>{detail.title}</h2>
          <p className="copy-block">{formatThing(detail)}{cell.role === "start" ? "\nEntry." : cell.role === "finish" ? "\nThe way out is here." : ""}</p>
          <button onClick={() => addEntry({ seed, kind: detail.context, title: detail.title, text: detail.text, element: detail.card.element, rank: detail.card.rank, family: detail.family, difficulty: detail.difficulty })}>Add room to log</button>
        </section>
      )}
    </div>
  );
}
