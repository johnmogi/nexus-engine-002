import { useState } from "react";
import type { ElementName } from "../../core/types";
import { DICE, ELEMENTS } from "../../core/types";
import { rollDice, rollDie } from "../../core/dice";
import { matchup, randomEventType } from "../../generators/oracle";
import { useSession } from "../session";

export function DiceOracle() {
  const { seed } = useSession();
  const [notation, setNotation] = useState("2d6+1");
  const [salt, setSalt] = useState(0);
  const [left, setLeft] = useState<ElementName>("fire");
  const [right, setRight] = useState<ElementName>("water");
  const [error, setError] = useState("");
  const rollSeed = `${seed}:${salt}`;
  let notationResult = "";
  try {
    const rolled = rollDice(notation, rollSeed);
    notationResult = `${rolled.notation} → ${rolled.rolls.join(", ")} ${rolled.modifier ? `(${rolled.modifier > 0 ? "+" : ""}${rolled.modifier}) ` : ""}= ${rolled.total}`;
  } catch (cause) {
    notationResult = cause instanceof Error ? cause.message : "Bad notation";
  }
  const pair = matchup(left, right);
  const event = randomEventType(rollSeed);

  return (
    <div className="grid two">
      <section className="panel grid">
        <h2>Dice</h2>
        <div className="actions">
          {DICE.map((sides) => (
            <button key={sides} className="quiet" onClick={() => { setError(""); setNotation(`d${sides}`); setSalt((value) => value + 1); }}>
              d{sides}: {safeDie(sides, rollSeed)}
            </button>
          ))}
        </div>
        <label>
          Notation
          <input value={notation} onChange={(event) => { setNotation(event.target.value); setError(""); }} />
        </label>
        <button onClick={() => setSalt((value) => value + 1)}>Roll</button>
        <p>{error || notationResult}</p>
      </section>
      <section className="panel grid">
        <h2>Oracle</h2>
        <div className="two grid">
          <label>
            Left
            <ElementSelect value={left} onChange={setLeft} />
          </label>
          <label>
            Right
            <ElementSelect value={right} onChange={setRight} />
          </label>
        </div>
        <article className="card-face">
          <strong>{pair.title}</strong>
          <p>{pair.prompt}</p>
        </article>
        <p>Quick event for this roll: <strong>{event}</strong></p>
      </section>
    </div>
  );
}

function ElementSelect({ value, onChange }: { value: ElementName; onChange: (value: ElementName) => void }) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value as ElementName)}>
      {ELEMENTS.map((element) => <option key={element} value={element}>{element}</option>)}
    </select>
  );
}

function safeDie(sides: number, seed: string): number {
  try {
    return rollDie(sides, seed);
  } catch {
    return 0;
  }
}
