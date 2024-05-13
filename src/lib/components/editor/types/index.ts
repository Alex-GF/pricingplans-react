import { Features, PaymentTypes } from "../types/features";
import {
  GlobalPriceAddOns,
  MonthlyAddOns,
  MonthlyAndAnnualAddOns,
} from "./addOns";
import { PlansWithAnnualBilling, PlansWithRegularBilling } from "./plans";
import { UsageLimits } from "./usageLimits";

export * from "./addOns";
export * from "./features";
export * from "./plans";
export * from "./usageLimits";

export type PricingManager = {
  saasName: string;
  day: number;
  month: number;
  year: number;
  currency: string;
  features: Features;
  usageLimits: UsageLimits | null;
} & BillingType;

export type BillingType =
  | {
      hasAnnualPayment: false;
      plans: PlansWithRegularBilling;
      addOns: GlobalPriceAddOns | MonthlyAddOns | null;
    }
  | {
      hasAnnualPayment: true;
      plans: PlansWithAnnualBilling;
      addOns: GlobalPriceAddOns | MonthlyAndAnnualAddOns | null;
    };

export type FeatureOverwrite = {
  [key: string]: {
    value: StrNumBool | PaymentTypes;
  };
};

export type ValueOverwrite = {
  [key: string]: {
    value: StrNumBool;
  };
};

export type StrNumBool = string | number | boolean;

export enum ValueType {
  Text = "TEXT",
  Boolean = "BOOLEAN",
  Numeric = "NUMERIC",
}

export interface Value<T extends StrNumBool | PaymentTypes> {
  valueType: T extends boolean
    ? Extract<ValueType, ValueType.Boolean>
    : T extends number
    ? Extract<ValueType, ValueType.Numeric>
    : T extends string | PaymentTypes
    ? Extract<ValueType, ValueType.Text>
    : never;
  defaultValue: T;
}

export type PricingState = Omit<
  PricingManager,
  "features" | "usageLimits" | "plans" | "addOns"
> | null;
