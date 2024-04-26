import { Dispatch, SetStateAction, useContext } from "react";
import { EditorContext } from "../../context/EditorContextProvider";
import { PlanFeaturesState, StrNumBool, ValueType } from "../../types/index";
import { PaymentType, PaymentTypes, Type } from "../../types/features";

interface FeatureListProps {
  onFeatureChange: (
    featureName: string,
    value: StrNumBool | PaymentTypes
  ) => void;
}

export function FeatureList({ onFeatureChange }: FeatureListProps) {
  const { attributes } = useContext(EditorContext);

  return (
    <>
      {attributes.map((feature) => {
        if (feature.type === Type.Payment) {
        } else {
          switch (feature.valueType) {
            case ValueType.Text: {
              return (
                <div key={feature.name} className="pp-form__group">
                  <label className="pp-form__label">{feature.name}</label>
                  <input
                    className="pp-form__field"
                    type="text"
                    id={feature.name}
                    name={feature.name}
                    value={feature.defaultValue}
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
                  <label className="pp-form__label">{feature.name}</label>
                  <input
                    className="pp-form__field"
                    type="number"
                    id={feature.name}
                    name={feature.name}
                    value={feature.defaultValue}
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
                  <label>{feature.name}</label>
                  <input
                    type="checkbox"
                    id={feature.name}
                    name={feature.name}
                    checked={feature.defaultValue}
                    onChange={(e) =>
                      onFeatureChange(e.target.name, e.target.value)
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
