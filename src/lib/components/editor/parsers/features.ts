import { ParsedOverwrittenFeatures, ValueType } from "../types/index";
import {
  AllFeatures,
  Feature,
  FeatureRestriction,
  Features,
  IntegrationType,
  ParsedFeatures,
  FeatureType,
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
  let description: string | null = "";

  if (feature.description) {
    description = feature.description;
  }

  switch (feature.type) {
    case FeatureType.Automation:
      return {
        name,
        description,
        ...valueTypeParse(feature),
        type: feature.type,
        automationType: feature.automationType,
        expression: feature.expression,
        serverExpression: feature.serverExpression,
      };
    case FeatureType.Domain:
      return {
        name,
        description,
        ...valueTypeParse(feature),
        type: feature.type,
        expression: feature.expression,
        serverExpression: feature.serverExpression,
      };
    case FeatureType.Guarantee:
      return {
        name,
        description,
        ...valueTypeParse(feature),
        type: feature.type,
        docUrl: feature.docUrl,
        expression: feature.expression,
        serverExpression: feature.serverExpression,
      };
    case FeatureType.Information:
      return {
        name,
        description,
        ...valueTypeParse(feature),
        type: feature.type,
        expression: feature.expression,
        serverExpression: feature.serverExpression,
      };
    case FeatureType.Integration: {
      const commonProperties = {
        name,
        description,
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

    case FeatureType.Management:
      return {
        name,
        description,
        ...valueTypeParse(feature),
        type: feature.type,
        expression: feature.expression,
        serverExpression: feature.serverExpression,
      };
    case FeatureType.Payment:
      return {
        name,
        description,
        valueType: feature.valueType,
        defaultValue: feature.defaultValue,
        type: feature.type,
        expression: feature.expression,
        serverExpression: feature.serverExpression,
      };
    case FeatureType.Support:
      return {
        name,
        description,
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
