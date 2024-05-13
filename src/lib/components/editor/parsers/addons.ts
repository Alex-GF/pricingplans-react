import { PricingManager } from "../types/index";
import { AddOnsState } from "../types/addOns";
import { parseOverwrittenFeatures, parseOverwrittenUsageLimits } from ".";

export default function parseAddOns(
  pricingManager: PricingManager
): AddOnsState {
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
