import { Pricing, PricingData } from "../types";

function formatPricingComponentName(name: string){
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, str => str.toUpperCase());
}

export function getPricingData(pricing: Pricing) {
  let pricingData: PricingData = {};

  function initializeData(items: { name: string; defaultValue: any; unit?: string }[], plansLength: number) {
    for (let item of items) {
      let formattedName = formatPricingComponentName(item.name);
      pricingData[formattedName] = Array(plansLength).fill({value: item.defaultValue, unit: item.unit ?? ""});
    }
  }

  function populateData(items: { name: string; value?: any, unit?: string }[], planIndex: number, planName: string) {
    for (let item of items) {
      let formattedName = formatPricingComponentName(item.name);
      if (!item.value) {
        console.error(`Missing value for '${formattedName}' in plan ${planName}`);
      }
      pricingData[formattedName][planIndex].value = typeof(item.value) === "number" ? `${item.value} ${item.unit ?? ""}` : item.value;
    }
  }

  initializeData(pricing.usageLimits ?? [], pricing.plans.length);
  initializeData(pricing.features, pricing.plans.length);

  for (let i = 0; i < pricing.plans.length; i++) {
    let plan = pricing.plans[i];
    populateData(plan.usageLimits ?? [], i, plan.name);
    populateData(plan.features, i, plan.name);
  }

  return pricingData;
}
