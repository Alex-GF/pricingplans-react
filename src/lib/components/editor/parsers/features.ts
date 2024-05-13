import { ParsedOverwrittenFeatures, ValueType } from "../types/index";
import {
  AllFeatures,
  Feature,
  FeatureRestriction,
  Features,
  IntegrationType,
  ParsedFeatures,
  Type,
} from "../types/features";

export default function parseFeatures(features: Features) {
  const parsedFeatures: ParsedFeatures = Object.entries(features).map(
    ([featureName, feature]) => parseFeature(featureName, feature)
  );
  const defaultValues: ParsedOverwrittenFeatures = parsedFeatures.map(
    (feature) => ({
      name: feature.name,
      value: feature.defaultValue,
    })
  );
  return { parsedFeatures, defaultValues };
}

function parseFeature(name: string, feature: Feature): AllFeatures {
  switch (feature.type) {
    case Type.Automation:
      return {
        name,
        description: feature.description,
        ...valueTypeParse(feature),
        type: feature.type,
        automationType: feature.automationType,
        expression: feature.expression,
        serverExpression: feature.serverExpression,
      };
    case Type.Domain:
      return {
        name,
        description: feature.description,
        ...valueTypeParse(feature),
        type: feature.type,
        expression: feature.expression,
        serverExpression: feature.serverExpression,
      };
    case Type.Guarantee:
      return {
        name,
        description: feature.description,
        ...valueTypeParse(feature),
        type: feature.type,
        docUrl: feature.docUrl,
        expression: feature.expression,
        serverExpression: feature.serverExpression,
      };
    case Type.Information:
      return {
        name,
        description: feature.description,
        ...valueTypeParse(feature),
        type: feature.type,
        expression: feature.expression,
        serverExpression: feature.serverExpression,
      };
    case Type.Integration: {
      const commonProperties = {
        name,
        description: feature.description,
        ...valueTypeParse(feature),
        type: feature.type,
        expression: feature.expression,
        serverExpression: feature.serverExpression,
      };
      if (feature.integrationType === IntegrationType.WebSaaS) {
        return {
          ...commonProperties,
          integrationType: IntegrationType.WebSaaS,
          pricingUrls: feature.pricingUrls,
        };
      }

      return {
        ...commonProperties,
        integrationType: feature.integrationType,
      };
    }

    case Type.Management:
      return {
        name,
        description: feature.description,
        ...valueTypeParse(feature),
        type: feature.type,
        expression: feature.expression,
        serverExpression: feature.serverExpression,
      };
    case Type.Payment:
      return {
        name,
        description: feature.description,
        valueType: feature.valueType,
        defaultValue: feature.defaultValue,
        type: feature.type,
        expression: feature.expression,
        serverExpression: feature.serverExpression,
      };
    case Type.Support:
      return {
        name,
        description: feature.description,
        ...valueTypeParse(feature),
        type: feature.type,
        expression: feature.expression,
        serverExpression: feature.serverExpression,
      };
  }
}

function valueTypeParse(featureRestriction: FeatureRestriction) {
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
