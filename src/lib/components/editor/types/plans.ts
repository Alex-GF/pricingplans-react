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
