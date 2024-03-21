import {
  AutomationFeature,
  AutomationType,
  DomainFeature,
  StandardFeature,
} from "../model/features";
import { StandardPlan } from "../model/plans";
import { NonRenewable } from "../model/usagelimits";
import { Type } from "../model/features";
import { ValueType } from "../types/index";
import PricingManagerParser, {
  PricingManager,
  PricingManagerBase,
} from "../model/pricingmanager";

test.skip("Should parse a pricing manager and return a pricing manage object", () => {
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
    usageLimits: {
      maxPets: {
        description: "Max pets feature",
        valueType: ValueType.NUMERIC,
        defaultValue: 0,
        unit: "pets",
        type: "NON_RENEWABLE",
        linkedFeatures: ["maxPets"],
        expression: "",
        serverExpression: "",
      },
    },
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

  const result = {
    saasName: "This is a test",
    day: 1,
    month: 1,
    year: 2024,
    currency: "USD",
    hasAnnualPayment: false,
    features: [
      new DomainFeature(
        "maxPets",
        "Max Pets limit",
        "planContext['maxPets']",
        "",
        false
      ),
    ],
    usageLimits: [
      new NonRenewable(
        "maxPets",
        "Max pets feature",
        "pets",
        ["maxPets"],
        "",
        "",
        0
      ),
    ],
    plans: [
      new StandardPlan("basic", "Basic", 20, 10, "user/month", null, null),
    ],
    addOns: null,
  };
  expect(new PricingManagerParser(pricingManager).pricingManager).toStrictEqual(
    result
  );
});

test("Given target object should serialize back", () => {
  const features: Map<string, StandardFeature> = new Map([
    [
      "foo",
      new AutomationFeature(
        "skynet",
        "Most powerful IA",
        "planContext['skynet']",
        "",
        AutomationType.BOT,
        false
      ),
    ],
  ]);

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
      skinet: {
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
