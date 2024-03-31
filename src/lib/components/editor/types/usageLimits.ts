import { StrNumBool, Value } from "../types/index";

export type UsageLimits = {
  [key: string]: UsageLimit;
};

export type UsageLimit = Renewable | NonRenewable | ResponseDriven | TimeDriven;

type UsageLimitProperties = Omit<UsageLimitBaseProperties, "name">;

type UsageLimitTypes = keyof typeof UsageLimitType;

export interface UsageLimitBaseProperties extends Value<StrNumBool> {
  name: string;
  description: string;
  type: UsageLimitTypes;
  unit: string;
  linkedFeatures: string[];
  expression: string;
  serverExpression: string;
}

export enum UsageLimitType {
  NON_RENEWABLE,
  RENEWABLE,
  RESPONSE_DRIVEN,
  TIME_DRIVEN,
}

export interface Renewable extends UsageLimitProperties {
  type: Extract<UsageLimitTypes, "RENEWABLE">;
}

export interface NonRenewable extends UsageLimitProperties {
  type: Extract<UsageLimitTypes, "NON_RENEWABLE">;
}

export interface TimeDriven extends UsageLimitProperties {
  type: Extract<UsageLimitTypes, "TIME_DRIVEN">;
}

export interface ResponseDriven extends UsageLimitProperties {
  type: Extract<UsageLimitTypes, "RESPONSE_DRIVEN">;
}

export type UsageLimitBase =
  | RenewableUL
  | NonRenewableUL
  | TimeDrivenUL
  | ResponseDrivenUL;

export interface RenewableUL extends UsageLimitBaseProperties {
  type: Extract<UsageLimitTypes, "RENEWABLE">;
}

export interface NonRenewableUL extends UsageLimitBaseProperties {
  type: Extract<UsageLimitTypes, "NON_RENEWABLE">;
}

export interface TimeDrivenUL extends UsageLimitBaseProperties {
  type: Extract<UsageLimitTypes, "TIME_DRIVEN">;
}

export interface ResponseDrivenUL extends UsageLimitBaseProperties {
  type: Extract<UsageLimitTypes, "RESPONSE_DRIVEN">;
}
