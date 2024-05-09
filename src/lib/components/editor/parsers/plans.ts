import { PlansState } from "../types/plans";
import { PricingManager } from "../types/index";
import { parseOverwrittenFeatures, parseOverwrittenUsageLimits } from ".";

export default function parsePlans(pricingManager: PricingManager): PlansState {
  if (!pricingManager.plans) {
    return [];
  }

  return Object.entries(pricingManager.plans).map(([planName, plan]) => {
    const features = parseOverwrittenFeatures(
      pricingManager.features,
      plan.features
    );

    return {
      ...plan,
      name: planName,
      features,
      usageLimits: pricingManager.usageLimits
        ? parseOverwrittenUsageLimits(
            pricingManager.usageLimits,
            plan.usageLimits
          )
        : [],
    };
  });
}
