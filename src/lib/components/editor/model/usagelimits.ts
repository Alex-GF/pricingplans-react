import {
  UsageLimit,
  UsageLimitBase,
  UsageLimitType,
} from "../types/usageLimits";

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
    case UsageLimitType.NonRenewable:
      return { ...commonProperties, type: usageLimit.type };
    case UsageLimitType.Renewable:
      return { ...commonProperties, type: usageLimit.type };
    case UsageLimitType.ResponseDriven:
      return { ...commonProperties, type: usageLimit.type };
    case UsageLimitType.TimeDriven:
      return { ...commonProperties, type: usageLimit.type };
  }
}
