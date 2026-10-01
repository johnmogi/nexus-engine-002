import { useEffect, useMemo, useState } from "react";
import type { Context, LogEntry } from "../../core/types";
import { CONTEXTS } from "../../core/types";
import { drawCard } from "../../core/cards";
import { generateCharacter } from "../../generators/character";
import { generateThing } from "../../generators/interpret";
import { copyText } from "../clipboard";
import { useSession } from "../session";

const KINDS = ["card", ...CONTEXTS, "character"] as const;
type Kind = (typeof KINDS)[number];

function isKind(value: string): value is Kind {
  return (KINDS as readonly string[]).includes(value);
}

export function QuickRoom() {
  const { seed, log, addEntry, focusKind } = useSession();
  const [kind, setKind] = useState<Kind>(isKind(focusKind) ? focusKind : "room");
  const [draw, setDraw] = useState(0);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (isKind(focusKind)) setKind(focusKind);
  }, [focusKind]);

  const card = useMemo(() => drawCard(`${seed}:${draw}`), [seed, draw]);
  const thing = useMemo(() => kind !== "card" && kind !== "character" ? generateThing({ seed, context: kind as Context, card }) : null, [seed, kind, card]);
  const character = useMemo(() => kind === "character" ? generateCharacter(seed, card) : null, [seed, kind, card]);
  const text = character?.text ?? thing?.text ?? `Card: ${card.label}\nContext: card\nA face from the Ace–9 elemental deck.`;
  const title = character?.title ?? thing?.title ?? card.label;

  function record() {
    const entry: Omit<LogEntry, "id" | "createdAt"> = {
      seed,
      kind,
      title,
      text,
      element: card.element,
      rank: card.rank,
      family: thing?.family,
      difficulty: character?.difficulty ?? thing?.difficulty,
    };
    addEntry(entry);
  }

  return (
    <div className="grid two">
      <section className="panel grid">
        <h2>Generator</h2>
        <label>
          Kind
          <select value={kind} onChange={(event) => setKind(event.target.value as Kind)}>
            {KINDS.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <article className="card-face">
          <small>Card</small>
          <strong>{card.label}</strong>
          <p>{thing ? `${thing.family} · difficulty ${thing.difficulty}` : character ? `${character.className} · intensity ${character.difficulty}` : "card only"}</p>
        </article>
        <div className="actions">
          <button onClick={() => setDraw((value) => value + 1)}>Draw another</button>
          <button className="quiet" onClick={() => { void copyText(text).then(() => setCopied(true)); }}>{copied ? "Copied" : "Copy result"}</button>
          <button className="quiet" onClick={record}>Add to log</button>
        </div>
        <p className="note">{log.length} log entries. Same seed, card, and kind always print the same result.</p>
      </section>
      <section className="panel grid">
        <h2>{title}</h2>
        <p className="copy-block">{text}</p>
        <p className="note">{(thing?.tags ?? character?.tags ?? [card.element]).join(" · ")}</p>
      </section>
    </div>
  );
}
