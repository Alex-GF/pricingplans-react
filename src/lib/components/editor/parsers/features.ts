import {
  AllFeatures,
  AutomationFeature,
  AutomationType,
  DomainFeature,
  Feature,
  Features,
  GuaranteeFeature,
  InformationFeature,
  IntegrationFeature,
  IntegrationType,
  ManagementFeature,
  PaymentFeature,
  SupportFeature,
  Type,
} from "../model/features";

export default class FeatureParser {
  private rawFeatures: Features;
  private parsedFeatures: Map<string, AllFeatures>;

  constructor(features: Features) {
    this.rawFeatures = features;
    this.parsedFeatures = new Map([]);
  }

  get features(): Map<string, AllFeatures> {
    this._parse();

    return this.parsedFeatures;
  }

  private _parse(): void {
    Object.entries(this.rawFeatures).forEach(([name, feature]) =>
      this.parsedFeatures.set(name, this._parseFeature(name, feature))
    );
  }

  private _parseFeature(name: string, feature: Feature): AllFeatures {
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
    }
  }
}
