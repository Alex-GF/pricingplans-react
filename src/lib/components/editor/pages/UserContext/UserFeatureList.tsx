import { Dispatch, SetStateAction, useContext } from "react";
import { Command } from "../../parsers/expression";
import { EditorContext } from "../../context/EditorContextProvider";
import { Button } from "../../components/Button";
import { Pencil, Trash } from "../../components/Icons";

interface UserAttributeListProps {
  setCommand: Dispatch<SetStateAction<Command>>;
  setSelected: Dispatch<SetStateAction<null | number>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export function UserAttributeList({
  setCommand,
  setSelected,
  setVisible,
}: UserAttributeListProps) {
  const { userContextAttributes } = useContext(EditorContext);

  return (
    <>
      {userContextAttributes.map((attribute, index) => (
        <tr key={attribute.name}>
          <td>{attribute.valueType}</td>
          <td className={`pp-table-type__${attribute.valueType}`}>
            {attribute.valueType}
          </td>
          <td className="pp-table-actions">
            <Button
              onClick={() => {
                setCommand("edit");
                setSelected(index);
                setVisible(true);
              }}
            >
              <Pencil />
            </Button>

            <Button
              onClick={() => {
                setCommand("delete");
                setSelected(index);
                setVisible(true);
              }}
            >
              <Trash />
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
}
