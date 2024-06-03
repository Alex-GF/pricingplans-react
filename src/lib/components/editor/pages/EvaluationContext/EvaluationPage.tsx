import { Table } from "../../components/Table";
import { EvaluationList } from "./EvaluationList";
import "./EvaluationPage.css";

export function EvaluationPage() {
  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <h1>Evaluation Configuration</h1>
      </header>

      <Table
        className="pp-table"
        labels={["Feature Name", "Value Type", "Expression", "Actions"]}
      >
        <EvaluationList />
      </Table>
    </article>
  );
}
