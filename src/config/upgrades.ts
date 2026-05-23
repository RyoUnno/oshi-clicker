import type { Upgrade } from "../types/game";

export const upgrades: Upgrade[] = [
  // ── タップ強化（10段階）────────────────────
  {
    id: "better_mic",
    name: "ちょっといいマイク",
    description: "1タップの応援ポイントが増える",
    baseCost: 15,
    costMultiplier: 1.2,
    effectType: "tapPower",
    effectValue: 1
  },
  {
    id: "cheer_stick",
    name: "リングライト導入",
    description: "映えある配信で応援ポイントアップ",
    baseCost: 120,
    costMultiplier: 1.22,
    effectType: "tapPower",
    effectValue: 3
  },
  {
    id: "stream_pc",
    name: "配信用PCアップグレード",
    description: "高スペックPCで配信クオリティが上がる",
    baseCost: 500,
    costMultiplier: 1.22,
    effectType: "tapPower",
    effectValue: 6
  },
  {
    id: "green_screen",
    name: "グリーンスクリーン導入",
    description: "背景合成で演出力アップ",
    baseCost: 1500,
    costMultiplier: 1.25,
    effectType: "tapPower",
    effectValue: 12
  },
  {
    id: "fan_letter",
    name: "3Dモデル実装",
    description: "3D化でタップ力が大幅アップ",
    baseCost: 5000,
    costMultiplier: 1.25,
    effectType: "tapPower",
    effectValue: 25
  },
  {
    id: "original_costume",
    name: "オリジナル衣装追加",
    description: "新衣装で人気が爆上がり",
    baseCost: 18000,
    costMultiplier: 1.28,
    effectType: "tapPower",
    effectValue: 50
  },
  {
    id: "live2d_upgrade",
    name: "Live2D改良",
    description: "表情・動きが豊かになり応援が増える",
    baseCost: 60000,
    costMultiplier: 1.28,
    effectType: "tapPower",
    effectValue: 100
  },
  {
    id: "original_song",
    name: "オリジナル曲制作",
    description: "自分だけの楽曲でタップ力が跳ね上がる",
    baseCost: 200000,
    costMultiplier: 1.3,
    effectType: "tapPower",
    effectValue: 250
  },
  {
    id: "live_event",
    name: "リアルライブ開催",
    description: "現地ライブで応援ポイントが一気に増える",
    baseCost: 700000,
    costMultiplier: 1.3,
    effectType: "tapPower",
    effectValue: 600
  },
  {
    id: "budokan",
    name: "武道館ライブ",
    description: "夢の武道館！タップ力が最大級に",
    baseCost: 3000000,
    costMultiplier: 1.32,
    effectType: "tapPower",
    effectValue: 1500
  },

  // ── 毎秒ポイント（10段階）──────────────────
  {
    id: "stream_schedule",
    name: "配信スケジュール作成",
    description: "毎秒応援ポイントを獲得する",
    baseCost: 75,
    costMultiplier: 1.22,
    effectType: "pointsPerSecond",
    effectValue: 1
  },
  {
    id: "archive",
    name: "アーカイブ整理",
    description: "過去配信が再生されて毎秒ポイントが増える",
    baseCost: 400,
    costMultiplier: 1.22,
    effectType: "pointsPerSecond",
    effectValue: 3
  },
  {
    id: "membership",
    name: "メンバーシップ開設",
    description: "限定コンテンツで毎秒の応援ポイントが増える",
    baseCost: 1500,
    costMultiplier: 1.25,
    effectType: "pointsPerSecond",
    effectValue: 8
  },
  {
    id: "utaite",
    name: "歌ってみた投稿",
    description: "カバー動画が拡散されて毎秒ポイントアップ",
    baseCost: 6000,
    costMultiplier: 1.25,
    effectType: "pointsPerSecond",
    effectValue: 20
  },
  {
    id: "superchat",
    name: "投げ銭コーナー設置",
    description: "スパチャ読み上げで毎秒の応援が大幅アップ",
    baseCost: 22000,
    costMultiplier: 1.28,
    effectType: "pointsPerSecond",
    effectValue: 50
  },
  {
    id: "game_series",
    name: "ゲーム実況シリーズ化",
    description: "シリーズ配信で固定ファンがつき毎秒増加",
    baseCost: 80000,
    costMultiplier: 1.28,
    effectType: "pointsPerSecond",
    effectValue: 120
  },
  {
    id: "collab_plan",
    name: "コラボ企画",
    description: "他VTuberとのコラボで毎秒ポイントが急増",
    baseCost: 280000,
    costMultiplier: 1.3,
    effectType: "pointsPerSecond",
    effectValue: 300
  },
  {
    id: "asmr",
    name: "オリジナルASMR",
    description: "睡眠BGMに採用されて毎秒流れ込む応援",
    baseCost: 900000,
    costMultiplier: 1.3,
    effectType: "pointsPerSecond",
    effectValue: 750
  },
  {
    id: "marathon_stream",
    name: "24時間配信",
    description: "体力の限界まで配信して毎秒が爆増",
    baseCost: 3500000,
    costMultiplier: 1.32,
    effectType: "pointsPerSecond",
    effectValue: 2000
  },
  {
    id: "budokan_stream",
    name: "武道館生配信",
    description: "武道館から世界同時配信！毎秒が最大に",
    baseCost: 12000000,
    costMultiplier: 1.32,
    effectType: "pointsPerSecond",
    effectValue: 5000
  },

  // ── 毎秒ファン ──────────────────────────────
  {
    id: "clip_creator",
    name: "切り抜き公認",
    description: "公認切り抜きで毎秒ファンが増える",
    baseCost: 150,
    costMultiplier: 1.28,
    effectType: "fansPerSecond",
    effectValue: 0.5
  },
  {
    id: "sns_post",
    name: "SNS告知",
    description: "配信告知ツイートで毎秒ファンが増える",
    baseCost: 1000,
    costMultiplier: 1.3,
    effectType: "fansPerSecond",
    effectValue: 2
  },
  {
    id: "official_fanclub",
    name: "公式ファンクラブ設立",
    description: "ファンコミュニティを作って毎秒ファンが急増",
    baseCost: 8000,
    costMultiplier: 1.32,
    effectType: "fansPerSecond",
    effectValue: 8
  },

  // ── 全体倍率 ────────────────────────────────
  {
    id: "collab_stream",
    name: "コラボ配信",
    description: "応援ポイントとファンの増加量が上がる",
    baseCost: 800,
    costMultiplier: 1.32,
    effectType: "globalMultiplier",
    effectValue: 0.05
  },
  {
    id: "trending",
    name: "トレンド入り",
    description: "バズって全ての効果がさらにアップ",
    baseCost: 10000,
    costMultiplier: 1.38,
    effectType: "globalMultiplier",
    effectValue: 0.1
  }
];


export const upgrades: Upgrade[] = [
  // ── タップ強化（10段階）────────────────────
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
    id: "cheer_stick",
    name: "リングライト導入",
    description: "映えある配信で応援ポイントアップ",
    baseCost: 80,
    costMultiplier: 1.15,
    effectType: "tapPower",
    effectValue: 3
  },
  {
    id: "stream_pc",
    name: "配信用PCアップグレード",
    description: "高スペックPCで配信クオリティが上がる",
    baseCost: 250,
    costMultiplier: 1.18,
    effectType: "tapPower",
    effectValue: 6
  },
  {
    id: "green_screen",
    name: "グリーンスクリーン導入",
    description: "背景合成で演出力アップ",
    baseCost: 600,
    costMultiplier: 1.18,
    effectType: "tapPower",
    effectValue: 12
  },
  {
    id: "fan_letter",
    name: "3Dモデル実装",
    description: "3D化でタップ力が大幅アップ",
    baseCost: 1500,
    costMultiplier: 1.2,
    effectType: "tapPower",
    effectValue: 25
  },
  {
    id: "original_costume",
    name: "オリジナル衣装追加",
    description: "新衣装で人気が爆上がり",
    baseCost: 4000,
    costMultiplier: 1.2,
    effectType: "tapPower",
    effectValue: 50
  },
  {
    id: "live2d_upgrade",
    name: "Live2D改良",
    description: "表情・動きが豊かになり応援が増える",
    baseCost: 10000,
    costMultiplier: 1.22,
    effectType: "tapPower",
    effectValue: 100
  },
  {
    id: "original_song",
    name: "オリジナル曲制作",
    description: "自分だけの楽曲でタップ力が跳ね上がる",
    baseCost: 30000,
    costMultiplier: 1.22,
    effectType: "tapPower",
    effectValue: 250
  },
  {
    id: "live_event",
    name: "リアルライブ開催",
    description: "現地ライブで応援ポイントが一気に増える",
    baseCost: 100000,
    costMultiplier: 1.25,
    effectType: "tapPower",
    effectValue: 600
  },
  {
    id: "budokan",
    name: "武道館ライブ",
    description: "夢の武道館！タップ力が最大級に",
    baseCost: 500000,
    costMultiplier: 1.25,
    effectType: "tapPower",
    effectValue: 1500
  },

  // ── 毎秒ポイント（10段階）──────────────────
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
    id: "archive",
    name: "アーカイブ整理",
    description: "過去配信が再生されて毎秒ポイントが増える",
    baseCost: 200,
    costMultiplier: 1.2,
    effectType: "pointsPerSecond",
    effectValue: 3
  },
  {
    id: "membership",
    name: "メンバーシップ開設",
    description: "限定コンテンツで毎秒の応援ポイントが増える",
    baseCost: 600,
    costMultiplier: 1.22,
    effectType: "pointsPerSecond",
    effectValue: 8
  },
  {
    id: "utaite",
    name: "歌ってみた投稿",
    description: "カバー動画が拡散されて毎秒ポイントアップ",
    baseCost: 2000,
    costMultiplier: 1.22,
    effectType: "pointsPerSecond",
    effectValue: 20
  },
  {
    id: "superchat",
    name: "投げ銭コーナー設置",
    description: "スパチャ読み上げで毎秒の応援が大幅アップ",
    baseCost: 5000,
    costMultiplier: 1.25,
    effectType: "pointsPerSecond",
    effectValue: 50
  },
  {
    id: "game_series",
    name: "ゲーム実況シリーズ化",
    description: "シリーズ配信で固定ファンがつき毎秒増加",
    baseCost: 15000,
    costMultiplier: 1.25,
    effectType: "pointsPerSecond",
    effectValue: 120
  },
  {
    id: "collab_plan",
    name: "コラボ企画",
    description: "他VTuberとのコラボで毎秒ポイントが急増",
    baseCost: 50000,
    costMultiplier: 1.27,
    effectType: "pointsPerSecond",
    effectValue: 300
  },
  {
    id: "asmr",
    name: "オリジナルASMR",
    description: "睡眠BGMに採用されて毎秒流れ込む応援",
    baseCost: 150000,
    costMultiplier: 1.27,
    effectType: "pointsPerSecond",
    effectValue: 750
  },
  {
    id: "marathon_stream",
    name: "24時間配信",
    description: "体力の限界まで配信して毎秒が爆増",
    baseCost: 500000,
    costMultiplier: 1.3,
    effectType: "pointsPerSecond",
    effectValue: 2000
  },
  {
    id: "budokan_stream",
    name: "武道館生配信",
    description: "武道館から世界同時配信！毎秒が最大に",
    baseCost: 2000000,
    costMultiplier: 1.3,
    effectType: "pointsPerSecond",
    effectValue: 5000
  },

  // ── 毎秒ファン ──────────────────────────────
  {
    id: "clip_creator",
    name: "切り抜き公認",
    description: "公認切り抜きで毎秒ファンが増える",
    baseCost: 100,
    costMultiplier: 1.25,
    effectType: "fansPerSecond",
    effectValue: 0.5
  },
  {
    id: "sns_post",
    name: "SNS告知",
    description: "配信告知ツイートで毎秒ファンが増える",
    baseCost: 600,
    costMultiplier: 1.28,
    effectType: "fansPerSecond",
    effectValue: 2
  },
  {
    id: "official_fanclub",
    name: "公式ファンクラブ設立",
    description: "ファンコミュニティを作って毎秒ファンが急増",
    baseCost: 3000,
    costMultiplier: 1.3,
    effectType: "fansPerSecond",
    effectValue: 8
  },

  // ── 全体倍率 ────────────────────────────────
  {
    id: "collab_stream",
    name: "コラボ配信",
    description: "応援ポイントとファンの増加量が上がる",
    baseCost: 500,
    costMultiplier: 1.3,
    effectType: "globalMultiplier",
    effectValue: 0.05
  },
  {
    id: "trending",
    name: "トレンド入り",
    description: "バズって全ての効果がさらにアップ",
    baseCost: 5000,
    costMultiplier: 1.35,
    effectType: "globalMultiplier",
    effectValue: 0.1
  }
];

