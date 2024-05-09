import { Link } from "react-router-dom";
import { Plus } from "../../components/Icons";
import { AddOnsList } from "./AddOnsList";
import "./AddOns.css";

export function AddOnsPage() {
  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <h1>AddOns</h1>
        <Link
          className="pp-content-header__btn"
          to="new"
          state={{ index: null }}
        >
          <Plus />
        </Link>
      </header>
      <AddOnsList />
    </article>
  );
}
