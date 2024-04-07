import { Routes, Route, Outlet } from "react-router-dom";
import { PricingPlansEditor } from "./PricingPlansEditor";
import { FeaturesPage } from "./pages/Attributes";
import { UserContextPage } from "./pages/UserContext";
import { EvaluationPage } from "./pages/EvaluationContext";
import { Plan, Plans } from "./pages/Plans";
import { PricingManager } from "./types/index";

interface PricingConfigurationRoutesProps {
  pricingContext: PricingManager;
  returnTo: string;
  theme?: string;
  onSave: (pricingContext: PricingManager) => void;
}

export function PricingConfigurationRoutes({
  pricingContext,
  returnTo,
  theme,
  onSave,
}: PricingConfigurationRoutesProps) {
  /**
   * TODO: rgb, rgba and hex validation
   * Following regex detects only rgb rgb\((\d{1,3}),(\d{1,3}),(\d{1,3}\))
   * that outbounds 255
   * Examples:
   * rgb(0,0,0) Valid color pass validation
   * rgb(128,128,128) Valid color pass validation
   * rgb(255,255,255) Valid color pass validation
   * rgb(-1,-1,-1) Invalid color It does not pass validation
   * rgb(256,256,256) Invalid color Pass validtion!!!
   * rgb(999,999,999) Invalid color Pass validation!!!
   * rgb(1000,1000,1000) Invalid color Id does not pass validation
   */

  return (
    <Routes>
      <Route
        element={
          <PricingPlansEditor
            theme={theme}
            pricingContext={pricingContext}
            returnTo={returnTo}
            onSave={onSave}
          />
        }
      >
        <Route path="/" element={<h1>Pricingplans-react</h1>} />
        <Route path="attributes" element={<FeaturesPage />} />
        <Route
          path="user-context"
          element={
            <UserContextPage
              title="User context"
              tableHeaders={["Name", "Type", "Actions"]}
            />
          }
        />
        <Route path="plans" element={<Outlet />}>
          <Route index element={<Plans />} />
          <Route path=":planId" element={<Plan />}></Route>
        </Route>
        <Route path="evaluation" element={<EvaluationPage />} />
      </Route>
    </Routes>
  );
}
