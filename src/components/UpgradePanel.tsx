import { upgrades } from "../config/upgrades";
import { calculateUpgradeCost } from "../utils/calculateUpgradeCost";
import { formatNumber } from "../utils/formatNumber";
import type { GameState, EffectType } from "../types/game";

interface Props {
  state: GameState;
  onBuy: (id: string) => void;
}

const SECTIONS: { effectType: EffectType; label: string }[] = [
  { effectType: "tapPower",         label: "👆 タップ" },
  { effectType: "pointsPerSecond",  label: "💫 応援ポイント" },
  { effectType: "fansPerSecond",    label: "👥 ファン" },
  { effectType: "globalMultiplier", label: "⚡ 全体倍率" },
];

function effectLabel(effectType: EffectType, effectValue: number): string {
  switch (effectType) {
    case "tapPower":
      return `+${formatNumber(effectValue)} ポイント/タップ`;
    case "pointsPerSecond":
      return `+${formatNumber(effectValue)} ポイント/秒`;
    case "fansPerSecond":
      return `+${formatNumber(effectValue)} ファン/秒`;
    case "globalMultiplier":
      return `全効果 ×${formatNumber(1 + effectValue)} (+${Math.round(effectValue * 100)}%)`;
  }
}

export function UpgradePanel({ state, onBuy }: Props) {
  return (
    <div className="panel upgrade-panel">
      <h2 className="panel-title">強化</h2>
      <div className="upgrade-list">
        {SECTIONS.map(({ effectType, label }) => {
          const group = upgrades.filter((u) => u.effectType === effectType);
          if (group.length === 0) return null;
          return (
            <div key={effectType} className="upgrade-section">
              <div className="upgrade-section-label">{label}</div>
              {group.map((u) => {
                const level = state.upgrades[u.id] ?? 0;
                const cost = calculateUpgradeCost(u, level);
                const canBuy = state.supportPoints >= cost;
                return (
                  <div key={u.id} className="upgrade-item">
                    <div className="upgrade-info">
                      <div className="upgrade-name">
                        {u.name} <span className="upgrade-level">Lv.{level}</span>
                      </div>
                      <div className="upgrade-desc">{u.description}</div>
                      <div className="upgrade-effect">{effectLabel(u.effectType, u.effectValue)}</div>
                    </div>
                    <button
                      className={`buy-btn ${canBuy ? "" : "disabled"}`}
                      onClick={() => onBuy(u.id)}
                      disabled={!canBuy}
                    >
                      <span className="buy-cost">{formatNumber(cost)}</span>
                      <span className="buy-label">買う</span>
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
