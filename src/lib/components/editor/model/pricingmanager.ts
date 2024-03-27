import { AllFeatures, Features } from "./features";
import { UsageLimitBase, UsageLimits, serialize } from "./usagelimits";
import { Plans, StandardPlan } from "./plans";
import { StandardAddOn, AddOns } from "./addons";
import FeatureSerializer from "../serializers/features";

export type PricingManager = {
  saasName: string;
  day: number;
  month: number;
  year: number;
  currency: string;
  hasAnnualPayment: boolean;
  features: Features;
  usageLimits: UsageLimits | null;
  plans: Plans | null;
  addOns: AddOns | null;
};

export class PricingManagerBase {
  constructor(
    public saasName: string,
    public day: number,
    public month: number,
    public year: number,
    public currency: string,
    public hasAnnualPayment: boolean,
    public features: Map<string, AllFeatures>,
    public usageLimits: Map<string, UsageLimitBase> | null,
    public plans: Map<string, StandardPlan> | null,
    public addOns: Map<string, StandardAddOn> | null
  ) {
    if (!plans && !addOns) {
      throw Error(
        "Plans and AddOns are both null. You have to defined both or one of them."
      );
    }
  }

  serialize(): PricingManager {
    return {
      saasName: this.saasName,
      day: this.day,
      month: this.month,
      year: this.year,
      currency: this.currency,
      hasAnnualPayment: this.hasAnnualPayment,
      features: this._serializeFeatures(),

      plans: this._serializePlans(),
      usageLimits: this._serializeUsageLimits(),
      addOns: null,
    };
  }

  private _serializeFeatures(): Features {
    return new FeatureSerializer(this.features).features;
  }

  private _serializePlans(): Plans | null {
    if (this.plans === null) {
      return null;
    }

    const plans = [];

    for (const [planName, plan] of this.plans) {
      plans.push([planName, plan.serialize()]);
    }

    return Object.fromEntries(plans);
  }

  private _serializeUsageLimits(): UsageLimits | null {
    if (this.usageLimits === null) {
      return null;
    }

    const usageLimits = [];

    for (const [usageLimitName, usageLimit] of this.usageLimits) {
      usageLimits.push([usageLimitName, serialize(usageLimit)]);
    }

    return Object.fromEntries(usageLimits);
  }
}
