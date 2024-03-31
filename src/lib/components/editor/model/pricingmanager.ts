import { AllFeatures, Features } from "../types/features";
import FeatureSerializer from "../serializers/features";
import { Plans } from "../types/plans";
import { StandardPlan } from "./plans";
import { AddOn, AddOns } from "../types/addOns";
import { StandardAddOn } from "./addons";
import { PricingManager } from "../types/index";
import { UsageLimitBase, UsageLimits } from "../types/usageLimits";
import { serialize } from "./usagelimits";

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
      addOns: this._serializeAddOns(),
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

  private _serializeAddOns(): AddOns | null {
    if (this.addOns === null) {
      return null;
    }

    const addOnsTuple: [string, AddOn][] = [];

    for (const [addOnName, addOn] of this.addOns) {
      addOnsTuple.push([addOnName, addOn.serialize()]);
    }

    return Object.fromEntries(addOnsTuple);
  }
}
