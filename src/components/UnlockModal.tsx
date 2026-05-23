import { useEffect } from "react";
import { costumes } from "../config/costumes";

const BANNER_DURATION_MS = 4000;

interface Props {
  unlockedCostumeId: string;
  onClose: () => void;
}

export function UnlockModal({ unlockedCostumeId, onClose }: Props) {
  const c = costumes.find((x) => x.id === unlockedCostumeId);

  useEffect(() => {
    const id = window.setTimeout(onClose, BANNER_DURATION_MS);
    return () => window.clearTimeout(id);
  }, [onClose]);

  return (
    <div className="unlock-banner" role="status">
      <span className="unlock-banner-sparkle">✨</span>
      <div className="unlock-banner-text">
        <span className="unlock-banner-title">新しい衣装が解放されました！</span>
        <span className="unlock-banner-name">{c?.name ?? "新衣装"}</span>
      </div>
      <span className="unlock-banner-sparkle">✨</span>
    </div>
  );
}
