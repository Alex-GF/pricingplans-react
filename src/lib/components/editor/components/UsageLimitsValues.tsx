import { useContext } from "react";
import { EditorContext } from "../context/EditorContextProvider";
import {
  ParsedOverwrittenUsageLimits,
  StrNumBool,
  ValueType,
} from "../types/index";

interface UsageLimitValuesProps {
  values: ParsedOverwrittenUsageLimits;
  onUsageLimitChange: (usageLimitName: string, value: StrNumBool) => void;
}

export function UsageLimitsValues({
  values,
  onUsageLimitChange,
}: UsageLimitValuesProps) {
  const { usageLimits } = useContext(EditorContext);

  return (
    <>
      {usageLimits.map((usageLimit, index) => {
        switch (usageLimit.valueType) {
          case ValueType.Text: {
            return (
              <div key={usageLimit.name} className="pp-form__group">
                <label htmlFor={usageLimit.name} className="pp-form__label">
                  {usageLimit.name}
                </label>
                <input
                  className="pp-form__field"
                  type="text"
                  id={usageLimit.name}
                  name={usageLimit.name}
                  value={values[index].value as string}
                  onChange={(e) =>
                    onUsageLimitChange(e.target.name, e.target.value)
                  }
                />
              </div>
            );
          }
          case ValueType.Numeric: {
            return (
              <div key={usageLimit.name} className="pp-form__group">
                <label htmlFor={usageLimit.name} className="pp-form__label">
                  {usageLimit.name}
                </label>
                <input
                  className="pp-form__field"
                  type="number"
                  id={usageLimit.name}
                  name={usageLimit.name}
                  value={values[index].value as number}
                  onChange={(e) =>
                    onUsageLimitChange(e.target.name, e.target.value)
                  }
                />
              </div>
            );
          }
          case ValueType.Boolean: {
            return (
              <div key={usageLimit.name}>
                <label htmlFor={usageLimit.name}>{usageLimit.name}</label>
                <input
                  type="checkbox"
                  id={usageLimit.name}
                  name={usageLimit.name}
                  checked={values[index]?.value as boolean}
                  onChange={(e) =>
                    onUsageLimitChange(e.target.name, e.target.checked)
                  }
                />
              </div>
            );
          }
        }
      })}
    </>
  );
}
