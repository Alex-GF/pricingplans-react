import { FeatureOverwrite, PlanFeaturesState, ValueOverwrite } from ".";

export type GlobalPriceAddOns = {
  [key: string]: AddOnGlobalBilling;
};

export type MonthlyAddOns = {
  [key: string]: AddOnWithMonthlyBilling;
};

export type MonthlyAndAnnualAddOns = {
  [key: string]: AddOnWithMonthlyAndAnnualBilling;
};

interface AddOn {
  availableFor: string[];
  description: string | null;
  unit: string;
  features: FeatureOverwrite | null;
  usageLimits: ValueOverwrite | null;
  usageLimitsExtensions: ValueOverwrite | null;
}

type AddOnGlobalBilling = {
  price: number;
  monthlyPrice: null;
  annualPrice: null;
} & AddOn;

type AddOnWithMonthlyBilling = {
  price: null;
  monthlyPrice: number;
  annualPrice: null;
} & AddOn;

type AddOnWithMonthlyAndAnnualBilling = {
  price: null;
  monthlyPrice: number;
  annualPrice: number;
} & AddOn;

export type AddOnsState = AddOnState[] | null;

export type AddOnState = Omit<
  AddOn,
  "features" | "usageLimits" | "usageLimitsExtensions"
> & {
  name: string;
  features: PlanFeaturesState;
};
