import { useMemo } from "react";
import { useSession } from "../session";
import { HERO_CLASSES, OBJECTIVES } from "../../themes/dungeo/data";

export function Dashboard() {
  const { seed, setSeed, log, setScreen } = useSession();
  const counts = useMemo(() => {
    const tally = new Map<string, number>();
    for (const entry of log) tally.set(entry.kind, (tally.get(entry.kind) ?? 0) + 1);
    return [...tally.entries()];
  }, [log]);

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
              <option disabled>Cuisine — parked</option>
              <option disabled>Scroll Maze — parked</option>
              <option disabled>Hidden Garden — parked</option>
              <option disabled>Prophecy — parked</option>
              <option disabled>Lab — parked</option>
            </select>
          </label>
        </div>
        <div className="actions">
          <button onClick={() => setScreen("room")}>Generate room</button>
          <button onClick={() => setScreen("map")}>Generate map</button>
          <button className="quiet" onClick={() => setScreen("dice")}>Roll dice</button>
        </div>
        <p className="note">Dungeo is a culinary dungeon crawl: sugar, insects, dwarves, and food that answers back. The seed keeps every draw the same.</p>
      </section>
      <section className="two grid">
        <article className="panel">
          <h2>Objectives</h2>
          <ul className="list">{OBJECTIVES.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article className="panel">
          <h2>Sample heroes</h2>
          <ul className="list">
            {HERO_CLASSES.map((hero) => <li key={hero.name}><strong>{hero.name}.</strong> {hero.note}</li>)}
          </ul>
        </article>
      </section>
      <section className="panel">
        <h2>Recent log</h2>
        <div className="meter">{counts.map(([kind, count]) => <span key={kind}>{kind} {count}</span>)}{!counts.length && <span>nothing yet</span>}</div>
        <ul className="list">
          {log.slice(-5).reverse().map((entry) => <li key={entry.id}><strong>{entry.title}</strong> · {entry.kind}</li>)}
        </ul>
      </section>
    </div>
  );
}
