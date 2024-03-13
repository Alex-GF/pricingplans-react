import { Features, PaymentTypes } from "./features";

export type PricingManager =
  | {
      saasName: string;
      day: number;
      month: number;
      year: number;
      currency: string;
      hasAnnualPayment: boolean;
      features: Features;
      usageLimits: UsageLimits | null;
      plans: Plans;
      addOns: AddOns | null;
    }
  | {
      saasName: string;
      day: number;
      month: number;
      year: number;
      currency: string;
      hasAnnualPayment: boolean;
      features: Features;
      usageLimits: UsageLimits | null;
      plans: Plans | null;
      addOns: AddOns;
    };

type UsageLimits = {
  [key: string]: UsageLimit;
};

interface UsageLimit extends Value<StrNumBool> {
  description: string;
  type: UsageLimitType;
  unit: string;
  linkedFeatures: [keyof Features];
  expression: string;
  serverExpression?: string;
}

enum UsageLimitType {
  NON_RENEWABLE = "NON_RENEWABLE",
  RENEWABLE = "RENEWABLE",
  RESPONSE_DRIVEN = "RESPONSE_DRIVEN",
  TIME_DRIVEN = "TIME_DRIVEN",
}

type Plans = {
  [key: string]: Plan;
};

interface Plan {
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  unit: string;
  features: Features;
}

type AddOns = {
  [key: string]: AddOn;
};

interface AddOn {
  availableFor: string[];
  price: number;
  monthlyPrice: null;
  annualPrice: null;
  unit: string;
  features: {
    [key: string]: {
      value: StrNumBool | PaymentTypes;
    };
  };
}

export type StrNumBool = string | number | boolean;

export enum ValueType {
  TEXT = "TEXT",
  BOOLEAN = "BOOLEAN",
  NUMERIC = "NUMERIC",
}

export interface Value<T extends StrNumBool | PaymentTypes> {
  valueType: T extends boolean
    ? Extract<ValueType, ValueType.BOOLEAN>
    : T extends number
    ? Extract<ValueType, ValueType.NUMERIC>
    : T extends string | PaymentTypes
    ? Extract<ValueType, ValueType.TEXT>
    : never;
  defaultValue: T;
}
