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
import { ValueType } from "../types/index";

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
