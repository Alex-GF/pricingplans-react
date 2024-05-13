import {
  FeatureOverwrite,
  Features,
  ParsedAddOns,
  ParsedOverwrittenFeatures,
  ParsedOverwrittenUsageLimits,
  ParsedPlans,
  ParsedPricingManager,
  PricingManager,
  UsageLimits,
  ValueOverwrite,
} from "../types/index";
import parseFeatures from "./features";
import parseUsageLimits from "./usageLimits";

export default function parsePricingManager(
  pricingManager: PricingManager
): ParsedPricingManager {
  const { parsedFeatures: features } = parseFeatures(pricingManager.features);
  const { parsedUsageLimits: usageLimits } = parseUsageLimits(
    pricingManager.usageLimits
  );

  if (!pricingManager.plans && !pricingManager.addOns) {
    throw Error(
      "Neither plans or addOns were defined. Please define plans or addOns or both."
    );
  }

  const plans = parsePlans(pricingManager);
  const addOns = parseAddOns(pricingManager);

  return {
    ...pricingManager,
    features,
    usageLimits,
    plans,
    addOns,
  };
}

function parsePlans(pricingManager: PricingManager): ParsedPlans {
  if (!pricingManager.plans) {
    return [];
  }

  return Object.entries(pricingManager.plans).map(([planName, plan]) => {
    const features = parseOverwrittenFeatures(
      pricingManager.features,
      plan.features
    );

    const usageLimits = pricingManager.usageLimits
      ? parseOverwrittenUsageLimits(
          pricingManager.usageLimits,
          plan.usageLimits
        )
      : [];

    return {
      ...plan,
      name: planName,
      features,
      usageLimits,
    };
  });
}

function parseAddOns(pricingManager: PricingManager): ParsedAddOns {
  if (!pricingManager.addOns) {
    return [];
  }

  return Object.entries(pricingManager.addOns).map(([addOnName, addOn]) => {
    const features = parseOverwrittenFeatures(
      pricingManager.features,
      addOn.features
    );

    const usageLimits = addOn.usageLimits
      ? parseOverwrittenUsageLimits(
          pricingManager.usageLimits,
          addOn.usageLimits
        )
      : [];

    const usageLimitsExtensions = addOn.usageLimitsExtensions
      ? parseOverwrittenUsageLimits(
          pricingManager.usageLimits,
          addOn.usageLimitsExtensions
        )
      : [];

    return {
      ...addOn,
      name: addOnName,
      features,
      usageLimits,
      usageLimitsExtensions,
    };
  });
}

function parseOverwrittenFeatures(
  features: Features,
  overwrittenFeatures: FeatureOverwrite | null
): ParsedOverwrittenFeatures {
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

function parseOverwrittenUsageLimits(
  usageLimits: UsageLimits | null,
  overwrittenUsageLimits: ValueOverwrite | null
): ParsedOverwrittenUsageLimits {
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
