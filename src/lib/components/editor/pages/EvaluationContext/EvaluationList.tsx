import { useContext, useState } from "react";
import { Command } from "../../parsers/expression";
import { EditorContext } from "../../context/EditorContextProvider";
import { Button } from "../../components/Button";
import { Pencil, Trash } from "../../components/Icons";
import { Modal } from "../../components/Modal";
import { AllFeatures } from "../../types/features";
import { useToggle } from "../../hooks";
import { EvaluationForm } from "./EvaluationForm";

export function EvaluationList() {
  const { attributes, setAttributes } = useContext(EditorContext);
  const [position, setPosition] = useState(-1);
  const { visible, on: openModal, off: closeModal } = useToggle();
  const [command, setCommand] = useState("edit" as Command);

  const NON_EVALUATED_EXPRESSION = "";

  const updateEvaluation = (name: string, expression: string) =>
    setAttributes(
      attributes.map((feature) => {
        const updatedFeature: AllFeatures = { ...feature, expression };
        return feature.name === name ? updatedFeature : feature;
      })
    );

  const deleteEvaluation = (name: string) => {
    setAttributes(
      attributes.map((attribute) =>
        attribute.name === name
          ? { ...attribute, expression: NON_EVALUATED_EXPRESSION }
          : attribute
      )
    );
    closeModal();
  };

  return (
    <>
      {attributes.map((feature, index) => (
        <tr key={feature.name}>
          <td>{feature.name}</td>
          <td className={`pp-table-valueType__${feature.valueType}`}>
            {feature.valueType}
          </td>
          <td className="expression">
            {feature.expression === NON_EVALUATED_EXPRESSION
              ? "NOT EVALUATED"
              : "EVALUATED"}
          </td>
          <td className="pp-table-actions">
            <Button
              onClick={() => {
                setCommand("edit");
                openModal();
                setPosition(index);
              }}
            >
              <Pencil />
            </Button>
            <Modal open={visible && command === "edit" && position === index}>
              <EvaluationForm
                feature={feature}
                onSubmit={updateEvaluation}
                closeModal={closeModal}
              />
            </Modal>

            <Button
              onClick={() => {
                openModal();
                setCommand("delete");
                setPosition(index);
              }}
            >
              <Trash />
            </Button>
            <Modal open={visible && command === "delete" && position === index}>
              <h2>
                You are going to delete the evaluation of '{feature.name}'
                feature. Are you really sure?
              </h2>
              <Button className="pp-btn" onClick={closeModal}>
                NO
              </Button>
              <Button
                className="pp-btn"
                onClick={() => deleteEvaluation(feature.name)}
              >
                YES
              </Button>
            </Modal>
          </td>
        </tr>
      ))}
    </>
  );
}
