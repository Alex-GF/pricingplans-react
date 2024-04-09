import { MapFeatureValue, MapStandardValue } from "../types";
import { FeatureOverwrite, ValueOverwrite } from "../types";

export * from "./features";

export function serializePlanFeatures(
  features: Map<string, MapFeatureValue> | null
): FeatureOverwrite | null {
  const featuresTuple: [string, MapFeatureValue][] = [];

  if (features === null) {
    return null;
  }

  for (const [key, value] of features.entries()) {
    featuresTuple.push([key, value]);
  }

  return Object.fromEntries(featuresTuple);
}

export function serializePlanUsageLimits(
  usageLimits: Map<string, MapStandardValue> | null
): ValueOverwrite | null {
  const usageLimitTuple: [string, MapStandardValue][] = [];

  if (usageLimits === null) {
    return null;
  }

  for (const [key, value] of usageLimits.entries()) {
    usageLimitTuple.push([key, value]);
  }

  return Object.fromEntries(usageLimitTuple);
}
