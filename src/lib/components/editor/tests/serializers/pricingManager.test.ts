import { AllFeatures, AutomationFeature, Type } from "../../types/features";
import { StandardPlan } from "../../model/plans";
import { PricingManager, ValueType } from "../../types/index";
import { PricingManagerBase } from "../../model/pricingmanager";

describe("PricingMagerBase Suite Test", () => {
  test("Given PricingManagerBase class should serialize to PricingManager", () => {
    const skynet: AutomationFeature = {
      name: "skynet",
      description: "Most powerful IA",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: Type.Automation,
      automationType: "BOT",
      expression: "planContext['skynet']",
      serverExpression: "",
    };
    const features: Map<string, AllFeatures> = new Map([["skynet", skynet]]);

    const plans: Map<string, StandardPlan> = new Map([
      [
        "basic",
        new StandardPlan(
          "basic",
          "Basic plan",
          20,
          10,
          "user/month",
          null,
          null
        ),
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
          valueType: ValueType.Boolean,
          defaultValue: false,
          type: Type.Automation,
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
});
