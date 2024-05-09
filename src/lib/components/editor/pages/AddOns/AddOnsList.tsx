import { useContext } from "react";
import { EditorContext } from "../../context/EditorContextProvider";
import { Link } from "react-router-dom";

export function AddOnsList() {
  const { plans } = useContext(EditorContext);

  if (!plans) {
    return <p>You do not have any plans!</p>;
  }

  return (
    <ul className="pp-plan-items">
      {plans.map((plan, index) => (
        <li key={plan.name}>
          <Link
            className="pp-plan-item pp-plan-card"
            to={plan.name}
            state={{ index }}
          >
            <div>
              <h2>{plan.name}</h2>
              <h3>Description</h3>
              <p>{plan.description}</p>
              <h3>Annual Price</h3>
              <span>{plan.annualPrice}</span>
              <h3>Monthly Price</h3>
              <span>{plan.monthlyPrice}</span>
              <h3>Unit</h3>
              <span>{plan.unit}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
