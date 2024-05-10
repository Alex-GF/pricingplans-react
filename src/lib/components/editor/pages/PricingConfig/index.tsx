import { ChangeEvent, useContext } from "react";
import { EditorContext } from "../../context/EditorContextProvider";

export function PricingConfig() {
  const { pricing, setPricing } = useContext(EditorContext);

  if (!pricing) {
    throw new Error();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPricing({ ...pricing, [e.target.name]: e.target.value });

  const handleAnnualPaymentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPricing({ ...pricing, hasAnnualPayment: e.target.checked });

  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <h1>Pricing Configuration</h1>
      </header>
      <form>
        <div className="pp-form__group">
          <label htmlFor="saasName" className="pp-form__label">
            SaaS name
          </label>
          <input
            className="pp-form__field"
            id="saasName"
            name="saasName"
            value={pricing.saasName}
            onChange={handleChange}
          />
        </div>
        <div className="pp-form__group">
          <label htmlFor="day" className="pp-form__label">
            Day
          </label>
          <input
            className="pp-form__field"
            id="day"
            name="day"
            value={pricing.day}
            onChange={handleChange}
          />
        </div>
        <div className="pp-form__group">
          <label htmlFor="month" className="pp-form__label">
            Month
          </label>
          <input
            className="pp-form__field"
            id="month"
            name="month"
            value={pricing.month}
            onChange={handleChange}
          />
        </div>
        <div className="pp-form__group">
          <label htmlFor="year" className="pp-form__label">
            Year
          </label>
          <input
            className="pp-form__field"
            id="year"
            name="year"
            value={pricing.year}
            onChange={handleChange}
          />
        </div>
        <div className="pp-form__group">
          <label>
            Has Annual Payment
            <input
              name="hasAnnualPayment"
              type="checkbox"
              checked={pricing.hasAnnualPayment}
              onChange={handleAnnualPaymentChange}
            />
          </label>
        </div>
      </form>
    </article>
  );
}
