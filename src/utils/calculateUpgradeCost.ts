import type { Upgrade } from "../types/game";

export function calculateUpgradeCost(upgrade: Upgrade, level: number): number {
  return Math.floor(upgrade.baseCost * upgrade.costMultiplier ** level);
}
