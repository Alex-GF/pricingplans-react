import { PaymentTypes } from "../../types/features";
import { StandardPlan } from "../../model/plans";
import { StrNumBool } from "../../types/index";
import PlansParser from "../../parsers/plans";
import { MapFeatureValue, Plans } from "../../types/plans";

test("[PlansParser] Given a single plan should return an object with a single plan", () => {
  const plans: Plans = {
    basic: {
      description: "Basic",
      monthlyPrice: 20,
      annualPrice: 10,
      unit: "user/month",
      features: {
        test: {
          value: true,
        },
      },
      usageLimits: null,
    },
  };

  const features: Map<string, { value: StrNumBool | PaymentTypes }> = new Map();
  features.set("test", { value: true });
  const map: Map<string, StandardPlan> = new Map();
  map.set(
    "basic",
    new StandardPlan("basic", "Basic", 20, 10, "user/month", features, null)
  );

  expect(new PlansParser(plans).parse()).toStrictEqual(map);
});

test("[PlanPlans Parser] Given plans should parse to a map of plans", () => {
  const plans: Plans = {
    basic: {
      description: "Basic plan",
      monthlyPrice: 20,
      annualPrice: 10,
      unit: "user/month",
      features: {
        x: {
          value: true,
        },
      },
      usageLimits: null,
    },
    pro: {
      description: "Professional plan",
      monthlyPrice: 40,
      annualPrice: 20,
      unit: "user/month",
      features: {
        x: {
          value: true,
        },
        y: {
          value: 42,
        },
        z: {
          value: "LOW",
        },
      },
      usageLimits: {
        x: {
          value: true,
        },
        y: {
          value: 0,
        },
        z: {
          value: "RESTRICTED",
        },
      },
    },
  };

  const basicFeatures: Map<string, MapFeatureValue> = new Map();
  basicFeatures.set("x", { value: true });
  const plansMap: Map<string, StandardPlan> = new Map();

  const proFeatures: Map<string, MapFeatureValue> = new Map();
  proFeatures.set("x", { value: true });
  proFeatures.set("y", { value: 42 });
  proFeatures.set("z", { value: "LOW" });

  const proUsageLimits: Map<string, { value: StrNumBool }> = new Map();
  proUsageLimits.set("x", { value: true });
  proUsageLimits.set("y", { value: 0 });
  proUsageLimits.set("z", { value: "RESTRICTED" });

  plansMap.set(
    "basic",
    new StandardPlan(
      "basic",
      "Basic plan",
      20,
      10,
      "user/month",
      basicFeatures,
      null
    )
  );
  plansMap.set(
    "pro",
    new StandardPlan(
      "pro",
      "Professional plan",
      40,
      20,
      "user/month",
      proFeatures,
      proUsageLimits
    )
  );

  expect(new PlansParser(plans).parse()).toStrictEqual(plansMap);
});

test("[PlansParser] Given payment types should return list of payment types", () => {
  const plans: Plans = {
    basic: {
      description: "Basic",
      monthlyPrice: 20,
      annualPrice: 10,
      unit: "user/month",
      features: {
        test: {
          value: ["ACH", "CARD"],
        },
      },
      usageLimits: null,
    },
  };

  const features: Map<string, { value: StrNumBool | PaymentTypes }> = new Map();
  features.set("test", { value: ["ACH", "CARD"] });
  const map: Map<string, StandardPlan> = new Map();
  map.set(
    "basic",
    new StandardPlan("basic", "Basic", 20, 10, "user/month", features, null)
  );

  expect(new PlansParser(plans).parse()).toStrictEqual(map);
});
