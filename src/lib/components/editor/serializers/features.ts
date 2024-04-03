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
      case ValueType.BOOLEAN:
        return {
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
        };
      case ValueType.NUMERIC:
        return {
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
        };
      case ValueType.TEXT:
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
      case Type.AUTOMATION: {
        const automation: Automation = {
          ...commonFeatures,
          ...this._serializeValueType(feature),
          type: feature.type,
          automationType: feature.automationType,
        };
        return automation;
      }

      case Type.DOMAIN: {
        const domain: Domain = {
          ...commonFeatures,
          ...this._serializeValueType(feature),
          type: feature.type,
        };
        return domain;
      }

      case Type.GUARANTEE: {
        const guarantee: Guarantee = {
          ...commonFeatures,
          ...this._serializeValueType(feature),
          type: feature.type,
          docUrl: feature.docUrl,
        };
        return guarantee;
      }
      case Type.INFORMATION: {
        const information: Information = {
          ...commonFeatures,
          ...this._serializeValueType(feature),
          type: feature.type,
        };
        return information;
      }
      case Type.INTEGRATION: {
        const integration: Integration = {
          ...commonFeatures,
          ...this._serializeValueType(feature),
          type: feature.type,
          integrationType: feature.integrationType,
        };
        return integration;
      }
      case Type.MANAGEMENT: {
        const management: Management = {
          ...commonFeatures,
          ...this._serializeValueType(feature),
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
        if (feature.valueType === ValueType.BOOLEAN) {
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
