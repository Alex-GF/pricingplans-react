import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Command, UserContextAttribute } from "../../parsers/expression";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { UserContextForm } from "./UserContextForm";
import { Plus } from "../../components/Icons";
import { EditorContext } from "../../context/EditorContextProvider";
import { UserAttributeList } from "./UserFeatureList";
import { ValueType } from "../../types/index";

interface UserContextPageProps {
  title: string;
  tableHeaders: string[];
}

export function UserContextPage({ title, tableHeaders }: UserContextPageProps) {
  const [visible, setVisible] = useState(false);
  const [command, setCommand] = useState("add" as Command);
  const [selected, setSelected] = useState<null | number>(null);

  const openModal = () => setVisible(true);

  const handleClickAdd = () => {
    setCommand("add");
    setSelected(null);
    openModal();
  };

  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <h1>{title}</h1>
        <Button
          className="pp-content-header__btn"
          onClick={() => handleClickAdd()}
        >
          <Plus />
        </Button>
      </header>

      <Table className="pp-table" labels={tableHeaders}>
        <UserAttributeList
          setCommand={setCommand}
          setSelected={setSelected}
          setVisible={setVisible}
        />
      </Table>
      <Modal open={visible}>
        <ModalContent
          command={command}
          userAtributePosition={selected}
          setVisible={setVisible}
        />
      </Modal>
    </article>
  );
}

interface ModalContentProps {
  command: Command;
  userAtributePosition: number | null;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

function ModalContent({
  command,
  userAtributePosition,
  setVisible,
}: ModalContentProps) {
  const { userContextAttributes, setUserContextAttributes } =
    useContext(EditorContext);
  const emptyUserAttribute: UserContextAttribute = {
    name: "",
    valueType: ValueType.TEXT,
  };

  const hasSelectedUserAttribute = userAtributePosition !== null;
  const userContextNameRender = hasSelectedUserAttribute
    ? userContextAttributes[userAtributePosition].name
    : "";

  const closeModal = () => setVisible(false);

  const addUserAttribute = (attribute: UserContextAttribute) => {
    setUserContextAttributes([...userContextAttributes, attribute]);
    setVisible(false);
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
