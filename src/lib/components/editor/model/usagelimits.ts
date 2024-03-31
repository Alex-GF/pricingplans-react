import { UsageLimit, UsageLimitBase } from "../types/usageLimits";

export function serialize(usageLimit: UsageLimitBase): UsageLimit {
  const commonProperties = {
    description: usageLimit.description,
    valueType: usageLimit.valueType,
    defaultValue: usageLimit.defaultValue,
    unit: usageLimit.unit,
    type: usageLimit.type,
    linkedFeatures: usageLimit.linkedFeatures,
    expression: usageLimit.expression,
    serverExpression: usageLimit.serverExpression,
  };
  switch (usageLimit.type) {
    case "NON_RENEWABLE":
      return { ...commonProperties, type: "NON_RENEWABLE" };
    case "RENEWABLE":
      return { ...commonProperties, type: "RENEWABLE" };
    case "RESPONSE_DRIVEN":
      return { ...commonProperties, type: "RESPONSE_DRIVEN" };
    case "TIME_DRIVEN":
      return { ...commonProperties, type: "TIME_DRIVEN" };
  }
}
