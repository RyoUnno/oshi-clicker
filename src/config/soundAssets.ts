// 効果音アセット設定。
// MVP では Web Audio API で合成音を鳴らすため、未配置でも動作する。
// 実ファイルを置く場合はこのパスに配置する。
export const soundAssets = {
  tap: "/assets/sounds/tap.mp3",
  buy: "/assets/sounds/buy.mp3",
  unlock: "/assets/sounds/unlock.mp3",
  levelup: "/assets/sounds/levelup.mp3"
} as const;

export type SoundKey = keyof typeof soundAssets;
