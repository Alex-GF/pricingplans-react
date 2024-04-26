import {
  MapFeatureValue,
  MapStandardValue,
  Plans,
  Plan,
  PlanState,
  PlanFeaturesState,
  PlansState,
} from "../types/plans";
import { FeatureOverwrite, ValueOverwrite } from "../types/index";
import { StandardPlan } from "../model/plans";

export default class PlansParser {
  constructor(private plans: Plans | null) {}

  public parse(): Map<string, StandardPlan> | null {
    if (!this.plans) {
      return null;
    }

    const parsedPlans = new Map<string, StandardPlan>([]);

    Object.entries(this.plans).forEach(([name, plan]) =>
      parsedPlans.set(name, this._parsePlan(name, plan))
    );

    return parsedPlans;
  }

  private _mergeFeatures(
    globalFeatures: Map<string, MapFeatureValue>,
    planFeatures: Map<string, MapFeatureValue> | null
  ): Map<string, MapFeatureValue> {
    if (!planFeatures) {
      return new Map([...globalFeatures]);
    }
    return new Map([...globalFeatures, ...planFeatures]);
  }

  private _planFeaturesToPlanFeaturesState(
    features: Map<string, MapFeatureValue>
  ): PlanFeaturesState {
    const plansFeaturesState: PlanFeaturesState = [];
    for (const [featureName, feature] of features) {
      plansFeaturesState.push([featureName, feature.value]);
    }
    return plansFeaturesState;
  }

  public parseToReactState(
    originalFeatures: Map<string, MapFeatureValue>
  ): PlansState {
    const plansMap = this.parse();
    if (!plansMap) {
      return null;
    }

    const planState: PlanState[] = [];
    for (const [_, plan] of plansMap) {
      const mergedFeatures = this._mergeFeatures(
        originalFeatures,
        plan.features
      );
      const planFeatures =
        this._planFeaturesToPlanFeaturesState(mergedFeatures);
      const { usageLimits, features, ...rest } = plan;
      planState.push({ ...rest, features: planFeatures });
    }

    return planState;
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
