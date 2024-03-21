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
  SupportFeature,
  Type,
} from "../../model/features";
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

  const actualFeatures = new FeatureParser(rawFeatures).features;

  const parsedFeatures: Map<string, AllFeatures> = new Map();
  parsedFeatures.set(
    "automation",
    new AutomationFeature(
      "automation",
      "AutomationFeature",
      "",
      "",
      AutomationType.BOT,
      false
    )
  );
  parsedFeatures.set(
    "domain",
    new DomainFeature("domain", "Domain feature", "", "", 0)
  );
  parsedFeatures.set(
    "guarantee",
    new GuaranteeFeature(
      "guarantee",
      "Guarantee feature",
      "",
      "",
      "https://example.org",
      0
    )
  );
  parsedFeatures.set(
    "information",
    new InformationFeature("information", "Information feature", "", "", false)
  );
  parsedFeatures.set(
    "integration",
    new IntegrationFeature(
      "integration",
      "Integration feature",
      "",
      "",
      IntegrationType.API,
      false
    )
  );
  parsedFeatures.set(
    "management",
    new ManagementFeature("management", "Management feature", "", "", false)
  );
  parsedFeatures.set(
    "payment",
    new PaymentFeature("payment", "Payment feature", "", "", [
      "ACH",
      "CARD",
      "GATEWAY",
      "INVOICE",
      "WIRE_TRANSFER",
      "OTHER",
    ])
  );

  parsedFeatures.set(
    "support",
    new SupportFeature("support", "Support feature", "", "", false)
  );
  expect(actualFeatures).toStrictEqual(parsedFeatures);
});
