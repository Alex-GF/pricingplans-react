import {
  serializePlanFeatures,
  serializePlanUsageLimits,
} from "../serializers";
import { MapFeatureValue, MapStandardValue, Plan } from "../types/plans";

export class StandardPlan {
  constructor(
    public name: string,
    public description: string,
    public monthlyPrice: number,
    public annualPrice: number,
    public unit: string,
    public features: Map<string, MapFeatureValue> | null,
    public usageLimits: Map<string, MapStandardValue> | null
  ) {}

  serialize(): Plan {
    return {
      description: this.description,
      monthlyPrice: this.monthlyPrice,
      annualPrice: this.annualPrice,
      unit: this.unit,
      features: serializePlanFeatures(this.features),
      usageLimits: serializePlanUsageLimits(this.usageLimits),
    };
  }
}
