import { IntegrationType, FeatureType } from "../types/features";
import { PricingManager, UsageLimitType, ValueType } from "../types/index";

export const petClinic: PricingManager = {
  saasName: "petclinic",
  day: 1,
  month: 1,
  year: 2024,
  currency: "USD",
  hasAnnualPayment: false,
  features: {
    maxPets: {
      description: "Max pets limit",
      valueType: ValueType.Boolean,
      defaultValue: false,
      type: FeatureType.Domain,
      expression: "planContext['maxPets']",
      serverExpression: "",
    },
  },
  usageLimits: {
    maxPets: {
      description: "Max pets limit",
      valueType: ValueType.Numeric,
      defaultValue: 0,
      unit: "pets",
      type: UsageLimitType.NonRenewable,
      linkedFeatures: ["maxPets"],
      expression: "",
      serverExpression: "",
    },
  },
  plans: {
    basic: {
      description: "Basic",
      monthlyPrice: 20,
      annualPrice: null,
      unit: "user/month",
      features: null,
      usageLimits: null,
    },
    pro: {
      description: "Basic",
      monthlyPrice: 40,
      annualPrice: null,
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
      description: null,
      availableFor: ["pro"],
      unit: "user/month",
      price: 10,
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

export const expectedPetclinic = {
  saasName: "petclinic",
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
      type: FeatureType.Domain,
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
      features: [{ name: "maxPets", value: false }],
      usageLimits: [{ name: "maxPets", value: 0 }],
    },
    {
      name: "pro",
      description: "Basic",
      monthlyPrice: 40,
      annualPrice: null,
      unit: "user/month",
      features: [{ name: "maxPets", value: true }],

      usageLimits: [{ name: "maxPets", value: 10 }],
    },
  ],
  addOns: [
    {
      name: "extra",
      description: null,
      availableFor: ["pro"],
      price: null,
      unit: "user/month",
      monthlyPrice: 10,
      annualPrice: null,
      features: [
        {
          name: "maxPets",
          value: true,
        },
      ],
      usageLimits: [
        {
          name: "maxPets",
          value: 1000,
        },
      ],
      usageLimitsExtensions: [{ name: "maxPets", value: 1000 }],
    },
  ],
};

/*
export const petClinic2: PricingManager = {
  saasName: "petclinic",
  day: 15,
  month: 1,
  year: 2024,
  currency: "EUR",
  hasAnnualPayment: false,
  features: {
    pets: {
      description: "Pets description",
      valueType: ValueType.Boolean,
      defaultValue: true,
      expression: "userContext['pets'] < planContext['usageLimits']['maxPets']",
      serverExpression:
        "userContext['pets'] <= planContext['usageLimits']['maxPets']",
      type: Type.Domain,
    },
    visits: {
      description: "visits description",
      type: Type.Domain,
      valueType: ValueType.Boolean,
      defaultValue: true,
      expression:
        "userContext['visits'] < planContext['usageLimits']['maxVisitsPerMonthAndPet']",
    },
    supportPriority: {
      description: "supportPriority description",
      type: Type.Support,
      valueType: ValueType.Text,
      defaultValue: "LOW",
      expression: "",
    },
    haveCalendar: {
      description: "haveCalendar description",
      type: Type.Domain,
      valueType: ValueType.Boolean,
      defaultValue: false,
      expression: "planContext['features']['haveCalendar']",
    },
    havePetsDashboard: {
      description: "havePetsDashboard description",
      valueType: ValueType.Boolean,
      defaultValue: false,
      expression: "planContext['features']['havePetsDashboard']",
      type: Type.Domain,
    },
    haveVetSelection: {
      description: "haveVetSelection description",
      valueType: ValueType.Boolean,
      defaultValue: false,
      expression: "planContext['features']['haveVetSelection']",
      type: Type.Domain,
    },
    haveOnlineConsultation: {
      description: "haveOnlineConsultation description",
      valueType: ValueType.Boolean,
      defaultValue: false,
      expression: "planContext['features']['haveOnlineConsultation']",
      type: Type.Domain,
    },
  },
  usageLimits: {
    maxPets: {
      description: "",
      type: UsageLimitType.NonRenewable,
      valueType: ValueType.Numeric,
      defaultValue: 2,
      unit: "pet",
      linkedFeatures: ["pets"],
    },
    maxVisitsPerMonthAndPet: {
      description: "",
      type: UsageLimitType.Renewable,
      valueType: ValueType.Numeric,
      defaultValue: 1,
      unit: "visit",
      linkedFeatures: ["visits"],
    },
  },
  plans: {
    BASIC: {
      description: "Basic plan",
      monthlyPrice: 0,
      annualPrice: 0,
      unit: "user/month",
      features: {
        supportPriority: {
          value: "LOW",
        },
        haveCalendar: {
          value: false,
        },
        havePetsDashboard: {
          value: false,
        },
        haveVetSelection: {
          value: true,
        },
        haveOnlineConsultation: {
          value: false,
        },
      },
      usageLimits: {
        maxPets: {
          value: 3,
        },
        maxVisitsPerMonthAndPet: {
          value: 1,
        },
      },
    },
    GOLD: {
      description: "Advanced plan",
      monthlyPrice: 5,
      annualPrice: 5,
      unit: "user/month",
      features: {
        supportPriority: {
          value: "MEDIUM",
        },
        haveCalendar: {
          value: true,
        },
        havePetsDashboard: {
          value: false,
        },
        haveVetSelection: {
          value: true,
        },
        haveOnlineConsultation: {
          value: false,
        },
      },
      usageLimits: {
        maxPets: {
          value: 4,
        },
        maxVisitsPerMonthAndPet: {
          value: 3,
        },
      },
    },
    PLATINUM: {
      description: "Pro plan",
      monthlyPrice: 10,
      annualPrice: 10,
      unit: "user/month",
      features: {
        supportPriority: {
          value: "HIGH",
        },
        haveCalendar: {
          value: true,
        },
        havePetsDashboard: {
          value: true,
        },
        haveVetSelection: {
          value: true,
        },
        haveOnlineConsultation: {
          value: true,
        },
      },
      usageLimits: {
        maxPets: {
          value: 7,
        },
        maxVisitsPerMonthAndPet: {
          value: 6,
        },
      },
    },
  },
  addOns: null,
};
*/
