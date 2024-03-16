import {
  AllFeatures,
  AutomationFeature,
  DomainFeature,
  GuaranteeFeature,
  InformationFeature,
  IntegrationFeature,
  ManagementFeature,
  PaymentFeature,
  SupportFeature,
} from "../model/features";
import {
  Features,
  Feature,
  Type,
  AutomationType,
  IntegrationType,
} from "../types/features";
import { PricingManager } from "../types/index";

export function json2PricingManager(json: string) {
  if (json.trim().length === 0) {
    throw new Error(
      "You have provided an empty string. Parsing cannot be done."
    );
  }

  const pricingManager = JSON.parse(json);

  if (Object.keys(pricingManager).length === 0) {
    throw new Error(
      "You have provided an empty object. Parsing cannot be done."
    );
  }

  if (!pricingManager.saasName) {
    throw new Error("Saas name was not specified.");
  }

  if (typeof pricingManager.saasName !== "string") {
    throw new Error(
      "Invalid value type for saasName. You have to provide a empty string."
    );
  }

  if (pricingManager.saasName.length === 0) {
    throw new Error("Saas name is empty.");
  }
  return pricingManager;
}

export function pricingManager2Json(pricingManager: PricingManager) {
  return JSON.stringify(pricingManager);
}

function parseFeatures(features: Features): AllFeatures[] {
  return Object.entries(features).map(([name, attributes]) =>
    parseFeature(name, attributes)
  );
}

function parseFeature(name: string, feature: Feature): AllFeatures {
  switch (feature.type) {
    case Type.AUTOMATION:
      return new AutomationFeature(
        name,
        feature.description,
        feature.expression,
        feature.serverExpression,
        AutomationType[feature.automationType],
        feature.defaultValue
      );
    case Type.DOMAIN:
      return new DomainFeature(
        name,
        feature.description,
        feature.expression,
        feature.serverExpression,
        feature.defaultValue
      );
    case Type.GUARANTEE:
      return new GuaranteeFeature(
        name,
        feature.description,
        feature.expression,
        feature.serverExpression,
        feature.docUrl,
        feature.defaultValue
      );
    case Type.INFORMATION:
      return new InformationFeature(
        name,
        feature.description,
        feature.expression,
        feature.serverExpression,
        feature.defaultValue
      );
    case Type.INTEGRATION:
      return new IntegrationFeature(
        name,
        feature.description,
        feature.expression,
        feature.serverExpression,
        IntegrationType[feature.integrationType],
        feature.defaultValue
      );
    case Type.MANAGEMENT:
      return new ManagementFeature(
        name,
        feature.description,
        feature.expression,
        feature.description,
        feature.defaultValue
      );
    case Type.PAYMENT:
      return new PaymentFeature(
        name,
        feature.description,
        feature.expression,
        feature.description,
        feature.defaultValue
      );
    case Type.SUPPORT:
      return new SupportFeature(
        name,
        feature.description,
        feature.expression,
        feature.serverExpression,
        feature.defaultValue
      );
  }
}
