import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Command } from "../../parsers/expression";
import { EditorContext } from "../../context/EditorContextProvider";
import { Button } from "../../components/Button";
import { Pencil, Trash } from "../../components/Icons";
import { Modal } from "../../components/Modal";
import { FeatureForm } from "./FeatureForm";
import { AllFeatures, PaymentTypes, Type } from "../../types/features";

interface FeatureListProps {
  command: Command;
  setCommand: Dispatch<SetStateAction<Command>>;
  isModalVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export function FeatureList({
  isModalVisible,
  setVisible,
  command,
  setCommand,
}: FeatureListProps) {
  const { attributes, setAttributes } = useContext(EditorContext);
  const [position, setPosition] = useState(-1);

  const displayDefaulValueText = (defaultValue: string | number | boolean) => {
    switch (typeof defaultValue) {
      case "string":
      case "number":
        return defaultValue;
      case "boolean":
        return defaultValue ? "YES" : "NO";
    }
  };

  const duplicatedAttributeWhenEditing = (name: string) =>
    attributes.filter(
      (attribute, index) => index !== position && attribute.name === name
    ).length !== 0;

  const deleteAttribute = (name: string) => {
    const newFeatures = attributes.filter(
      (attribute) => attribute.name !== name
    );
    setAttributes(newFeatures);

    setVisible(false);
  };

  const handleEditAttribute = (newAttribute: AllFeatures) => {
    setAttributes((attributes) =>
      attributes.map((previousAttribute, index) => {
        return index === position ? newAttribute : previousAttribute;
      })
    );
    setVisible(false);
  };

  return (
    <>
      {attributes.map((attribute, index) => (
        <tr key={attribute.name}>
          <td>{attribute.name}</td>
          <td className={`pp-table-type__${attribute.valueType}`}>
            {attribute.type}
          </td>
          <td>
            {attribute.type === Type.PAYMENT && (
              <PaymentTypes paymentTypes={attribute.defaultValue} />
            )}
            {attribute.type !== Type.PAYMENT &&
              displayDefaulValueText(attribute.valueType)}
          </td>
          <td className="pp-table-actions">
            <Button
              onClick={() => {
                setPosition(index);
                setVisible(true);
                setCommand("edit");
              }}
            >
              <Pencil />
            </Button>
            <Modal
              open={isModalVisible && command === "edit" && position === index}
            >
              <FeatureForm
                initialData={attribute}
                onSubmit={handleEditAttribute}
                onValidation={duplicatedAttributeWhenEditing}
              />
              <Button className="pp-btn" onClick={() => setVisible(false)}>
                Close
              </Button>
            </Modal>

            <Button
              onClick={() => {
                setPosition(index);
                setVisible(true);
                setCommand("delete");
              }}
            >
              <Trash />
            </Button>

            <Modal
              open={
                isModalVisible && command === "delete" && position === index
              }
            >
              <h2>Do you want to delete {attribute.name}?</h2>
              <Button className="pp-btn" onClick={() => setVisible(false)}>
                NO
              </Button>
              <Button
                className="pp-btn"
                onClick={() => deleteAttribute(attribute.name)}
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

interface PaymentTypesProps {
  paymentTypes: PaymentTypes;
}

function PaymentTypes({ paymentTypes }: PaymentTypesProps) {
  return (
    <ul>
      {paymentTypes.map((paymentype) => (
        <li key={paymentype}>{paymentype}</li>
      ))}
    </ul>
  );
}
