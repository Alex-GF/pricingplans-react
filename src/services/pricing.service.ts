import { Feature, Pricing, PricingData, UsageLimit } from "../types";

function formatPricingComponentName(name: string){
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, str => str.toUpperCase());
}

export function pluralizeUnit(unit: string) {
  if (unit.includes('/')) {
    let [first, second] = unit.split('/');
    return `${first}s/${second}`;
  } else {
    return `${unit}s`;
  }
}

function initializeData(items: (Feature | UsageLimit)[], plansLength: number, pricingData: PricingData) {
  for (let item of items) {
    let formattedName = formatPricingComponentName(item.name);
    pricingData[formattedName] = Array(plansLength).fill({value: item.defaultValue, unit: "unit" in item ? item.unit : undefined});
  }

  return pricingData;
}

function populateData(items: { name: string; value?: any, unit?: string }[], planIndex: number, planName: string, pricingData: PricingData) {
  for (let item of items) {
    let formattedName = formatPricingComponentName(item.name);
    if (!item.value) {
      console.error(`Missing value for '${formattedName}' in plan ${planName}`);
    }
    pricingData[formattedName][planIndex] = {value: item.value, unit: pricingData[formattedName][planIndex].unit};
  }

  return pricingData;
}

export function getPricingData(pricing: Pricing) {
  let pricingData: PricingData = {};

  initializeData(pricing.usageLimits ?? [], pricing.plans.length, pricingData);
  initializeData(pricing.features, pricing.plans.length, pricingData);

  for (let i = 0; i < pricing.plans.length; i++) {
    let plan = pricing.plans[i];
    populateData(plan.usageLimits ?? [], i, plan.name, pricingData);
    populateData(plan.features, i, plan.name, pricingData);
  }

  return pricingData;
}
