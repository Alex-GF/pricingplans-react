import {
  AddOn,
  ExtendedFeatureStatus,
  Feature,
  FeatureStatus,
  PaymentType,
  Plan,
  Pricing,
  retrievePricingFromYaml,
  UsageLimit,
} from "pricing4ts";

type Subscription = {
  features: Record<string, Feature>;
  usageLimits: Record<string, UsageLimit>;
};

type ContextToEval = Record<
  "features" | "usageLimits",
  Record<string, string | boolean | number | PaymentType[]>
>;

export function evaluatePricing(
  stringifiedPricing: string,
  userSubscription: string[],
  userContext: Record<string, any>
): Record<string, ExtendedFeatureStatus> {
  const pricing: Pricing = retrievePricingFromYaml(stringifiedPricing);
  const subscription: Subscription = _buildSubscription(pricing, userSubscription);
  const planContext: ContextToEval =
    _extractContextToEvalFromSubscription(subscription);

  const evaluationResult: Record<string, ExtendedFeatureStatus> = {};
  
  for (const featureName in pricing.features) {
    evaluationResult[featureName] = evaluateFeature(pricing.features[featureName], subscription, planContext, userContext);
  }

  return evaluationResult;
}

export function evaluateFeatureInPricing(
  featureName: string,
  stringifiedPricing: string,
  userSubscription: string[],
  userContext: Record<string, any>
): ExtendedFeatureStatus {
  const pricing: Pricing = retrievePricingFromYaml(stringifiedPricing);
  const feature: Feature | undefined = pricing.features[featureName];

  if (!feature) {
    console.warn(`[WARNING] Feature ${feature} not found!`);
    return {
      eval: false,
      used: null,
      limit: null,
      error: {
        code: "FLAG_NOT_FOUND",
        message: `Feature ${feature} is not present in the pricing`,
      },
    };
  }

  const subscription: Subscription = _buildSubscription(
    pricing,
    userSubscription
  );
  const planContext: ContextToEval =
    _extractContextToEvalFromSubscription(subscription);

  return evaluateFeature(feature, subscription, planContext, userContext);
}

function evaluateFeature(
  feature: Feature,
  subscription: Subscription,
  planContext: ContextToEval,
  userContext: Record<string, any>
): ExtendedFeatureStatus {
  const featureExpression: string | undefined =
    feature.serverExpression ?? feature.expression;

  if (!featureExpression) {
    console.warn(`[ERROR] Feature ${feature.name} has no expression defined!`);
    return {
      eval: false,
      used: null,
      limit: null,
      error: {
        code: "PARSE_ERROR",
        message: `Feature ${feature.name} has no expression defined!`,
      },
    };
  } else {
    const evalResult: Boolean = eval(featureExpression);

    if (typeof evalResult !== "boolean") {
      console.warn(
        `[WARNING] Feature ${feature.name} has an expression that does not return a boolean!`
      );
      return {
        eval: false,
        used: null,
        limit: null,
        error: {
          code: "TYPE_MISMATCH",
          message: `Feature ${feature.name} has an expression that does not return a boolean!`,
        },
      };
    } else {
      if (evalResult !== null && evalResult !== undefined) {
        const numericLimitsOfSelectedFeature: UsageLimit[] = (
          Object.values(subscription.usageLimits) as UsageLimit[]
        ).filter(
          (u) =>
            u.linkedFeatures?.includes(feature.name) &&
            u.valueType === "NUMERIC"
        );

        const shouldLimitAppearInToken: boolean =
          numericLimitsOfSelectedFeature.length === 1;

        return {
          eval: evalResult,
          used: shouldLimitAppearInToken
            ? userContext[feature.name] ?? null
            : null,
          limit: shouldLimitAppearInToken
            ? numericLimitsOfSelectedFeature[0].value ??
              numericLimitsOfSelectedFeature[0].defaultValue
            : null,
          error: null,
        };
      } else {
        return {
          eval: false,
          used: null,
          limit: null,
          error: {
            code: "GENERAL",
            message: `Error while evaluating expression for feature ${feature.name}. The returned expression is null or undefined`,
          },
        };
      }
    }
  }
}

function _buildSubscription(
  pricing: Pricing,
  subscription: string[]
): Subscription {
  let features: Record<string, Feature> = {};
  let usageLimits: Record<string, UsageLimit> = {};
  const pricingPlans: Record<string, Plan> | undefined = pricing.plans;
  const pricingAddOns: Record<string, AddOn> | undefined = pricing.addOns;

  // Step 1: Validate that the subscription contains no more than one plan,
  // that every plan/add-on exists in the pricing, and clasify the subscription
  let planAlreadyFound: boolean = false;
  let subscriptionPlan: Plan | undefined;
  let subscriptionAddOns: AddOn[] = [];

  for (const pricingContainer of subscription) {
    if (
      pricingPlans &&
      !pricingPlans[pricingContainer] &&
      pricingAddOns &&
      !pricingAddOns[pricingContainer]
    ) {
      console.error(
        `[ERROR] Plan/Add-on ${pricingContainer} not found in the pricing`
      );
      return _errorFallback();
    } else if (pricingPlans && pricingPlans[pricingContainer]) {
      if (planAlreadyFound) {
        console.error(
          `[ERROR] You cannot have 2 plans in the same subscription`
        );
        return _errorFallback();
      } else {
        // Step 1.2: Identify the plan of the subscription
        const plan: Plan = pricingPlans[pricingContainer];
        planAlreadyFound = true;
        subscriptionPlan = plan;
      }
    } else if (pricingAddOns && pricingAddOns[pricingContainer]) {
      // Step 1.3: Identify the add-ons of the subscription
      const addOn: AddOn = pricingAddOns[pricingContainer];
      subscriptionAddOns.push(addOn);
    }
  }

  // Step 2: Build the subscription

  // Step 2.1: Add the features and usage limits of the plan
  if (subscriptionPlan) {
    const planFeatures: Record<string, Feature> = subscriptionPlan.features;
    const planUsageLimits: Record<string, UsageLimit> =
      subscriptionPlan.usageLimits ?? {};
    features = planFeatures;
    usageLimits = planUsageLimits;
  } else {
    const pricingFeatures: Record<string, Feature> = pricing.features;
    const pricingUsageLimits: Record<string, UsageLimit> =
      pricing.usageLimits ?? {};
    features = pricingFeatures;
    usageLimits = pricingUsageLimits;
  }

  // Step 2.2: Apply the effects of the add-ons
  for (const addOn of subscriptionAddOns) {
    const addOnFeatures: Record<string, Feature> = addOn.features ?? {};
    const addOnUsageLimits: Record<string, UsageLimit> =
      addOn.usageLimits ?? {};
    const addOnUsageLimitsExtensions: Record<string, UsageLimit> =
      addOn.usageLimitsExtensions ?? {};

    // Step 2.2.1: Substitute all feature values with the corresponding of the add-ons
    for (const featureName in addOnFeatures) {
      if (!features[featureName]) {
        console.error(
          `[ERROR] Feature ${featureName} of the add-on ${addOn.name} not found in the pricing`
        );
        return _errorFallback();
      } else {
        features[featureName].value = addOnFeatures[featureName].value;
      }
    }

    // Step 2.2.2: Substitute all usage limits values with the corresponding of the add-ons
    for (const usageLimitName in addOnUsageLimits) {
      if (!usageLimits[usageLimitName]) {
        console.error(
          `[ERROR] Usage limit ${usageLimitName} of the add-on ${addOn.name} not found in the pricing`
        );
        return _errorFallback();
      } else {
        usageLimits[usageLimitName].value =
          addOnUsageLimits[usageLimitName].value;
      }
    }

    // Step 2.2.3: Extends usage limits with add-ons' usage limits extension values
    for (const extensionName in addOnUsageLimitsExtensions) {
      if (!usageLimits[extensionName]) {
        console.error(
          `[ERROR] Trying to extend usage limit ${extensionName} with add-on ${addOn.name}, but it is not found in the pricing`
        );
        return _errorFallback();
      } else {
        if (
          typeof addOnUsageLimitsExtensions[extensionName].value !== "number"
        ) {
          console.error(
            `[ERROR] Usage limits extensions are expected to be numbers, but ${extensionName} of the add-on ${addOn.name} is not`
          );
          return _errorFallback();
        } else if (
          typeof usageLimits[extensionName].defaultValue !== "number"
        ) {
          console.error(
            `[ERROR] Usage limits extensions can only extend numeric usage limits, but ${extensionName} is not`
          );
          return _errorFallback();
        } else {
          usageLimits[extensionName].value =
            ((usageLimits[extensionName].value as number | undefined) ??
              (usageLimits[extensionName].defaultValue as number)) +
            (addOnUsageLimitsExtensions[extensionName].value as number);
        }
      }
    }
  }

  // Step 3: Return the subscription
  return {
    features: features,
    usageLimits: usageLimits,
  };
}

function _extractContextToEvalFromSubscription(
  subscription: Subscription
): ContextToEval {
  const subscriptionContextFeatures: Record<string, Feature> =
    subscription.features as Record<string, Feature>;
  const subscriptionContextUsageLimits: Record<string, UsageLimit> =
    subscription.usageLimits as Record<string, UsageLimit>;

  const contextToEval: ContextToEval = { features: {}, usageLimits: {} };

  for (const feature of Object.values(
    subscriptionContextFeatures
  ) as Feature[]) {
    contextToEval.features[feature.name] =
      feature.value ?? feature.defaultValue;
  }

  for (const usageLimit of Object.values(
    subscriptionContextUsageLimits
  ) as UsageLimit[]) {
    contextToEval.usageLimits[usageLimit.name] =
      usageLimit.value ?? usageLimit.defaultValue;
  }

  return contextToEval;
}

function _errorFallback(): Subscription {
  return {
    features: {},
    usageLimits: {},
  };
}
