import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { ValueType, AllFeatures } from "../../types";
import {
  ExpressionState,
  OPERATORS_DICTIONARY,
  Operators,
} from "../../parsers/expression";
import { EditorContext } from "../../context/EditorContextProvider";
import { Button } from "../../components/Button";

interface NumericEvaluationFormProps {
  feature: AllFeatures;
  onSubmit: (name: string, expression: string) => void;
  closeModal: () => void;
}

export function EvaluationForm({
  feature,
  onSubmit,
  closeModal,
}: NumericEvaluationFormProps) {
  const { usageLimits, userContextAttributes } = useContext(EditorContext);

  const numericUsageLimitsNames = usageLimits
    .filter((usageLimit) => usageLimit.valueType === ValueType.Numeric)
    .map((usageLimit) => usageLimit.name);

  const numericUserVariables = userContextAttributes
    .filter((attribute) => attribute.valueType === ValueType.Numeric)
    .map((userVariable) => userVariable.name);

  const textUserVariables = userContextAttributes.filter(
    (userVariable) => userVariable.valueType === ValueType.Text
  );

  const booleanUserVariables = userContextAttributes.filter(
    (userVariable) => userVariable.valueType === ValueType.Boolean
  );

  const [expression, setExpression] = useState<ExpressionState>({
    expressionType: "expression",
    operator: Operators.Noop,
    userContext: "",
    usageLimit: "",
  });

  const displayCurrentExpression = () => {
    if (expression.operator === "noop") {
      return `planContext['features']['${feature.name}']`;
    }

    const op = OPERATORS_DICTIONARY[expression.operator];

    if (expression.usageLimit) {
      return `planContext['usageLimit']['${expression.usageLimit}'] ${op} userContext['${expression.userContext}'] `;
    }

    return `planContext['features']['${feature.name}'] ${op} userContext['${expression.userContext}']`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let parsedExpression = "";
    if (expression.operator !== "noop") {
      return;
    }

    onSubmit(feature.name, parsedExpression);
    closeModal();
  };

  const handleSelectOption = (e: ChangeEvent<HTMLSelectElement>) =>
    setExpression({ ...expression, [e.target.name]: e.target.value });

  return (
    <form className="pp-form" onSubmit={handleSubmit}>
      <div className="pp-field">
        <label htmlFor="expressionType">Expression type</label>
      </div>
      <select
        id="expressionType"
        name="expressionType"
        className="pp-form__field"
        value={expression.expressionType}
        onChange={handleSelectOption}
      >
        <option value="expression">SINGLE EXPRESION</option>
        <option value="binaryExpression">BINARY EXPRESSION</option>
      </select>
      {feature.valueType === ValueType.Boolean &&
        expression.expressionType === "binaryExpression" && (
          <>
            <div className="pp-form__group">
              <label htmlFor="operator">Operator</label>
              <select
                id="operator"
                name="operator"
                className="pp-form__field"
                value={expression.operator}
                onChange={handleSelectOption}
              >
                <option value="noop">DON'T EVALUATE</option>
                <option value="lt">LOWER</option>
                <option value="lte">LOWER EQUALS</option>
                <option value="gt">GREATER</option>
                <option value="gte">GREATER EQUALS</option>
                <option value="eq">EQUALS</option>
                <option value="neq">DIFFERENT</option>
              </select>
            </div>
            <div className="pp-form__group">
              <label htmlFor="userContext">Operator</label>
              <select
                id="userContext"
                name="userContext"
                className="pp-form__field"
                value={expression.userContext}
                onChange={handleSelectOption}
              >
                {numericUserVariables.map((usageLimitName) => (
                  <option key={usageLimitName} value={usageLimitName}>
                    {usageLimitName}
                  </option>
                ))}
              </select>
            </div>
            <div className="pp-form__group">
              <label htmlFor="usageLimit">Usage limit</label>
              <select
                id="usageLimit"
                name="usageLimit"
                className="pp-form__field"
                value={expression.usageLimit}
                onChange={handleSelectOption}
              >
                {numericUsageLimitsNames.map((usageLimitName) => (
                  <option key={usageLimitName} value={usageLimitName}>
                    {usageLimitName}
                  </option>
                ))}
              </select>
            </div>

            <Button className="pp-btn">Reset expression</Button>
          </>
        )}

      {feature.valueType === ValueType.Text && (
        <div className="pp-form__group">
          <label htmlFor="operator">Operator</label>
          <select
            id="operator"
            name="operator"
            className="pp-form__field"
            value={expression.operator}
            onChange={handleSelectOption}
          >
            <option value="noop">DON'T EVALUATE</option>
            <option value="eq">EQUALS</option>
            <option value="neq">DIFFERENT</option>
          </select>
        </div>
      )}

      {feature.valueType === ValueType.Numeric && (
        <div className="pp-form__group">
          <label htmlFor="operator">Operator</label>
          <select
            id="operator"
            name="operator"
            className="pp-form__field"
            value={expression.operator}
            onChange={handleSelectOption}
          >
            <option value="noop">DON'T EVALUATE</option>
            <option value="lt">LOWER</option>
            <option value="lte">LOWER EQUALS</option>
            <option value="gt">GREATER</option>
            <option value="gte">GREATER EQUALS</option>
            <option value="eq">EQUALS</option>
            <option value="neq">DIFFERENT</option>
          </select>
        </div>
      )}

      <div>{displayCurrentExpression()}</div>

      <Button type="button" className="pp-btn" onClick={closeModal}>
        Close
      </Button>

      <Button className="pp-btn">Save</Button>
    </form>
  );
}
