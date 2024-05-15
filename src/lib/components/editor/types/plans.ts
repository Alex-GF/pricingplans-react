import {
  OverwritableAttributes,
  ParsedOverwrittenFeatures,
  ParsedOverwrittenUsageLimits,
  StrNumBool,
} from ".";
import { PaymentTypes } from "./features";

export interface PlansWithAnnualBilling {
  [key: string]: PlanWithAnnualBilling;
}

export interface PlansWithRegularBilling {
  [key: string]: PlanWithRegularBilling;
}

interface PlanAttributes extends OverwritableAttributes {
  description?: string | null;
  monthlyPrice: number;
  unit: string;
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

type ParsedPlan = Omit<Plan, "description" | "features" | "usageLimits"> & {
  name: string;
  description: string;
  features: ParsedOverwrittenFeatures;
  usageLimits: ParsedOverwrittenUsageLimits;
};
