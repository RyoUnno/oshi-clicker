// 画像アセット設定。
// public/assets/... に実画像を置くと自動でそのファイルが使われる。
// 無い場合は同名 .svg のプレースホルダーが使われる。
// import.meta.env.BASE_URL を使うことで GitHub Pages などのサブパスにも対応。
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export const imageAssets = {
  background: `${base}/assets/images/ui/background.png`,

  characters: {
    default: `${base}/assets/images/characters/default.png`,
    idol: `${base}/assets/images/characters/idol.png`,
    maid: `${base}/assets/images/characters/maid.png`
  }
} as const;

export type CharacterKey = keyof typeof imageAssets.characters;
