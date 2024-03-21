import { FeatureOverwrite, StrNumBool, ValueOverwrite } from "../types/index";
import { PaymentTypes } from "./features";

export type Plans = {
  [key: string]: Plan;
};

interface Plan {
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  unit: string;
  features: FeatureOverwrite | null;
  usageLimits: ValueOverwrite | null;
}

export interface MapFeatureValue {
  value: StrNumBool | PaymentTypes;
}

export interface MapStandardValue {
  value: StrNumBool;
}

export type Pricing =
  | {
      price: number;
    }
  | {
      annualPrice: number;
      monthlyPrice: number;
    };

export class StandardPlan {
  constructor(
    public name: string,
    public description: string,
    public monthlyPrice: number,
    public annualPrice: number,
    public unit: string,
    public features: Map<string, MapFeatureValue> | null,
    public usageLimits: Map<string, { value: StrNumBool }> | null
  ) {}

  serialize(): Plan {
    return {
      description: this.description,
      monthlyPrice: this.monthlyPrice,
      annualPrice: this.annualPrice,
      unit: this.unit,
      features: this._serializeFeatures(),
      usageLimits: this._serializeUsageLimits(),
    };
  }

  private _serializeFeatures(): FeatureOverwrite | null {
    const features = [];

    if (!this.features) {
      return null;
    }

    for (const [key, value] of this.features.entries()) {
      features.push([key, value.value]);
    }

    return Object.fromEntries(features);
  }

  private _serializeUsageLimits(): ValueOverwrite | null {
    const usageLimits = [];

    if (!this.features) {
      return null;
    }

    for (const [key, value] of this.features.entries()) {
      usageLimits.push([key, value.value]);
    }

    return Object.fromEntries(usageLimits);
  }
}

export default class PlansParser {
  private rawPlans: Plans;
  private parsedPlans: Map<string, StandardPlan>;

  constructor(plans: Plans) {
    this.rawPlans = plans;
    this.parsedPlans = new Map([]);
  }

  get plans() {
    this._parse();

    return this.parsedPlans;
  }

  private _parse(): void {
    Object.entries(this.rawPlans).forEach(([name, plan]) =>
      this.parsedPlans.set(name, this._parsePlan(name, plan))
    );
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
