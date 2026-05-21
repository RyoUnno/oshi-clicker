import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { upgrades as upgradeList } from "../config/upgrades";
import { costumes as costumeList } from "../config/costumes";
import { calculateUpgradeCost } from "../utils/calculateUpgradeCost";
import type { DerivedStats, GameState } from "../types/game";

const SAVE_KEY = "oshi-clicker-save";
const MAX_OFFLINE_SECONDS = 8 * 60 * 60;

const initialState: GameState = {
  supportPoints: 0,
  fans: 0,
  selectedCostumeId: "default",
  upgrades: {},
  unlockedCostumeIds: ["default"],
  lastSavedAt: Date.now()
};

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { ...initialState, lastSavedAt: Date.now() };
    const parsed = JSON.parse(raw) as Partial<GameState>;
    return {
      ...initialState,
      ...parsed,
      upgrades: { ...parsed.upgrades },
      unlockedCostumeIds: Array.from(
        new Set(["default", ...(parsed.unlockedCostumeIds ?? [])])
      )
    };
  } catch {
    return { ...initialState, lastSavedAt: Date.now() };
  }
}

function computeStats(upgradesLevels: Record<string, number>): DerivedStats {
  let tapPower = 1;
  let pointsPerSecond = 0;
  let fansPerSecond = 0;
  let globalMultiplier = 1;

  for (const u of upgradeList) {
    const level = upgradesLevels[u.id] ?? 0;
    if (level === 0) continue;
    switch (u.effectType) {
      case "tapPower":
        tapPower += u.effectValue * level;
        break;
      case "pointsPerSecond":
        pointsPerSecond += u.effectValue * level;
        break;
      case "fansPerSecond":
        fansPerSecond += u.effectValue * level;
        break;
      case "globalMultiplier":
        globalMultiplier += u.effectValue * level;
        break;
    }
  }

  return {
    tapPower: tapPower * globalMultiplier,
    pointsPerSecond: pointsPerSecond * globalMultiplier,
    fansPerSecond: fansPerSecond * globalMultiplier,
    globalMultiplier
  };
}

export interface OfflineReward {
  seconds: number;
  points: number;
  fans: number;
}

export function useGameState() {
  const [state, setState] = useState<GameState>(() => loadState());
  const [offlineReward, setOfflineReward] = useState<OfflineReward | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  // フィーバー
  const [isFever, setIsFever] = useState(false);
  const isFeverRef = useRef(false);
  const feverEndsAtRef = useRef(0);

  // PC 光る
  const [isPcGlowing, setIsPcGlowing] = useState(false);
  const isPcGlowingRef = useRef(false);

  // PC グロースケジュール（最初は8秒後、以降20〜40秒おき）
  useEffect(() => {
    let scheduleId: number;
    let glowId: number;

    const startGlow = () => {
      setIsPcGlowing(true);
      isPcGlowingRef.current = true;
      glowId = window.setTimeout(() => {
        setIsPcGlowing(false);
        isPcGlowingRef.current = false;
        schedule();
      }, 8000);
    };

    const schedule = () => {
      const delay = 20000 + Math.random() * 20000;
      scheduleId = window.setTimeout(startGlow, delay);
    };

    // 最初は8秒後（動作確認しやすいように）
    scheduleId = window.setTimeout(startGlow, 8000);

    return () => {
      window.clearTimeout(scheduleId);
      window.clearTimeout(glowId);
    };
  }, []);

  // activateFever
  const activateFever = useCallback(() => {
    if (!isPcGlowingRef.current || isFeverRef.current) return;
    feverEndsAtRef.current = Date.now() + 15000;
    setIsFever(true);
    isFeverRef.current = true;
    setIsPcGlowing(false);
    isPcGlowingRef.current = false;
  }, []);


  useEffect(() => {
    const loaded = stateRef.current;
    const stats = computeStats(loaded.upgrades);
    const now = Date.now();
    const elapsedSeconds = Math.min(
      MAX_OFFLINE_SECONDS,
      Math.max(0, (now - loaded.lastSavedAt) / 1000)
    );
    if (elapsedSeconds > 5 && (stats.pointsPerSecond > 0 || stats.fansPerSecond > 0)) {
      const points = stats.pointsPerSecond * elapsedSeconds;
      const fans = stats.fansPerSecond * elapsedSeconds;
      setState((s) => ({
        ...s,
        supportPoints: s.supportPoints + points,
        fans: s.fans + fans,
        lastSavedAt: now
      }));
      setOfflineReward({ seconds: elapsedSeconds, points, fans });
    } else {
      setState((s) => ({ ...s, lastSavedAt: now }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 自動保存（タイマー） + ページ離脱時保存
  useEffect(() => {
    const id = window.setInterval(() => {
      try {
        const snapshot = { ...stateRef.current, lastSavedAt: Date.now() };
        localStorage.setItem(SAVE_KEY, JSON.stringify(snapshot));
      } catch {
        // ignore
      }
    }, 3000);
    const onHide = () => {
      try {
        const snapshot = { ...stateRef.current, lastSavedAt: Date.now() };
        localStorage.setItem(SAVE_KEY, JSON.stringify(snapshot));
      } catch {
        // ignore
      }
    };
    window.addEventListener("pagehide", onHide);
    window.addEventListener("visibilitychange", onHide);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("visibilitychange", onHide);
    };
  }, []);

  const stats = useMemo(() => computeStats(state.upgrades), [state.upgrades]);
  const statsRef = useRef(stats);
  statsRef.current = stats;

  // メインゲームループ（毎秒加算）
  useEffect(() => {
    let last = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const s = statsRef.current;

      // フィーバー終了チェック
      if (isFeverRef.current && Date.now() >= feverEndsAtRef.current) {
        setIsFever(false);
        isFeverRef.current = false;
      }

      const feverMult = isFeverRef.current ? 3 : 1;

      if (s.pointsPerSecond > 0 || s.fansPerSecond > 0) {
        setState((prev) => ({
          ...prev,
          supportPoints: prev.supportPoints + s.pointsPerSecond * feverMult * dt,
          fans: prev.fans + s.fansPerSecond * feverMult * dt
        }));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // 衣装解放チェック
  const newlyUnlockedRef = useRef<string[]>([]);
  const [unlockEvent, setUnlockEvent] = useState<string | null>(null);

  useEffect(() => {
    const newly: string[] = [];
    for (const c of costumeList) {
      if (state.fans >= c.unlockFans && !state.unlockedCostumeIds.includes(c.id)) {
        newly.push(c.id);
      }
    }
    if (newly.length > 0) {
      setState((s) => ({
        ...s,
        unlockedCostumeIds: [...s.unlockedCostumeIds, ...newly]
      }));
      newlyUnlockedRef.current = newly;
      setUnlockEvent(newly[newly.length - 1]);
    }
  }, [state.fans, state.unlockedCostumeIds]);

  const tap = useCallback(() => {
    const feverMult = isFeverRef.current ? 3 : 1;
    const gained = statsRef.current.tapPower * feverMult;
    setState((s) => ({ ...s, supportPoints: s.supportPoints + gained }));
    return gained;
  }, []);

  const buyUpgrade = useCallback(
    (id: string): { success: boolean; cost: number } => {
      const upgrade = upgradeList.find((u) => u.id === id);
      if (!upgrade) return { success: false, cost: 0 };
      const level = stateRef.current.upgrades[id] ?? 0;
      const cost = calculateUpgradeCost(upgrade, level);
      if (stateRef.current.supportPoints < cost) return { success: false, cost };
      setState((s) => ({
        ...s,
        supportPoints: s.supportPoints - cost,
        upgrades: { ...s.upgrades, [id]: (s.upgrades[id] ?? 0) + 1 }
      }));
      return { success: true, cost };
    },
    []
  );

  const selectCostume = useCallback((id: string) => {
    setState((s) =>
      s.unlockedCostumeIds.includes(id) ? { ...s, selectedCostumeId: id } : s
    );
  }, []);

  const resetGame = useCallback(() => {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {
      // ignore
    }
    setState({ ...initialState, lastSavedAt: Date.now() });
    setOfflineReward(null);
    setUnlockEvent(null);
  }, []);

  const clearOfflineReward = useCallback(() => setOfflineReward(null), []);
  const clearUnlockEvent = useCallback(() => setUnlockEvent(null), []);

  return {
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
  };
}
