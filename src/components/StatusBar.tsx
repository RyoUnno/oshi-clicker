import { formatNumber, formatRate } from "../utils/formatNumber";
import type { DerivedStats, GameState } from "../types/game";

interface Props {
  state: GameState;
  stats: DerivedStats;
}

export function StatusBar({ state, stats }: Props) {
  return (
    <div className="status-bar">
      <div className="status-row">
        <div className="status-cell primary">
          <div className="status-label">応援ポイント</div>
          <div className="status-value">{formatNumber(state.supportPoints)}</div>
        </div>
        <div className="status-cell">
          <div className="status-label">ファン</div>
          <div className="status-value">{formatNumber(state.fans)}</div>
        </div>
      </div>
      <div className="status-row sub">
        <div className="status-cell small">
          <span className="status-label">タップ</span>
          <span className="status-value">+{formatRate(stats.tapPower)}</span>
        </div>
        <div className="status-cell small">
          <span className="status-label">毎秒</span>
          <span className="status-value">+{formatRate(stats.pointsPerSecond)}</span>
        </div>
        <div className="status-cell small">
          <span className="status-label">ファン/秒</span>
          <span className="status-value">+{formatRate(stats.fansPerSecond)}</span>
        </div>
      </div>
    </div>
  );
}
