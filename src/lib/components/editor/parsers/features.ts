import { ValueType } from "../types/index";
import {
  AllFeatures,
  Feature,
  FeatureRestriction,
  Features,
  Type,
} from "../types/features";
import { MapFeatureValue } from "../types/plans";

export default class FeatureParser {
  constructor(private features: Features) {}

  public parse(): Map<string, AllFeatures> {
    const parsedFeatures = new Map<string, AllFeatures>([]);
    console.log("Features", this.features);
    Object.entries(this.features).forEach(([name, feature]) =>
      parsedFeatures.set(name, this._parseFeature(name, feature))
    );
    return parsedFeatures;
  }

  public parseToReactState(): AllFeatures[] {
    return Array.from(this.parse().values());
  }

  public featuresToPlanFeatures(): Map<string, MapFeatureValue> {
    const planFeatures: [string, MapFeatureValue][] = [];
    const parsedFeatures = this.parse();
    for (const [featureName, feature] of parsedFeatures) {
      planFeatures.push([featureName, { value: feature.defaultValue }]);
    }
    return new Map(planFeatures);
  }

  private _valueTypeParse(featureRestriction: FeatureRestriction) {
    console.log(featureRestriction);
    switch (featureRestriction.valueType) {
      case ValueType.Boolean:
        return {
          valueType: featureRestriction.valueType,
          defaultValue: featureRestriction.defaultValue,
        };
      case ValueType.Numeric:
        return {
          valueType: featureRestriction.valueType,
          defaultValue: featureRestriction.defaultValue,
        };

      case ValueType.Text:
        return {
          valueType: featureRestriction.valueType,
          defaultValue: featureRestriction.defaultValue,
        };
    }
  }

  private _parseFeature(name: string, feature: Feature): AllFeatures {
    switch (feature.type) {
      case Type.Automation:
        return {
          name,
          description: feature.description,
          ...this._valueTypeParse(feature),
          type: feature.type,
          automationType: feature.automationType,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.Domain:
        return {
          name,
          description: feature.description,
          ...this._valueTypeParse(feature),
          type: feature.type,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.Guarantee:
        return {
          name,
          description: feature.description,
          ...this._valueTypeParse(feature),
          type: feature.type,
          docUrl: feature.docUrl,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.Information:
        return {
          name,
          description: feature.description,
          ...this._valueTypeParse(feature),
          type: feature.type,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.Integration:
        return {
          name,
          description: feature.description,
          ...this._valueTypeParse(feature),
          type: feature.type,
          integrationType: feature.integrationType,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.Management:
        return {
          name,
          description: feature.description,
          ...this._valueTypeParse(feature),
          type: feature.type,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.Payment:
        return {
          name,
          description: feature.description,
          valueType: feature.valueType,
          defaultValue: feature.defaultValue,
          type: feature.type,
          serverExpression: feature.serverExpression,
          expression: feature.expression,
        };
      case Type.Support:
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
