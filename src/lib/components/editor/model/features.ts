import { FeatureOverwrite, StrNumBool, Value, ValueType } from "../types/index";

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

type FeatureSkipName<T extends StrNumBool | PaymentTypes> = Omit<
  FeatureBase<T>,
  "name"
>;

type FeatureBase<T extends StrNumBool | PaymentTypes> = {
  name: string;
  description: string;
  valueType: T extends StrNumBool ? ValueType : ValueType.TEXT;
  defaultValue: T extends StrNumBool ? T : PaymentTypes;
  type: T extends StrNumBool ? Exclude<Type, Type.PAYMENT> : Type.PAYMENT;
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

export interface Automation extends FeatureSkipName<StrNumBool> {
  type: Type.AUTOMATION;
  automationType: AutomationTypes;
}

export interface Domain extends FeatureSkipName<StrNumBool> {
  type: Type.DOMAIN;
}

export interface Guarantee extends FeatureSkipName<StrNumBool> {
  type: Type.GUARANTEE;
  docUrl: string;
}

export interface Information extends FeatureSkipName<StrNumBool> {
  type: Type.INFORMATION;
}

export enum IntegrationType {
  API,
  EXTENSION,
  EXTERNAL_DEVICE,
  IDENTITY_PROVIDER,
  MARKETPLACE,
  WEB_SAAS,
}

type IntegrationTypes = keyof typeof IntegrationType;

export interface Integration extends FeatureSkipName<StrNumBool> {
  type: Type.INTEGRATION;
  integrationType: IntegrationTypes;
}

export interface Management extends FeatureSkipName<StrNumBool> {
  type: Type.MANAGEMENT;
}

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

export interface Payment extends FeatureSkipName<PaymentTypes> {}

export interface Support extends FeatureSkipName<StrNumBool> {
  type: Type.SUPPORT;
}

export interface AutomationFeature extends FeatureBase<StrNumBool> {
  type: Type.AUTOMATION;
  automationType: AutomationTypes;
}

export interface DomainFeature extends FeatureBase<StrNumBool> {
  type: Type.DOMAIN;
}

export interface GuaranteeFeature extends FeatureBase<StrNumBool> {
  type: Type.GUARANTEE;
  docUrl: string;
}

export interface InformationFeature extends FeatureBase<StrNumBool> {
  type: Type.INFORMATION;
}

export interface IntegrationFeature extends FeatureBase<StrNumBool> {
  type: Type.INTEGRATION;
  integrationType: IntegrationTypes;
}

export interface ManagementFeature extends FeatureBase<StrNumBool> {
  type: Type.MANAGEMENT;
}

export interface PaymentFeature extends FeatureBase<PaymentTypes> {}

export interface SupportFeature extends FeatureBase<StrNumBool> {
  type: Type.SUPPORT;
}

export type AllFeatures =
  | AutomationFeature
  | DomainFeature
  | GuaranteeFeature
  | InformationFeature
  | IntegrationFeature
  | ManagementFeature
  | PaymentFeature
  | SupportFeature;
