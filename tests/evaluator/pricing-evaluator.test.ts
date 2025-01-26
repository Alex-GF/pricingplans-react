import { evaluateFeatureInPricing, evaluatePricing } from "../../src/index";

const TEST_PRICING = `
saasName: Pricing-driven Feature Toggling Demo
syntaxVersion: '2.1'
version: 2025-1-8
createdAt: '2025-01-08'
currency: USD
variables: {}
features:
    expenses:
        description: Add your expenses to a list and control your budget
        valueType: BOOLEAN
        defaultValue: true
        expression: >-
            userContext['expenses'] <=
            planContext['usageLimits']['maxExpenses']
        type: DOMAIN
    expensesCategories:
        description: Classify your expenses in categories
        valueType: BOOLEAN
        defaultValue: true
        expression: planContext['features']['expensesCategories']
        type: DOMAIN
    expensesGraph:
        description: Show a graph with the evolution of your expenses
        valueType: BOOLEAN
        defaultValue: false
        expression: planContext['features']['expensesGraph']
        type: INFORMATION
usageLimits:
    maxExpenses:
        description: The total number of expenses that can be tracked
        valueType: NUMERIC
        defaultValue: 5
        unit: expense/month
        type: RENEWABLE
        linkedFeatures:
            - expenses
plans:
    FREE:
        description: A demo plan to test the list
        price: 0
        unit: user/month
        features: null
        usageLimits: null
    PREMIUM:
        description: List unlimited expenses and view their evolution along the year.
        price: 5
        unit: /month
        features:
            expensesGraph:
                value: true
        usageLimits:
            maxExpenses:
                value: 1000000
addOns:
    extendExpenses:
        description: Add more expenses to your list
        price: 1
        unit: /month
        usageLimitsExtensions:
            maxExpenses:
                value: .inf
`;

const TEST_PRICING_ONLY_ADDONS = `
saasName: Pricing-driven Feature Toggling Demo
syntaxVersion: '2.1'
version: 2025-1-8
createdAt: '2025-01-08'
currency: USD
variables: {}
features:
    expenses:
        description: Add your expenses to a list and control your budget
        valueType: BOOLEAN
        defaultValue: true
        expression: >-
            userContext['expenses'] <=
            planContext['usageLimits']['maxExpenses']
        type: DOMAIN
    expensesCategories:
        description: Classify your expenses in categories
        valueType: BOOLEAN
        defaultValue: true
        expression: planContext['features']['expensesCategories']
        type: DOMAIN
    expensesGraph:
        description: Show a graph with the evolution of your expenses
        valueType: BOOLEAN
        defaultValue: false
        expression: planContext['features']['expensesGraph']
        type: INFORMATION
usageLimits:
    maxExpenses:
        description: The total number of expenses that can be tracked
        valueType: NUMERIC
        defaultValue: 5
        unit: expense/month
        type: RENEWABLE
        linkedFeatures:
            - expenses
addOns:
    FREE:
        description: A demo add-on to test the list
        price: 0
        unit: user/month
        features:
            expenses:
                value: true
            expensesCategories:
                value: true
        usageLimits:
            maxExpenses:
                value: 5
    PREMIUM:
        description: List unlimited expenses and view their evolution along the year.
        price: 5
        unit: /month
        features:
            expensesGraph:
                value: true
        usageLimits:
            maxExpenses:
                value: 1000000
`;

describe("Pricing evaluation on client side", () => {
  const userContext = {
    user: "test",
    expenses: 2,
  };

  it("given subscription with a single plan should evaluate pricing", () => {
    const userSubscription: string[] = ["FREE"];

    const result = evaluatePricing(TEST_PRICING, userSubscription, userContext);

    expect(result.expenses.eval).toBeTruthy();
    expect(result.expenses.used).toBe(2);
    expect(result.expenses.limit).toBe(5);
    expect(result.expensesCategories.eval).toBeTruthy();
    expect(result.expensesGraph.eval).toBeFalsy();
  });

  it("given subscription with a single plan and one add-on should evaluate pricing", () => {
    const userSubscription: string[] = ["FREE", "extendExpenses"];

    const result = evaluatePricing(TEST_PRICING, userSubscription, userContext);
    console.log(result);
    expect(result.expenses.eval).toBeTruthy();
    expect(result.expenses.used).toBe(2);
    expect(result.expenses.limit).toBe(Infinity);
    expect(result.expensesCategories.eval).toBeTruthy();
    expect(result.expensesGraph.eval).toBeFalsy();
  });

  it("given pricing with only add-ons, but one in the subscription, should evaluate pricing", () => {
    const userSubscription: string[] = ["FREE"];

    const result = evaluatePricing(
      TEST_PRICING_ONLY_ADDONS,
      userSubscription,
      userContext
    );

    expect(result.expenses.eval).toBeTruthy();
    expect(result.expenses.used).toBe(2);
    expect(result.expenses.limit).toBe(5);
    expect(result.expensesCategories.eval).toBeTruthy();
    expect(result.expensesGraph.eval).toBeFalsy();
  });

  it("given pricing with only add-ons, and all contracted in the subscription, should evaluate pricing", () => {
    const userSubscription: string[] = ["FREE", "PREMIUM"];

    const result = evaluatePricing(
      TEST_PRICING_ONLY_ADDONS,
      userSubscription,
      userContext
    );

    expect(result.expenses.eval).toBeTruthy();
    expect(result.expenses.used).toBe(2);
    expect(result.expenses.limit).toBe(1000000);
    expect(result.expensesCategories.eval).toBeTruthy();
    expect(result.expensesGraph.eval).toBeTruthy();
  });

  it("given subscription with two plans should throw an error", () => {
    const userSubscription: string[] = ["FREE", "PREMIUM"];

    expect(() =>
      evaluatePricing(TEST_PRICING, userSubscription, userContext)
    ).toThrow("You cannot have multiple plans in the same subscription");
  });

  it("given subscription with a single add-on, but having the pricing available plans, should throw an error", () => {
    const userSubscription: string[] = ["extendExpenses"];

    expect(() =>
      evaluatePricing(TEST_PRICING, userSubscription, userContext)
    ).toThrow(
      "Since the pricing have plans, you are forced to contract one on your subscription."
    );
  });

  it("given empty subscription should throw an error", () => {
    const userSubscription: string[] = [];

    expect(() =>
      evaluatePricing(TEST_PRICING, userSubscription, userContext)
    ).toThrow("Since the pricing have plans, you are forced to contract one on your subscription.");
  })
});

describe("Feature evaluation on client side", () => {
  const userContext = {
    user: "test",
    expenses: 2,
  };

  it("given a feature included within the subscription should return true", () => {
    const subscription = ["FREE"];
    
    const result = evaluateFeatureInPricing("expenses", TEST_PRICING, subscription, userContext);

    expect(result.eval).toBeTruthy();
    expect(result.used).toBe(2);
    expect(result.limit).toBe(5);
  })

  it("given a feature not included within the subscription should return false", () => {
    const subscription = ["FREE"];
    
    const result = evaluateFeatureInPricing("expensesGraph", TEST_PRICING, subscription, userContext);

    expect(result.eval).toBeFalsy();
    expect(result.used).toBe(null);
    expect(result.limit).toBe(null);
  })

  it("given a feature not included within the pricing should throw an error", () => {
    const subscription = ["FREE"];
    
    const result = evaluateFeatureInPricing("feature_not_included", TEST_PRICING, subscription, userContext);

    expect(result.error?.code).toBe("FLAG_NOT_FOUND");
    expect(result.error?.message).toBe("Feature feature_not_included is not present in the pricing");
  })
});
