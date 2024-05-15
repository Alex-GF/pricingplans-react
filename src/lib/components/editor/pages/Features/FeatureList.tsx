import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Command } from "../../parsers/expression";
import { EditorContext } from "../../context/EditorContextProvider";
import { Button } from "../../components/Button";
import { Pencil, Trash } from "../../components/Icons";
import { Modal } from "../../components/Modal";
import { FeatureForm } from "./FeatureForm";
import { AllFeatures, PaymentTypes, FeatureType } from "../../types";

interface FeatureListProps {
  command: Command;
  setCommand: Dispatch<SetStateAction<Command>>;
  isModalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export function FeatureList({
  isModalVisible,
  openModal,
  closeModal,
  command,
  setCommand,
}: FeatureListProps) {
  const { attributes, setAttributes, plans, setPlans } =
    useContext(EditorContext);
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
    if (plans) {
      const updatedPlans = plans.map((plan) => ({
        ...plan,
        features: plan.features.filter((feature) => feature.name !== name),
      }));
      setPlans(updatedPlans);
    }

    closeModal();
  };

  const handleEditAttribute = (newAttribute: AllFeatures) => {
    setAttributes((attributes) =>
      attributes.map((previousAttribute, index) => {
        return index === position ? newAttribute : previousAttribute;
      })
    );
    if (plans) {
      setPlans(
        plans.map((plan) => ({
          ...plan,
          features: plan.features.map((feature, index) =>
            index === position
              ? { ...feature, value: newAttribute.defaultValue }
              : feature
          ),
        }))
      );
    }
    closeModal();
  };

  return (
    <>
      {attributes.map((attribute, index) => (
        <tr key={attribute.name}>
          <td>{attribute.name}</td>
          <td className={`pp-table-type__${attribute.type}`}>
            {attribute.type}
          </td>
          <td className={`pp-table-valueType__${attribute.valueType}`}>
            {attribute.valueType}
          </td>
          <td>
            {attribute.type === FeatureType.Payment && (
              <PaymentTypes paymentTypes={attribute.defaultValue} />
            )}
            {attribute.type !== FeatureType.Payment &&
              displayDefaulValueText(attribute.defaultValue)}
          </td>
          <td className="pp-table-actions">
            <Button
              onClick={() => {
                setPosition(index);
                openModal();
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
              <Button className="pp-btn" onClick={closeModal}>
                Close
              </Button>
            </Modal>

            <Button
              onClick={() => {
                setPosition(index);
                openModal();
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
              <Button className="pp-btn" onClick={closeModal}>
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
