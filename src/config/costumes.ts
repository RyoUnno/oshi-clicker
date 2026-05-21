import type { Costume } from "../types/game";

export const costumes: Costume[] = [
  {
    id: "default",
    name: "通常衣装",
    unlockFans: 0,
    imageKey: "default"
  },
  {
    id: "idol",
    name: "アイドル衣装",
    unlockFans: 100,
    imageKey: "idol"
  },
  {
    id: "maid",
    name: "メイド衣装",
    unlockFans: 500,
    imageKey: "maid"
  }
];
