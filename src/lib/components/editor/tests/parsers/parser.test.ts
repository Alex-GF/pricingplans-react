import {
  AllFeatures,
  AutomationFeature,
  DomainFeature,
} from "../../model/features";
import { StandardPlan } from "../../model/plans";
import { Type } from "../../model/features";
import { ValueType } from "../../types/index";
import { PricingManager, PricingManagerBase } from "../../model/pricingmanager";
import PricingManagerParser from "../../parsers/pricingManager";

test("Should parse a PricingManager and return a PricingManagerBase", () => {
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

  const domainFeature: DomainFeature = {
    name: "maxPets",
    description: "Max pets limit",
    valueType: ValueType.BOOLEAN,
    defaultValue: false,
    type: Type.DOMAIN,
    expression: "planContext['maxPets']",
    serverExpression: "",
  };

  const featuresMap: Map<string, AllFeatures> = new Map([
    ["maxPets", domainFeature],
  ]);

  const basicPlan: StandardPlan = new StandardPlan(
    "basic",
    "Basic",
    20,
    10,
    "user/month",
    null,
    null
  );
  const plansMap: Map<string, StandardPlan> = new Map([["basic", basicPlan]]);

  const result: PricingManagerBase = new PricingManagerBase(
    "This is a test",
    1,
    1,
    2024,
    "USD",
    false,
    featuresMap,
    null,
    plansMap,
    null
  );
  expect(new PricingManagerParser(pricingManager).pricingManager).toStrictEqual(
    result
  );
});

test("Given PricingManagerBase class should serialize to PricingManager", () => {
  const skynet: AutomationFeature = {
    name: "skynet",
    description: "Most powerful IA",
    valueType: ValueType.BOOLEAN,
    defaultValue: false,
    type: Type.AUTOMATION,
    automationType: "BOT",
    expression: "planContext['skynet']",
    serverExpression: "",
  };
  const features: Map<string, AllFeatures> = new Map([["skynet", skynet]]);

  const plans: Map<string, StandardPlan> = new Map([
    [
      "basic",
      new StandardPlan("basic", "Basic plan", 20, 10, "user/month", null, null),
    ],
  ]);

  const pricingManager = new PricingManagerBase(
    "Test",
    1,
    1,
    2024,
    "USD",
    false,
    features,
    null,
    plans,
    null
  );

  const expectation: PricingManager = {
    saasName: "Test",
    day: 1,
    month: 1,
    year: 2024,
    currency: "USD",
    hasAnnualPayment: false,
    features: {
      skynet: {
        description: "Most powerful IA",
        valueType: ValueType.BOOLEAN,
        defaultValue: false,
        type: Type.AUTOMATION,
        automationType: "BOT",
        expression: "planContext['skynet']",
        serverExpression: "",
      },
    },
    usageLimits: null,
    plans: {
      basic: {
        description: "Basic plan",
        monthlyPrice: 20,
        annualPrice: 10,
        unit: "user/month",
        features: null,
        usageLimits: null,
      },
    },
    addOns: null,
  };

  expect(pricingManager.serialize()).toStrictEqual(expectation);
});
