import {
  AutomationType,
  Features,
  IntegrationType,
  Type,
} from "../types/features";
import { ValueType, PricingManager } from "../types/index";
import { json2PricingManager, pricingManager2Json } from "../utils/parser";

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

test("Should dump a perfect copy of the object", () => {
  expect(json2PricingManager(JSON.stringify(pricingManager))).toStrictEqual(
    pricingManager
  );
});

test("Should throw when object is empty", () => {
  const obj = {};
  expect(() => json2PricingManager(JSON.stringify({}))).toThrow(
    "You have provided an empty object. Parsing cannot be done."
  );
});

test("Should throw an error given an empty string", () => {
  expect(() => json2PricingManager("")).toThrow(
    "You have provided an empty string. Parsing cannot be done."
  );
});

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
