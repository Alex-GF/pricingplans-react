import { Evaluable, ValueType } from "../types/index";

export enum FeatureType {
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
      type: Exclude<FeatureType, FeatureType.Payment>;
      valueType: ValueType.Boolean;
      defaultValue: boolean;
    }
  | {
      type: Exclude<FeatureType, FeatureType.Payment>;
      valueType: ValueType.Numeric;
      defaultValue: number;
    }
  | {
      type: Exclude<FeatureType, FeatureType.Payment>;
      valueType: ValueType.Text;
      defaultValue: string;
    };

interface FeatureBase extends Evaluable {
  name: string;
  description?: string | null;
}

export enum AutomationType {
  Bot = "BOT",
  Filtering = "FILTERING",
  Tracking = "TRACKING",
  TaskAutomation = "TASK_AUTOMATION",
}

export type Automation = FeatureSkipName &
  FeatureRestriction & {
    type: FeatureType.Automation;
    automationType: AutomationType;
  };

export type Domain = FeatureSkipName &
  FeatureRestriction & {
    type: FeatureType.Domain;
  };

export type Guarantee = FeatureSkipName &
  FeatureRestriction & {
    type: FeatureType.Guarantee;
    docUrl: string;
  };

export type Information = FeatureSkipName &
  FeatureRestriction & {
    type: FeatureType.Information;
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
        type: FeatureType.Integration;
        integrationType: IntegrationType.WebSaaS;
        pricingUrls: string[];
      }
    | {
        type: FeatureType.Integration;
        integrationType: Exclude<IntegrationType, IntegrationType.WebSaaS>;
      }
  );

export type Management = FeatureSkipName &
  FeatureRestriction & {
    type: FeatureType.Management;
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
  type: FeatureType.Payment;
  valueType: ValueType.Text;
  defaultValue: PaymentTypes;
};

export type Support = FeatureSkipName &
  FeatureRestriction & {
    type: FeatureType.Support;
  };

export type AutomationFeature = FeatureBase &
  FeatureRestriction & {
    type: FeatureType.Automation;
    automationType: AutomationType;
  };

export type DomainFeature = FeatureBase &
  FeatureRestriction & {
    type: FeatureType.Domain;
  };

export type GuaranteeFeature = FeatureBase &
  FeatureRestriction & {
    type: FeatureType.Guarantee;
    docUrl: string;
  };

export type InformationFeature = FeatureBase &
  FeatureRestriction & {
    type: FeatureType.Information;
  };

export type IntegrationFeature = FeatureBase &
  FeatureRestriction &
  (
    | {
        type: FeatureType.Integration;
        integrationType: IntegrationType.WebSaaS;
        pricingUrls: string[];
      }
    | {
        type: FeatureType.Integration;
        integrationType: Exclude<IntegrationType, IntegrationType.WebSaaS>;
      }
  );

export type ManagementFeature = FeatureBase &
  FeatureRestriction & {
    type: FeatureType.Management;
  };

export type PaymentFeature = FeatureBase & {
  type: FeatureType.Payment;
  valueType: ValueType.Text;
  defaultValue: PaymentTypes;
};

export type SupportFeature = FeatureBase &
  FeatureRestriction & {
    type: FeatureType.Support;
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

export type ParsedFeatures = AllFeatures[];
