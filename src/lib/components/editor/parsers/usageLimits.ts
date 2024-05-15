import { StrNumBool } from "../types";
import { UsageLimitWithDescription, UsageLimits } from "../types/usageLimits";

interface ParsedUsageLimitsResult {
  parsedUsageLimits: UsageLimitWithDescription[];
  defaultValues: {
    name: string;
    value: StrNumBool;
  }[];
}

export default function parseUsageLimits(
  usageLimits: UsageLimits | null
): ParsedUsageLimitsResult {
  if (!usageLimits) {
    return { parsedUsageLimits: [], defaultValues: [] };
  }

  const parsedUsageLimits = Object.entries(usageLimits).map(
    ([usageLimitName, usageLimit]) => ({
      ...usageLimit,
      description: usageLimit.description || "",
      name: usageLimitName,
    })
  );

  const defaultValues = parsedUsageLimits.map((usageLimit) => ({
    name: usageLimit.name,
    value: usageLimit.defaultValue,
  }));

  return { parsedUsageLimits, defaultValues };
}
