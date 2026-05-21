import { costumes } from "../config/costumes";
import { imageAssets } from "../config/imageAssets";
import type { CharacterKey } from "../config/imageAssets";
import { formatNumber } from "../utils/formatNumber";
import type { GameState } from "../types/game";

interface Props {
  state: GameState;
  onSelect: (id: string) => void;
}

export function CostumePanel({ state, onSelect }: Props) {
  return (
    <div className="panel costume-panel">
      <h2 className="panel-title">衣装</h2>
      <div className="costume-grid">
        {costumes.map((c) => {
          const unlocked = state.unlockedCostumeIds.includes(c.id);
          const selected = state.selectedCostumeId === c.id;
          const key = (c.imageKey in imageAssets.characters
            ? c.imageKey
            : "default") as CharacterKey;
          const src = imageAssets.characters[key];
          return (
            <button
              key={c.id}
              className={`costume-card ${selected ? "selected" : ""} ${unlocked ? "" : "locked"}`}
              onClick={() => unlocked && onSelect(c.id)}
              disabled={!unlocked}
            >
              <div className="costume-thumb">
                <img src={src} alt="" onError={(e) => ((e.currentTarget as HTMLImageElement).style.visibility = "hidden")} />
                {!unlocked && <div className="lock-overlay">🔒</div>}
              </div>
              <div className="costume-name">{c.name}</div>
              <div className="costume-cond">
                {unlocked ? (selected ? "選択中" : "選択") : `ファン ${formatNumber(c.unlockFans)}`}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
