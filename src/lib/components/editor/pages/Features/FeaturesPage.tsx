import { useContext, useState } from "react";
import { Command } from "../../parsers/expression";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { Plus } from "../../components/Icons";
import { EditorContext } from "../../context/EditorContextProvider";
import { FeatureList } from "./FeatureList";
import { FeatureForm } from "./FeatureForm";
import { AllFeatures, FeatureType, ValueType } from "../../types";
import "./FeaturesPage.css";
import { useToggle } from "../../hooks";

const emptyAttribute: AllFeatures = {
  name: "",
  description: "",
  valueType: ValueType.Boolean,
  defaultValue: false,
  type: FeatureType.Domain,
  expression: "",
  serverExpression: "",
};

export function FeaturesPage() {
  const { attributes, setAttributes, plans, setPlans } =
    useContext(EditorContext);

  const [command, setCommand] = useState("add" as Command);
  const { visible, on: openModal, off: closeModal } = useToggle();

  const addAttribute = (attribute: AllFeatures) => {
    const defaultExpression =
      attribute.valueType === ValueType.Boolean
        ? `planContext['features'][${attribute.name}]`
        : "";
    setAttributes([
      ...attributes,
      {
        ...attribute,
        expression: defaultExpression,
      },
    ]);

    if (plans) {
      const updatedPlans = plans.map((plan) => ({
        ...plan,
        features: [
          ...plan.features,
          { name: attribute.name, value: attribute.defaultValue },
        ],
      }));
      setPlans(updatedPlans);
    }
    closeModal();
  };

  const isAttributeDuplicatedWhenAdding = (name: string) =>
    attributes.filter((attribute) => attribute.name === name).length !== 0;

  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <h1>Plan's attributes</h1>
        <Button
          className="pp-content-header__btn"
          onClick={() => {
            setCommand("add");
            openModal();
          }}
        >
          <Plus />
        </Button>
        <Modal open={visible && command === "add"}>
          <FeatureForm
            initialData={emptyAttribute}
            onSubmit={addAttribute}
            onValidation={isAttributeDuplicatedWhenAdding}
          />
          <Button className="pp-btn" onClick={closeModal}>
            Close
          </Button>
        </Modal>
      </header>

      <Table
        className="pp-table"
        labels={["Name", "Type", "Value type", "Default", "Actions"]}
      >
        <FeatureList
          command={command}
          setCommand={setCommand}
          isModalVisible={visible}
          openModal={openModal}
          closeModal={closeModal}
        />
      </Table>
    </article>
  );
}
