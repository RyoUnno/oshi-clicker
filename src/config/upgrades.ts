import type { Upgrade } from "../types/game";

export const upgrades: Upgrade[] = [
  {
    id: "better_mic",
    name: "ちょっといいマイク",
    description: "1タップの応援ポイントが増える",
    baseCost: 10,
    costMultiplier: 1.15,
    effectType: "tapPower",
    effectValue: 1
  },
  {
    id: "stream_schedule",
    name: "配信スケジュール作成",
    description: "毎秒応援ポイントを獲得する",
    baseCost: 50,
    costMultiplier: 1.2,
    effectType: "pointsPerSecond",
    effectValue: 1
  },
  {
    id: "clip_creator",
    name: "切り抜き職人",
    description: "毎秒ファンが増える",
    baseCost: 100,
    costMultiplier: 1.25,
    effectType: "fansPerSecond",
    effectValue: 0.5
  },
  {
    id: "collab_stream",
    name: "コラボ配信",
    description: "応援ポイントとファンの増加量が上がる",
    baseCost: 500,
    costMultiplier: 1.3,
    effectType: "globalMultiplier",
    effectValue: 0.05
  }
];
