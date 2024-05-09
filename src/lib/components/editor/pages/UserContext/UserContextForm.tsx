import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../../components/Button";
import { UserContextAttribute } from "../../parsers/expression";
import { ValueType } from "../../types";

interface UserContextFormProps {
  initialData: UserContextAttribute;
  onSubmit: (attribute: UserContextAttribute) => void;
}

export function UserContextForm({
  initialData,
  onSubmit,
}: UserContextFormProps) {
  const [userAttribute, setUserAttribute] = useState(initialData);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit(userAttribute);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAttribute({ ...userAttribute, name: e.target.value });
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserAttribute({
      ...userAttribute,
      valueType: e.target.value as ValueType,
    });

  return (
    <form className="pp-form" onSubmit={handleSubmit}>
      <div className="pp-form__group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          className="pp-form__field"
          value={userAttribute.name}
          onChange={handleNameChange}
        />
      </div>

      <label htmlFor="valueType">Type</label>
      <select
        id="valueType"
        name="valueType"
        value={userAttribute.valueType}
        onChange={handleTypeChange}
      >
        <option value={ValueType.Numeric}>NUMERIC</option>
        <option value={ValueType.Text}>TEXT</option>
        <option value={ValueType.Boolean}>BOOLEAN</option>
      </select>
      <Button className="pp-btn">Save</Button>
    </form>
  );
}
