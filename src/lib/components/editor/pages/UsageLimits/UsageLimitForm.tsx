import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { UsageLimitBase, UsageLimitType, ValueType } from "../../types";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import { DefaultValue } from "./DefaultValue";
import { EditorContext } from "../../context/EditorContextProvider";

interface UsageLimitProps {
  initialData: UsageLimitBase;
  onValidation: (name: string) => boolean;
  onSubmit: (attribute: UsageLimitBase) => void;
}

export function UsageLimitForm({
  initialData,
  onSubmit,
  onValidation,
}: UsageLimitProps) {
  const { attributes } = useContext(EditorContext);
  const [usageLimit, setUsageLimit] = useState<UsageLimitBase>(initialData);
  const [errors, setErrors] = useState({
    nameIsEmpty: false,
    defaultValueIsEmpty: false,
    duplicatedAttribute: false,
  });
  const [linkedTo, setLinkedTo] = useState(
    initialData.linkedFeatures === null ? "plan" : "features"
  );

  const nameIsEmpty = usageLimit.name === "";
  const defaultValueIsEmpty = usageLimit.defaultValue === "";
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  const duplicatedUsageLimit = onValidation(usageLimit.name);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!hasErrors) {
      onSubmit(usageLimit);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsageLimit({ ...usageLimit, [e.target.name]: e.target.value });
  };

  const handleLinkedToChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "plan") {
      setUsageLimit({ ...usageLimit, linkedFeatures: null });
    } else {
      setUsageLimit({ ...usageLimit, linkedFeatures: [] });
    }
    setLinkedTo(e.target.value);
  };

  const handleLinkedFeaturesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedFeatures = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setUsageLimit({ ...usageLimit, linkedFeatures: selectedFeatures });
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setUsageLimit({
      ...usageLimit,
      type: e.target.value as UsageLimitType,
    });

  const handleValueTypeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setUsageLimit({
      ...usageLimit,
      ...computeValueType(e.target.value),
    });

  const computeValueType = (
    type: string
  ):
    | { valueType: ValueType.Boolean; defaultValue: false }
    | { valueType: ValueType.Text; defaultValue: "" }
    | { valueType: ValueType.Numeric; defaultValue: 0 } => {
    if (type === ValueType.Boolean) {
      return { valueType: ValueType.Boolean, defaultValue: false };
    } else if (type === ValueType.Text) {
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
                  Usage limit name is <strong>required</strong>{" "}
                </span>
              )}
              {errors.duplicatedAttribute && (
                <span>
                  Cannot add <strong>{usageLimit.name}</strong>. Usage limit
                  name is duplicated
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
          value={usageLimit.name}
          onChange={handleChange}
        />
      </div>

      <div className="pp-form__group">
        <label htmlFor="linkedTo">Linked to</label>
        <select
          id="linkedTo"
          name="linkedTo"
          className="pp-form__field"
          value={linkedTo}
          onChange={handleLinkedToChange}
        >
          <option value="plan">PLAN</option>
          <option value="features">FEATURES</option>
        </select>
      </div>

      {usageLimit.linkedFeatures ? (
        <div className="pp-form__group">
          <label htmlFor="linkedFeatures">Linked features</label>
          <select
            id="linkedFeatures"
            name="linkedFeatures"
            className="pp-form__field"
            value={usageLimit.linkedFeatures}
            onChange={handleLinkedFeaturesChange}
            multiple
          >
            {attributes.map((feature) => (
              <option key={feature.name} value={feature.name}>
                {feature.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>Usage limit is currently linked to Plans or AddOns</p>
      )}

      <div className="pp-form__group">
        <Select
          label="Usage limit type"
          id="usageLimitType"
          value={usageLimit.type}
          onChange={handleTypeChange}
          options={[
            { value: UsageLimitType.NonRenewable, label: "NON RENEWABLE" },
            {
              value: UsageLimitType.Renewable,
              label: UsageLimitType.Renewable,
            },
            { value: UsageLimitType.ResponseDriven, label: "RESPONSE DRIVEN" },
            { value: UsageLimitType.TimeDriven, label: "TIME DRIVEN" },
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
          value={usageLimit.description}
          onChange={handleChange}
        />
      </div>

      <div className="pp-form__group">
        <label htmlFor="valueType">Value type</label>
        <select
          id="valueType"
          name="valueType"
          className="pp-form__field"
          value={usageLimit.valueType}
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
                Usage limit default value is <strong>required</strong>
              </span>
            )}
          </div>
        )}
        <label htmlFor="default">Default value</label>
        <DefaultValue
          id="default"
          name="default"
          usageLimit={usageLimit}
          setUsageLimit={setUsageLimit}
        />
      </div>

      <div className="pp-form__group">
        <label htmlFor="unit" className="pp-form__label">
          Unit
        </label>
        <input
          id="unit"
          name="unit"
          className="pp-form__field"
          value={usageLimit.unit}
          onChange={handleChange}
        />
      </div>

      <Button
        className="pp-btn"
        onClick={() =>
          setErrors({
            nameIsEmpty,
            defaultValueIsEmpty,
            duplicatedAttribute: duplicatedUsageLimit,
          })
        }
      >
        Save
      </Button>
    </form>
  );
}
