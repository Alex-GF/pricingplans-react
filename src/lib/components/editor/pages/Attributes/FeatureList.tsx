import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Attribute, Command, Feat } from "../../types";
import { EditorContext } from "../../context/EditorContextProvider";
import { Button } from "../../components/Button";
import { Pencil, Trash } from "../../components/Icons";
import { Modal } from "../../components/Modal";
import { FeatureForm } from "./FeatureForm";

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
  const { attributes, setAttributes, plans, setPlans } =
    useContext(EditorContext);
  const [position, setPosition] = useState(-1);

  const displayDefaulValueText = (defaultValue: string | number | boolean) => {
    switch (typeof defaultValue) {
      case "string":
      case "number":
        return defaultValue;
      case "boolean": {
        return defaultValue ? "YES" : "NO";
      }
    }
  };

  const duplicatedAttributeWhenEditing = (name: string) =>
    attributes.filter(
      (attribute, index) => index !== position && attribute.id === name
    ).length !== 0;

  const deleteAttribute = (name: string) => {
    setAttributes(attributes.filter((attribute) => attribute.id !== name));
    setPlans(
      plans.map((plan) => {
        const newFeatures = plan.features.filter(
          (feature) => feature.name !== name
        );
        return { ...plan, features: newFeatures };
      })
    );
    setVisible(false);
  };

  const computeNextFeature = (
    previousFeature: Feat,
    newFeature: Feat
  ): Feat => {
    if (
      previousFeature.name !== newFeature.name &&
      previousFeature.type === newFeature.type
    ) {
      return { ...previousFeature, name: newFeature.name };
    }

    if (previousFeature.type !== newFeature.type) {
      return newFeature;
    }
    return previousFeature;
  };

  const editPlanAttributes = (attribute: Attribute) => {
    const newFeature: Feat = {
      name: attribute.id,
      type: attribute.type,
      value: attribute.defaultValue,
    };
    const updatedPlans = plans.map((plan) => {
      const oldAttribute = attributes[position];
      return {
        ...plan,
        features: plan.features.map((feature) =>
          feature.name === oldAttribute.id
            ? computeNextFeature(feature, newFeature)
            : feature
        ),
      };
    });
    setPlans(updatedPlans);
  };

  const handleEditAttribute = (newAttribute: Attribute) => {
    setAttributes((attributes) =>
      attributes.map((previousAttribute, index) => {
        return index === position ? newAttribute : previousAttribute;
      })
    );
    editPlanAttributes(newAttribute);
    setVisible(false);
  };

  return (
    <>
      {attributes.map((attribute, index) => (
        <tr key={attribute.id}>
          <td>{attribute.id}</td>
          <td className={`pp-table-type__${attribute.type}`}>
            {attribute.type}
          </td>
          <td>{displayDefaulValueText(attribute.defaultValue)}</td>
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
              <h2>Do you want to delete {attribute.id}?</h2>
              <Button className="pp-btn" onClick={() => setVisible(false)}>
                NO
              </Button>
              <Button
                className="pp-btn"
                onClick={() => deleteAttribute(attribute.id)}
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
