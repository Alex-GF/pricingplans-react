import {
  Plan,
  Pricing,
  Feature,
  UsageLimit,
  PricingData,
} from "../../../../types";
import { getPricingData } from "../../../../services/pricing.service";
import "./styles.css";

interface PricingProps {
  pricing: Pricing;
}

function PlanHeader({
  plan,
  currency,
}: {
  plan: Plan;
  currency: string;
}): JSX.Element {
  return (
    <th scope="col" className="plan-col">
      <h2 className="plan-heading">{plan.name}</h2>
      <p className="plan-price-container">
        <span className="plan-price">
          {plan.monthlyPrice}
          {currency}
        </span>
        <span className="plan-period">/month</span>
      </p>
    </th>
  );
}

function PricingElement({
  name,
  values,
}: {
  name: string;
  values: (string | number | boolean)[];
}): JSX.Element {
  return (
    <tr>
      <th scope="row" className="row-header divide-y">
        <h3>{name}</h3>
      </th>
      {values.map((value) => {
        if (typeof value === "boolean") {
          return (
            <td className="divide-y">
              {value ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-label="Included"
                  className="icon-check"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-label="Not included"
                  className="icon-cross"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </td>
          );
        } else {
          return (
            <td className="divide-y">
              <span className="text-value">{value}</span>
            </td>
          );
        }
      })}
    </tr>
  );
}

export function PricingTheme1({ pricing }: PricingProps): JSX.Element {
  let pricingData: PricingData = getPricingData(pricing);

  return (
    <section className="dark-section">
      <div className="container">
        <div className="pricing-page-title">
          <h1>Pricing plan comparison</h1>
        </div>
        <table className="pricing-table">
          <thead>
            <tr>
              <th></th>
              {pricing.plans.map((plan: Plan) => (
                <PlanHeader plan={plan} currency={pricing.currency} />
              ))}
            </tr>
          </thead>
          <tbody className="pricing-body">
            {Object.entries(pricingData).map(
              ([name, values]: [string, (string | number | boolean)[]], index: number) => (
                <>
                  <PricingElement name={name} values={values} />
                </>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
