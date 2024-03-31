import { StandardAddOn } from "../model/addons";
import { MapFeatureValue, MapStandardValue } from "../types/plans";
import { FeatureOverwrite, ValueOverwrite } from "../types/index";
import { AddOn, AddOns } from "../types/addOns";

export default class AddOnsParser {
  constructor(private addOns: AddOns) {}

  public parse(): Map<string, StandardAddOn> {
    const parsedAddOns = new Map<string, StandardAddOn>([]);
    Object.entries(this.addOns).forEach(([name, plan]) =>
      parsedAddOns.set(name, this._parseAddOn(name, plan))
    );
    return parsedAddOns;
  }

  private _parseAddOn(name: string, addOn: AddOn): StandardAddOn {
    return new StandardAddOn(
      name,
      addOn.availableFor,
      addOn.unit,
      addOn.price,
      addOn.annualPrice,
      addOn.monthlyPrice,
      addOn.features ? this._parsePlanFeatures(addOn.features) : null,
      addOn.usageLimits ? this._parsePlanUsageLimits(addOn.usageLimits) : null,
      addOn.usageLimitsExtensions
        ? this._parsePlanUsageLimits(addOn.usageLimitsExtensions)
        : null
    );
  }

  private _parsePlanFeatures(
    features: FeatureOverwrite
  ): Map<string, MapFeatureValue> {
    const featuresMap: Map<string, MapFeatureValue> = new Map([]);

    Object.entries(features).forEach(([name, feature]) =>
      featuresMap.set(name, feature)
    );
    return featuresMap;
  }

  private _parsePlanUsageLimits(
    usageLimits: ValueOverwrite
  ): Map<string, MapStandardValue> {
    const usageLimitsMap: Map<string, MapStandardValue> = new Map([]);

    Object.entries(usageLimits).forEach(([name, usageLimit]) =>
      usageLimitsMap.set(name, usageLimit)
    );
    return usageLimitsMap;
  }
}
