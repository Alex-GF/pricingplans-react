import { useContext, useState } from "react";
import { Command } from "../../parsers/expression";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { FeatureForm } from "./FeatureForm";
import { Plus } from "../../components/Icons";
import { EditorContext } from "../../context/EditorContextProvider";
import "./FeaturesPage.css";
import { FeatureList } from "./FeatureList";
import { AllFeatures, Type } from "../../types/features";
import { ValueType } from "../../types/index";

const emptyAttribute: AllFeatures = {
  name: "",
  description: "",
  valueType: ValueType.BOOLEAN,
  defaultValue: false,
  type: Type.DOMAIN,
  expression: "",
  serverExpression: "",
};

export function FeaturesPage() {
  const { attributes, setAttributes } = useContext(EditorContext);

  const [visible, setvisible] = useState(false);
  const [command, setCommand] = useState("add" as Command);

  const openModal = () => setvisible(true);

  const closeModal = () => setvisible(false);

  const addAttribute = (attribute: AllFeatures) => {
    setAttributes([...attributes, attribute]);
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
