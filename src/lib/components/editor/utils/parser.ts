import FeatureParser, {
  AllFeatures,
  AutomationFeature,
  DomainFeature,
  Feature,
  Features,
  GuaranteeFeature,
  InformationFeature,
  IntegrationFeature,
  ManagementFeature,
  PaymentFeature,
  SupportFeature,
  Type,
  AutomationType,
  IntegrationType,
} from "../model/features";
import PlansParser, { StandardPlan } from "../model/plans";
import { PricingManager } from "../model/pricingmanager";
import {
  NonRenewable,
  Renewable,
  ResponseDriven,
  TimeDriven,
  UsageLimit,
  UsageLimits,
} from "../model/usagelimits";

export function parseUsageLimits(usageLimits: UsageLimits) {
  return Object.entries(usageLimits).map(([name, usageLimit]) =>
    parseUsageLimit(name, usageLimit)
  );
}

function parseUsageLimit(name: string, usageLimit: UsageLimit) {
  switch (usageLimit.type) {
    case "NON_RENEWABLE":
      return new NonRenewable(
        name,
        usageLimit.description,
        usageLimit.unit,
        usageLimit.linkedFeatures,
        usageLimit.expression,
        usageLimit.serverExpression,
        usageLimit.defaultValue
      );
    case "RENEWABLE":
      return new Renewable(
        name,
        usageLimit.description,
        usageLimit.unit,
        usageLimit.linkedFeatures,
        usageLimit.expression,
        usageLimit.serverExpression,
        usageLimit.defaultValue
      );
    case "TIME_DRIVEN":
      return new TimeDriven(
        name,
        usageLimit.description,
        usageLimit.unit,
        usageLimit.linkedFeatures,
        usageLimit.expression,
        usageLimit.serverExpression,
        usageLimit.defaultValue
      );
    case "RESPONSE_DRIVEN":
      return new ResponseDriven(
        name,
        usageLimit.description,
        usageLimit.unit,
        usageLimit.linkedFeatures,
        usageLimit.expression,
        usageLimit.serverExpression,
        usageLimit.defaultValue
      );
  }
}
