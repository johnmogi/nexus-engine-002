import { useState } from "react";
import { exportLogJson, exportLogText } from "../../core/log";
import { copyText, downloadText } from "../clipboard";
import { useSession } from "../session";

export function SessionLog() {
  const { log } = useSession();
  const [copied, setCopied] = useState(false);
  const text = exportLogText(log);
  const json = exportLogJson(log);

  return (
    <section className="panel grid">
      <h2>Session log</h2>
      <div className="actions">
        <button onClick={() => { void copyText(text).then(() => setCopied(true)); }}>{copied ? "Copied" : "Copy logs"}</button>
        <button className="quiet" onClick={() => downloadText("session-log.txt", text)}>Export text</button>
        <button className="quiet" onClick={() => downloadText("session-log.json", json)}>Export JSON</button>
      </div>
      {!log.length && <p className="note">Nothing recorded yet. Generate a room or a map, then add it.</p>}
      <ul className="list">
        {log.map((entry) => (
          <li key={entry.id}>
            <strong>#{entry.id} {entry.title}</strong>
            <div className="note">{entry.kind} · seed {entry.seed}</div>
            <p className="copy-block">{entry.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
