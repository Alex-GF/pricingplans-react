import { ChangeEvent, FormEvent, useState } from "react";
import { DefaultValue } from "./DefaultValue";
import { Button } from "../../components/Button";
import { AllFeatures, Type, ValueType } from "../../types";

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
      case Type.Payment: {
        setAttribute({
          ...attribute,
          valueType: ValueType.Text,
          defaultValue: ["ACH"],
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
          ...computeType(e.target.value),
        });
      }
    }
  };

  const computeType = (
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
        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          value={attribute.type}
          onChange={handleTypeChange}
        >
          <option value="NUMERIC">NUMERIC</option>
          <option value="TEXT">TEXT</option>
          <option value="CONDITION">CONDITION</option>
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
