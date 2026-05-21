// 画像アセット設定。
// public/assets/... に実画像を置くと自動でそのファイルが使われる。
// 無い場合は同名 .svg のプレースホルダーが使われる。
export const imageAssets = {
  background: "/assets/images/ui/background.png",

  characters: {
    default: "/assets/images/characters/default.png",
    idol: "/assets/images/characters/idol.png",
    maid: "/assets/images/characters/maid.png"
  }
} as const;

export type CharacterKey = keyof typeof imageAssets.characters;
