import parsePricingManager from "../../parsers/pricingManager";
import { Type, UsageLimitType, ValueType } from "../../types";
import { petClinic } from "./pricings";

test("After parsing Petclinic it should return a perfect serialized copy of Petclinic", () => {
  const actualPetclinic = parsePricingManager(petClinic);

  const expectedPetclinic = {
    saasName: "This is a test",
    day: 1,
    month: 1,
    year: 2024,
    currency: "USD",
    hasAnnualPayment: false,
    features: [
      {
        name: "maxPets",
        description: "Max pets limit",
        valueType: ValueType.Boolean,
        defaultValue: false,
        type: Type.Domain,
        expression: "planContext['maxPets']",
        serverExpression: "",
      },
    ],
    usageLimits: [
      {
        name: "maxPets",
        description: "Max pets limit",
        valueType: ValueType.Numeric,
        defaultValue: 0,
        unit: "pets",
        type: UsageLimitType.NonRenewable,
        linkedFeatures: ["maxPets"],
        expression: "",
        serverExpression: "",
      },
    ],
    plans: [
      {
        name: "basic",
        description: "Basic",
        monthlyPrice: 20,
        annualPrice: null,
        unit: "user/month",
        features: [
          {
            name: "maxPets",
            value: false,
          },
        ],
        usageLimits: [
          {
            name: "maxPets",
            value: 0,
          },
        ],
      },
      {
        name: "pro",
        description: "Basic",
        monthlyPrice: 40,
        annualPrice: null,
        unit: "user/month",
        features: [
          {
            name: "maxPets",
            value: true,
          },
        ],
        usageLimits: [
          {
            name: "maxPets",
            value: 10,
          },
        ],
      },
    ],
    addOns: [
      {
        name: "extra",
        description: null,
        availableFor: ["pro"],
        price: null,
        unit: "user/month",
        annualPrice: 20,
        monthlyPrice: 10,
        features: [{ name: "maxPets", value: true }],
        usageLimits: [{ name: "maxPets", value: 1000 }],
        usageLimitsExtensions: [{ name: "maxPets", value: 1000 }],
      },
    ],
  };

  expect(actualPetclinic).toStrictEqual(expectedPetclinic);
});
