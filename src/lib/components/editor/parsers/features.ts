import { AllFeatures, Feature, Features, Type } from "../model/features";

export default class FeatureParser {
  private rawFeatures: Features;

  constructor(features: Features) {
    this.rawFeatures = features;
  }

  public parse(): Map<string, AllFeatures> {
    const parsedFeatures = new Map<string, AllFeatures>([]);
    Object.entries(this.rawFeatures).forEach(([name, feature]) =>
      parsedFeatures.set(name, this._parseFeature(name, feature))
    );
    return parsedFeatures;
  }

  private _parseFeature(name: string, feature: Feature): AllFeatures {
    switch (feature.type) {
      case Type.AUTOMATION:
        return {
          name,
          description: feature.description,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
          automationType: feature.automationType,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.DOMAIN:
        return {
          name,
          description: feature.description,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.GUARANTEE:
        return {
          name,
          description: feature.description,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
          docUrl: feature.docUrl,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.INFORMATION:
        return {
          name,
          description: feature.description,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.INTEGRATION:
        return {
          name,
          description: feature.description,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
          integrationType: feature.integrationType,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.MANAGEMENT:
        return {
          name,
          description: feature.description,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
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
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
    }
  }
}
