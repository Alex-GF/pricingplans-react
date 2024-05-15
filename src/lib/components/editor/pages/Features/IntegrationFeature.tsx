import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { AllFeatures, IntegrationFeature, IntegrationType } from "../../types";

interface IntegrationFeatureProps {
  feature: IntegrationFeature;
  setFeature: Dispatch<SetStateAction<AllFeatures>>;
}

export function IntegrationFeature({
  feature,
  setFeature,
}: IntegrationFeatureProps) {
  const handleIntegrationTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const integrationType = e.target.value as IntegrationType;
    if (integrationType === IntegrationType.WebSaaS) {
      setFeature({
        ...feature,
        integrationType: integrationType,
        pricingUrls: [""],
      });
      return;
    }

    setFeature({ ...feature, integrationType: integrationType });
  };

  const handlePricingUrlsChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFeature({
      ...feature,
      pricingUrls: e.target.value.trim().split(","),
    } as IntegrationFeature);

  return (
    <div className="pp-form__group">
      <label htmlFor="integrationType" className="pp-form__label">
        Integration Type
      </label>
      <select
        id="integrationType"
        name="integrationType"
        className="pp-form__field"
        value={feature.integrationType}
        onChange={handleIntegrationTypeChange}
      >
        <option value={IntegrationType.API}>API</option>
        <option value={IntegrationType.Extension}>EXTENSION</option>
        <option value={IntegrationType.ExternalDevice}>EXTERNAL DEVICE</option>
        <option value={IntegrationType.IdentityProvider}>
          IDENTITY PROVIDER
        </option>
        <option value={IntegrationType.Marketplace}>MARKETPLACE</option>
        <option value={IntegrationType.WebSaaS}>WEB SAAS</option>
      </select>
      {feature.integrationType === IntegrationType.WebSaaS && (
        <div className="pp-form__group">
          <label htmlFor="pricingUrls" className="pp-form__label">
            Pricing Urls
          </label>
          <input
            id="pricingUrls"
            name="pricingUrls"
            className="pp-form__field"
            value={feature.pricingUrls.join(",")}
            onChange={handlePricingUrlsChange}
          />
        </div>
      )}
    </div>
  );
}
