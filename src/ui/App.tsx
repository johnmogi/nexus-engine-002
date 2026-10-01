import { useSession, type ScreenId } from "./session";
import { Dashboard } from "./screens/Dashboard";
import { QuickRoom } from "./screens/QuickRoom";
import { MapScreen } from "./screens/MapScreen";
import { Codex } from "./screens/Codex";
import { DiceOracle } from "./screens/DiceOracle";
import { SessionLog } from "./screens/SessionLog";

const SCREENS: { id: ScreenId; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "room", label: "Quick room" },
  { id: "map", label: "Map" },
  { id: "codex", label: "Codex" },
  { id: "dice", label: "Dice" },
  { id: "log", label: "Log" },
];

export function App() {
  const { screen, setScreen } = useSession();
  return (
    <main className="app">
      <header className="top">
        <div>
          <h1>Nexus DM Poker Tool</h1>
          <p className="lede">A party enters a room. Draw a card, get a room, and keep the seed.</p>
        </div>
      </header>
      <nav>
        {SCREENS.map((item) => (
          <button key={item.id} data-active={screen === item.id} onClick={() => setScreen(item.id)}>{item.label}</button>
        ))}
      </nav>
      {screen === "dashboard" && <Dashboard />}
      {screen === "room" && <QuickRoom />}
      {screen === "map" && <MapScreen />}
      {screen === "codex" && <Codex />}
      {screen === "dice" && <DiceOracle />}
      {screen === "log" && <SessionLog />}
    </main>
  );
}
