# 推し配信者クリッカー

スマホブラウザ向けの放置クリッカーゲーム。React + TypeScript + Vite 製。

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:5173/` を開く。スマホで遊ぶ場合は同一LANのIPで開いてください。

## 操作

- 中央の推しキャラをタップ → 応援ポイント獲得
- 下部タブの「強化」からアップグレード購入
- ファンが一定数たまると衣装解放
- 「衣装」タブで切り替え可能
- 「設定」から効果音/ボイス ON/OFF、データリセット

## アセット差し替え

すべて `src/config/` 以下の設定ファイル経由。

- 画像: [src/config/imageAssets.ts](src/config/imageAssets.ts)
- 効果音: [src/config/soundAssets.ts](src/config/soundAssets.ts)
- ボイス: [src/config/voiceAssets.ts](src/config/voiceAssets.ts)
- アップグレード定義: [src/config/upgrades.ts](src/config/upgrades.ts)
- 衣装定義: [src/config/costumes.ts](src/config/costumes.ts)

ファイル本体は `public/assets/` 以下に配置すると `/assets/...` で参照されます。
効果音は未配置でも Web Audio API による合成音にフォールバックします。
ボイスは未配置の場合は再生をスキップします。

### 画像ファイルのサイズ・比率

| ファイル | パス | 推奨サイズ | 比率 | 備考 |
|---|---|---|---|---|
| 背景（部屋） | `public/assets/images/ui/background.svg` | 480 × 800 px | **3:5**（縦長） | `object-fit: cover` で表示。縦長素材推奨 |
| キャラクター（デフォルト） | `public/assets/images/characters/default.*` | 240 × 320 px | **3:4**（縦長） | 透過PNG推奨。背景は不要 |
| キャラクター（アイドル） | `public/assets/images/characters/idol.*` | 240 × 320 px | **3:4**（縦長） | 同上 |
| キャラクター（メイド） | `public/assets/images/characters/maid.*` | 240 × 320 px | **3:4**（縦長） | 同上 |

> **差し替え手順**: `public/assets/images/characters/` に画像を置き、拡張子を変えた場合は `src/config/imageAssets.ts` のパスも更新してください。SVG・PNG・JPG いずれも対応しています。

### ボイスファイル一覧

ボイスは `public/assets/voices/` に配置してください。各キーに **複数ファイルを登録可能で、再生時にランダムで1つが選ばれます**。

| キー | 発火タイミング | デフォルトファイル |
|---|---|---|
| `tap` | タップ時（約15%の確率） | `tap_01.mp3`, `tap_02.mp3` |
| `upgrade` | アップグレード購入成功時 | `upgrade_01.mp3`, `upgrade_02.mp3` |
| `costume` | 衣装切り替え時 | `costume_01.mp3`, `costume_02.mp3` |
| `unlock` | 衣装解放時 | `unlock_01.mp3` |
| `idle` | 10〜30秒ごとにランダム発話 | `idle_01.mp3`, `idle_02.mp3`, `idle_03.mp3` |

ファイルを追加・変更する場合は `src/config/voiceAssets.ts` の配列を編集してください。未配置のファイルは静かにスキップされます。

## セーブ

- ゲームデータ: `localStorage["oshi-clicker-save"]`
- 設定: `localStorage["oshi-clicker-settings"]`
- オフライン報酬上限: 8時間
