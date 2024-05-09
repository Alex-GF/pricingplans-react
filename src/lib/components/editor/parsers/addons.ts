import { PricingManager } from "../types/index";
import { AddOns, AddOnsState } from "../types/addOns";
import { parseOverwrittenFeatures, parseOverwrittenUsageLimits } from ".";

export default function parseAddOns(
  pricingManager: PricingManager
): AddOnsState {
  if (!pricingManager.addOns) {
    return [];
  }

  return Object.entries(pricingManager.addOns).map(([addOnName, addOn]) => {
    const addOnFeatures = parseOverwrittenFeatures(
      pricingManager.features,
      addOn.features
    );

    return {
      ...addOn,
      name: addOnName,
      features: addOnFeatures,
      usageLimits: addOn.usageLimits
        ? parseOverwrittenUsageLimits(
            pricingManager.usageLimits,
            addOn.usageLimits
          )
        : [],
      usageLimitsExtensions: addOn.usageLimitsExtensions
        ? parseOverwrittenUsageLimits(
            pricingManager.usageLimits,
            addOn.usageLimitsExtensions
          )
        : [],
    };
  });
}
