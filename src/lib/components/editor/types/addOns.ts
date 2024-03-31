import { FeatureOverwrite, ValueOverwrite } from ".";

export type AddOns = {
  [key: string]: AddOn;
};

export type AddOn = {
  availableFor: string[];
  unit: string;
  price: number | null;
  annualPrice: number | null;
  monthlyPrice: number | null;
  features: FeatureOverwrite | null;
  usageLimits: ValueOverwrite | null;
  usageLimitsExtensions: ValueOverwrite | null;
};
