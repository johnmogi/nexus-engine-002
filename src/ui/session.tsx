import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { LogEntry } from "../core/types";
import { addLogEntry } from "../core/log";

export type ScreenId = "dashboard" | "room" | "map" | "codex" | "dice" | "log";

interface SessionValue {
  seed: string;
  setSeed: (seed: string) => void;
  log: LogEntry[];
  addEntry: (entry: Omit<LogEntry, "id" | "createdAt">) => void;
  clearLog: () => void;
  focusKind: string;
  setFocusKind: (kind: string) => void;
  screen: ScreenId;
  setScreen: (screen: ScreenId) => void;
}

const SessionContext = createContext<SessionValue | null>(null);
const STORAGE_KEY = "nexus-dm-poker-tool-v1";

function load(): { seed: string; log: LogEntry[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { seed: "42", log: [] };
    const parsed = JSON.parse(raw) as { seed?: string; log?: LogEntry[] };
    return { seed: parsed.seed || "42", log: Array.isArray(parsed.log) ? parsed.log : [] };
  } catch {
    return { seed: "42", log: [] };
  }
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const initial = load();
  const [seed, setSeed] = useState(initial.seed);
  const [log, setLog] = useState<LogEntry[]>(initial.log);
  const [screen, setScreen] = useState<ScreenId>("dashboard");
  const [focusKind, setFocusKind] = useState("room");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ seed, log }));
  }, [seed, log]);

  const value: SessionValue = {
    seed,
    setSeed,
    log,
    addEntry(entry) {
      setLog((current) => addLogEntry(current, { ...entry, createdAt: new Date().toISOString() }));
    },
    clearLog() {
      setLog([]);
    },
    focusKind,
    setFocusKind,
    screen,
    setScreen,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const value = useContext(SessionContext);
  if (!value) throw new Error("Session missing");
  return value;
}
