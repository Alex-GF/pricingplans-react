import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../../components/Button";
import { UserContextAttribute, computeType } from "../../parsers/expression";

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
      valueType: computeType(e.target.value),
    });

  return (
    <form className="pp-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={userAttribute.name}
        onChange={handleNameChange}
      />
      <label htmlFor="type">Type</label>
      <select
        id="type"
        name="type"
        value={userAttribute.valueType}
        onChange={handleTypeChange}
      >
        <option value="NUMERIC">NUMERIC</option>
        <option value="TEXT">TEXT</option>
        <option value="CONDITION">CONDITION</option>
      </select>
      <Button className="pp-btn">Save</Button>
    </form>
  );
}
