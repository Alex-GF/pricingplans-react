import { useState } from "react";
import { Outlet } from "react-router-dom";
import { EditorContextProvider } from "./context/EditorContextProvider";
import { Toggle } from "./components/Toggle";
import { NavBar } from "./components/NavBar";
import "./Form.css";
import "./PricingPlansEditor.css";
import { PricingManager } from "./types/index";

interface PricingPlansEditorProps {
  pricingContext: PricingManager;
  returnTo: string;
  theme?: string;
  onSave: (pricingContext: PricingManager) => void;
}

export function PricingPlansEditor({
  theme,
  pricingContext,
  returnTo,
  onSave,
}: PricingPlansEditorProps) {
  const [hidden, setHidden] = useState(false);

  const handleClick = () => {
    setHidden(!hidden);
  };

  return (
    <EditorContextProvider
      pricingContext={pricingContext}
      theme={theme}
      returnTo={returnTo}
    >
      <div className="pp-editor">
        <NavBar hidden={hidden} onSave={onSave} />
        <main className="pp-content">
          <Toggle
            className="pp-toggle pp-content__toggle"
            isHidden={hidden}
            onClick={handleClick}
          />
          <Outlet />
        </main>
      </div>
    </EditorContextProvider>
  );
}
