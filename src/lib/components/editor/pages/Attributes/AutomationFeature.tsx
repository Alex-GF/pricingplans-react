import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Select } from "../../components/Select";
import { AllFeatures, AutomationFeature, AutomationType } from "../../types";

interface AutomationFeatureProps {
  feature: AutomationFeature;
  setFeature: Dispatch<SetStateAction<AllFeatures>>;
}

export function AutomationFeature({
  feature,
  setFeature,
}: AutomationFeatureProps) {
  const handleAutomationTypeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setFeature({
      ...feature,
      automationType: e.target.value as AutomationType,
    });
  return (
    <div className="pp-form__group">
      <Select
        id="automationType"
        label="Automation type"
        value={feature.automationType}
        onChange={handleAutomationTypeChange}
        options={[
          { value: AutomationType.Bot, label: AutomationType.Bot },
          {
            value: AutomationType.Filtering,
            label: AutomationType.Filtering,
          },
          {
            value: AutomationType.TaskAutomation,
            label: "TASK AUTOMATION",
          },
          {
            value: AutomationType.Tracking,
            label: AutomationType.Tracking,
          },
        ]}
      />
    </div>
  );
}
