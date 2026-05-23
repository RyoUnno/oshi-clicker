export type EffectType =
  | "tapPower"
  | "pointsPerSecond"
  | "fansPerSecond"
  | "globalMultiplier";

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  effectType: EffectType;
  effectValue: number;
}

export interface Costume {
  id: string;
  name: string;
  unlockFans: number;
  imageKey: string;
}

export interface GameState {
  supportPoints: number;
  fans: number;
  selectedCostumeId: string;
  upgrades: Record<string, number>;
  unlockedCostumeIds: string[];
  lastSavedAt: number;
}

export interface Settings {
  soundEnabled: boolean;
  voiceEnabled: boolean;
}

export interface DerivedStats {
  tapPower: number;
  pointsPerSecond: number;
  fansPerSecond: number;
  globalMultiplier: number;
}

export interface FloatingTextItem {
  id: number;
  x: number | string;
  y: number | string;
  text: string;
  kind: "point" | "particle" | "auto";
  emoji?: string;
  label?: string;
}
