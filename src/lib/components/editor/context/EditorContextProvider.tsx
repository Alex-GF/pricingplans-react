import { Dispatch, SetStateAction, createContext, useState } from "react";
import { UserContextAttributes } from "../parsers/expression";
import { AllFeatures, ParsedFeatures } from "../types/features";
import {
  AddOnsState,
  ParsedUsageLimits,
  PricingManager,
  PricingManagerState,
  UsageLimitsState,
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
  usageLimits: ParsedUsageLimits;
  setUsageLimits: Dispatch<SetStateAction<ParsedUsageLimits>>;
  plans: PlansState;
  setPlans: Dispatch<SetStateAction<PlansState>>;
  addOns: AddOnsState;
  setAddOns: Dispatch<SetStateAction<AddOnsState>>;
  theme: string;
  returnTo: string;
}

export const EditorContext = createContext<EditorContextProps>({
  pricing: null,
  setPricing: () => null,
  attributes: [] as ParsedFeatures,
  setAttributes: () => null,
  usageLimits: [] as ParsedUsageLimits,
  setUsageLimits: () => null,
  userContextAttributes: [] as UserContextAttributes,
  setUserContextAttributes: () => null,
  plans: null,
  setPlans: () => null,
  addOns: null,
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

  const [userContextAttributes, setUserContextAttributes] = useState(
    [] as UserContextAttributes
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
  const [usageLimits, setUsageLimits] = useState<ParsedUsageLimits>(
    pricingManager.usageLimits || []
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
        usageLimits,
        setUsageLimits,
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
