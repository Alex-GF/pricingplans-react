import {
  AllFeatures,
  AutomationFeature,
  AutomationType,
  DomainFeature,
  Features,
  GuaranteeFeature,
  InformationFeature,
  IntegrationFeature,
  IntegrationType,
  ManagementFeature,
  PaymentFeature,
  PaymentType,
  SupportFeature,
  Type,
} from "../../types/features";
import FeatureParser from "../../parsers/features";
import { ValueType } from "../../types/index";

test("Given all kinds of features should parse them to objects", () => {
  const rawFeatures: Features = {
    automation: {
      description: "Automation feature",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Automation,
      automationType: AutomationType.Bot,
      expression: "",
      serverExpression: "",
    },
    domain: {
      description: "Domain feature",
      valueType: ValueType.Numeric,
      defaultValue: 0,
      type: Type.Domain,
      expression: "",
      serverExpression: "",
    },
    guarantee: {
      description: "Guarantee feature",
      valueType: ValueType.Text,
      defaultValue: "LOW",
      type: Type.Guarantee,
      docUrl: "https://example.org",
      expression: "",
      serverExpression: "",
    },
    information: {
      description: "Information feature",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Information,
      expression: "",
      serverExpression: "",
    },
    integration: {
      description: "Integration feature",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Integration,
      integrationType: IntegrationType.API,
      expression: "",
      serverExpression: "",
    },
    management: {
      description: "Management feature",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Management,
      expression: "",
      serverExpression: "",
    },
    payment: {
      description: "Payment feature",
      valueType: ValueType.Text,
      defaultValue: [
        PaymentType.Ach,
        PaymentType.Card,
        PaymentType.Gateway,
        PaymentType.Invoice,
        PaymentType.WireTransfer,
        PaymentType.Other,
      ],
      type: Type.Payment,
      expression: "",
      serverExpression: "",
    },
    support: {
      description: "Support feature",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Support,
      expression: "",
      serverExpression: "",
    },
  };

  const actualFeatures = new FeatureParser(rawFeatures).parse();

  const automationFeature: AutomationFeature = {
    name: "automation",
    description: "Automation feature",
    valueType: ValueType.Boolean,
    defaultValue: false,
    type: Type.Automation,
    expression: "",
    serverExpression: "",
    automationType: AutomationType.Bot,
  };

  const domainFeature: DomainFeature = {
    name: "domain",
    description: "Domain feature",
    valueType: ValueType.Numeric,
    defaultValue: 0,
    type: Type.Domain,
    expression: "",
    serverExpression: "",
  };

  const guaranteeFeature: GuaranteeFeature = {
    name: "guarantee",
    description: "Guarantee feature",
    valueType: ValueType.Text,
    defaultValue: "LOW",
    type: Type.Guarantee,
    expression: "",
    serverExpression: "",
    docUrl: "https://example.org",
  };

  const informationFeature: InformationFeature = {
    name: "information",
    description: "Information feature",
    valueType: ValueType.Boolean,
    defaultValue: false,
    type: Type.Information,
    expression: "",
    serverExpression: "",
  };

  const integrationFeature: IntegrationFeature = {
    name: "integration",
    description: "Integration feature",
    valueType: ValueType.Boolean,
    defaultValue: false,
    type: Type.Integration,
    integrationType: IntegrationType.API,
    expression: "",
    serverExpression: "",
  };

  const managementFeature: ManagementFeature = {
    name: "management",
    description: "Management feature",
    valueType: ValueType.Boolean,
    defaultValue: false,
    type: Type.Management,
    expression: "",
    serverExpression: "",
  };

  const paymentFeature: PaymentFeature = {
    name: "payment",
    description: "Payment feature",
    valueType: ValueType.Text,
    defaultValue: [
      PaymentType.Ach,
      PaymentType.Card,
      PaymentType.Gateway,
      PaymentType.Invoice,
      PaymentType.WireTransfer,
      PaymentType.Other,
    ],
    type: Type.Payment,
    expression: "",
    serverExpression: "",
  };

  const supportFeature: SupportFeature = {
    name: "support",
    description: "Support feature",
    valueType: ValueType.Boolean,
    defaultValue: false,
    type: Type.Support,
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
