import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Command } from "../../parsers/expression";
import { EditorContext } from "../../context/EditorContextProvider";
import { Button } from "../../components/Button";
import { Pencil, Trash } from "../../components/Icons";
import { Modal } from "../../components/Modal";
import { UsageLimitBase } from "../../types";
import { UsageLimitForm } from "./UsageLimitForm";

interface UsageLimitListProps {
  command: Command;
  setCommand: Dispatch<SetStateAction<Command>>;
  isModalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export function UsageLimitList({
  isModalVisible,
  openModal,
  closeModal,
  command,
  setCommand,
}: UsageLimitListProps) {
  const { usageLimits, setUsageLimits, plans, setPlans } =
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
    usageLimits.filter(
      (usageLimit, index) => index !== position && usageLimit.name === name
    ).length !== 0;

  const deleteAttribute = (name: string) => {
    const newUsageLimits = usageLimits.filter(
      (attribute) => attribute.name !== name
    );
    setUsageLimits(newUsageLimits);
    if (plans) {
      const updatedPlans = plans.map((plan) => ({
        ...plan,
        usageLimits: plan.usageLimits.filter(
          (feature) => feature.name !== name
        ),
      }));
      setPlans(updatedPlans);
    }

    closeModal();
  };

  const handleEditAttribute = (newUsageLimit: UsageLimitBase) => {
    setUsageLimits((usageLimits) =>
      usageLimits.map((previousUsageLimit, index) => {
        return index === position ? newUsageLimit : previousUsageLimit;
      })
    );
    if (plans) {
      setPlans(
        plans.map((plan) => ({
          ...plan,
          usageLimits: plan.usageLimits.map((usageLimit, index) =>
            index === position
              ? { ...usageLimit, value: newUsageLimit.defaultValue }
              : usageLimit
          ),
        }))
      );
    }
    closeModal();
  };

  return (
    <>
      {usageLimits.map((usageLimit, index) => (
        <tr key={usageLimit.name}>
          <td>{usageLimit.name}</td>
          <td className={`pp-table-type__${usageLimit.type}`}>
            {usageLimit.type}
          </td>
          <td className={`pp-table-valueType__${usageLimit.valueType}`}>
            {usageLimit.valueType}
          </td>
          <td>{displayDefaulValueText(usageLimit.defaultValue)}</td>
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
              <UsageLimitForm
                initialData={usageLimit}
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
              <h2>Do you want to delete {usageLimit.name}?</h2>
              <Button className="pp-btn" onClick={closeModal}>
                NO
              </Button>
              <Button
                className="pp-btn"
                onClick={() => deleteAttribute(usageLimit.name)}
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
