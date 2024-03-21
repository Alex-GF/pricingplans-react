import { ValueType } from "../types/index";
import { Features, StandardFeature, Type } from "./features";
import { StandardUsageLimit, UsageLimits } from "./usagelimits";
import { Plans, StandardPlan } from "./plans";
import { StandardAddOn, AddOns } from "./addons";

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
    public features: Map<string, StandardFeature>,
    public usageLimits: Map<string, StandardUsageLimit> | null,
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
      usageLimits: null,
      addOns: null,
    };
  }

  private _serializeFeatures(): Features {
    return {
      foo: {
        description: "",
        valueType: ValueType.BOOLEAN,
        defaultValue: false,
        type: Type.AUTOMATION,
        automationType: "BOT",
        expression: "",
        serverExpression: "",
      },
    };
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
}
