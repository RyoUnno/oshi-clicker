import type { FloatingTextItem } from "../types/game";

interface Props {
  items: FloatingTextItem[];
}

export function FloatingText({ items }: Props) {
  return (
    <div className="floating-layer" aria-hidden>
      {items.map((it) => (
        <span
          key={it.id}
          className={`float-item ${it.kind}`}
          style={{ left: it.x, top: it.y }}
        >
          {it.emoji ?? it.text}
        </span>
      ))}
    </div>
  );
}
