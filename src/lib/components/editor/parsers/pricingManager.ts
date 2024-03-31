import { PricingManagerBase } from "../model/pricingManager";
import { PricingManager } from "../types/index";
import AddOnsParser from "./addons";
import FeatureParser from "./features";
import PlansParser from "./plans";
import UsageLimitParser from "./usageLimits";

export default class PricingManagerParser {
  private featureParser: FeatureParser;
  private usageLimitParser: UsageLimitParser | null;
  private planParser: PlansParser | null;
  private addOnsParser: AddOnsParser | null;

  constructor(private pricingManager: PricingManager) {
    this.featureParser = new FeatureParser(pricingManager.features);
    this.usageLimitParser = null;
    this.planParser = null;
    this.addOnsParser = null;

    if (pricingManager.usageLimits !== null) {
      this.usageLimitParser = new UsageLimitParser(pricingManager.usageLimits);
    }

    if (pricingManager.plans !== null) {
      this.planParser = new PlansParser(pricingManager.plans);
    }

    if (pricingManager.addOns !== null) {
      this.addOnsParser = new AddOnsParser(pricingManager.addOns);
    }
  }

  parse(): PricingManagerBase {
    return new PricingManagerBase(
      this.pricingManager.saasName,
      this.pricingManager.day,
      this.pricingManager.month,
      this.pricingManager.year,
      this.pricingManager.currency,
      this.pricingManager.hasAnnualPayment,
      this.featureParser.parse(),
      this.usageLimitParser !== null ? this.usageLimitParser.parse() : null,
      this.planParser ? this.planParser.parse() : null,
      this.addOnsParser ? this.addOnsParser.parse() : null
    );
  }
}
