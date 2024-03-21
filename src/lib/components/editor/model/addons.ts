import { ValueOverwrite, FeatureOverwrite } from "../types/index";
import { Pricing } from "./plans";

export type AddOns = {
  [key: string]: AddOn;
};

export type AddOn = {
  availableFor: string[];
  unit: string;
  features: FeatureOverwrite | null;
  usageLimits: ValueOverwrite | null;
  usageLimitsExtensions: ValueOverwrite | null;
} & Pricing;

export class StandardAddOn {
  constructor(
    public name: string,
    public availableFor: string[],
    public unit: string,
    public price: number | null,
    public annualPrice: number | null,
    public monthlyPrice: number | null,
    public features: FeatureOverwrite | null,
    public usageLimits: ValueOverwrite | null,
    public usageLimitsExtensions: ValueOverwrite | null
  ) {}

  toObj() {}
}
