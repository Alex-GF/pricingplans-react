import { useContext } from "react";
import { EditorContext } from "../../context/EditorContextProvider";
import { Link } from "react-router-dom";

export function AddOnsList() {
  const { addOns } = useContext(EditorContext);

  if (!addOns) {
    return <p>You do not have any addOns!</p>;
  }

  return (
    <ul className="pp-plan-items">
      {addOns.map((addOn, index) => (
        <li key={addOn.name}>
          <Link
            className="pp-plan-item pp-plan-card"
            to={addOn.name}
            state={{ index }}
          >
            <div>
              <h2>{addOn.name}</h2>
              <h3>Available for plans</h3>
              <ul>
                {addOn.availableFor.map((plan) => (
                  <li key={plan}>{plan.toUpperCase()}</li>
                ))}
              </ul>

              <h3>Unit</h3>
              <span>{addOn.unit}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
