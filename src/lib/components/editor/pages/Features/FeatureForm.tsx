import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { DefaultValue } from "./DefaultValue";
import { Button } from "../../components/Button";
import { AllFeatures, PaymentType, FeatureType, ValueType } from "../../types";
import { Select } from "../../components/Select";
import { computeFeatureType } from "./utils";
import { AutomationFeature } from "./AutomationFeature";
import { IntegrationFeature } from "./IntegrationFeature";

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
  const [attribute, setAttribute] = useState<AllFeatures>(initialData);
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
    const feature = computeFeatureType(
      attribute,
      e.target.value as FeatureType
    );
    setAttribute(feature);
  };

  const handleValueTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (attribute.type) {
      case FeatureType.Payment: {
        setAttribute({
          ...attribute,
          valueType: ValueType.Text,
          defaultValue: [PaymentType.Ach],
        });

        break;
      }
      case FeatureType.Automation:
      case FeatureType.Domain:
      case FeatureType.Guarantee:
      case FeatureType.Information:
      case FeatureType.Integration:
      case FeatureType.Management:
      case FeatureType.Support: {
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
        <Select
          label="Feature type"
          id="featureType"
          value={attribute.type}
          onChange={handleTypeChange}
          options={[
            { value: FeatureType.Automation, label: FeatureType.Automation },
            { value: FeatureType.Domain, label: FeatureType.Domain },
            { value: FeatureType.Guarantee, label: FeatureType.Guarantee },
            { value: FeatureType.Information, label: FeatureType.Information },
            { value: FeatureType.Integration, label: FeatureType.Integration },
            { value: FeatureType.Management, label: FeatureType.Management },
            { value: FeatureType.Payment, label: FeatureType.Payment },
            { value: FeatureType.Support, label: FeatureType.Support },
          ]}
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

      <div className="pp-form__group">
        <label htmlFor="valueType">Value type</label>
        <select
          id="valueType"
          name="valueType"
          className="pp-form__field"
          value={attribute.valueType}
          onChange={handleValueTypeChange}
          disabled={attribute.type === FeatureType.Payment}
        >
          {attribute.type !== FeatureType.Payment && (
            <option value={ValueType.Boolean}>BOOLEAN</option>
          )}
          <option value={ValueType.Text}>TEXT</option>
          {attribute.type !== FeatureType.Payment && (
            <option value={ValueType.Numeric}>NUMERIC</option>
          )}
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

      {attribute.type === FeatureType.Automation && (
        <AutomationFeature feature={attribute} setFeature={setAttribute} />
      )}

      {attribute.type === FeatureType.Guarantee && (
        <div className="pp-form__group">
          <label htmlFor="docUrl" className="pp-form__label">
            Documentation URL
          </label>
          <input
            id="docUrl"
            name="docUrl"
            className="pp-form__field"
            value={attribute.docUrl}
            onChange={(e) =>
              setAttribute({ ...attribute, docUrl: e.target.value })
            }
          />
        </div>
      )}

      {attribute.type === FeatureType.Integration && (
        <IntegrationFeature feature={attribute} setFeature={setAttribute} />
      )}

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
