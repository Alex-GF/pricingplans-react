import {
  AllFeatures,
  AutomationFeature,
  AutomationType,
  DomainFeature,
  GuaranteeFeature,
  InformationFeature,
  IntegrationFeature,
  IntegrationType,
  ManagementFeature,
  PaymentFeature,
  PaymentType,
  SupportFeature,
  FeatureType,
  ValueType,
} from "../../types";

export function computeFeatureType(
  currentFeature: AllFeatures,
  selectedType: FeatureType
): AllFeatures {
  let feat: AllFeatures;
  switch (currentFeature.type) {
    case FeatureType.Domain:
    case FeatureType.Information:
    case FeatureType.Management:
    case FeatureType.Support:
      feat = fromDomainInformationManagementAndSupportToOtherFeature(
        currentFeature,
        selectedType
      );
      break;
    case FeatureType.Automation:
      feat = fromAutomationToOtherFeature(currentFeature, selectedType);
      break;
    case FeatureType.Guarantee:
      feat = fromGuaranteeToOtherFeature(currentFeature, selectedType);
      break;
    case FeatureType.Integration:
      feat = fromIntegrationToOtherFeature(currentFeature, selectedType);
      break;
    case FeatureType.Payment:
      feat = fromPaymentToOtherFeature(currentFeature, selectedType);
  }

  return feat;
}

function fromAutomationToOtherFeature(
  automationFeature: AutomationFeature,
  featureType: FeatureType
): AllFeatures {
  const { type, automationType, ...other } = automationFeature;
  switch (featureType) {
    case FeatureType.Automation:
      return automationFeature;
    case FeatureType.Guarantee:
      return { ...other, type: FeatureType.Guarantee, docUrl: "" };
    case FeatureType.Integration:
      return {
        ...other,
        type: FeatureType.Integration,
        integrationType: IntegrationType.API,
      };
    case FeatureType.Domain:
    case FeatureType.Information:
    case FeatureType.Management:
    case FeatureType.Support:
      return { ...other, type: featureType };
    case FeatureType.Payment:
      return {
        ...other,
        type: FeatureType.Payment,
        valueType: ValueType.Text,
        defaultValue: [PaymentType.Ach],
      };
  }
}

function fromGuaranteeToOtherFeature(
  guaranteeFeature: GuaranteeFeature,
  featureType: FeatureType
): AllFeatures {
  const { type, docUrl, ...other } = guaranteeFeature;
  switch (featureType) {
    case FeatureType.Domain:
    case FeatureType.Information:
    case FeatureType.Management:
    case FeatureType.Support:
      return { ...other, type: featureType };
    case FeatureType.Automation:
      return {
        ...other,
        type: FeatureType.Automation,
        automationType: AutomationType.Bot,
      };
    case FeatureType.Guarantee:
      return guaranteeFeature;
    case FeatureType.Integration:
      return {
        ...other,
        type: FeatureType.Integration,
        integrationType: IntegrationType.API,
      };

    case FeatureType.Payment:
      return {
        ...other,
        type: FeatureType.Payment,
        valueType: ValueType.Text,
        defaultValue: [PaymentType.Ach],
      };
  }
}

function fromIntegrationToOtherFeature(
  integrationFeature: IntegrationFeature,
  featureType: FeatureType
): AllFeatures {
  const { type, integrationType, ...rest } = integrationFeature;
  switch (featureType) {
    case FeatureType.Domain:
    case FeatureType.Information:
    case FeatureType.Management:
    case FeatureType.Support:
      return { ...rest, type: featureType };
    case FeatureType.Automation:
      return {
        ...rest,
        type: FeatureType.Automation,
        automationType: AutomationType.Bot,
      };
    case FeatureType.Guarantee:
      return { ...rest, type: FeatureType.Guarantee, docUrl: "" };
    case FeatureType.Integration:
      return integrationFeature;

    case FeatureType.Payment:
      return {
        ...rest,
        type: FeatureType.Payment,
        valueType: ValueType.Text,
        defaultValue: [PaymentType.Ach],
      };
  }
}

function fromPaymentToOtherFeature(
  paymentFeature: PaymentFeature,
  featureType: FeatureType
): AllFeatures {
  const { name, description } = paymentFeature;

  switch (featureType) {
    case FeatureType.Domain:
    case FeatureType.Information:
    case FeatureType.Management:
    case FeatureType.Support:
      return {
        name,
        description,
        type: featureType,
        valueType: ValueType.Boolean,
        defaultValue: false,
        expression: "",
        serverExpression: "",
      };
    case FeatureType.Automation:
      return {
        name,
        description,
        type: FeatureType.Automation,
        automationType: AutomationType.Bot,
        valueType: ValueType.Boolean,
        defaultValue: false,
        expression: "",
        serverExpression: "",
      };
    case FeatureType.Guarantee:
      return {
        name,
        description,
        type: FeatureType.Guarantee,
        docUrl: "",
        valueType: ValueType.Boolean,
        defaultValue: false,
        expression: "",
        serverExpression: "",
      };
    case FeatureType.Integration:
      return {
        name,
        description,
        type: FeatureType.Integration,
        integrationType: IntegrationType.API,
        valueType: ValueType.Boolean,
        defaultValue: false,
        expression: "",
        serverExpression: "",
      };

    case FeatureType.Payment:
      return paymentFeature;
  }
}

function fromDomainInformationManagementAndSupportToOtherFeature(
  feature: Extract<
    AllFeatures,
    DomainFeature | InformationFeature | ManagementFeature | SupportFeature
  >,
  featureType: FeatureType
): AllFeatures {
  const { type, ...rest } = feature;
  switch (featureType) {
    case FeatureType.Domain:
    case FeatureType.Information:
    case FeatureType.Management:
    case FeatureType.Support:
      return { ...feature, type: featureType };
    case FeatureType.Automation:
      return {
        ...rest,
        type: FeatureType.Automation,
        automationType: AutomationType.Bot,
      };
    case FeatureType.Guarantee:
      return {
        ...rest,
        type: FeatureType.Guarantee,
        docUrl: "",
      };
    case FeatureType.Integration:
      return {
        ...rest,
        type: FeatureType.Integration,
        integrationType: IntegrationType.API,
      };
    case FeatureType.Payment:
      return {
        ...rest,
        type: FeatureType.Payment,
        valueType: ValueType.Text,
        defaultValue: [PaymentType.Ach],
      };
  }
}
