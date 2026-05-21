import { costumes } from "../config/costumes";

interface Props {
  unlockedCostumeId: string;
  onClose: () => void;
}

export function UnlockModal({ unlockedCostumeId, onClose }: Props) {
  const c = costumes.find((x) => x.id === unlockedCostumeId);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal unlock" onClick={(e) => e.stopPropagation()}>
        <div className="sparkle">✨</div>
        <h2>新しい衣装が解放されました！</h2>
        <p className="unlock-name">{c?.name ?? "新衣装"}</p>
        <button className="modal-btn" onClick={onClose}>
          やったー！
        </button>
      </div>
    </div>
  );
}
