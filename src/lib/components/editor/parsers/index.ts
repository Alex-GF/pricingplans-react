import {
  FeatureOverwrite,
  Features,
  PlanFeaturesState,
  UsageLimits,
  ValueOverwrite,
} from "../types";
import parseFeatures from "./features";
import parseUsageLimits from "./usageLimits";

export * from "./addons";
export * from "./expression";
export * from "./features";
export * from "./plans";
export * from "./pricingManager";
export * from "./usageLimits";

export function parseOverwrittenFeatures(
  features: Features,
  overwrittenFeatures: FeatureOverwrite | null
): PlanFeaturesState {
  const { defaultValues } = parseFeatures(features);

  if (!overwrittenFeatures) {
    return defaultValues;
  }

  return defaultValues.map((feature) => ({
    ...feature,
    value: overwrittenFeatures[feature.name]
      ? overwrittenFeatures[feature.name].value
      : feature.value,
  }));
}

export function parseOverwrittenUsageLimits(
  usageLimits: UsageLimits | null,
  overwrittenUsageLimits: ValueOverwrite | null
) {
  if (!usageLimits) {
    return [];
  }

  const { defaultValues } = parseUsageLimits(usageLimits);

  if (overwrittenUsageLimits === null) {
    return defaultValues;
  }

  return defaultValues.map((usageLimit) => ({
    ...usageLimit,
    value: overwrittenUsageLimits[usageLimit.name]
      ? overwrittenUsageLimits[usageLimit.name].value
      : usageLimit.value,
  }));
}
