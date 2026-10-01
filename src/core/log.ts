import type { LogEntry } from "./types.js";

export function addLogEntry(log: readonly LogEntry[], entry: Omit<LogEntry, "id">): LogEntry[] {
  const next: LogEntry = { ...entry, id: String(log.length + 1).padStart(3, "0") };
  return [...log, next];
}

export function exportLogText(log: readonly LogEntry[]): string {
  if (!log.length) return "Session log is empty.";
  return log.map((entry) => [`#${entry.id} ${entry.kind}`, entry.title, entry.text, `seed ${entry.seed}`].join("\n")).join("\n\n");
}

export function exportLogJson(log: readonly LogEntry[]): string {
  return JSON.stringify(log, null, 2);
}
