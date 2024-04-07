import { Link } from "react-router-dom";
import { Plus } from "../../components/Icons";
import { PlanList } from "./PlanList";
import "./Plans.css";

export function Plans() {
  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <h1>Plans</h1>
        <Link
          className="pp-content-header__btn"
          to="new"
          state={{ index: null }}
        >
          <Plus />
        </Link>
      </header>
      <PlanList />
    </article>
  );
}
