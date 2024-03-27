import { PricingManager, PricingManagerBase } from "../model/pricingmanager";
import { UsageLimits } from "../model/usagelimits";
import FeatureParser from "./features";
import PlansParser from "./plans";
import UsageLimitParser from "./usageLimits";

export default class PricingManagerParser {
  private rawPricingManager: PricingManager;
  private featureParser: FeatureParser;
  private usageLimitParser: UsageLimitParser | null;
  private planParser: PlansParser | null;

  constructor(pricingManager: PricingManager) {
    this.rawPricingManager = pricingManager;
    this.featureParser = new FeatureParser(pricingManager.features);
    this.usageLimitParser = null;
    this.planParser = null;

    if (pricingManager.usageLimits !== null) {
      this.usageLimitParser = new UsageLimitParser(pricingManager.usageLimits);
    }

    if (pricingManager.plans !== null) {
      this.planParser = new PlansParser(pricingManager.plans);
    }
  }

  parse(): PricingManagerBase {
    return new PricingManagerBase(
      this.rawPricingManager.saasName,
      this.rawPricingManager.day,
      this.rawPricingManager.month,
      this.rawPricingManager.year,
      this.rawPricingManager.currency,
      this.rawPricingManager.hasAnnualPayment,
      this.featureParser.features,
      this.usageLimitParser !== null ? this.usageLimitParser.usageLimits : null,
      this.planParser ? this.planParser.plans : null,
      null
    );
  }
}
