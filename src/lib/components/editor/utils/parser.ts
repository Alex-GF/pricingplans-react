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
import { PricingManager, ValueType } from "../types/index";

const pricingManager: PricingManager = {
  saasName: "This is a test",
  day: 1,
  month: 1,
  year: 2024,
  currency: "USD",
  hasAnnualPayment: false,
  features: {
    maxPets: {
      description: "Max pets limit",
      valueType: ValueType.BOOLEAN,
      defaultValue: false,
      type: Type.DOMAIN,
      expression: "planContext['maxPets']",
      serverExpression: "",
    },
  },
  usageLimits: null,
  plans: {
    basic: {
      description: "Basic",
      monthlyPrice: 20,
      annualPrice: 10,
      unit: "user/month",
      features: null,
      usageLimits: null,
    },
  },
  addOns: null,
};

function json2PricingManager(json: string) {
  if (json.trim().length === 0) {
    throw new Error(
      "You have provided an empty string. Parsing cannot be done."
    );
  }

  const pricingManager = JSON.parse(json);

  if (!pricingManager || Object.keys(pricingManager).length === 0) {
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
}

function pricingManager2Json(pricingManager: PricingManager) {}

function parseFeatures(features: Features) {
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

const features: Features = {
  automation: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.TEXT,
    type: Type.AUTOMATION,
    defaultValue: "",
    automationType: AutomationType.BOT,
  },
  domain: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.TEXT,
    type: Type.DOMAIN,
    defaultValue: "false",
  },
  guarantee: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.NUMERIC,
    type: Type.GUARANTEE,
    defaultValue: 0,
    docUrl: "hello",
  },
  information: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.BOOLEAN,
    type: Type.INFORMATION,
    defaultValue: false,
  },
  integration: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.BOOLEAN,
    type: Type.INTEGRATION,
    defaultValue: false,
    integrationType: IntegrationType.API,
  },
  management: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.BOOLEAN,
    type: Type.MANAGEMENT,
    defaultValue: false,
  },
  payment: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.TEXT,
    type: Type.PAYMENT,
    defaultValue: ["ACH"],
  },
  support: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.BOOLEAN,
    type: Type.SUPPORT,
    defaultValue: false,
  },
};

const featureParser = parseFeatures(features);
console.log(featureParser);
