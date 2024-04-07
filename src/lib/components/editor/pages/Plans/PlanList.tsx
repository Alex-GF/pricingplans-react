import { useContext } from "react";
import { EditorContext } from "../../context/EditorContextProvider";
import { Link } from "react-router-dom";

export function PlanList() {
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
              <h3>Price</h3>
              <span>{plan.annualPrice}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
