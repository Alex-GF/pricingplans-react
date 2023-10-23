import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Attribute, AttributeType } from "../../types";
import { DefaultValue } from "./DefaultValue";
import { Button } from "../../components/Button";
import { EditorContext } from "../../context/EditorContextProvider";

interface AttributeFormProps {
  initialData: Attribute;
  onValidation: (name: string) => boolean;
  onSubmit: (attribute: Attribute) => void;
}

export function AttributeForm({
  initialData,
  onSubmit,
  onValidation,
}: AttributeFormProps) {
  const { plans, setPlans } = useContext(EditorContext);
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({
    nameIsEmpty: false,
    defaultValueIsEmpty: false,
    duplicatedAttribute: false,
  });

  const nameIsEmpty = form.id === "";
  const defaultValueIsEmpty = form.defaultValue === "";
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  const duplicatedAttribute = onValidation(form.id);

  const updatePlanAttributes = () => {
    const updatedPlans = plans.map((plan) => {
      const features = {
        ...plan.features,
        [form.id]: { value: form.defaultValue },
      };
      return { ...plan, features };
    });
    setPlans(updatedPlans);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!hasErrors) {
      onSubmit(form);
      updatePlanAttributes();
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, id: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, description: e.target.value });

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setForm({
      ...form,
      type: e.target.value as AttributeType,
      defaultValue: "",
    });

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
                  Cannot add <strong>{form.id}</strong>. Attribute name is
                  duplicated
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
          value={form.id}
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
          value={form.description}
          onChange={handleDescriptionChange}
        />
      </div>

      <div>
        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          value={form.type}
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
          form={form}
          setForm={setForm}
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
