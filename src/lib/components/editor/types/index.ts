import { Features, PaymentTypes } from "../types/features";
import { AddOns } from "./addOns";
import { MapStandardValue, Plans } from "./plans";
import { UsageLimits } from "./usageLimits";

export type PricingManager = {
  saasName: string;
  day: number;
  month: number;
  year: number;
  currency: string;
  hasAnnualPayment: boolean;
  features: Features;
  usageLimits: UsageLimits | null;
  plans: Plans | null;
  addOns: AddOns | null;
};

export type FeatureOverwrite = {
  [key: string]: {
    value: StrNumBool | PaymentTypes;
  };
};

export type ValueOverwrite = {
  [key: string]: MapStandardValue;
};

export type StrNumBool = string | number | boolean;

export enum ValueType {
  TEXT,
  BOOLEAN,
  NUMERIC,
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
