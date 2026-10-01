import { ELEMENT_MEANING, FAMILIES, OBJECTIVES, RANK_MEANING, SAMPLE_STATS } from "../../themes/dungeo/data";
import { CHARACTERS } from "../../themes/dungeo/characters";
import { ELEMENTS, RANKS } from "../../core/types";

export function Codex() {
  return (
    <div className="grid">
      <section className="panel">
        <h2>Elements</h2>
        <div className="two grid">
          {ELEMENTS.map((element) => {
            const meaning = ELEMENT_MEANING[element];
            return (
              <article key={element}>
                <h3>{element}</h3>
                <p>{meaning.sensoryDetails.join(", ")}.</p>
                <p className="note">Rooms {meaning.roomTags.join(", ")}. Monsters {meaning.monsterTags.join(", ")}. Traps {meaning.trapTags.join(", ")}. Loot {meaning.lootTags.join(", ")}.</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="panel">
        <h2>Ranks</h2>
        <ul className="list">
          {RANKS.map((rank) => {
            const meaning = RANK_MEANING[rank];
            return <li key={rank}><strong>{rank === 1 ? "A" : rank}.</strong> {meaning.narrativeRole}. Danger {meaning.danger}. Reward: {meaning.reward}.</li>;
          })}
        </ul>
      </section>
      <section className="two grid">
        <article className="panel">
          <h2>Dungeo families</h2>
          <ul className="list">{FAMILIES.map((family) => <li key={family.id}><strong>{family.name}.</strong> {family.tone}</li>)}</ul>
          <h3>Objectives</h3>
          <ul className="list">{OBJECTIVES.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article className="panel">
          <h2>Sample tables</h2>
          <p><strong>Heroes.</strong> {CHARACTERS.map((hero) => `${hero.className} (${hero.startingItem})`).join(", ")}.</p>
          <p><strong>Monsters.</strong> {ELEMENTS.flatMap((element) => ELEMENT_MEANING[element].monsters.map((bit) => bit.name)).join(", ")}.</p>
          <p><strong>Rooms.</strong> {ELEMENTS.flatMap((element) => ELEMENT_MEANING[element].places.map((bit) => bit.name)).join(", ")}.</p>
          <p><strong>Traps.</strong> {ELEMENTS.flatMap((element) => ELEMENT_MEANING[element].traps.map((bit) => bit.name)).join(", ")}.</p>
          <p><strong>Loot.</strong> {ELEMENTS.flatMap((element) => ELEMENT_MEANING[element].loot.map((bit) => bit.name)).join(", ")}.</p>
          <p><strong>NPC / clue.</strong> {ELEMENTS.flatMap((element) => [...ELEMENT_MEANING[element].npcs, ...ELEMENT_MEANING[element].clues].map((bit) => bit.name)).join(", ")}.</p>
          <p className="note">Stats, not a sheet yet: {SAMPLE_STATS.join(", ")}.</p>
        </article>
      </section>
    </div>
  );
}
