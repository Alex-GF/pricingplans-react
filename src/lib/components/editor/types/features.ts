import { ValueType } from "../types/index";

export enum Type {
  AUTOMATION,
  DOMAIN,
  GUARANTEE,
  INFORMATION,
  INTEGRATION,
  MANAGEMENT,
  PAYMENT,
  SUPPORT,
}

export type Feature =
  | Automation
  | Domain
  | Guarantee
  | Information
  | Integration
  | Management
  | Payment
  | Support;

export type Features = {
  [key: string]: Feature;
};

type FeatureSkipName = Omit<FeatureBase, "name">;

export type FeatureRestriction =
  | {
      type: Exclude<Type, Type.PAYMENT>;
      valueType: ValueType.BOOLEAN;
      defaultValue: boolean;
    }
  | {
      type: Exclude<Type, Type.PAYMENT>;
      valueType: ValueType.NUMERIC;
      defaultValue: number;
    }
  | {
      type: Exclude<Type, Type.PAYMENT>;
      valueType: ValueType.TEXT;
      defaultValue: string;
    };

type FeatureBase = {
  name: string;
  description: string;
  expression: string;
  serverExpression: string;
};

export enum AutomationType {
  BOT,
  FILTERING,
  TRACKING,
  TASK_AUTOMATION,
}

type AutomationTypes = keyof typeof AutomationType;

export type Automation = FeatureSkipName &
  FeatureRestriction & {
    type: Type.AUTOMATION;
    automationType: AutomationTypes;
  };

export type Domain = FeatureSkipName &
  FeatureRestriction & {
    type: Type.DOMAIN;
  };

export type Guarantee = FeatureSkipName &
  FeatureRestriction & {
    type: Type.GUARANTEE;
    docUrl: string;
  };

export type Information = FeatureSkipName &
  FeatureRestriction & {
    type: Type.INFORMATION;
  };

export enum IntegrationType {
  API,
  EXTENSION,
  EXTERNAL_DEVICE,
  IDENTITY_PROVIDER,
  MARKETPLACE,
  WEB_SAAS,
}

type IntegrationTypes = keyof typeof IntegrationType;

export type Integration = FeatureSkipName &
  FeatureRestriction & {
    type: Type.INTEGRATION;
    integrationType: IntegrationTypes;
  };

export type Management = FeatureSkipName &
  FeatureRestriction & {
    type: Type.MANAGEMENT;
  };

export type PaymentTypeKeys = keyof typeof PaymentType;
export type PaymentTypes = PaymentTypeKeys[];
export enum PaymentType {
  ACH,
  CARD,
  GATEWAY,
  INVOICE,
  WIRE_TRANSFER,
  OTHER,
}

export type Payment = FeatureSkipName & {
  type: Type.PAYMENT;
  valueType: ValueType.TEXT;
  defaultValue: PaymentTypes;
};

export type Support = FeatureSkipName &
  FeatureRestriction & {
    type: Type.SUPPORT;
  };

export type AutomationFeature = FeatureBase &
  FeatureRestriction & {
    type: Type.AUTOMATION;
    automationType: AutomationTypes;
  };

export type DomainFeature = FeatureBase &
  FeatureRestriction & {
    type: Type.DOMAIN;
  };

export type GuaranteeFeature = FeatureBase &
  FeatureRestriction & {
    type: Type.GUARANTEE;
    docUrl: string;
  };

export type InformationFeature = FeatureBase &
  FeatureRestriction & {
    type: Type.INFORMATION;
  };

export type IntegrationFeature = FeatureBase &
  FeatureRestriction & {
    type: Type.INTEGRATION;
    integrationType: IntegrationTypes;
  };

export type ManagementFeature = FeatureBase &
  FeatureRestriction & {
    type: Type.MANAGEMENT;
  };

export type PaymentFeature = FeatureBase & {
  type: Type.PAYMENT;
  valueType: ValueType.TEXT;
  defaultValue: PaymentTypes;
};

export type SupportFeature = FeatureBase &
  FeatureRestriction & {
    type: Type.SUPPORT;
  };

export type AllFeatures =
  | AutomationFeature
  | DomainFeature
  | GuaranteeFeature
  | InformationFeature
  | IntegrationFeature
  | ManagementFeature
  | PaymentFeature
  | SupportFeature;

export type FeatureState = AllFeatures[];
