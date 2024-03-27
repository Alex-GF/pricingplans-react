import { PaymentTypes } from "../model/features";
import { MapStandardValue } from "../model/plans";

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
