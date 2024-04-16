import { ChangeEvent, FormEvent, useState } from "react";
import { DefaultValue } from "./DefaultValue";
import { Button } from "../../components/Button";
import {
  AllFeatures,
  IntegrationType,
  PaymentType,
  Type,
  ValueType,
} from "../../types";

interface FeatureFormProps {
  initialData: AllFeatures;
  onValidation: (name: string) => boolean;
  onSubmit: (attribute: AllFeatures) => void;
}

export function FeatureForm({
  initialData,
  onSubmit,
  onValidation,
}: FeatureFormProps) {
  const [attribute, setAttribute] = useState(initialData);
  const [errors, setErrors] = useState({
    nameIsEmpty: false,
    defaultValueIsEmpty: false,
    duplicatedAttribute: false,
  });

  const nameIsEmpty = attribute.name === "";
  const defaultValueIsEmpty = attribute.defaultValue === "";
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  const duplicatedAttribute = onValidation(attribute.name);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!hasErrors) {
      onSubmit(attribute);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttribute({ ...attribute, name: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) =>
    setAttribute({ ...attribute, description: e.target.value });

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (attribute.type) {
      case Type.Automation: {
        const { automationType, type, ...rest } = attribute;
        switch (e.target.value as Type) {
          case Type.Automation:
            return;
          case Type.Domain:
            setAttribute({ ...rest, type: Type.Domain });

          case Type.Guarantee:
            setAttribute({ ...rest, type: Type.Guarantee, docUrl: "" });
          case Type.Integration:
            setAttribute({
              ...rest,
              type: Type.Integration,
              integrationType: IntegrationType.API,
            });
          case Type.Information:
            setAttribute({ ...rest, type: Type.Information });

          case Type.Management:
            setAttribute({ ...rest, type: Type.Management });

          case Type.Support:
            setAttribute({ ...rest, type: Type.Support });
        }
      }
    }
  };

  const handleValueTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (attribute.type) {
      case Type.Payment: {
        setAttribute({
          ...attribute,
          valueType: ValueType.Text,
          defaultValue: [PaymentType.Ach],
        });
        break;
      }
      case Type.Automation:
      case Type.Domain:
      case Type.Guarantee:
      case Type.Information:
      case Type.Integration:
      case Type.Management:
      case Type.Support: {
        setAttribute({
          ...attribute,
          ...computeValueType(e.target.value),
        });
      }
    }
  };

  const computeValueType = (
    type: string
  ):
    | { valueType: ValueType.Boolean; defaultValue: false }
    | { valueType: ValueType.Text; defaultValue: "" }
    | { valueType: ValueType.Numeric; defaultValue: 0 } => {
    if (type === "BOOLEAN") {
      return { valueType: ValueType.Boolean, defaultValue: false };
    } else if (type === "TEXT") {
      return { valueType: ValueType.Text, defaultValue: "" };
    } else {
      return { valueType: ValueType.Numeric, defaultValue: 0 };
    }
  };

  return (
    <form className="pp-form" onSubmit={handleSubmit}>
      <div className="pp-form__group">
        {errors.nameIsEmpty ||
          (errors.duplicatedAttribute && (
            <div className="pp-form__errors">
              {errors.nameIsEmpty && (
                <span>
                  Attribute name is <strong>required</strong>{" "}
                </span>
              )}
              {errors.duplicatedAttribute && (
                <span>
                  Cannot add <strong>{attribute.name}</strong>. Attribute name
                  is duplicated
                </span>
              )}
            </div>
          ))}
        <label htmlFor="name" className="pp-form__label">
          Name
        </label>
        <input
          id="name"
          name="name"
          className="pp-form__field"
          value={attribute.name}
          onChange={handleNameChange}
        />
      </div>
      <div className="pp-form__group">
        <label htmlFor="type" className="pp-form__label">
          Type
        </label>
        <select
          id="type"
          name="type"
          className="pp-form__field"
          value={attribute.type}
          onChange={() => console.log("Hello world")}
        >
          <option value={Type.Automation}>AUTOMATION</option>
          <option value={Type.Domain}>DOMAIN</option>
          <option value={Type.Guarantee}>GUARANTEE</option>
          <option value={Type.Information}>INFORMATION</option>
          <option value={Type.Integration}>INTEGRATION</option>
          <option value={Type.Management}>MANAGEMENT</option>
          <option value={Type.Payment}>PAYMENT</option>
          <option value={Type.Support}>SUPPORT</option>
        </select>
      </div>
      <div className="pp-form__group">
        <label htmlFor="description" className="pp-form__label">
          Description
        </label>
        <input
          id="description"
          name="description"
          className="pp-form__field"
          value={attribute.description}
          onChange={handleDescriptionChange}
        />
      </div>

      <div>
        <label htmlFor="valueType">Value type</label>
        <select
          id="valueType"
          name="valueType"
          value={attribute.valueType}
          onChange={handleValueTypeChange}
        >
          <option value={ValueType.Boolean}>BOOLEAN</option>
          <option value={ValueType.Text}>TEXT</option>
          <option value={ValueType.Numeric}>NUMERIC</option>
        </select>
      </div>

      <div>
        {hasErrors && (
          <div className="pp-form__errors">
            {errors.defaultValueIsEmpty && (
              <span>
                Attribute default value is <strong>required</strong>
              </span>
            )}
          </div>
        )}
        <label htmlFor="default">Default value</label>
        <DefaultValue
          id="default"
          name="default"
          form={attribute}
          setForm={setAttribute}
        />
      </div>
      <Button
        className="pp-btn"
        onClick={() =>
          setErrors({ nameIsEmpty, defaultValueIsEmpty, duplicatedAttribute })
        }
      >
        Save
      </Button>
    </form>
  );
}
