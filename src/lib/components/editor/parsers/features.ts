import { ValueType } from "../types/index";
import {
  AllFeatures,
  Feature,
  FeatureRestriction,
  Features,
  Type,
} from "../types/features";

export default class FeatureParser {
  constructor(private features: Features) {}

  public parse(): Map<string, AllFeatures> {
    const parsedFeatures = new Map<string, AllFeatures>([]);
    Object.entries(this.features).forEach(([name, feature]) =>
      parsedFeatures.set(name, this._parseFeature(name, feature))
    );
    return parsedFeatures;
  }

  private _valueTypeParse(a: FeatureRestriction) {
    switch (a.valueType) {
      case ValueType.BOOLEAN:
        return {
          valueType: a.valueType,
          defaultValue: a.defaultValue,
        };
      case ValueType.NUMERIC:
        return {
          valueType: a.valueType,
          defaultValue: a.defaultValue,
        };

      case ValueType.TEXT:
        return {
          valueType: a.valueType,
          defaultValue: a.defaultValue,
        };
    }
  }

  private _parseFeature(name: string, feature: Feature): AllFeatures {
    switch (feature.type) {
      case Type.AUTOMATION:
        return {
          name,
          description: feature.description,
          ...this._valueTypeParse(feature),
          type: feature.type,
          automationType: feature.automationType,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.DOMAIN:
        return {
          name,
          description: feature.description,
          ...this._valueTypeParse(feature),
          type: feature.type,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.GUARANTEE:
        return {
          name,
          description: feature.description,
          ...this._valueTypeParse(feature),
          type: feature.type,
          docUrl: feature.docUrl,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.INFORMATION:
        return {
          name,
          description: feature.description,
          ...this._valueTypeParse(feature),
          type: feature.type,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.INTEGRATION:
        return {
          name,
          description: feature.description,
          ...this._valueTypeParse(feature),
          type: feature.type,
          integrationType: feature.integrationType,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.MANAGEMENT:
        return {
          name,
          description: feature.description,
          ...this._valueTypeParse(feature),
          type: feature.type,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.PAYMENT:
        return {
          name,
          description: feature.description,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.SUPPORT:
        return {
          name,
          description: feature.description,
          ...this._valueTypeParse(feature),
          type: feature.type,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
    }
  }
}
