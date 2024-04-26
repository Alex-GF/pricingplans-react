import { FeatureOverwrite, StrNumBool, ValueOverwrite } from ".";
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

export type PlansState = PlanState[] | null;

export type PlanState = Omit<Plan, "features" | "usageLimits"> & {
  name: string;
  features: PlanFeaturesState;
};

export type PlanFeaturesState = PlanFeatureState[];

export type PlanFeatureState = [string, StrNumBool | PaymentTypes];
