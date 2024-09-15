import { Pricing, PricingData } from "../types";

export function getPricingData(pricing: Pricing) {
  let pricingFeatures = pricing.features;
  let pricingData: PricingData = {};

  for (let usageLimit of pricing.usageLimits ?? []) {
    pricingData[usageLimit.name] = Array(pricing.plans.length).fill(
      usageLimit.defaultValue
    );
  }

  for (let feature of pricingFeatures) {
    pricingData[feature.name] = Array(pricing.plans.length).fill(
      feature.defaultValue
    );
  }

  for (let i = 0; i < pricing.plans.length; i++) {
    let plan = pricing.plans[i];

    for (let usageLimit of plan.usageLimits ?? []) {
      if (!usageLimit.value) {
        console.error(
          `Missing value for usage limit ${usageLimit.name} in plan ${plan.name}`
        );
      }
      pricingData[usageLimit.name][i] = usageLimit.value ?? "N/A";
    }

    for (let feature of plan.features) {
      if (!feature.value) {
        console.error(
          `Missing value for feature ${feature.name} in plan ${plan.name}`
        );
      }
      pricingData[feature.name][i] = feature.value ?? "N/A";
    }
  }

  return pricingData;
}
