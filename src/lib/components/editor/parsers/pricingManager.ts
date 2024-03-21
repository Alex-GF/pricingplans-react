import { PricingManager, PricingManagerBase } from "../model/pricingmanager";
import FeatureParser from "./features";
import PlansParser from "./plans";

export default class PricingManagerParser {
  private rawPricingManager: PricingManager;
  private featureParser: FeatureParser;
  private planParser: PlansParser | null;

  constructor(pricingManager: PricingManager) {
    this.rawPricingManager = pricingManager;
    this.featureParser = new FeatureParser(pricingManager.features);
    if (!pricingManager.plans) {
      this.planParser = null;
    } else {
      this.planParser = new PlansParser(pricingManager.plans);
    }
  }

  get pricingManager(): PricingManagerBase {
    return new PricingManagerBase(
      this.rawPricingManager.saasName,
      this.rawPricingManager.day,
      this.rawPricingManager.month,
      this.rawPricingManager.year,
      this.rawPricingManager.currency,
      this.rawPricingManager.hasAnnualPayment,
      this.featureParser.features,
      null,
      this.planParser ? this.planParser.plans : null,
      null
    );
  }
}
