import { useContext, useState } from "react";
import { Command } from "../../parsers/expression";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { Plus } from "../../components/Icons";
import { EditorContext } from "../../context/EditorContextProvider";
import { UsageLimitBase, UsageLimitType, ValueType } from "../../types";
import { useToggle } from "../../hooks";
import { UsageLimitForm } from "./UsageLimitForm";
import { UsageLimitList } from "./UsageLimitList";

const emptyUsageLimit: UsageLimitBase = {
  name: "",
  description: "",
  type: UsageLimitType.NonRenewable,
  valueType: ValueType.Numeric,
  defaultValue: 0,
  unit: "",
  expression: "",
  serverExpression: "",
  linkedFeatures: null,
};

export function UsageLimitsPage() {
  const { usageLimits, setUsageLimits, plans, setPlans } =
    useContext(EditorContext);

  const [command, setCommand] = useState("add" as Command);
  const { visible, on: openModal, off: closeModal } = useToggle();

  const addUsageLimit = (usageLimit: UsageLimitBase) => {
    setUsageLimits([...usageLimits, usageLimit]);

    if (plans) {
      const updatedPlans = plans.map((plan) => ({
        ...plan,
        usageLimits: [
          ...plan.usageLimits,
          { name: usageLimit.name, value: usageLimit.defaultValue },
        ],
      }));
      setPlans(updatedPlans);
    }
    closeModal();
  };

  const isUsageLimitDuplicatedWhenAdding = (name: string) =>
    usageLimits.filter((usageLimit) => usageLimit.name === name).length !== 0;

  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <h1>Usage Limits</h1>
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
          <UsageLimitForm
            initialData={emptyUsageLimit}
            onSubmit={addUsageLimit}
            onValidation={isUsageLimitDuplicatedWhenAdding}
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
        <UsageLimitList
          command={command}
          setCommand={setCommand}
          openModal={openModal}
          closeModal={closeModal}
          isModalVisible={visible}
        />
      </Table>
    </article>
  );
}
