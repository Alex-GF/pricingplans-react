import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Command, UserContextAttribute } from "../../parsers/expression";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { UserContextForm } from "./UserContextForm";
import { Plus } from "../../components/Icons";
import { EditorContext } from "../../context/EditorContextProvider";
import { UserAttributeList } from "./UserFeatureList";
import { ValueType } from "../../types";
import { useToggle } from "../../hooks";

export function UserContextPage() {
  const { visible, on: openModal, off: closeModal } = useToggle();
  const [command, setCommand] = useState("add" as Command);
  const [selected, setSelected] = useState<null | number>(null);

  const handleClickAdd = () => {
    setCommand("add");
    setSelected(null);
    openModal();
  };

  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <h1>User context</h1>
        <Button
          className="pp-content-header__btn"
          onClick={() => handleClickAdd()}
        >
          <Plus />
        </Button>
      </header>

      <Table className="pp-table" labels={["Name", "Type", "Actions"]}>
        <UserAttributeList
          setCommand={setCommand}
          setSelected={setSelected}
          openModal={openModal}
        />
      </Table>
      <Modal open={visible}>
        <ModalContent
          command={command}
          userAtributePosition={selected}
          closeModal={closeModal}
        />
      </Modal>
    </article>
  );
}

interface ModalContentProps {
  command: Command;
  userAtributePosition: number | null;
  closeModal: () => void;
}

function ModalContent({
  command,
  userAtributePosition,
  closeModal,
}: ModalContentProps) {
  const { userContextAttributes, setUserContextAttributes } =
    useContext(EditorContext);
  const emptyUserAttribute: UserContextAttribute = {
    name: "",
    valueType: ValueType.Text,
  };

  const hasSelectedUserAttribute = userAtributePosition !== null;
  const userContextNameRender = hasSelectedUserAttribute
    ? userContextAttributes[userAtributePosition].name
    : "";

  const addUserAttribute = (attribute: UserContextAttribute) => {
    setUserContextAttributes([...userContextAttributes, attribute]);
    closeModal();
  };

  const updateUserAttribute = (newAttribute: UserContextAttribute) => {
    const newUserContextAttributes = userContextAttributes.map(
      (userAttribute, index) =>
        index === userAtributePosition ? newAttribute : userAttribute
    );
    setUserContextAttributes(newUserContextAttributes);
    closeModal();
  };

  const deleteAttribute = () => {
    const newUserContextAttributes = userContextAttributes.filter(
      (_, index) => index !== userAtributePosition
    );
    setUserContextAttributes(newUserContextAttributes);
    closeModal();
  };

  switch (command) {
    case "add":
    case "edit":
      return (
        <>
          <UserContextForm
            initialData={
              hasSelectedUserAttribute
                ? userContextAttributes[userAtributePosition]
                : emptyUserAttribute
            }
            onSubmit={
              hasSelectedUserAttribute ? updateUserAttribute : addUserAttribute
            }
          />
          <Button className="pp-btn" onClick={closeModal}>
            Close
          </Button>
        </>
      );
    case "delete":
      return (
        <>
          <h2>Do you want to delete {userContextNameRender}?</h2>
          <Button className="pp-btn" onClick={closeModal}>
            NO
          </Button>
          <Button className="pp-btn" onClick={deleteAttribute}>
            YES
          </Button>
        </>
      );
  }
}
