import { UsageLimitBase, UsageLimits } from "../model/usagelimits";

export default class UsageLimitParser {
  private _rawUsageLimits: UsageLimits;
  private _parsedUsageLimits: Map<string, UsageLimitBase>;

  constructor(usageLimits: UsageLimits) {
    this._rawUsageLimits = usageLimits;
    this._parsedUsageLimits = new Map([]);
  }

  get usageLimits(): Map<string, UsageLimitBase> {
    this._parse();
    return this._parsedUsageLimits;
  }

  private _parse(): void {
    Object.entries(this._rawUsageLimits).forEach(([name, usageLimit]) => {
      const ul: UsageLimitBase = { ...usageLimit, name: name };
      this._parsedUsageLimits.set(name, ul);
    });
  }
}
