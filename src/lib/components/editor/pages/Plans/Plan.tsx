import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { EditorContext } from "../../context/EditorContextProvider";
import { ArrowLeft } from "../../components/Icons";
import { FeatureList } from "./FeatureList";
import { PlanState } from "../../types/plans";
import { PaymentTypes, StrNumBool } from "../../types";

interface PlanLocation {
  index: number;
}

export function Plan() {
  const { state } = useLocation();
  const { index } = state as PlanLocation;
  const isPlanIncluded = index !== null;
  const navigate = useNavigate();
  const goBack = () => navigate("..");

  const { pricing, attributes, plans, setPlans } = useContext(EditorContext);

  if (!pricing) {
    throw new Error("You are not consuming the context correctly");
  }

  const defaultFeatureValues = attributes.map((feature) => ({
    name: feature.name,
    value: feature.defaultValue,
  }));

  const newPlan = {
    name: "",
    description: "",
    unit: "user/month",
    annualPrice: 0,
    monthlyPrice: 0,
    features: defaultFeatureValues,
    usageLimits: [],
  };

  const initialPlan = isPlanIncluded && plans ? plans[index] : newPlan;

  const [plan, setPlan] = useState<PlanState>(initialPlan);

  const handleFeatureChange = (
    featureName: string,
    currentValue: StrNumBool | PaymentTypes
  ) => {
    const feat = plan.features.map((feature) =>
      feature.name === featureName
        ? { ...feature, value: currentValue }
        : feature
    );
    setPlan({ ...plan, features: feat });
  };

  const isPlanNameEmpty = plan.name === "";
  const priceRegex = /^\d+.?\d{0,2}?$/;
  const isValidPrice = plan.annualPrice
    ? priceRegex.test(plan.annualPrice.toString())
    : true;
  const isMonthlyPriceGreaterThanAnnualPrice = plan.annualPrice
    ? plan.monthlyPrice >= plan.annualPrice
    : true;

  const formHasErrors =
    isPlanNameEmpty || !isValidPrice || !isMonthlyPriceGreaterThanAnnualPrice;

  const addPlan = () => {
    if (!plans) {
      return;
    }

    setPlans([...plans, { ...plan }]);
  };

  const editPlan = (planPosition: number) => {
    if (!plans) {
      return;
    }

    const newPlans = plans.map((oldPlan, index) =>
      index === planPosition
        ? { ...plan, annualPrice: Number(plan.annualPrice) }
        : oldPlan
    );
    setPlans(newPlans);
  };

  const deletePlan = () => {
    if (!plans) {
      return;
    }
    setPlans(plans.filter((_, index) => index !== state.index));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formHasErrors) {
      return;
    }

    if (isPlanIncluded) {
      editPlan(index);
    } else {
      addPlan();
    }
    goBack();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPlan({ ...plan, [e.target.name]: e.target.value });

  return (
    <article className="pp-content__main">
      <header className="pp-content-header">
        <Button onClick={goBack}>
          <ArrowLeft />
        </Button>
        <h1>{isPlanIncluded && plans ? plans[index].name : "New Plan"}</h1>
      </header>
      <form className="pp-form" onSubmit={handleSubmit}>
        <div className="pp-form__group">
          {isPlanNameEmpty && (
            <small className="pp-form__errors">Plan name is required</small>
          )}

          <label htmlFor="name" className="pp-form__label">
            Plan name
          </label>
          <input
            id="name"
            name="name"
            className="pp-form__field"
            value={plan.name}
            onChange={handleChange}
          />
        </div>
        <div className="pp-form__group">
          <label htmlFor="description" className="pp-form__label">
            Description
          </label>
          <input
            id="description"
            name="description"
            className="pp-form__field"
            value={plan.description}
            onChange={handleChange}
          />
        </div>
        <div className="pp-form__group">
          {!isValidPrice && (
            <small className="pp-form__errors">
              Invalid price. Plan has to be zero or positive and contain a dot
            </small>
          )}

          <label htmlFor="monthlyPrice" className="pp-form__label">
            Monthly Price
          </label>
          <input
            id="monthlyPrice"
            name="monthlyPrice"
            type="number"
            min={0}
            step={0.01}
            className="pp-form__field"
            value={plan.monthlyPrice}
            onChange={handleChange}
          />
        </div>

        {pricing.hasAnnualPayment && plan.annualPrice && (
          <div className="pp-form__group">
            {!isValidPrice && (
              <small className="pp-form_errors">
                Invalid price. Plan has to be zero or positive and contain a dot
              </small>
            )}
            {!isMonthlyPriceGreaterThanAnnualPrice && (
              <small className="pp-form__errors">
                Annual price is greater than the monthly price. You should give
                your users a discount.
              </small>
            )}
            <label htmlFor="annualPrice" className="pp-form__label">
              Annual Price
            </label>
            <input
              id="annualPrice"
              name="annualPrice"
              type="number"
              min={0}
              step={0.01}
              className="pp-form__field"
              value={plan.annualPrice}
              onChange={handleChange}
            />
          </div>
        )}
        <h2>Features</h2>
        <FeatureList
          values={plan.features}
          onFeatureChange={handleFeatureChange}
        />
        <div className="pp-plan-actions">
          {isPlanIncluded && (
            <Button
              className="pp-btn"
              style={{ backgroundColor: "red" }}
              type="button"
              onClick={deletePlan}
            >
              Delete plan
            </Button>
          )}
          <Button className="pp-btn">
            {isPlanIncluded ? "Save changes" : "Add plan"}
          </Button>
        </div>
      </form>
    </article>
  );
}
