import type { Settings } from "../types/game";

interface Props {
  settings: Settings;
  onChange: (next: Settings) => void;
  onReset: () => void;
  version: string;
}

export function SettingsPanel({ settings, onChange, onReset, version }: Props) {
  const handleReset = () => {
    if (window.confirm("本当にデータをリセットしますか？この操作は取り消せません。")) {
      onReset();
    }
  };

  return (
    <div className="panel settings-panel">
      <h2 className="panel-title">設定</h2>
      <label className="setting-row">
        <span>効果音</span>
        <input
          type="checkbox"
          checked={settings.soundEnabled}
          onChange={(e) => onChange({ ...settings, soundEnabled: e.target.checked })}
        />
      </label>
      <label className="setting-row">
        <span>ボイス</span>
        <input
          type="checkbox"
          checked={settings.voiceEnabled}
          onChange={(e) => onChange({ ...settings, voiceEnabled: e.target.checked })}
        />
      </label>
      <button className="danger-btn" onClick={handleReset}>
        データをリセット
      </button>
      <div className="version">version {version}</div>
    </div>
  );
}
