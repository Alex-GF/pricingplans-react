import { PricingManager, PricingManagerBase } from "../model/pricingmanager";
import AddOnsParser from "./addons";
import FeatureParser from "./features";
import PlansParser from "./plans";
import UsageLimitParser from "./usageLimits";

export default class PricingManagerParser {
  private rawPricingManager: PricingManager;
  private featureParser: FeatureParser;
  private usageLimitParser: UsageLimitParser | null;
  private planParser: PlansParser | null;
  private addOnsParser: AddOnsParser | null;

  constructor(pricingManager: PricingManager) {
    this.rawPricingManager = pricingManager;
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
      this.rawPricingManager.saasName,
      this.rawPricingManager.day,
      this.rawPricingManager.month,
      this.rawPricingManager.year,
      this.rawPricingManager.currency,
      this.rawPricingManager.hasAnnualPayment,
      this.featureParser.parse(),
      this.usageLimitParser !== null ? this.usageLimitParser.parse() : null,
      this.planParser ? this.planParser.parse() : null,
      this.addOnsParser ? this.addOnsParser.parse() : null
    );
  }
}
