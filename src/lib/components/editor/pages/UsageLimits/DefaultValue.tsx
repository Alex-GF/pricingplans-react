import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { UsageLimitBase, ValueType } from "../../types";

interface DefaultValueProps {
  id: string;
  name: string;
  usageLimit: UsageLimitBase;
  setUsageLimit: Dispatch<SetStateAction<UsageLimitBase>>;
}

export function DefaultValue({
  id,
  name,
  usageLimit,
  setUsageLimit,
}: DefaultValueProps) {
  const handleNumericChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setUsageLimit({ ...usageLimit, defaultValue: 0 });
    } else {
      setUsageLimit({
        ...usageLimit,
        defaultValue: e.target.valueAsNumber,
      });
    }
  };
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUsageLimit({ ...usageLimit, defaultValue: e.target.value });

  const handleBooleanChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setUsageLimit({
      ...usageLimit,
      defaultValue: e.target.value === "true",
    });

  switch (usageLimit.valueType) {
    case ValueType.Text:
      return (
        <input
          id={id}
          name={name}
          className="pp-form__field"
          type="text"
          value={usageLimit.defaultValue as string}
          onChange={handleTextChange}
        />
      );
    case ValueType.Numeric:
      return (
        <input
          id={id}
          name={name}
          className="pp-form__field"
          type="number"
          min={0}
          value={usageLimit.defaultValue as number}
          onChange={handleNumericChange}
        />
      );
    case ValueType.Boolean:
      return (
        <select
          id={id}
          name={name}
          className="pp-form__field"
          value={usageLimit.defaultValue.toString()}
          onChange={handleBooleanChange}
        >
          <option value="true">YES</option>
          <option value="false">NO</option>
        </select>
      );
  }
}
