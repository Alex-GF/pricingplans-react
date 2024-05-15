import { Dispatch, SetStateAction, createContext, useState } from "react";
import { UserContextAttributes } from "../parsers/expression";
import { parseAttributeExpressionToUserAttributes } from "../parsers/expression";
import { AllFeatures, ParsedFeatures } from "../types/features";
import {
  AddOnsState,
  PricingManager,
  PricingManagerState,
} from "../types/index";
import { PlansState } from "../types/plans";
import parsePricingManager from "../parsers";

interface EditorContextProps {
  pricing: PricingManagerState;
  setPricing: Dispatch<SetStateAction<PricingManagerState>>;
  attributes: AllFeatures[];
  setAttributes: Dispatch<SetStateAction<AllFeatures[]>>;
  userContextAttributes: UserContextAttributes;
  setUserContextAttributes: Dispatch<SetStateAction<UserContextAttributes>>;
  plans: PlansState;
  setPlans: Dispatch<SetStateAction<PlansState>>;
  addOns: AddOnsState;
  setAddOns: Dispatch<SetStateAction<AddOnsState>>;
  theme: string;
  returnTo: string;
}

export const EditorContext = createContext<EditorContextProps>({
  pricing: null as PricingManagerState,
  setPricing: () => null,
  attributes: [] as ParsedFeatures,
  setAttributes: () => null,
  userContextAttributes: [] as UserContextAttributes,
  setUserContextAttributes: () => null,
  plans: null as PlansState,
  setPlans: () => null,
  addOns: null as AddOnsState,
  setAddOns: () => null,
  theme: "blue",
  returnTo: "/",
});

interface EditorContextProviderProps {
  pricingContext: PricingManager;
  theme?: string;
  returnTo?: string;
  children: JSX.Element | JSX.Element[];
}

export function EditorContextProvider({
  pricingContext,
  theme,
  returnTo,
  children,
}: EditorContextProviderProps) {
  const editorTheme = theme ? theme : "blue";
  const retTo = returnTo ? returnTo : "/";
  const pricingManager = parsePricingManager(pricingContext);

  const initialUserAttributes = parseAttributeExpressionToUserAttributes(
    pricingManager.features
  ).filter((userAttribute) => userAttribute.name !== "");

  const [userContextAttributes, setUserContextAttributes] = useState(
    initialUserAttributes
  );

  const initialPricing = {
    saasName: pricingManager.saasName,
    date: pricingManager.date,
    currency: pricingManager.currency,
    hasAnnualPayment: pricingManager.hasAnnualPayment,
  };

  const [pricing, setPricing] = useState<PricingManagerState>(initialPricing);
  const [attributes, setAttributes] = useState<ParsedFeatures>(
    pricingManager.features
  );
  const [plans, setPlans] = useState<PlansState>(pricingManager.plans);
  const [addOns, setAddOns] = useState<AddOnsState>(pricingManager.addOns);

  return (
    <EditorContext.Provider
      value={{
        pricing,
        setPricing,
        attributes,
        setAttributes,
        userContextAttributes,
        setUserContextAttributes,
        plans,
        setPlans,
        addOns,
        setAddOns,
        theme: editorTheme,
        returnTo: retTo,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
