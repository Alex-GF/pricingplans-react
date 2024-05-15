import { Features, ParsedFeatures, PaymentTypes } from "../types/features";
import { StandardAddOns, MonthlyAddOns, ParsedAddOns } from "./addOns";
import {
  ParsedPlans,
  PlansWithAnnualBilling,
  PlansWithRegularBilling,
} from "./plans";
import { ParsedUsageLimits, UsageLimits } from "./usageLimits";

export * from "./addOns";
export * from "./features";
export * from "./plans";
export * from "./usageLimits";

export type PricingManagerCommonProps = Pick<
  PricingManager,
  "saasName" | "currency" | "hasAnnualPayment"
> & { date: string };

export type PricingManagerState = PricingManagerCommonProps | null;

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
      addOns: StandardAddOns | null;
    }
  | {
      hasAnnualPayment: true;
      plans: PlansWithAnnualBilling;
      addOns: MonthlyAddOns | null;
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

export interface Evaluable {
  expression: string;
  serverExpression?: string | null;
}

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

export type ParsedPricingManager = Pick<
  PricingManager,
  "saasName" | "currency" | "hasAnnualPayment"
> & {
  date: string;
  features: ParsedFeatures;
  usageLimits: ParsedUsageLimits | null;
} & PlansOrAddOns;

type PlansOrAddOns =
  | {
      plans: ParsedPlans;
      addOns: null;
    }
  | {
      plans: null;
      addOns: ParsedAddOns;
    }
  | {
      plans: ParsedPlans;
      addOns: ParsedAddOns;
    };

export type ParsedOverwrittenFeatures = ParsedOverwrittenFeature[];

export interface OverwritableAttributes {
  features: FeatureOverwrite | null;
  usageLimits: ValueOverwrite | null;
}

type ParsedOverwrittenFeature = {
  name: string;
  value: StrNumBool | PaymentTypes;
};

export type ParsedOverwrittenUsageLimits = ParsedOverwrittenUsageLimit[];

type ParsedOverwrittenUsageLimit = {
  name: string;
  value: StrNumBool;
};
