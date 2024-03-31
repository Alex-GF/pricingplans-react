import {
  AllFeatures,
  Automation,
  Domain,
  Feature,
  Features,
  Guarantee,
  Information,
  Integration,
  Management,
  Payment,
  Support,
  Type,
} from "../types/features";

export default class FeatureSerializer {
  private _features: Features;

  constructor(private _featuresMap: Map<string, AllFeatures>) {
    this._features = {};
  }

  get features(): Features {
    this._serializeFeatures();
    return this._features;
  }

  private _serializeFeatures() {
    for (const [featureName, feature] of this._featuresMap.entries()) {
      this._features = {
        [featureName]: this._serializeFeature(feature),
      };
    }
  }

  private _serializeFeature(feature: AllFeatures): Feature {
    const commonFeatures = {
      description: feature.description,
      expression: feature.expression,
      serverExpression: feature.serverExpression,
    };

    switch (feature.type) {
      case Type.AUTOMATION: {
        const automation: Automation = {
          ...commonFeatures,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
          automationType: feature.automationType,
        };
        return automation;
      }

      case Type.DOMAIN: {
        const domain: Domain = {
          ...commonFeatures,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
        };
        return domain;
      }

      case Type.GUARANTEE: {
        const guarantee: Guarantee = {
          ...commonFeatures,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
          docUrl: feature.docUrl,
        };
        return guarantee;
      }
      case Type.INFORMATION: {
        const information: Information = {
          ...commonFeatures,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
        };
        return information;
      }
      case Type.INTEGRATION: {
        const integration: Integration = {
          ...commonFeatures,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
          integrationType: feature.integrationType,
        };
        return integration;
      }
      case Type.MANAGEMENT: {
        const management: Management = {
          ...commonFeatures,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
        };
        return management;
      }
      case Type.PAYMENT: {
        const payment: Payment = {
          ...commonFeatures,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
        };
        return payment;
      }
      case Type.SUPPORT: {
        const support: Support = {
          ...commonFeatures,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
        };
        return support;
      }
    }
  }
}
