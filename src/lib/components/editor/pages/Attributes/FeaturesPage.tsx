import { useContext, useState } from "react";
import { Attribute, Command } from "../../types";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { FeatureForm } from "./FeatureForm";
import { Plus } from "../../components/Icons";
import { EditorContext } from "../../context/EditorContextProvider";
import "./FeaturesPage.css";
import { FeatureList } from "./FeatureList";

const emptyAttribute: Attribute = {
  id: "",
  description: "",
  type: "TEXT",
  defaultValue: "",
  expression: "",
};

export function FeaturesPage() {
  const { plans, setPlans, attributes, setAttributes } =
    useContext(EditorContext);

  const [visible, setvisible] = useState(false);
  const [command, setCommand] = useState("add" as Command);

  const openModal = () => setvisible(true);

  const closeModal = () => setvisible(false);

  const addPlanAttributes = (attribute: Attribute) => {
    const updatedPlans = plans.map((plan) => {
      return {
        ...plan,
        features: [
          ...plan.features,
          {
            name: attribute.id,
            type: attribute.type,
            value: attribute.defaultValue,
          },
        ],
      };
    });
    setPlans(updatedPlans);
  };

  const addAttribute = (attribute: Attribute) => {
    setAttributes([...attributes, attribute]);
    addPlanAttributes(attribute);
    closeModal();
  };

  const isAttributeDuplicatedWhenAdding = (name: string) =>
    attributes.filter((attribute) => attribute.id === name).length !== 0;

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
        labels={["Name", "Type", "Default", "Actions"]}
      >
        <FeatureList
          command={command}
          setCommand={setCommand}
          isModalVisible={visible}
          setVisible={setvisible}
        />
      </Table>
    </article>
  );
}
