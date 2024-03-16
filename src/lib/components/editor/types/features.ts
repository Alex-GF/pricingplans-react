import { Value } from "./index";

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

type FeatureBase = {
  description: string;
  expression: string;
  serverExpression: string;
} & StandardValueTypes;

type StandardValueTypes = Value<boolean> | Value<number> | Value<string>;

export enum Type {
  AUTOMATION = "AUTOMATION",
  DOMAIN = "DOMAIN",
  GUARANTEE = "GUARANTEE",
  INFORMATION = "INFORMATION",
  INTEGRATION = "INTEGRATION",
  MANAGEMENT = "MANAGEMENT",
  PAYMENT = "PAYMENT",
  SUPPORT = "SUPPORT",
}

export enum AutomationType {
  BOT = "BOT",
  FILTERING = "FILTERING",
  TRACKING = "TRACKING",
  TASK_AUTOMATION = "TASK_AUTOMATION",
}

type Automation = {
  type: Type.AUTOMATION;
  automationType: keyof typeof AutomationType;
} & FeatureBase;

type Domain = FeatureBase & {
  type: Type.DOMAIN;
};

type Guarantee = FeatureBase & {
  type: Type.GUARANTEE;
  docUrl: string;
};

type Information = FeatureBase & {
  type: Type.INFORMATION;
};

export enum IntegrationType {
  API = "API",
  EXTENSION = "EXTENSION",
  EXTERNAL_DEVICE = "EXTERNAL_DEVICE",
  IDENTITY_PROVIDER = "IDENTITY_PROVIDER",
  MARKETPLACE = "MARKETPLACE",
  WEB_SAAS = "WEB_SAAS",
}

type Integration = FeatureBase & {
  type: Type.INTEGRATION;
  integrationType: keyof typeof IntegrationType;
};

type Management = FeatureBase & {
  type: Type.MANAGEMENT;
};

export type PaymentTypes = [keyof typeof PaymentType];

export enum PaymentType {
  ACH = "ACH",
  CARD = "CARD",
  GATEWAY = "GATEWAY",
  INVOICE = "INVOICE",
  WIRE_TRANSFER = "WIRE_TRANSFER",
  OTHER = "OTHER",
}

type Payment = Value<PaymentTypes> & {
  description: string;
  type: Type.PAYMENT;
  expression: string;
  serverExpression: string;
};

type Support = FeatureBase & {
  type: Type.SUPPORT;
};
