import { ValueType } from "../types/index";
import {
  AllFeatures,
  Automation,
  Domain,
  Feature,
  FeatureRestriction,
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

  private _serializeValueType(feature: FeatureRestriction) {
    switch (feature.valueType) {
      case ValueType.Boolean:
        return {
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
        };
      case ValueType.Numeric:
        return {
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
        };
      case ValueType.Text:
        return {
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
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
      case Type.Automation: {
        const automation: Automation = {
          ...commonFeatures,
          ...this._serializeValueType(feature),
          type: feature.type,
          automationType: feature.automationType,
        };
        return automation;
      }

      case Type.Domain: {
        const domain: Domain = {
          ...commonFeatures,
          ...this._serializeValueType(feature),
          type: feature.type,
        };
        return domain;
      }

      case Type.Guarantee: {
        const guarantee: Guarantee = {
          ...commonFeatures,
          ...this._serializeValueType(feature),
          type: feature.type,
          docUrl: feature.docUrl,
        };
        return guarantee;
      }
      case Type.Information: {
        const information: Information = {
          ...commonFeatures,
          ...this._serializeValueType(feature),
          type: feature.type,
        };
        return information;
      }
      case Type.Integration: {
        const integration: Integration = {
          ...commonFeatures,
          ...this._serializeValueType(feature),
          type: feature.type,
          integrationType: feature.integrationType,
        };
        return integration;
      }
      case Type.Management: {
        const management: Management = {
          ...commonFeatures,
          ...this._serializeValueType(feature),
          type: feature.type,
        };
        return management;
      }
      case Type.Payment: {
        const payment: Payment = {
          ...commonFeatures,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
        };
        return payment;
      }
      case Type.Support: {
        if (feature.valueType === ValueType.Boolean) {
          feature.defaultValue;
        }
        const support: Support = {
          ...commonFeatures,
          ...this._serializeValueType(feature),
          type: feature.type,
        };
        return support;
      }
    }
  }
}
