import { StrNumBool, Value } from "../types";

export type UsageLimits = {
  [key: string]: UsageLimit;
};

export type UsageLimit = Renewable | NonRenewable | ResponseDriven | TimeDriven;

type UsageLimitProperties = Omit<UsageLimitBaseProperties, "name">;

export interface UsageLimitBaseProperties extends Value<StrNumBool> {
  name: string;
  description: string;
  type: UsageLimitType;
  unit: string;
  linkedFeatures: string[];
  expression: string;
  serverExpression: string;
}

export enum UsageLimitType {
  NonRenewable = "NON_RENEWABLE",
  Renewable = "RENEWABLE",
  ResponseDriven = "RESPONSE_DRIVEN",
  TimeDriven = "TIME_DRIVEN",
}

export interface Renewable extends UsageLimitProperties {
  type: UsageLimitType.Renewable;
}

export interface NonRenewable extends UsageLimitProperties {
  type: UsageLimitType.NonRenewable;
}

export interface TimeDriven extends UsageLimitProperties {
  type: UsageLimitType.TimeDriven;
}

export interface ResponseDriven extends UsageLimitProperties {
  type: UsageLimitType.ResponseDriven;
}

export type UsageLimitBase =
  | RenewableUL
  | NonRenewableUL
  | TimeDrivenUL
  | ResponseDrivenUL;

export interface RenewableUL extends UsageLimitBaseProperties {
  type: UsageLimitType.Renewable;
}

export interface NonRenewableUL extends UsageLimitBaseProperties {
  type: UsageLimitType.NonRenewable;
}

export interface TimeDrivenUL extends UsageLimitBaseProperties {
  type: UsageLimitType.TimeDriven;
}

export interface ResponseDrivenUL extends UsageLimitBaseProperties {
  type: UsageLimitType.ResponseDriven;
}
