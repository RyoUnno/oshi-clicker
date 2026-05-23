import { useEffect, useMemo, useRef, useState } from "react";
import { StatusBar } from "./components/StatusBar";
import { CharacterTapArea } from "./components/CharacterTapArea";
import { UpgradePanel } from "./components/UpgradePanel";
import { CostumePanel } from "./components/CostumePanel";
import { SettingsPanel } from "./components/SettingsPanel";
import { BottomTabs, type TabId } from "./components/BottomTabs";
import { OfflineRewardModal } from "./components/OfflineRewardModal";
import { UnlockModal } from "./components/UnlockModal";
import { useGameState } from "./hooks/useGameState";
import { useAudio } from "./hooks/useAudio";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { upgrades as upgradeList } from "./config/upgrades";
import type { Settings } from "./types/game";
import type { AutoSource } from "./components/CharacterTapArea";
import { idleVoiceIntervalMs } from "./config/voiceAssets";
import "./styles.css";

const APP_VERSION = "0.1.0";

export function App() {
  const {
    state,
    stats,
    tap,
    buyUpgrade,
    selectCostume,
    resetGame,
    offlineReward,
    clearOfflineReward,
    unlockEvent,
    clearUnlockEvent,
    isPcGlowing,
    isFever,
    activateFever
  } = useGameState();

  const [settings, setSettings] = useLocalStorage<Settings>("oshi-clicker-settings", {
    soundEnabled: true,
    voiceEnabled: true
  });

  const autoSources = useMemo<AutoSource[]>(() => {
    return upgradeList
      .filter(
        (u) =>
          (state.upgrades[u.id] ?? 0) > 0 &&
          (u.effectType === "pointsPerSecond" || u.effectType === "fansPerSecond")
      )
      .map((u) => {
        const level = state.upgrades[u.id] ?? 0;
        const amount = u.effectValue * level * stats.globalMultiplier;
        return {
          id: u.id,
          name: u.name,
          amount,
          type: u.effectType as AutoSource["type"],
        };
      });
  }, [state.upgrades, stats.globalMultiplier]);

  const audio = useAudio(settings);
  const [tab, setTab] = useState<TabId>("home");

  // 衣装解放時に効果音・ボイス
  useEffect(() => {
    if (unlockEvent) {
      audio.playSound("unlock");
      audio.playVoice("unlock", { force: true });
    }
  }, [unlockEvent, audio]);

  // アイドルボイス（10〜30秒ごと）
  const idleTimerRef = useRef<number | null>(null);
  useEffect(() => {
    const scheduleNext = () => {
      const delay =
        idleVoiceIntervalMs.min +
        Math.random() * (idleVoiceIntervalMs.max - idleVoiceIntervalMs.min);
      idleTimerRef.current = window.setTimeout(() => {
        audio.playVoice("idle", { force: true });
        scheduleNext();
      }, delay);
    };
    scheduleNext();
    return () => {
      if (idleTimerRef.current !== null) window.clearTimeout(idleTimerRef.current);
    };
  }, [audio]);

  const handleTap = () => {
    audio.ensureInit();
    const gained = tap();
    audio.playSound("tap");
    if (Math.random() < 0.15) {
      audio.playVoice("tap");
    }
    return { gained };
  };

  const handleBuy = (id: string) => {
    audio.ensureInit();
    const result = buyUpgrade(id);
    if (result.success) {
      audio.playSound("buy");
      audio.playVoice("upgrade", { force: true });
    }
  };

  return (
    <div className="app">
      <div className="game-frame">
        <StatusBar state={state} stats={stats} />

        <main className="content">
          {tab === "home" && (
            <CharacterTapArea
              costumeId={state.selectedCostumeId}
              onTap={() => handleTap()}
              isPcGlowing={isPcGlowing}
              isFever={isFever}
              onActivateFever={activateFever}
              autoSources={autoSources}
            />
          )}
          {tab === "upgrades" && <UpgradePanel state={state} onBuy={handleBuy} />}
          {tab === "costumes" && (
            <CostumePanel
              state={state}
              onSelect={(id) => {
                audio.ensureInit();
                selectCostume(id);
                audio.playSound("buy");
                audio.playVoice("costume", { force: true });
              }}
            />
          )}
          {tab === "settings" && (
            <SettingsPanel
              settings={settings}
              onChange={setSettings}
              onReset={resetGame}
              version={APP_VERSION}
            />
          )}
        </main>

        <BottomTabs active={tab} onChange={setTab} />
      </div>

      {offlineReward && (
        <OfflineRewardModal reward={offlineReward} onClose={clearOfflineReward} />
      )}
      {unlockEvent && (
        <UnlockModal unlockedCostumeId={unlockEvent} onClose={clearUnlockEvent} />
      )}
    </div>
  );
}

export default App;
