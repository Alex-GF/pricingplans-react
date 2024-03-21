import { FeatureOverwrite, StrNumBool, Value, ValueType } from "../types/index";

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
  AUTOMATION,
  DOMAIN,
  GUARANTEE,
  INFORMATION,
  INTEGRATION,
  MANAGEMENT,
  PAYMENT,
  SUPPORT,
}

export enum AutomationType {
  BOT,
  FILTERING,
  TRACKING,
  TASK_AUTOMATION,
}

type AutomationTypes = keyof typeof AutomationType;

type Automation = {
  type: Type.AUTOMATION;
  automationType: AutomationTypes;
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
  API,
  EXTENSION,
  EXTERNAL_DEVICE,
  IDENTITY_PROVIDER,
  MARKETPLACE,
  WEB_SAAS,
}

type Integration = FeatureBase & {
  type: Type.INTEGRATION;
  integrationType: keyof typeof IntegrationType;
};

type Management = FeatureBase & {
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

type Payment = Value<PaymentTypes> & {
  description: string;
  type: Type.PAYMENT;
  expression: string;
  serverExpression: string;
};

type Support = FeatureBase & {
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

export abstract class StandardFeature {
  #name: string;
  #description: string;
  #valueType: ValueType;
  #defaultValue: StrNumBool | PaymentTypes;
  #value: StrNumBool | PaymentTypes | null;
  #expression: string;
  #serverExpression: string;
  #type: Type;

  constructor(
    name: string,
    description: string,
    expression: string,
    serverExpression: string,
    defaultValue: StrNumBool | PaymentTypes,
    type: Type,
    value?: StrNumBool | PaymentTypes
  ) {
    this.validateName(name.trim());
    this.#name = name;
    this.#description = description;
    this.#valueType = this.computeValueType(defaultValue);
    this.#expression = expression;
    this.#serverExpression = serverExpression;
    this.#defaultValue = defaultValue;
    if (value) {
      this.#value = value;
    } else {
      this.#value = null;
    }
    this.#type = type;
  }

  get name() {
    return this.#name;
  }

  set name(name: string) {
    const cleanName = name.trim();
    this.validateName(cleanName);
    this.#name = name;
  }

  get description() {
    return this.#description;
  }

  set description(description: string) {
    this.#description = description;
  }

  get valueType() {
    return this.#valueType;
  }

  private validateName(name: string) {
    if (name === "") {
      throw new Error("The feature name must not be empty");
    }

    if (name.length < 3) {
      throw new Error("The feature name must have at least 3 characters");
    }

    if (name.length > 50) {
      throw new Error("The feature name must have at most 50 characters");
    }
  }

  get defaultValue() {
    return this.#defaultValue;
  }

  set defaultValue(defaultValue: StrNumBool | PaymentTypes) {
    this.#valueType = this.computeValueType(defaultValue);
    this.#defaultValue = defaultValue;
    this.#value = null;
  }

  get value() {
    return this.#value;
  }

  set value(value: StrNumBool | PaymentTypes | null) {
    this.#value = value;
  }

  get type() {
    return this.#type;
  }

  get expression() {
    return this.#expression;
  }

  set expression(expression: string) {
    this.#expression = expression;
  }

  get serverExpression() {
    return this.#serverExpression;
  }

  set serverExpression(serverExpression: string) {
    this.#serverExpression = serverExpression;
  }

  toString() {
    return `Name: ${this.#name} Type: ${this.#type}`;
  }

  private computeValueType(defaultValue: StrNumBool | PaymentTypes): ValueType {
    switch (typeof defaultValue) {
      case "boolean":
        return ValueType.BOOLEAN;
      case "number":
        return ValueType.NUMERIC;
      default:
        return ValueType.TEXT;
    }
  }
}

export class AutomationFeature extends StandardFeature {
  private _automationType: AutomationType;

  constructor(
    name: string,
    description: string,
    expression: string,
    serverExpresssion: string,
    automationType: AutomationType,
    defaultValue: StrNumBool,
    value?: StrNumBool
  ) {
    super(
      name,
      description,
      expression,
      serverExpresssion,
      defaultValue,
      Type.AUTOMATION,
      value
    );
    this._automationType = automationType;
  }

  get automationType() {
    return this._automationType;
  }

  set automationType(automationType: AutomationType) {
    this.automationType = automationType;
  }
}

export class DomainFeature extends StandardFeature {
  constructor(
    name: string,
    description: string,
    expression: string,
    serverExpresssion: string,
    defaultValue: StrNumBool,
    value?: StrNumBool
  ) {
    super(
      name,
      description,
      expression,
      serverExpresssion,
      defaultValue,
      Type.DOMAIN,
      value
    );
  }
}

export class GuaranteeFeature extends StandardFeature {
  #docUrl: string;
  constructor(
    name: string,
    description: string,
    expression: string,
    serverExpresssion: string,
    docUrl: string,
    defaultValue: StrNumBool,
    value?: StrNumBool
  ) {
    super(
      name,
      description,
      expression,
      serverExpresssion,
      defaultValue,
      Type.GUARANTEE,
      value
    );
    this.#docUrl = docUrl;
  }

  get docUrl() {
    return this.#docUrl;
  }

  set docUrl(docUrl: string) {
    this.#docUrl = docUrl;
  }
}

export class InformationFeature extends StandardFeature {
  constructor(
    name: string,
    description: string,
    expression: string,
    serverExpresssion: string,
    defaultValue: StrNumBool,
    value?: StrNumBool
  ) {
    super(
      name,
      description,
      expression,
      serverExpresssion,
      defaultValue,
      Type.INFORMATION,
      value
    );
  }
}

export class IntegrationFeature extends StandardFeature {
  #integrationType: IntegrationType;
  constructor(
    name: string,
    description: string,
    expression: string,
    serverExpresssion: string,
    integrationType: IntegrationType,
    defaultValue: StrNumBool,
    value?: StrNumBool
  ) {
    super(
      name,
      description,
      expression,
      serverExpresssion,
      defaultValue,
      Type.INTEGRATION,
      value
    );
    this.#integrationType = integrationType;
  }

  get integrationType() {
    return this.#integrationType;
  }
}

export class ManagementFeature extends StandardFeature {
  constructor(
    name: string,
    description: string,
    expression: string,
    serverExpresssion: string,
    defaultValue: StrNumBool,
    value?: StrNumBool
  ) {
    super(
      name,
      description,
      expression,
      serverExpresssion,
      defaultValue,
      Type.MANAGEMENT,
      value
    );
  }
}

export class PaymentFeature extends StandardFeature {
  constructor(
    name: string,
    description: string,
    expression: string,
    serverExpresssion: string,
    defaultValue: PaymentTypes,
    value?: StrNumBool
  ) {
    super(
      name,
      description,
      expression,
      serverExpresssion,
      defaultValue,
      Type.PAYMENT,
      value
    );
  }
}

export class SupportFeature extends StandardFeature {
  constructor(
    name: string,
    description: string,
    expression: string,
    serverExpresssion: string,
    defaultValue: StrNumBool,
    value?: StrNumBool
  ) {
    super(
      name,
      description,
      expression,
      serverExpresssion,
      defaultValue,
      Type.SUPPORT,
      value
    );
  }
}
