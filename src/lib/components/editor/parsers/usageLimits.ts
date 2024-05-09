import { StrNumBool } from "../types";
import { UsageLimitBaseProperties, UsageLimits } from "../types/usageLimits";

interface ParsedUsageLimitsResult {
  parsedUsageLimits: UsageLimitBaseProperties[];
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
    ([usageLimitName, usageLimit]) => ({ ...usageLimit, name: usageLimitName })
  );

  const defaultValues = parsedUsageLimits.map((usageLimit) => ({
    name: usageLimit.name,
    value: usageLimit.defaultValue,
  }));

  return { parsedUsageLimits, defaultValues };
}
