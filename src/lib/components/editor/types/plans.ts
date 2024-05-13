import {
  FeatureOverwrite,
  ParsedOverwrittenFeatures,
  ParsedOverwrittenUsageLimits,
  StrNumBool,
  ValueOverwrite,
} from ".";
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

export type PlansState = ParsedPlans | null;

export type PlanState = ParsedPlan;

export type ParsedPlans = ParsedPlan[];

type ParsedPlan = Omit<Plan, "features" | "usageLimits"> & {
  name: string;
  features: ParsedOverwrittenFeatures;
  usageLimits: ParsedOverwrittenUsageLimits;
};
