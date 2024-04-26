import { useState } from "react";

export function useToggle(defaultState = false) {
  const [visible, setVisible] = useState(defaultState);

  const on = () => setVisible(true);

  const off = () => setVisible(false);

  const changeStatus = () => setVisible((visible) => !visible);

  return { visible, on, off, changeStatus, setVisible };
}
