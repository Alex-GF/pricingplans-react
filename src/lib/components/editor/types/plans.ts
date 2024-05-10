import { FeatureOverwrite, StrNumBool, ValueOverwrite } from ".";
import { PaymentTypes } from "./features";

export interface PlansWithAnnualBilling {
  [key: string]: PlanWithAnnualBilling;
}

export interface PlansWithRegularBilling {
  [key: string]: PlanWithRegularBilling;
}

interface PlanAttributes {
  description: string;
  monthlyPrice: number;
  unit: string;
  features: FeatureOverwrite | null;
  usageLimits: ValueOverwrite | null;
}

export interface PlanWithRegularBilling extends PlanAttributes {
  annualPrice: null;
}

export interface PlanWithAnnualBilling extends PlanAttributes {
  annualPrice: number;
}

type Plan = PlanWithAnnualBilling | PlanWithRegularBilling;

export interface MapFeatureValue {
  value: StrNumBool | PaymentTypes;
}

export interface MapStandardValue {
  value: StrNumBool;
}

export type PlansState = PlanState[] | null;

export type PlanState = Omit<Plan, "features" | "usageLimits"> & {
  name: string;
  features: PlanFeaturesState;
};

export type PlanFeaturesState = PlanFeatureState[];

export type PlanFeatureState = {
  name: string;
  value: StrNumBool | PaymentTypes;
};
