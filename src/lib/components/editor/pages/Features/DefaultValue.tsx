import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  AllFeatures,
  PaymentFeature,
  PaymentType,
  PaymentTypes,
  FeatureType,
  ValueType,
} from "../../types";

interface DefaultValueProps {
  id: string;
  name: string;
  form: AllFeatures;
  setForm: Dispatch<SetStateAction<AllFeatures>>;
}

export function DefaultValue({ id, name, form, setForm }: DefaultValueProps) {
  const handlePaymentTypesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedPayments = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    ) as PaymentTypes;
    setForm({
      ...form,
      defaultValue: selectedPayments,
    } as PaymentFeature);
  };

  if (form.type === FeatureType.Payment) {
    return (
      <select
        className="pp-form__field"
        value={form.defaultValue}
        onChange={handlePaymentTypesChange}
        multiple
      >
        <option value={PaymentType.Ach}>ACH</option>
        <option value={PaymentType.Card}>CARD</option>
        <option value={PaymentType.Invoice}>INVOICE</option>
        <option value={PaymentType.WireTransfer}>WIRE TRANSFER</option>
        <option value={PaymentType.Other}>OTHER</option>
      </select>
    );
  } else {
    switch (form.valueType) {
      case ValueType.Text:
        return (
          <input
            id={id}
            name={name}
            className="pp-form__field"
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
            className="pp-form__field"
            type="number"
            min={0}
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
            className="pp-form__field"
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
