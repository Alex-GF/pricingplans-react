import { StrNumBool, ValueType } from "../types/index";
import {
  AutomationType,
  IntegrationType,
  PaymentTypes,
  Type,
} from "../types/features";

export type AllFeatures =
  | AutomationFeature
  | DomainFeature
  | GuaranteeFeature
  | InformationFeature
  | IntegrationFeature
  | ManagementFeature
  | PaymentFeature
  | SupportFeature;

abstract class StandardFeature {
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
  #automationType: AutomationType;

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
    this.#automationType = automationType;
  }

  get automationType() {
    return this.#automationType;
  }

  set automationType(automationType: AutomationType) {
    this.#automationType = automationType;
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
