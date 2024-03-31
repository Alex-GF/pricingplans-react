import { Type } from "../../model/features";
import { PricingManager } from "../../model/pricingmanager";
import { ValueType } from "../../types/index";

export const petClinic: PricingManager = {
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
      description: "Max pets limit",
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
    pro: {
      description: "Basic",
      monthlyPrice: 40,
      annualPrice: 20,
      unit: "user/month",
      features: {
        maxPets: {
          value: true,
        },
      },
      usageLimits: {
        maxPets: {
          value: 10,
        },
      },
    },
  },
  addOns: {
    extra: {
      availableFor: ["pro"],
      price: null,
      unit: "user/month",
      annualPrice: 20,
      monthlyPrice: 10,
      features: {
        maxPets: {
          value: true,
        },
      },
      usageLimits: {
        maxPets: {
          value: 1000,
        },
      },
      usageLimitsExtensions: {
        maxPets: {
          value: 1000,
        },
      },
    },
  },
};
