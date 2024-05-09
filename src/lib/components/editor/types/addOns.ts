import { FeatureOverwrite, PlanFeaturesState, ValueOverwrite } from ".";

export type AddOns = {
  [key: string]: AddOn;
};

export type AddOn =
  | {
      availableFor: string[];
      description: string | null;
      unit: string;
      features: FeatureOverwrite | null;
      usageLimits: ValueOverwrite | null;
      usageLimitsExtensions: ValueOverwrite | null;
    } & Billing;

type Billing =
  | {
      price: number;
      annualPrice: null;
      monthlyPrice: null;
    }
  | { price: null; annualPrice: number; monthlyPrice: number };

export type AddOnsState = AddOnState[] | null;

export type AddOnState = Omit<
  AddOn,
  "features" | "usageLimits" | "usageLimitsExtensions"
> & {
  name: string;
  features: PlanFeaturesState;
};
