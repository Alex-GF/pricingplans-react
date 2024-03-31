import {
  MapFeatureValue,
  MapStandardValue,
  Plans,
  Plan,
  StandardPlan,
} from "../model/plans";
import { FeatureOverwrite, ValueOverwrite } from "../types/index";

export default class PlansParser {
  private rawPlans: Plans;

  constructor(plans: Plans) {
    this.rawPlans = plans;
  }

  public parse(): Map<string, StandardPlan> {
    const parsedPlans = new Map<string, StandardPlan>([]);

    Object.entries(this.rawPlans).forEach(([name, plan]) =>
      parsedPlans.set(name, this._parsePlan(name, plan))
    );

    return parsedPlans;
  }

  private _parsePlan(name: string, plan: Plan): StandardPlan {
    return new StandardPlan(
      name,
      plan.description,
      plan.monthlyPrice,
      plan.annualPrice,
      plan.unit,
      plan.features ? this._parsePlanFeatures(plan.features) : null,
      plan.usageLimits ? this._parsePlanUsageLimits(plan.usageLimits) : null
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
