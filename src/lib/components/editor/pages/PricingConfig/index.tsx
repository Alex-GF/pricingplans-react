import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { EditorContext } from "../../context/EditorContextProvider";
import { Button } from "../../components/Button";

export function PricingConfig() {
  const { pricing, setPricing } = useContext(EditorContext);

  if (!pricing) {
    throw Error("You are consuming pricingConfig wrong");
  }

  const [pricingConfiguration, setPricingConfiguration] = useState({
    ...pricing,
  });
  const saasNameIsEmpty = pricingConfiguration.saasName === "";
  const dateIsEmpty = pricingConfiguration.date === "";
  const currencyIsEmpty = pricingConfiguration.currency === "";
  const formHasErrors = saasNameIsEmpty || dateIsEmpty || currencyIsEmpty;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPricingConfiguration({
      ...pricingConfiguration,
      [e.target.name]: e.target.value,
    });

  const handleAnnualPaymentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPricingConfiguration({
      ...pricingConfiguration,
      hasAnnualPayment: e.target.checked,
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formHasErrors) {
      return;
    }

    setPricing({
      ...pricingConfiguration,
      ...formatDate(pricingConfiguration.date),
    });
  };

  const formatDate = (date: string) => {
    const splitArray = date.split("-");
    return {
      day: Number(splitArray[2]),
      month: Number(splitArray[1]),
      year: Number(splitArray[0]),
    };
  };

  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <h1>Pricing Configuration</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="pp-form__group">
          {saasNameIsEmpty && (
            <small>Pricing name is empty. Please fill the value</small>
          )}
          <label htmlFor="saasName" className="pp-form__label">
            SaaS name
          </label>
          <input
            className="pp-form__field"
            id="saasName"
            name="saasName"
            value={pricingConfiguration.saasName}
            onChange={handleChange}
          />
        </div>
        <div className="pp-form__group">
          <label htmlFor="date" className="pp-form__label">
            Date
          </label>
          <input
            className="pp-form__field"
            id="date"
            name="date"
            type="date"
            value={pricingConfiguration.date}
            onChange={handleChange}
          />
        </div>
        <div className="pp-form__group">
          <label>
            Has Annual Payment
            <input
              name="hasAnnualPayment"
              type="checkbox"
              checked={pricingConfiguration.hasAnnualPayment}
              onChange={handleAnnualPaymentChange}
            />
          </label>
        </div>
        <Button disabled={formHasErrors} className="pp-btn">
          Save Changes
        </Button>
      </form>
    </article>
  );
}
