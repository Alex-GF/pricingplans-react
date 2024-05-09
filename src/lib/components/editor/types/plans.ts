import { FeatureOverwrite, StrNumBool, ValueOverwrite } from ".";
import { PaymentTypes } from "./features";

export interface PlansWithAnnualBilling {
  [key: string]: PlanWithAnnualBilling;
}

export interface PlansWithRegularBilling {
  [key: string]: PlanWithRegularBilling;
}

export interface PlanWithRegularBilling {
  description: string;
  monthlyPrice: number;
  annualPrice: null;
  unit: string;
  features: FeatureOverwrite | null;
  usageLimits: ValueOverwrite | null;
}

export interface PlanWithAnnualBilling {
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  unit: string;
  features: FeatureOverwrite | null;
  usageLimits: ValueOverwrite | null;
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
