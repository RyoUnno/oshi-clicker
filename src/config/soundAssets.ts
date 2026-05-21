// 効果音アセット設定。
// MVP では Web Audio API で合成音を鳴らすため、未配置でも動作する。
// 実ファイルを置く場合はこのパスに配置する。
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export const soundAssets = {
  tap: `${base}/assets/sounds/tap.mp3`,
  buy: `${base}/assets/sounds/buy.mp3`,
  unlock: `${base}/assets/sounds/unlock.mp3`,
  levelup: `${base}/assets/sounds/levelup.mp3`
} as const;

export type SoundKey = keyof typeof soundAssets;
