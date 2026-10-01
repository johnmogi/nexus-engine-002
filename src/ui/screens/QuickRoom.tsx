import { useMemo, useState } from "react";
import type { Context } from "../../core/types";
import { CONTEXTS } from "../../core/types";
import { drawCard } from "../../core/cards";
import { formatThing, generateThing } from "../../generators/interpret";
import { copyText } from "../clipboard";
import { useSession } from "../session";

export function QuickRoom() {
  const { seed, log, addEntry } = useSession();
  const [context, setContext] = useState<Context>("room");
  const [draw, setDraw] = useState(0);
  const [copied, setCopied] = useState(false);
  const card = useMemo(() => drawCard(`${seed}:${draw}`), [seed, draw]);
  const thing = useMemo(() => generateThing({ seed, context, card }), [seed, context, card]);
  const text = formatThing(thing);

  return (
    <div className="grid two">
      <section className="panel grid">
        <h2>Quick draw</h2>
        <label>
          Context
          <select value={context} onChange={(event) => setContext(event.target.value as Context)}>
            {CONTEXTS.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <article className="card-face">
          <small>Card</small>
          <strong>{thing.card.label}</strong>
          <p>{thing.family} · difficulty {thing.difficulty}</p>
        </article>
        <div className="actions">
          <button onClick={() => setDraw((value) => value + 1)}>Draw another</button>
          <button className="quiet" onClick={() => { void copyText(text).then(() => setCopied(true)); }}>
            {copied ? "Copied" : "Copy result"}
          </button>
          <button className="quiet" onClick={() => addEntry({ seed, kind: context, title: thing.title, text })}>Add to log</button>
        </div>
        <p className="note">{log.length} log entries. Same seed, card, and context always print the same result.</p>
      </section>
      <section className="panel grid">
        <h2>{thing.title}</h2>
        <p className="copy-block">{text}</p>
        <p className="note">{thing.tags.join(" · ")}</p>
      </section>
    </div>
  );
}
