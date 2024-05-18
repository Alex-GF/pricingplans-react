import { ChangeEvent, useContext } from "react";
import { EditorContext } from "../context/EditorContextProvider";
import {
  ParsedOverwrittenFeatures,
  StrNumBool,
  ValueType,
} from "../types/index";
import { PaymentType, PaymentTypes, FeatureType } from "..//types/features";

interface FeatureListProps {
  values: ParsedOverwrittenFeatures;
  onFeatureChange: (
    featureName: string,
    value: StrNumBool | PaymentTypes
  ) => void;
}

export function FeatureList({ values, onFeatureChange }: FeatureListProps) {
  const { attributes } = useContext(EditorContext);

  const handlePaymentTypesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedPayments = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    ) as PaymentTypes;
    onFeatureChange(e.target.name, selectedPayments);
  };
  return (
    <>
      {attributes.map((feature, index) => {
        if (feature.type === FeatureType.Payment) {
          return (
            <div className="pp-form__group">
              <label htmlFor={feature.name} className="pp-form__label">
                Defaut Value
              </label>
              <select
                id={feature.name}
                name={feature.name}
                className="pp-form__field"
                value={values[index].value as PaymentTypes}
                onChange={handlePaymentTypesChange}
                multiple
              >
                <option value={PaymentType.Ach}>ACH</option>
                <option value={PaymentType.Card}>CARD</option>
                <option value={PaymentType.Invoice}>INVOICE</option>
                <option value={PaymentType.WireTransfer}>WIRE TRANSFER</option>
                <option value={PaymentType.Other}>OTHER</option>
              </select>
            </div>
          );
        } else {
          switch (feature.valueType) {
            case ValueType.Text: {
              return (
                <div key={feature.name} className="pp-form__group">
                  <label htmlFor={feature.name} className="pp-form__label">
                    {feature.name}
                  </label>
                  <input
                    className="pp-form__field"
                    type="text"
                    id={feature.name}
                    name={feature.name}
                    value={values[index].value as string}
                    onChange={(e) =>
                      onFeatureChange(e.target.name, e.target.value)
                    }
                  />
                </div>
              );
            }
            case ValueType.Numeric: {
              return (
                <div key={feature.name} className="pp-form__group">
                  <label htmlFor={feature.name} className="pp-form__label">
                    {feature.name}
                  </label>
                  <input
                    className="pp-form__field"
                    type="number"
                    id={feature.name}
                    name={feature.name}
                    value={values[index].value as number}
                    onChange={(e) =>
                      onFeatureChange(e.target.name, e.target.value)
                    }
                  />
                </div>
              );
            }
            case ValueType.Boolean: {
              return (
                <div key={feature.name}>
                  <label htmlFor={feature.name}>{feature.name}</label>
                  <input
                    type="checkbox"
                    id={feature.name}
                    name={feature.name}
                    checked={values[index]?.value as boolean}
                    onChange={(e) =>
                      onFeatureChange(e.target.name, e.target.checked)
                    }
                  />
                </div>
              );
            }
          }
        }
      })}
    </>
  );
}
