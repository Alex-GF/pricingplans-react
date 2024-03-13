import { StrNumBool, Value, ValueType } from "./index";

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

interface FeatureBase<T extends StrNumBool | PaymentTypes> extends Value<T> {
  description: string;
  type: keyof typeof Type;
  expression: string;
  serverExpression: string;
}

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

interface Automation extends FeatureBase<StrNumBool> {
  type: Type.AUTOMATION;
  automationType: AutomationType;
}

interface Domain extends FeatureBase<StrNumBool> {
  type: Type.DOMAIN;
}

interface Payment extends FeatureBase<PaymentType[]> {
  type: Type.PAYMENT;
}

interface Guarantee extends FeatureBase<StrNumBool> {
  type: Type.GUARANTEE;
  docUrl: string;
}

interface Information extends FeatureBase<StrNumBool> {
  type: Type.INFORMATION;
}

export enum IntegrationType {
  API = "API",
  EXTENSION = "EXTENSION",
  EXTERNAL_DEVICE = "EXTERNAL_DEVICE",
  IDENTITY_PROVIDER = "IDENTITY_PROVIDER",
  MARKETPLACE = "MARKETPLACE",
  WEB_SAAS = "WEB_SAAS",
}

interface Integration extends FeatureBase<StrNumBool> {
  type: Type.INTEGRATION;
  integrationType: IntegrationType;
}

interface Management extends FeatureBase<StrNumBool> {
  type: Type.MANAGEMENT;
}

export type PaymentTypes = PaymentType[];

export enum PaymentType {
  ACH = "ACH",
  CARD = "CARD",
  GATEWAY = "GATEWAY",
  INVOICE = "INVOICE",
  WIRE_TRANSFER = "WIRE_TRANSFER",
  OTHER = "OTHER",
}

interface Support extends FeatureBase<StrNumBool> {
  type: Type.SUPPORT;
}
