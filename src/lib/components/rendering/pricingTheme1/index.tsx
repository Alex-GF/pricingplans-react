import { Plan, Pricing, PricingData } from "../../../../types";
import { getPricingData } from "../../../../services/pricing.service";
import { useState } from "react";

import "./styles.css";

type BilledType = "monthly" | "annually";

interface RederingStyles {
  plansColor?: string;
  priceColor?: string;
  periodColor?: string;
  headerColor?: string;
  namesColor?: string;
  valuesColor?: string;
  checkColor?: string;
  crossColor?: string;
  backgroundColor?: string;
  dividerColor?: string;
  billingSelectionColor?: string;
  billingSelectionBackgroundColor?: string;
  billingSelectionTextColor?: string;
}

interface PricingProps {
  pricing: Pricing;
  style: RederingStyles;
}

const DEFAULT_STYLES: RederingStyles = {
  plansColor: "#000000",
  priceColor: "#000000",
  periodColor: "#000000",
  headerColor: "#000000",
  namesColor: "#000000",
  valuesColor: "#000000",
  checkColor: "#000000",
  crossColor: "#000000",
  backgroundColor: "#f3f4f6",
  dividerColor: "#000000",
  billingSelectionColor: "#ffffff",
  billingSelectionBackgroundColor: "#EEE",
  billingSelectionTextColor: "#000000",
};

function SelectOfferTab({
  selectedBilledType,
  handleSwitchTab,
  style,
}: Readonly<{
  selectedBilledType: BilledType;
  handleSwitchTab: (tab: BilledType) => void;
  style: RederingStyles;
}>): JSX.Element {
  return (
    <div
      className="radio-inputs"
      style={{
        backgroundColor:
          style.billingSelectionBackgroundColor ??
          DEFAULT_STYLES.billingSelectionBackgroundColor,
      }}
    >
      <label className="radio">
        <input
          type="radio"
          name="radio"
          onClick={() => handleSwitchTab("monthly")}
          checked={selectedBilledType === "monthly"}
        />
        <span
          className="name"
          style={{
            color:
              style.billingSelectionTextColor ??
              DEFAULT_STYLES.billingSelectionTextColor,
            backgroundColor:
              selectedBilledType === "monthly"
                ? style.billingSelectionColor ??
                  DEFAULT_STYLES.billingSelectionColor
                : "transparent",
          }}
        >
          Monthly
        </span>
      </label>
      <label className="radio">
        <input
          type="radio"
          name="radio"
          onClick={() => handleSwitchTab("annually")}
          checked={selectedBilledType === "annually"}
        />
        <span
          className="name"
          style={{
            color:
              style.billingSelectionTextColor ??
              DEFAULT_STYLES.billingSelectionTextColor,
            backgroundColor:
              selectedBilledType === "annually"
                ? style.billingSelectionColor ??
                  DEFAULT_STYLES.billingSelectionColor
                : "transparent",
          }}
        >
          Annually
        </span>
      </label>
    </div>
  );
}

function PlanHeader({
  plan,
  currency,
  selectedBilledType,
  style,
}: Readonly<{
  plan: Plan;
  currency: string;
  selectedBilledType: BilledType;
  style: RederingStyles;
}>): JSX.Element {
  return (
    <th scope="col" className="plan-col">
      <h2
        className="plan-heading"
        style={{ color: style.plansColor ?? DEFAULT_STYLES.plansColor }}
      >
        {plan.name}
      </h2>
      <p className="plan-price-container">
        <span
          className="plan-price"
          style={{ color: style.priceColor ?? DEFAULT_STYLES.priceColor }}
        >
          {selectedBilledType === "monthly"
            ? plan.monthlyPrice
            : plan.annualPrice}
          {currency}
        </span>
        <span
          className="plan-period"
          style={{ color: style.periodColor ?? DEFAULT_STYLES.periodColor }}
        >
          /month
        </span>
      </p>
    </th>
  );
}

function PricingElement({
  name,
  values,
  style,
}: Readonly<{
  name: string;
  values: {value: (string | number | boolean), unit?: string}[];
  style: RederingStyles;
}>): JSX.Element {
  return (
    <tr>
      <th
        scope="row"
        className="row-header divide-y"
        style={{
          borderTopColor: style.dividerColor ?? DEFAULT_STYLES.dividerColor,
        }}
      >
        <h3 style={{ color: style.namesColor ?? DEFAULT_STYLES.namesColor }}>
          {name}
        </h3>
      </th>
      {values.map(({value, unit}, key) => {
        if (typeof value === "boolean") {
          return (
            <td
              className="divide-y"
              style={{
                borderTopColor:
                  style.dividerColor ?? DEFAULT_STYLES.dividerColor,
              }}
              key={`${name}-${key}`}
            >
              {value ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-label="Included"
                  className="icon-check"
                  style={{
                    color: style.checkColor ?? DEFAULT_STYLES.checkColor,
                  }}
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
                  style={{
                    color: style.crossColor ?? DEFAULT_STYLES.crossColor,
                  }}
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
            <td
              className="divide-y"
              style={{
                borderTopColor:
                  style.dividerColor ?? DEFAULT_STYLES.dividerColor,
              }}
              key={`${name}-${key}`}
            >
              <span
                className="text-value"
                style={{
                  color: style.valuesColor ?? DEFAULT_STYLES.valuesColor,
                }}
              >
                {(() => {
                  if (typeof value === "number") {
                    return value === 0 ? "-" : `${value} ${unit ?? ""}`;
                  }
                  return value;
                })()}
              </span>
            </td>
          );
        }
      })}
    </tr>
  );
}

export function PricingTheme1({
  pricing,
  style,
}: Readonly<PricingProps>): JSX.Element {
  let pricingData: PricingData = getPricingData(pricing);

  if (!style) {
    style = {};
  }

  const [selectedBilledType, setSelectedBilledType] =
    useState<BilledType>("monthly");
  function handleSwitchTab(tab: BilledType) {
    setSelectedBilledType(tab);
  }

  return (
    <section
      style={{
        backgroundColor:
          style.backgroundColor ?? DEFAULT_STYLES.backgroundColor,
      }}
    >
      <div className="container">
        <div className="pricing-page-title">
          <h1
            style={{ color: style.headerColor ?? DEFAULT_STYLES.headerColor }}
          >
            {pricing.name.charAt(0).toUpperCase() + pricing.name.slice(1)}{" "}
            Pricing
          </h1>
        </div>
        {pricing.hasAnnualPayment && (
          <div className="pricing-page-title">
            <SelectOfferTab
              handleSwitchTab={handleSwitchTab}
              selectedBilledType={selectedBilledType}
              style={style}
            />
          </div>
        )}
        <table className="pricing-table">
          <thead>
            <tr>
              <th></th>
              {pricing.plans.map((plan: Plan, key: number) => (
                <PlanHeader
                  plan={plan}
                  currency={pricing.currency}
                  selectedBilledType={selectedBilledType}
                  style={style}
                  key={`${plan.name}-${key}`}
                />
              ))}
            </tr>
          </thead>
          <tbody className="pricing-body">
            {Object.entries(pricingData).map(
              (
                [name, values]: [string, {value: (string | number | boolean), unit: string}[]],
                key: number
              ) => (
                <PricingElement
                  name={name}
                  values={values}
                  style={style}
                  key={`${name}-${key}`}
                />
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
