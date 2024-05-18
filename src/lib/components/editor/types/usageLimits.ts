import { Evaluable, StrNumBool, Value, ValueType } from "../types";

export type UsageLimits = {
  [key: string]: UsageLimit;
};

export type UsageLimit = Renewable | NonRenewable | ResponseDriven | TimeDriven;

type UsageLimitProperties = Omit<UsageLimitBaseProperties, "name">;

export interface UsageLimitBaseProperties extends Value<StrNumBool>, Evaluable {
  name: string;
  description?: string | null;
  type: UsageLimitType;
  unit: string;
  linkedFeatures: string[] | null;
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

export type ParsedUsageLimits = UsageLimitBase[];

export type UsageLimitWithDescription = Omit<
  UsageLimitBaseProperties,
  "description"
> & {
  description: string;
};

export type UsageLimitsState = ParsedUsageLimits | null;

export interface RenewableUL extends UsageLimitWithDescription {
  type: UsageLimitType.Renewable;
}

export interface NonRenewableUL extends UsageLimitWithDescription {
  type: UsageLimitType.NonRenewable;
}

export interface TimeDrivenUL extends UsageLimitWithDescription {
  type: UsageLimitType.TimeDriven;
}

export interface ResponseDrivenUL extends UsageLimitWithDescription {
  type: UsageLimitType.ResponseDriven;
}
