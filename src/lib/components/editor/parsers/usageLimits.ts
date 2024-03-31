import { UsageLimitBase, UsageLimits } from "../types/usageLimits";

export default class UsageLimitParser {
  constructor(private usageLimits: UsageLimits) {}

  public parse(): Map<string, UsageLimitBase> {
    const parsedUsageLimits = new Map<string, UsageLimitBase>([]);
    Object.entries(this.usageLimits).forEach(([name, usageLimit]) => {
      const ul: UsageLimitBase = { ...usageLimit, name: name };
      parsedUsageLimits.set(name, ul);
    });
    return parsedUsageLimits;
  }
}
