export function formatNumber(value: number): string {
  if (!isFinite(value)) return "∞";
  const n = Math.floor(value);
  if (n < 1000) return n.toString();
  const units = [
    { v: 1e12, s: "T" },
    { v: 1e9, s: "B" },
    { v: 1e6, s: "M" },
    { v: 1e3, s: "K" }
  ];
  for (const u of units) {
    if (value >= u.v) {
      const num = value / u.v;
      return num.toFixed(num >= 100 ? 0 : num >= 10 ? 1 : 2).replace(/\.?0+$/, "") + u.s;
    }
  }
  return n.toString();
}

export function formatRate(value: number): string {
  if (value === 0) return "0";
  if (value < 1) return value.toFixed(2);
  if (value < 10) return value.toFixed(1);
  return formatNumber(value);
}
