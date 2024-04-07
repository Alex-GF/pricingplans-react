import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PricingConfigurationRoutes } from "./PricingConfigurationRoutes";
import { petClinic } from "./tests/parsers/pricings";
import { PricingManager } from "./types";

const onSave = (pricingContext: PricingManager) => console.log(pricingContext);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PricingConfigurationRoutes
        pricingContext={petClinic}
        returnTo="/"
        onSave={onSave}
      />
    </BrowserRouter>
  </React.StrictMode>
);
