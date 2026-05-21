import { formatNumber } from "../utils/formatNumber";
import type { OfflineReward } from "../hooks/useGameState";

interface Props {
  reward: OfflineReward;
  onClose: () => void;
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}時間${m}分`;
  if (m > 0) return `${m}分`;
  return `${Math.floor(seconds)}秒`;
}

export function OfflineRewardModal({ reward, onClose }: Props) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>おかえりなさい！</h2>
        <p>{formatDuration(reward.seconds)} の間に推しが頑張ってくれました</p>
        <div className="reward-stats">
          <div>
            <div className="reward-label">応援ポイント</div>
            <div className="reward-value">+{formatNumber(reward.points)}</div>
          </div>
          <div>
            <div className="reward-label">ファン</div>
            <div className="reward-value">+{formatNumber(reward.fans)}</div>
          </div>
        </div>
        <button className="modal-btn" onClick={onClose}>
          受け取る
        </button>
      </div>
    </div>
  );
}
