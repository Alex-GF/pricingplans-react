import { useContext } from "react";
import { EditorContext } from "../../context/EditorContextProvider";
import { ValueType } from "../../types/index";
import { Type } from "../../types/features";

export function FeatureList() {
  const { attributes } = useContext(EditorContext);

  return (
    <>
      {attributes.map((feature) => {
        if (feature.type === Type.PAYMENT) {
        } else {
          switch (feature.valueType) {
            case ValueType.TEXT: {
              return (
                <div key={feature.name} className="pp-form__group">
                  <label className="pp-form__label">{feature.name}</label>
                  <input
                    className="pp-form__field"
                    type="text"
                    id={feature.name}
                    name={feature.name}
                    value={feature.defaultValue}
                  />
                </div>
              );
            }
            case ValueType.NUMERIC: {
              return (
                <div key={feature.name} className="pp-form__group">
                  <label className="pp-form__label">{feature.name}</label>
                  <input
                    className="pp-form__field"
                    type="number"
                    id={feature.name}
                    name={feature.name}
                    value={feature.defaultValue}
                  />
                </div>
              );
            }
            case ValueType.BOOLEAN: {
              return (
                <div key={feature.name}>
                  <label>{feature.name}</label>
                  <input
                    type="checkbox"
                    id={feature.name}
                    name={feature.name}
                    checked={feature.defaultValue}
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
