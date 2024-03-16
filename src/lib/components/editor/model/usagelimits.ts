import { UsageLimit, UsageLimitType } from "../types/index";
import { StrNumBool } from "../types/index";
import { ValueType } from "../types/index";

export abstract class StandarUsageLimit implements UsageLimit {
  private _name: string;
  private _description: string;
  private _unit: string;
  private _linkedFeatures: string[];
  private _valueType: ValueType;
  private _defaultValue: StrNumBool;
  private _value: StrNumBool | null;
  private _expression: string;
  private _serverExpression: string;
  private _type: UsageLimitType;

  constructor(
    name: string,
    description: string,
    unit: string,
    linkedFeatures: string[],
    expression: string,
    serverExpression: string,
    defaultValue: StrNumBool,
    type: UsageLimitType,
    value?: StrNumBool
  ) {
    this._validateName(name.trim());
    this._name = name;
    this._description = description;
    this._unit = unit;
    this._linkedFeatures = linkedFeatures;
    this._valueType = this._computeValueType(defaultValue);
    this._expression = expression;
    this._serverExpression = serverExpression;
    this._defaultValue = defaultValue;
    if (value) {
      this._value = value;
    } else {
      this._value = null;
    }
    this._type = type;
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    const cleanName = name.trim();
    this._validateName(cleanName);
    this._name = name;
  }

  get description() {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  get unit() {
    return this._unit;
  }

  set unit(unit: string) {
    this._unit = unit;
  }

  get linkedFeatures() {
    return this._linkedFeatures;
  }

  set linkedFeatures(linkedFeatures: string[]) {
    this._linkedFeatures = linkedFeatures;
  }

  get valueType() {
    return this._valueType;
  }

  private _validateName(name: string) {
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
    return this._defaultValue;
  }

  set defaultValue(defaultValue: StrNumBool) {
    this._valueType = this._computeValueType(defaultValue);
    this._defaultValue = defaultValue;
    this._value = null;
  }

  get value() {
    return this._value;
  }

  set value(value: StrNumBool | null) {
    this._value = value;
  }

  get expression() {
    return this._expression;
  }

  set expression(expression: string) {
    this._expression = expression;
  }

  get serverExpression() {
    return this._serverExpression;
  }

  set serverExpression(serverExpression: string) {
    this._serverExpression = serverExpression;
  }

  get type() {
    return this._type;
  }

  toString() {
    return `Name: ${this._name} Type: ${this._type}`;
  }

  private _computeValueType(defaultValue: StrNumBool): ValueType {
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

export class Renewable extends StandarUsageLimit {
  constructor(
    name: string,
    description: string,
    unit: string,
    linkedFeatures: string[],
    expression: string,
    serverExpression: string,
    defaultValue: StrNumBool,
    value?: StrNumBool | undefined
  ) {
    super(
      name,
      description,
      unit,
      linkedFeatures,
      expression,
      serverExpression,
      defaultValue,
      UsageLimitType.RENEWABLE,
      value
    );
  }
}
export class NonRenewable extends StandarUsageLimit {
  constructor(
    name: string,
    description: string,
    unit: string,
    linkedFeatures: string[],
    expression: string,
    serverExpression: string,
    defaultValue: StrNumBool,
    value?: StrNumBool | undefined
  ) {
    super(
      name,
      description,
      unit,
      linkedFeatures,
      expression,
      serverExpression,
      defaultValue,
      UsageLimitType.NON_RENEWABLE,
      value
    );
  }
}
export class TimeDriven extends StandarUsageLimit {
  constructor(
    name: string,
    description: string,
    unit: string,
    linkedFeatures: string[],
    expression: string,
    serverExpression: string,
    defaultValue: StrNumBool,
    value?: StrNumBool | undefined
  ) {
    super(
      name,
      description,
      unit,
      linkedFeatures,
      expression,
      serverExpression,
      defaultValue,
      UsageLimitType.TIME_DRIVEN,
      value
    );
  }
}
export class ResponseDriven extends StandarUsageLimit {
  constructor(
    name: string,
    description: string,
    unit: string,
    linkedFeatures: string[],
    expression: string,
    serverExpression: string,
    defaultValue: StrNumBool,
    value?: StrNumBool | undefined
  ) {
    super(
      name,
      description,
      unit,
      linkedFeatures,
      expression,
      serverExpression,
      defaultValue,
      UsageLimitType.RESPONSE_DRIVEN,
      value
    );
  }
}
