import { Dispatch, SetStateAction } from "react";
import { AllFeatures, PaymentTypes, Type, ValueType } from "../../types";

interface DefaultValueProps {
  id: string;
  name: string;
  form: AllFeatures;
  setForm: Dispatch<SetStateAction<AllFeatures>>;
}

export function DefaultValue({ id, name, form, setForm }: DefaultValueProps) {
  if (form.type === Type.Payment) {
    return (
      <select
        value={form.defaultValue}
        onChange={(e) =>
          setForm({
            ...form,
            defaultValue: Array.from(
              e.target.selectedOptions,
              (option) => option.value
            ) as PaymentTypes,
          })
        }
        multiple
      >
        <option value="ACH">ACH</option>
        <option value="CARD">CARD</option>
        <option value="INVOICE">INVOICE</option>
        <option value="WIRE_TRANSFER">WIRE TRANSFER</option>
        <option value="OTHER">OTHER</option>
      </select>
    );
  } else {
    switch (form.valueType) {
      case ValueType.Text:
        return (
          <input
            id={id}
            name={name}
            type="text"
            value={form.defaultValue}
            onChange={(e) => setForm({ ...form, defaultValue: e.target.value })}
          />
        );
      case ValueType.Numeric:
        return (
          <input
            id={id}
            name={name}
            type="number"
            value={form.defaultValue}
            onChange={(e) =>
              setForm({ ...form, defaultValue: e.target.valueAsNumber })
            }
          />
        );
      case ValueType.Boolean:
        return (
          <select
            id={id}
            name={name}
            value={form.defaultValue.toString()}
            onChange={(e) =>
              setForm({ ...form, defaultValue: e.target.value === "true" })
            }
          >
            <option value="">Choose an option</option>
            <option value="true">YES</option>
            <option value="false">NO</option>
          </select>
        );
    }
  }
}
