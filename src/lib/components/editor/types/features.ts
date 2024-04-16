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
  Bot = "BOT",
  Filtering = "FILTERING",
  Tracking = "TRACKING",
  TaskAutomation = "TASK_AUTOMATION",
}

export type Automation = FeatureSkipName &
  FeatureRestriction & {
    type: Type.Automation;
    automationType: AutomationType;
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
  API = "API",
  Extension = "EXTENSION",
  ExternalDevice = "EXTERNAL_DEVICE",
  IdentityProvider = "IDENTITY_PROVIDER",
  Marketplace = "MARKETPLACE",
  WebSaaS = "WEB_SAAS",
}

export type Integration = FeatureSkipName &
  FeatureRestriction &
  (
    | {
        type: Type.Integration;
        integrationType: IntegrationType.WebSaaS;
        pricingUrls: string[];
      }
    | {
        type: Type.Integration;
        integrationType: Exclude<IntegrationType, IntegrationType.WebSaaS>;
      }
  );

export type Management = FeatureSkipName &
  FeatureRestriction & {
    type: Type.Management;
  };

export type PaymentTypes = PaymentType[];
export enum PaymentType {
  Ach = "ACH",
  Card = "CARD",
  Gateway = "GATEWAY",
  Invoice = "INVOICE",
  WireTransfer = "WIRE_TRANSFER",
  Other = "OTHER",
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
    automationType: AutomationType;
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
  FeatureRestriction &
  (
    | {
        type: Type.Integration;
        integrationType: IntegrationType.WebSaaS;
        pricingUrls: string[];
      }
    | {
        type: Type.Integration;
        integrationType: Exclude<IntegrationType, IntegrationType.WebSaaS>;
      }
  );

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
