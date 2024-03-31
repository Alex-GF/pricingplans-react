import {
  AllFeatures,
  AutomationFeature,
  DomainFeature,
  Features,
  GuaranteeFeature,
  InformationFeature,
  IntegrationFeature,
  ManagementFeature,
  PaymentFeature,
  SupportFeature,
  Type,
} from "../../types/features";
import FeatureParser from "../../parsers/features";
import { ValueType } from "../../types/index";

test("Given all kinds of features should parse them to objects", () => {
  const rawFeatures: Features = {
    automation: {
      description: "Automation feature",
      valueType: ValueType.BOOLEAN,
      defaultValue: false,
      type: Type.AUTOMATION,
      automationType: "BOT",
      expression: "",
      serverExpression: "",
    },
    domain: {
      description: "Domain feature",
      valueType: ValueType.NUMERIC,
      defaultValue: 0,
      type: Type.DOMAIN,
      expression: "",
      serverExpression: "",
    },
    guarantee: {
      description: "Guarantee feature",
      valueType: ValueType.TEXT,
      defaultValue: "LOW",
      type: Type.GUARANTEE,
      docUrl: "https://example.org",
      expression: "",
      serverExpression: "",
    },
    information: {
      description: "Information feature",
      valueType: ValueType.BOOLEAN,
      defaultValue: false,
      type: Type.INFORMATION,
      expression: "",
      serverExpression: "",
    },
    integration: {
      description: "Integration feature",
      valueType: ValueType.BOOLEAN,
      defaultValue: false,
      type: Type.INTEGRATION,
      integrationType: "API",
      expression: "",
      serverExpression: "",
    },
    management: {
      description: "Management feature",
      valueType: ValueType.BOOLEAN,
      defaultValue: false,
      type: Type.MANAGEMENT,
      expression: "",
      serverExpression: "",
    },
    payment: {
      description: "Payment feature",
      valueType: ValueType.TEXT,
      defaultValue: [
        "ACH",
        "CARD",
        "GATEWAY",
        "INVOICE",
        "WIRE_TRANSFER",
        "OTHER",
      ],
      type: Type.PAYMENT,
      expression: "",
      serverExpression: "",
    },
    support: {
      description: "Support feature",
      valueType: ValueType.BOOLEAN,
      defaultValue: false,
      type: Type.SUPPORT,
      expression: "",
      serverExpression: "",
    },
  };

  const actualFeatures = new FeatureParser(rawFeatures).parse();

  const automationFeature: AutomationFeature = {
    name: "automation",
    description: "Automation feature",
    valueType: ValueType.BOOLEAN,
    defaultValue: false,
    type: Type.AUTOMATION,
    expression: "",
    serverExpression: "",
    automationType: "BOT",
  };

  const domainFeature: DomainFeature = {
    name: "domain",
    description: "Domain feature",
    valueType: ValueType.NUMERIC,
    defaultValue: 0,
    type: Type.DOMAIN,
    expression: "",
    serverExpression: "",
  };

  const guaranteeFeature: GuaranteeFeature = {
    name: "guarantee",
    description: "Guarantee feature",
    valueType: ValueType.TEXT,
    defaultValue: "LOW",
    type: Type.GUARANTEE,
    expression: "",
    serverExpression: "",
    docUrl: "https://example.org",
  };

  const informationFeature: InformationFeature = {
    name: "information",
    description: "Information feature",
    valueType: ValueType.BOOLEAN,
    defaultValue: false,
    type: Type.INFORMATION,
    expression: "",
    serverExpression: "",
  };

  const integrationFeature: IntegrationFeature = {
    name: "integration",
    description: "Integration feature",
    valueType: ValueType.BOOLEAN,
    defaultValue: false,
    type: Type.INTEGRATION,
    integrationType: "API",
    expression: "",
    serverExpression: "",
  };

  const managementFeature: ManagementFeature = {
    name: "management",
    description: "Management feature",
    valueType: ValueType.BOOLEAN,
    defaultValue: false,
    type: Type.MANAGEMENT,
    expression: "",
    serverExpression: "",
  };

  const paymentFeature: PaymentFeature = {
    name: "payment",
    description: "Payment feature",
    valueType: ValueType.TEXT,
    defaultValue: [
      "ACH",
      "CARD",
      "GATEWAY",
      "INVOICE",
      "WIRE_TRANSFER",
      "OTHER",
    ],
    type: Type.PAYMENT,
    expression: "",
    serverExpression: "",
  };

  const supportFeature: SupportFeature = {
    name: "support",
    description: "Support feature",
    valueType: ValueType.BOOLEAN,
    defaultValue: false,
    type: Type.SUPPORT,
    expression: "",
    serverExpression: "",
  };

  const parsedFeatures: Map<string, AllFeatures> = new Map();
  parsedFeatures.set("automation", automationFeature);
  parsedFeatures.set("domain", domainFeature);
  parsedFeatures.set("guarantee", guaranteeFeature);
  parsedFeatures.set("information", informationFeature);
  parsedFeatures.set("integration", integrationFeature);
  parsedFeatures.set("management", managementFeature);
  parsedFeatures.set("payment", paymentFeature);
  parsedFeatures.set("support", supportFeature);

  expect(actualFeatures).toStrictEqual(parsedFeatures);
});
