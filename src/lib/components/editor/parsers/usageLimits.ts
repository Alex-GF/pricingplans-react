import { StandardUsageLimit, UsageLimits } from "../model/usagelimits";

export default class UsageLimitParser {
  private rawUsageLimits: UsageLimits;
  private parsedUsageLimits: Map<string, StandardUsageLimit>;

  constructor(usageLimits: UsageLimits) {
    this.rawUsageLimits = usageLimits;
    this.parsedUsageLimits = new Map([]);
  }
}
