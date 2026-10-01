import { sessionStats } from "../../core/stats";
import { useSession, type ScreenId } from "../session";
import { OBJECTIVES } from "../../themes/dungeo/data";
import { CHARACTERS } from "../../themes/dungeo/characters";

const ACTIONS: { kind: string; label: string; screen: ScreenId }[] = [
  { kind: "room", label: "Room", screen: "room" },
  { kind: "monster", label: "Monster", screen: "room" },
  { kind: "trap", label: "Trap", screen: "room" },
  { kind: "loot", label: "Loot", screen: "room" },
  { kind: "character", label: "Character", screen: "room" },
  { kind: "npc", label: "NPC / clue", screen: "room" },
  { kind: "map", label: "Map", screen: "map" },
  { kind: "dice", label: "Dice", screen: "dice" },
];

export function Dashboard() {
  const { seed, setSeed, log, setScreen, setFocusKind } = useSession();
  const stats = sessionStats(log);

  return (
    <div className="grid">
      <section className="panel grid">
        <h2>Table</h2>
        <div className="two grid">
          <label>
            Seed
            <input value={seed} onChange={(event) => setSeed(event.target.value)} />
          </label>
          <label>
            Theme
            <select defaultValue="dungeo">
              <option value="dungeo">Dungeo</option>
              <option disabled>Sugar Bound — parked</option>
              <option disabled>Scroll Maze — parked</option>
              <option disabled>Hidden Garden — parked</option>
              <option disabled>Prophecy — parked</option>
              <option disabled>Lab — parked</option>
            </select>
          </label>
        </div>
        <div className="actions">
          {ACTIONS.map((action) => (
            <button key={action.kind} className={action.screen === "room" ? "" : "quiet"} onClick={() => { setFocusKind(action.kind); setScreen(action.screen); }}>
              {action.label}
            </button>
          ))}
        </div>
        <p className="note">Dungeo is a culinary dungeon crawl. The seed keeps every draw the same. This screen is the admin generator, not a player game.</p>
      </section>
      <section className="panel">
        <h2>Session stats</h2>
        <div className="meter">
          <span>total {stats.total}</span>
          {Object.entries(stats.byType).map(([kind, count]) => <span key={kind}>{kind} {count}</span>)}
          {!stats.total && <span>nothing yet</span>}
        </div>
        <p className="note">Elements {Object.entries(stats.cardsByElement).map(([name, count]) => `${name} ${count}`).join(" · ")}</p>
        <p className="note">Ranks {["A", "2", "3", "4", "5", "6", "7", "8", "9"].map((name) => `${name} ${stats.cardsByRank[name] ?? 0}`).join(" · ")}</p>
        <p className="note">
          Monster families {Object.entries(stats.monsterFamilies).map(([name, count]) => `${name} ${count}`).join(" · ") || "none"}
          {" · "}Average difficulty {stats.averageDifficulty ?? "—"}
          {" · "}Maps {stats.maps.map((map) => `${map.size}x${map.size} path ${map.pathLength}`).join(", ") || "none"}
        </p>
      </section>
      <section className="two grid">
        <article className="panel">
          <h2>Objectives</h2>
          <ul className="list">{OBJECTIVES.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article className="panel">
          <h2>Hero classes</h2>
          <ul className="list">
            {CHARACTERS.map((hero) => <li key={hero.id}><strong>{hero.className}.</strong> {hero.description}</li>)}
          </ul>
        </article>
      </section>
      <section className="panel">
        <h2>Recent log</h2>
        <ul className="list">
          {log.slice(-5).reverse().map((entry) => <li key={entry.id}><strong>{entry.title}</strong> · {entry.kind}</li>)}
        </ul>
      </section>
    </div>
  );
}
