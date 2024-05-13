import { PricingManager } from "../types/index";
import parseAddOns from "./addons";
import parseFeatures from "./features";
import parsePlans from "./plans";
import parseUsageLimits from "./usageLimits";

export default function parsePricingManager(pricingManager: PricingManager) {
  const { parsedFeatures: features } = parseFeatures(pricingManager.features);
  const { parsedUsageLimits: usageLimits } = parseUsageLimits(
    pricingManager.usageLimits
  );
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
