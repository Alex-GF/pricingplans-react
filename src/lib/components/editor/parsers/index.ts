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

  return defaultValues.map((feature) =>
    overwrittenFeatures[feature.name]
      ? { ...feature, value: overwrittenFeatures[feature.name].value }
      : feature
  );
}

export function parseOverwrittenUsageLimits(
  usageLimits: UsageLimits | null,
  overwrittenUsageLimits: ValueOverwrite | null
) {
  if (!usageLimits) {
    return [];
  }

  const { defaultValues } = parseUsageLimits(usageLimits);

  if (!overwrittenUsageLimits) {
    return defaultValues;
  }

  return Object.entries(defaultValues).map(([usageLimitName, usageLimit]) =>
    overwrittenUsageLimits[usageLimitName]
      ? { ...usageLimit, value: overwrittenUsageLimits[usageLimitName].value }
      : usageLimit
  );
}
