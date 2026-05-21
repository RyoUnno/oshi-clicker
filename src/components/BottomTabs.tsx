export type TabId = "home" | "upgrades" | "costumes" | "settings";

interface Props {
  active: TabId;
  onChange: (tab: TabId) => void;
}

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "home", label: "ホーム", icon: "🏠" },
  { id: "upgrades", label: "強化", icon: "⚡" },
  { id: "costumes", label: "衣装", icon: "👗" },
  { id: "settings", label: "設定", icon: "⚙️" }
];

export function BottomTabs({ active, onChange }: Props) {
  return (
    <nav className="bottom-tabs" aria-label="メインメニュー">
      {TABS.map((t) => (
        <button
          key={t.id}
          className={`tab-btn ${active === t.id ? "active" : ""}`}
          onClick={() => onChange(t.id)}
        >
          <span className="tab-icon">{t.icon}</span>
          <span className="tab-label">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
