// ボイスアセット設定。
// 未配置の場合は再生をスキップする。
// 各キーに複数ファイルを登録でき、再生時にランダムで1つ選ばれる。
// import.meta.env.BASE_URL を使うことで GitHub Pages などのサブパスにも対応。
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export const voiceAssets = {
  /** タップ時（低確率で再生） */
  tap: [
    `${base}/assets/voices/tap_01.mp3`,
    `${base}/assets/voices/tap_02.mp3`
  ],
  /** 衣装解放時 */
  unlock: [
    `${base}/assets/voices/unlock_01.mp3`
  ],
  /** アップグレード購入時 */
  upgrade: [
    `${base}/assets/voices/upgrade_01.mp3`,
    `${base}/assets/voices/upgrade_02.mp3`
  ],
  /** 衣装切り替え時 */
  costume: [
    `${base}/assets/voices/costume_01.mp3`,
    `${base}/assets/voices/costume_02.mp3`
  ],
  /** アイドル（10〜30秒ごとにランダム発話） */
  idle: [
    `${base}/assets/voices/idle_01.mp3`,
    `${base}/assets/voices/idle_02.mp3`,
    `${base}/assets/voices/idle_03.mp3`
  ]
} as const;

export const voiceCooldownMs = 3000;
export const tapVoiceChance = 0.15;

/** アイドル発話の間隔（ms）。最小〜最大からランダム選択 */
export const idleVoiceIntervalMs = { min: 10_000, max: 30_000 };

export type VoiceKey = keyof typeof voiceAssets;
