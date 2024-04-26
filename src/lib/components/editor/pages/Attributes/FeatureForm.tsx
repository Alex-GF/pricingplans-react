import { ChangeEvent, FormEvent, useState } from "react";
import { DefaultValue } from "./DefaultValue";
import { Button } from "../../components/Button";
import {
  AllFeatures,
  AutomationType,
  IntegrationType,
  PaymentType,
  Type,
  ValueType,
} from "../../types";
import { Select } from "../../components/Select";
import { computeFeatureType } from "./utils";

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
    const feature = computeFeatureType(attribute, e.target.value as Type);
    setAttribute({ ...feature });
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
      <Select
        label="Feature type"
        id="featureType"
        value={attribute.type}
        onChange={handleTypeChange}
        options={[
          { value: Type.Automation, label: Type.Automation },
          { value: Type.Domain, label: Type.Domain },
          { value: Type.Guarantee, label: Type.Guarantee },
          { value: Type.Information, label: Type.Information },
          { value: Type.Integration, label: Type.Integration },
          { value: Type.Management, label: Type.Management },
          { value: Type.Payment, label: Type.Payment },
          { value: Type.Support, label: Type.Support },
        ]}
      />

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
          disabled={attribute.type === Type.Payment}
        >
          {attribute.type !== Type.Payment && (
            <option value={ValueType.Boolean}>BOOLEAN</option>
          )}
          <option value={ValueType.Text}>TEXT</option>
          {attribute.type !== Type.Payment && (
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

      {attribute.type === Type.Automation && (
        <Select
          id="automationType"
          label="Automation type"
          value={attribute.automationType}
          onChange={(e) =>
            setAttribute({
              ...attribute,
              automationType: e.target.value as AutomationType,
            })
          }
          options={[
            { value: AutomationType.Bot, label: AutomationType.Bot },
            {
              value: AutomationType.Filtering,
              label: AutomationType.Filtering,
            },
            {
              value: AutomationType.TaskAutomation,
              label: "TASK AUTOMATION",
            },
            {
              value: AutomationType.Tracking,
              label: AutomationType.Tracking,
            },
          ]}
        />
      )}

      {attribute.type === Type.Guarantee && (
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

      {attribute.type === Type.Integration && (
        <div className="pp-form__group">
          <label htmlFor="integrationType">Integration Type</label>
          <select
            id="integrationType"
            name="integrationType"
            className="pp-form__field"
            value={attribute.integrationType}
            onChange={(e) => {
              const integrationType = e.target.value as IntegrationType;
              if (integrationType === IntegrationType.WebSaaS) {
                setAttribute({
                  ...attribute,
                  integrationType: integrationType,
                  pricingUrls: [""],
                });
                return;
              }

              setAttribute({ ...attribute, integrationType: integrationType });
            }}
          >
            <option value={IntegrationType.API}>API</option>
            <option value={IntegrationType.Extension}>EXTENSION</option>
            <option value={IntegrationType.ExternalDevice}>
              EXTERNAL DEVICE
            </option>
            <option value={IntegrationType.IdentityProvider}>
              IDENTITY PROVIDER
            </option>
            <option value={IntegrationType.Marketplace}>MARKETPLACE</option>
            <option value={IntegrationType.WebSaaS}>WEB SAAS</option>
          </select>
        </div>
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
