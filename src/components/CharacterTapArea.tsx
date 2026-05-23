import { useCallback, useEffect, useRef, useState } from "react";
import { FloatingText } from "./FloatingText";
import { imageAssets } from "../config/imageAssets";
import type { CharacterKey } from "../config/imageAssets";
import { formatNumber } from "../utils/formatNumber";
import type { FloatingTextItem } from "../types/game";

export interface AutoSource {
  id: string;
  name: string;
  amount: number;
  type: "pointsPerSecond" | "fansPerSecond";
}

interface Props {
  costumeId: string;
  onTap: (x: number, y: number) => { gained: number };
  isPcGlowing: boolean;
  isFever: boolean;
  onActivateFever: () => void;
  autoSources: AutoSource[];
}

const PARTICLE_EMOJIS = ["💖", "⭐", "✨", "🌟", "💫"];
const FEVER_DURATION_MS = 15000;

// 泡のアニメーション用シード（左右どちらかから漂ってくる）
function randomBubbleStyle() {
  const fromRight = Math.random() < 0.5;
  const startSide = fromRight ? "right" : "left";
  const startY = 20 + Math.random() * 55; // 上20%〜75%の高さからスタート
  const driftY = (Math.random() - 0.5) * 20; // 上下に±10%揺れる
  const duration = 6000 + Math.random() * 4000; // 6〜10秒
  return { fromRight, startSide, startY, driftY, duration };
}

export function CharacterTapArea({ costumeId, onTap, isPcGlowing, isFever, onActivateFever, autoSources }: Props) {
  const [pressed, setPressed] = useState(false);
  const [items, setItems] = useState<FloatingTextItem[]>([]);
  const idRef = useRef(0);
  const releaseTimerRef = useRef<number | null>(null);
  const [feverKey, setFeverKey] = useState(0);
  const prevFeverRef = useRef(false);

  // 泡の状態
  const [bubble, setBubble] = useState<{ fromRight: boolean; startSide: string; startY: number; driftY: number; duration: number } | null>(null);

  // フィーバー開始時にアニメーションをリセット
  useEffect(() => {
    if (isFever && !prevFeverRef.current) {
      setFeverKey((k) => k + 1);
    }
    prevFeverRef.current = isFever;
  }, [isFever]);

  // 自動加算フローティングテキスト（毎秒）
  const autoSourcesRef = useRef(autoSources);
  useEffect(() => { autoSourcesRef.current = autoSources; }, [autoSources]);

  useEffect(() => {
    const id = window.setInterval(() => {
      const sources = autoSourcesRef.current;
      if (sources.length === 0) return;
      const count = sources.length;
      const newItems: FloatingTextItem[] = sources.map((src, i) => {
        const xPct = count === 1
          ? 35 + Math.random() * 30
          : 15 + (i / (count - 1)) * 70 + (Math.random() - 0.5) * 12;
        const yPct = 42 + Math.random() * 22;
        const emoji = src.type === "pointsPerSecond" ? "💫" : "👥";
        return {
          id: ++idRef.current,
          x: `${xPct}%`,
          y: `${yPct}%`,
          text: `${emoji} +${formatNumber(src.amount)}/s`,
          label: src.name,
          kind: "auto" as const,
        };
      });
      setItems((prev) => [...prev, ...newItems]);
      const ids = newItems.map((it) => it.id);
      window.setTimeout(() => {
        setItems((prev) => prev.filter((p) => !ids.includes(p.id)));
      }, 1400);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);


  useEffect(() => {
    if (isPcGlowing && !isFever && !bubble) {
      setBubble(randomBubbleStyle());
    }
    if (!isPcGlowing) {
      // グロー終了 = 泡が自然消滅した場合（タップされなかった）
      setBubble(null);
    }
  }, [isPcGlowing, isFever, bubble]);

  const handleTap = useCallback(
    (clientX: number, clientY: number, rect: DOMRect) => {
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const { gained } = onTap(clientX, clientY);

      setPressed(true);
      if (releaseTimerRef.current) window.clearTimeout(releaseTimerRef.current);
      releaseTimerRef.current = window.setTimeout(() => setPressed(false), 120);

      const newItems: FloatingTextItem[] = [];
      newItems.push({
        id: ++idRef.current,
        x,
        y,
        text: `+${formatNumber(gained)}`,
        kind: "point"
      });
      if (Math.random() < 0.25) {
        newItems.push({
          id: ++idRef.current,
          x: x + (Math.random() - 0.5) * 60,
          y: y - 20,
          text: "",
          kind: "particle",
          emoji: PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)]
        });
      }
      setItems((prev) => [...prev, ...newItems]);
      const ids = newItems.map((i) => i.id);
      window.setTimeout(() => {
        setItems((prev) => prev.filter((p) => !ids.includes(p.id)));
      }, 900);
    },
    [onTap]
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    handleTap(e.clientX, e.clientY, rect);
  };

  const onBubblePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isFever) {
      setBubble(null);
      onActivateFever();
    }
  };

  const imgKey = (costumeId in imageAssets.characters ? costumeId : "default") as CharacterKey;
  const src = imageAssets.characters[imgKey];

  return (
    <div
      className={`tap-area ${pressed ? "pressed" : ""} ${isFever ? "fever-active" : ""}`}
      onPointerDown={onPointerDown}
      role="button"
      aria-label="推しをタップ"
    >
      {/* 部屋の背景 */}
      <img
        className="room-bg"
        src={imageAssets.background}
        alt=""
        draggable={false}
      />

      {/* フィーバーオーバーレイ */}
      {isFever && <div className="fever-overlay" />}

      {/* フィーバーバー */}
      {isFever && (
        <div className="fever-bar-wrap">
          <div
            key={feverKey}
            className="fever-bar-fill"
            style={{ animationDuration: `${FEVER_DURATION_MS}ms` }}
          />
          <span className="fever-label">🔥 FEVER TIME! ×3</span>
        </div>
      )}

      {/* キャラクター */}
      <img
        className="character"
        src={src}
        alt=""
        draggable={false}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
        }}
      />

      {/* フィーバー泡 */}
      {bubble && !isFever && (
        <div
          className={`fever-bubble fever-bubble--${bubble.startSide}`}
          style={{
            top: `${bubble.startY}%`,
            ["--drift-y" as string]: `${bubble.driftY}%`,
            ["--bubble-dur" as string]: `${bubble.duration}ms`,
          }}
          onPointerDown={onBubblePointerDown}
          role="button"
          aria-label="泡をタップ！"
        >
          🫧
        </div>
      )}

      <FloatingText items={items} />
    </div>
  );
}

