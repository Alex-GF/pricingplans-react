<<<<<<< HEAD
import { Value, ValueType } from "./index";
=======
import { StrNumBool, Value, ValueType } from "./index";
>>>>>>> 77185c663975e1c317d1182f3bf5f785017d3813

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

<<<<<<< HEAD
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
=======
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
>>>>>>> 77185c663975e1c317d1182f3bf5f785017d3813

export enum IntegrationType {
  API = "API",
  EXTENSION = "EXTENSION",
  EXTERNAL_DEVICE = "EXTERNAL_DEVICE",
  IDENTITY_PROVIDER = "IDENTITY_PROVIDER",
  MARKETPLACE = "MARKETPLACE",
  WEB_SAAS = "WEB_SAAS",
}

<<<<<<< HEAD
type Integration = FeatureBase & {
  type: Type.INTEGRATION;
  integrationType: keyof typeof IntegrationType;
};

type Management = FeatureBase & {
  type: Type.MANAGEMENT;
};

export type PaymentTypes = [keyof typeof PaymentType];
=======
interface Integration extends FeatureBase<StrNumBool> {
  type: Type.INTEGRATION;
  integrationType: IntegrationType;
}

interface Management extends FeatureBase<StrNumBool> {
  type: Type.MANAGEMENT;
}

export type PaymentTypes = PaymentType[];
>>>>>>> 77185c663975e1c317d1182f3bf5f785017d3813

export enum PaymentType {
  ACH = "ACH",
  CARD = "CARD",
  GATEWAY = "GATEWAY",
  INVOICE = "INVOICE",
  WIRE_TRANSFER = "WIRE_TRANSFER",
  OTHER = "OTHER",
}

<<<<<<< HEAD
type Payment = Value<PaymentTypes> & {
  description: string;
  type: Type.PAYMENT;
  expression: string;
  serverExpression: string;
};

type Support = FeatureBase & {
  type: Type.SUPPORT;
};
=======
interface Support extends FeatureBase<StrNumBool> {
  type: Type.SUPPORT;
}
>>>>>>> 77185c663975e1c317d1182f3bf5f785017d3813
