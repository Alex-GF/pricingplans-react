import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Button } from "../../components/Button";
import { EditorContext } from "../../context/EditorContextProvider";
import { AllFeatures } from "../../types/features";
import {
  Operators,
  computeEvaluation,
  parseExpression,
} from "../../parsers/expression";
import { ValueType } from "../../types";

interface NumericEvaluationFormProps {
  attribute: AllFeatures;
  onSubmit: (name: string, expression: string) => void;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export function NumericEvaluationForm({
  attribute,
  onSubmit,
  setVisible,
}: NumericEvaluationFormProps) {
  const { userContextAttributes } = useContext(EditorContext);
  const expression = parseExpression(attribute.expression);
  const numericAttributes = userContextAttributes.filter(
    (attribute) => attribute.valueType == ValueType.Numeric
  );

  const [form, setForm] = useState({
    operator: expression.operator,
    valueToCompare: expression.userContext,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const leftOperand = `planContext['${attribute.name}']`;
    const rightOperand = `userContext['${form.valueToCompare}']`;

    const expression = computeEvaluation(
      leftOperand,
      form.operator as Operators,
      rightOperand
    );
    onSubmit(attribute.name, expression);
    setVisible(false);
  };

  return (
    <form className="pp-form" onSubmit={handleSubmit}>
      <div className="pp-field">
        <label id="name">Name</label>
        <input id="name" value={attribute.name} readOnly />
      </div>
      <div>
        <label id="operator">Operator</label>
        <select
          id="operator"
          value={form.operator}
          onChange={(e) =>
            setForm({ ...form, operator: e.target.value as Operators })
          }
        >
          <option value="">DON'T EVALUATE</option>
          <option value="<">LOWER</option>
          <option value="<=">LOWER EQUALS</option>
          <option value="==">EQUALS</option>
          <option value=">=">GREATER EQUALS</option>
          <option value=">">GREATER</option>
          <option value="!=">DIFFERENT</option>
        </select>
      </div>
      <div className="pp-field">
        <label id="value-to-compare"></label>
        <select
          id="value-to-compare"
          name="value-to-compare"
          value={form.valueToCompare}
          onChange={(e) => setForm({ ...form, valueToCompare: e.target.value })}
        >
          <option value="">Choose an option</option>
          {numericAttributes.map((attribute) => (
            <option key={attribute.name} value={attribute.name}>
              {attribute.name}
            </option>
          ))}
        </select>
      </div>
      <Button
        type="button"
        className="pp-btn"
        onClick={() => setVisible(false)}
      >
        Close
      </Button>

      <Button className="pp-btn">Save</Button>
    </form>
  );
}
