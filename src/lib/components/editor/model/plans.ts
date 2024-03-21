import { FeatureOverwrite, StrNumBool, ValueOverwrite } from "../types/index";
import { PaymentTypes } from "./features";

export type Plans = {
  [key: string]: Plan;
};

export interface Plan {
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
    public usageLimits: Map<string, MapStandardValue> | null
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
