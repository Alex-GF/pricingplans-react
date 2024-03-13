import {
  AllFeatures,
  AutomationFeature,
  DomainFeature,
  GuaranteeFeature,
  InformationFeature,
  IntegrationFeature,
  ManagementFeature,
  PaymentFeature,
  SupportFeature,
} from "../model/features";
import { Features, Feature, Type, AutomationType } from "../types/features";
import { PricingManager, ValueType } from "../types/index";

export class PricingManagerPaser {
  #pricingManager: PricingManager;
  #featureParser: FeatureParser;

  constructor(pricingManager: PricingManager) {
    this.#pricingManager = pricingManager;
    this.#featureParser = new FeatureParser(this.#pricingManager.features);
  }

  parse() {
    console.log("Parsing Pricing Manager object...");
    const features = this.#featureParser.parse();
    console.log(features);
  }
}

class FeatureParser {
  #features: Features;

  constructor(features: Features) {
    this.#features = features;
  }

  parse(): AllFeatures[] {
    console.log("Parsing Features object...");
    return Object.entries(this.#features).map(([name, attributes]) =>
      this._parseFeature(name, attributes)
    );
  }

  private _parseFeature(name: string, feature: Feature) {
    switch (feature.type) {
      case Type.AUTOMATION:
        return new AutomationFeature(
          name,
          feature.description,
          feature.expression,
          feature.serverExpression,
          feature.automationType,
          feature.defaultValue
        );
      case Type.DOMAIN:
        return new DomainFeature(
          name,
          feature.description,
          feature.expression,
          feature.serverExpression,
          feature.defaultValue
        );
      case Type.GUARANTEE:
        return new GuaranteeFeature(
          name,
          feature.description,
          feature.expression,
          feature.serverExpression,
          feature.docUrl,
          feature.defaultValue
        );
      case Type.INFORMATION:
        return new InformationFeature(
          name,
          feature.description,
          feature.expression,
          feature.serverExpression,
          feature.defaultValue
        );
      case Type.INTEGRATION:
        return new IntegrationFeature(
          name,
          feature.description,
          feature.expression,
          feature.serverExpression,
          feature.integrationType,
          feature.defaultValue
        );
      case Type.MANAGEMENT:
        return new ManagementFeature(
          name,
          feature.description,
          feature.expression,
          feature.description,
          feature.defaultValue
        );
      case Type.PAYMENT:
        return new PaymentFeature(
          name,
          feature.description,
          feature.expression,
          feature.description,
          feature.defaultValue
        );
      case Type.SUPPORT:
        return new SupportFeature(
          name,
          feature.description,
          feature.expression,
          feature.serverExpression,
          feature.defaultValue
        );
    }
  }
}

const features: Features = {
  automation: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.BOOLEAN,
    type: Type.AUTOMATION,
    defaultValue: false,
    automationType: AutomationType.BOT,
  },
  domain: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.TEXT,
    type: Type.AUTOMATION,
    defaultValue: false,
    automationType: AutomationType.BOT,
  },
  guarantee: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.BOOLEAN,
    type: Type.AUTOMATION,
    defaultValue: false,
    automationType: AutomationType.BOT,
  },
  information: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.BOOLEAN,
    type: Type.AUTOMATION,
    defaultValue: false,
    automationType: AutomationType.BOT,
  },
  integration: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.BOOLEAN,
    type: Type.AUTOMATION,
    defaultValue: false,
    automationType: AutomationType.BOT,
  },
  management: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.BOOLEAN,
    type: Type.AUTOMATION,
    defaultValue: false,
    automationType: AutomationType.BOT,
  },
  payment: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.BOOLEAN,
    type: Type.AUTOMATION,
    defaultValue: false,
    automationType: AutomationType.BOT,
  },
  support: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.BOOLEAN,
    type: Type.AUTOMATION,
    defaultValue: false,
    automationType: AutomationType.BOT,
  },
};

const featureParser = new FeatureParser(features);
featureParser.parse();
