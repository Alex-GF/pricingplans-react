import {
  OverwritableAttributes,
  ParsedOverwrittenFeatures,
  ParsedOverwrittenUsageLimits,
  ValueOverwrite,
} from ".";

export type StandardAddOns = {
  [key: string]: StandardAddOn;
};

export type MonthlyAddOns = {
  [key: string]: AddOnWithMonthlyBilling;
};

interface AddOnCommonProps extends OverwritableAttributes {
  availableFor: string[];
  description?: string | null;
  unit: string;
  usageLimitsExtensions: ValueOverwrite | null;
}

type StandardAddOn = {
  price: number;
} & AddOnCommonProps;

type AddOnWithMonthlyBilling = {
  monthlyPrice: number;
  annualPrice?: number | null;
} & AddOnCommonProps;

export type AddOnsState = ParsedAddOns | null;

export type AddOnState = ParsedAddOn;

export type ParsedAddOns = ParsedAddOn[];

type ParsedAddOn = Omit<
  AddOnCommonProps,
  "features" | "usageLimits" | "usageLimitsExtensions"
> & {
  name: string;
  features: ParsedOverwrittenFeatures;
  usageLimits: ParsedOverwrittenUsageLimits;
  usageLimitsExtensions: ParsedOverwrittenUsageLimits;
};
