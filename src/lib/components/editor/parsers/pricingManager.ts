import { PricingManagerBase } from "../model/pricingmanager";
import { PricingManager } from "../types/index";
import AddOnsParser from "./addons";
import FeatureParser from "./features";
import PlansParser from "./plans";
import UsageLimitParser from "./usageLimits";

export default class PricingManagerParser {
  private featureParser: FeatureParser;
  private usageLimitParser: UsageLimitParser | null;
  private planParser: PlansParser;
  private addOnsParser: AddOnsParser | null;

  constructor(private pricingManager: PricingManager) {
    this.featureParser = new FeatureParser(pricingManager.features);
    this.usageLimitParser = null;
    this.planParser = new PlansParser(pricingManager.plans);
    this.addOnsParser = null;

    if (pricingManager.usageLimits !== null) {
      this.usageLimitParser = new UsageLimitParser(pricingManager.usageLimits);
    }

    if (pricingManager.addOns !== null) {
      this.addOnsParser = new AddOnsParser(pricingManager.addOns);
    }
  }

  public parse(): PricingManagerBase {
    return new PricingManagerBase(
      this.pricingManager.saasName,
      this.pricingManager.day,
      this.pricingManager.month,
      this.pricingManager.year,
      this.pricingManager.currency,
      this.pricingManager.hasAnnualPayment,
      this.featureParser.parse(),
      this.usageLimitParser !== null ? this.usageLimitParser.parse() : null,
      this.planParser.parse(),
      this.addOnsParser ? this.addOnsParser.parse() : null
    );
  }

  public parseToState() {
    return {
      saasName: this.pricingManager.saasName,
      day: this.pricingManager.day,
      month: this.pricingManager.month,
      year: this.pricingManager.year,
      currency: this.pricingManager.currency,
      hasAnnualPayment: this.pricingManager.hasAnnualPayment,
      features: this.featureParser.parseToReactState(),
      plans: this.planParser.parseToReactState(
        this.featureParser.featuresToPlanFeatures()
      ),
    };
  }
}
