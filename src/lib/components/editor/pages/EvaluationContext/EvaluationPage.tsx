import { Table } from "../../components/Table";

import "./EvaluationPage.css";

import { EvaluationList } from "./EvaluationList";

export function EvaluationPage() {
  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <h1>Evaluation Configuration</h1>
      </header>

      <Table
        className="pp-table"
        labels={["Name", "Type", "Expression", "Actions"]}
      >
        <EvaluationList />
      </Table>
    </article>
  );
}
