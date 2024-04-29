import {
  AllFeatures,
  AutomationFeature,
  AutomationType,
  DomainFeature,
  GuaranteeFeature,
  Information,
  InformationFeature,
  IntegrationFeature,
  IntegrationType,
  ManagementFeature,
  PaymentFeature,
  PaymentType,
  SupportFeature,
  Type,
  ValueType,
} from "../../types";

export function computeFeatureType(
  currentFeature: AllFeatures,
  selectedType: Type
): AllFeatures {
  let feat: AllFeatures;
  switch (currentFeature.type) {
    case Type.Domain:
    case Type.Information:
    case Type.Management:
    case Type.Support:
      feat = fromDomainInformationManagementAndSupportToOtherFeature(
        currentFeature,
        selectedType
      );
      break;
    case Type.Automation:
      feat = fromAutomationToOtherFeature(currentFeature, selectedType);
      break;
    case Type.Guarantee:
      feat = fromGuaranteeToOtherFeature(currentFeature, selectedType);
      break;
    case Type.Integration:
      feat = fromIntegrationToOtherFeature(currentFeature, selectedType);
      break;
    case Type.Payment:
      feat = fromPaymentToOtherFeature(currentFeature, selectedType);
  }

  return feat;
}

function fromAutomationToOtherFeature(
  automationFeature: AutomationFeature,
  featureType: Type
): AllFeatures {
  const { type, automationType, ...other } = automationFeature;
  switch (featureType) {
    case Type.Automation:
      return automationFeature;
    case Type.Guarantee:
      return { ...other, type: Type.Guarantee, docUrl: "" };
    case Type.Integration:
      return {
        ...other,
        type: Type.Integration,
        integrationType: IntegrationType.API,
      };
    case Type.Domain:
    case Type.Information:
    case Type.Management:
    case Type.Support:
      return { ...other, type: featureType };
    case Type.Payment:
      return {
        ...other,
        type: Type.Payment,
        valueType: ValueType.Text,
        defaultValue: [PaymentType.Ach],
      };
  }
}

function fromGuaranteeToOtherFeature(
  guaranteeFeature: GuaranteeFeature,
  featureType: Type
): AllFeatures {
  const { type, docUrl, ...other } = guaranteeFeature;
  switch (featureType) {
    case Type.Domain:
    case Type.Information:
    case Type.Management:
    case Type.Support:
      return { ...other, type: featureType };
    case Type.Automation:
      return {
        ...other,
        type: Type.Automation,
        automationType: AutomationType.Bot,
      };
    case Type.Guarantee:
      return guaranteeFeature;
    case Type.Integration:
      return {
        ...other,
        type: Type.Integration,
        integrationType: IntegrationType.API,
      };

    case Type.Payment:
      return {
        ...other,
        type: Type.Payment,
        valueType: ValueType.Text,
        defaultValue: [PaymentType.Ach],
      };
  }
}

function fromIntegrationToOtherFeature(
  integrationFeature: IntegrationFeature,
  featureType: Type
): AllFeatures {
  const { type, integrationType, ...rest } = integrationFeature;
  switch (featureType) {
    case Type.Domain:
    case Type.Information:
    case Type.Management:
    case Type.Support:
      return { ...rest, type: featureType };
    case Type.Automation:
      return {
        ...rest,
        type: Type.Automation,
        automationType: AutomationType.Bot,
      };
    case Type.Guarantee:
      return { ...rest, type: Type.Guarantee, docUrl: "" };
    case Type.Integration:
      return integrationFeature;

    case Type.Payment:
      return {
        ...rest,
        type: Type.Payment,
        valueType: ValueType.Text,
        defaultValue: [PaymentType.Ach],
      };
  }
}

function fromPaymentToOtherFeature(
  paymentFeature: PaymentFeature,
  featureType: Type
): AllFeatures {
  const { name, description } = paymentFeature;

  switch (featureType) {
    case Type.Domain:
    case Type.Information:
    case Type.Management:
    case Type.Support:
      return {
        name,
        description,
        type: featureType,
        valueType: ValueType.Boolean,
        defaultValue: false,
        expression: "",
        serverExpression: "",
      };
    case Type.Automation:
      return {
        name,
        description,
        type: Type.Automation,
        automationType: AutomationType.Bot,
        valueType: ValueType.Boolean,
        defaultValue: false,
        expression: "",
        serverExpression: "",
      };
    case Type.Guarantee:
      return {
        name,
        description,
        type: Type.Guarantee,
        docUrl: "",
        valueType: ValueType.Boolean,
        defaultValue: false,
        expression: "",
        serverExpression: "",
      };
    case Type.Integration:
      return {
        name,
        description,
        type: Type.Integration,
        integrationType: IntegrationType.API,
        valueType: ValueType.Boolean,
        defaultValue: false,
        expression: "",
        serverExpression: "",
      };

    case Type.Payment:
      return paymentFeature;
  }
}

function fromDomainInformationManagementAndSupportToOtherFeature(
  feature: Extract<
    AllFeatures,
    DomainFeature | InformationFeature | ManagementFeature | SupportFeature
  >,
  featureType: Type
): AllFeatures {
  const { type, ...rest } = feature;
  switch (featureType) {
    case Type.Domain:
    case Type.Information:
    case Type.Management:
    case Type.Support:
      return { ...feature, type: featureType };
    case Type.Automation:
      return {
        ...rest,
        type: Type.Automation,
        automationType: AutomationType.Bot,
      };
    case Type.Guarantee:
      return {
        ...rest,
        type: Type.Guarantee,
        docUrl: "",
      };
    case Type.Integration:
      return {
        ...rest,
        type: Type.Integration,
        integrationType: IntegrationType.API,
      };
    case Type.Payment:
      return {
        ...rest,
        type: Type.Payment,
        valueType: ValueType.Text,
        defaultValue: [PaymentType.Ach],
      };
  }
}
