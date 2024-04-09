import { ValueType } from "../types/index";

export enum Type {
  Automation = "AUTOMATION",
  Domain = "DOMAIN",
  Guarantee = "GUARANTEE",
  Information = "INFORMATION",
  Integration = "INTEGRATION",
  Management = "MANAGEMENT",
  Payment = "PAYMENT",
  Support = "SUPPORT",
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
      type: Exclude<Type, Type.Payment>;
      valueType: ValueType.Boolean;
      defaultValue: boolean;
    }
  | {
      type: Exclude<Type, Type.Payment>;
      valueType: ValueType.Numeric;
      defaultValue: number;
    }
  | {
      type: Exclude<Type, Type.Payment>;
      valueType: ValueType.Text;
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
    type: Type.Automation;
    automationType: AutomationTypes;
  };

export type Domain = FeatureSkipName &
  FeatureRestriction & {
    type: Type.Domain;
  };

export type Guarantee = FeatureSkipName &
  FeatureRestriction & {
    type: Type.Guarantee;
    docUrl: string;
  };

export type Information = FeatureSkipName &
  FeatureRestriction & {
    type: Type.Information;
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
    type: Type.Integration;
    integrationType: IntegrationTypes;
  };

export type Management = FeatureSkipName &
  FeatureRestriction & {
    type: Type.Management;
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
  type: Type.Payment;
  valueType: ValueType.Text;
  defaultValue: PaymentTypes;
};

export type Support = FeatureSkipName &
  FeatureRestriction & {
    type: Type.Support;
  };

export type AutomationFeature = FeatureBase &
  FeatureRestriction & {
    type: Type.Automation;
    automationType: AutomationTypes;
  };

export type DomainFeature = FeatureBase &
  FeatureRestriction & {
    type: Type.Domain;
  };

export type GuaranteeFeature = FeatureBase &
  FeatureRestriction & {
    type: Type.Guarantee;
    docUrl: string;
  };

export type InformationFeature = FeatureBase &
  FeatureRestriction & {
    type: Type.Information;
  };

export type IntegrationFeature = FeatureBase &
  FeatureRestriction & {
    type: Type.Integration;
    integrationType: IntegrationTypes;
  };

export type ManagementFeature = FeatureBase &
  FeatureRestriction & {
    type: Type.Management;
  };

export type PaymentFeature = FeatureBase & {
  type: Type.Payment;
  valueType: ValueType.Text;
  defaultValue: PaymentTypes;
};

export type SupportFeature = FeatureBase &
  FeatureRestriction & {
    type: Type.Support;
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
