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
<<<<<<< HEAD
import {
  Features,
  Feature,
  Type,
  AutomationType,
  IntegrationType,
} from "../types/features";
import { ValueType } from "../types/index";

function parseFeatures(features: Features) {
  return Object.entries(features).map(([name, attributes]) =>
    parseFeature(name, attributes)
  );
}

function parseFeature(name: string, feature: Feature): AllFeatures {
  switch (feature.type) {
    case Type.AUTOMATION:
      return new AutomationFeature(
        name,
        feature.description,
        feature.expression,
        feature.serverExpression,
        AutomationType[feature.automationType],
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
        IntegrationType[feature.integrationType],
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
=======
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
>>>>>>> 77185c663975e1c317d1182f3bf5f785017d3813
  }
}

const features: Features = {
  automation: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
<<<<<<< HEAD
    valueType: ValueType.TEXT,
    type: Type.AUTOMATION,
    defaultValue: "",
=======
    valueType: ValueType.BOOLEAN,
    type: Type.AUTOMATION,
    defaultValue: false,
>>>>>>> 77185c663975e1c317d1182f3bf5f785017d3813
    automationType: AutomationType.BOT,
  },
  domain: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.TEXT,
<<<<<<< HEAD
    type: Type.DOMAIN,
    defaultValue: "false",
=======
    type: Type.AUTOMATION,
    defaultValue: false,
    automationType: AutomationType.BOT,
>>>>>>> 77185c663975e1c317d1182f3bf5f785017d3813
  },
  guarantee: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
<<<<<<< HEAD
    valueType: ValueType.NUMERIC,
    type: Type.GUARANTEE,
    defaultValue: 0,
    docUrl: "hello",
=======
    valueType: ValueType.BOOLEAN,
    type: Type.AUTOMATION,
    defaultValue: false,
    automationType: AutomationType.BOT,
>>>>>>> 77185c663975e1c317d1182f3bf5f785017d3813
  },
  information: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.BOOLEAN,
<<<<<<< HEAD
    type: Type.INFORMATION,
    defaultValue: false,
=======
    type: Type.AUTOMATION,
    defaultValue: false,
    automationType: AutomationType.BOT,
>>>>>>> 77185c663975e1c317d1182f3bf5f785017d3813
  },
  integration: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.BOOLEAN,
<<<<<<< HEAD
    type: Type.INTEGRATION,
    defaultValue: false,
    integrationType: IntegrationType.API,
=======
    type: Type.AUTOMATION,
    defaultValue: false,
    automationType: AutomationType.BOT,
>>>>>>> 77185c663975e1c317d1182f3bf5f785017d3813
  },
  management: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.BOOLEAN,
<<<<<<< HEAD
    type: Type.MANAGEMENT,
    defaultValue: false,
=======
    type: Type.AUTOMATION,
    defaultValue: false,
    automationType: AutomationType.BOT,
>>>>>>> 77185c663975e1c317d1182f3bf5f785017d3813
  },
  payment: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
<<<<<<< HEAD
    valueType: ValueType.TEXT,
    type: Type.PAYMENT,
    defaultValue: ["ACH"],
=======
    valueType: ValueType.BOOLEAN,
    type: Type.AUTOMATION,
    defaultValue: false,
    automationType: AutomationType.BOT,
>>>>>>> 77185c663975e1c317d1182f3bf5f785017d3813
  },
  support: {
    description: "this is a description",
    expression: "",
    serverExpression: "",
    valueType: ValueType.BOOLEAN,
<<<<<<< HEAD
    type: Type.SUPPORT,
    defaultValue: false,
  },
};

const featureParser = parseFeatures(features);
console.log(featureParser);
=======
    type: Type.AUTOMATION,
    defaultValue: false,
    automationType: AutomationType.BOT,
  },
};

const featureParser = new FeatureParser(features);
featureParser.parse();
>>>>>>> 77185c663975e1c317d1182f3bf5f785017d3813
