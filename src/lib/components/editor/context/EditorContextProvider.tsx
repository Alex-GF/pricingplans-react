import { Dispatch, SetStateAction, createContext, useState } from "react";
import { UserContextAttributes } from "../parsers/expression";
import { parseAttributeExpressionToUserAttributes } from "../parsers/expression";
import PricingManagerParser from "../parsers/pricingManager";
import { AllFeatures, FeatureState } from "../types/features";
import { PricingManager } from "../types/index";
import { PlansState } from "../types/plans";

interface EditorContextProps {
  attributes: AllFeatures[];
  setAttributes: Dispatch<SetStateAction<AllFeatures[]>>;
  userContextAttributes: UserContextAttributes;
  setUserContextAttributes: Dispatch<SetStateAction<UserContextAttributes>>;
  plans: PlansState;
  setPlans: Dispatch<SetStateAction<PlansState>>;
  theme: string;
  returnTo: string;
}

export const EditorContext = createContext<EditorContextProps>({
  theme: "blue",
  returnTo: "/",
  attributes: [] as FeatureState,
  setAttributes: () => null,
  userContextAttributes: [] as UserContextAttributes,
  setUserContextAttributes: () => null,
  plans: null as PlansState,
  setPlans: () => null,
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
  const pricingManager = new PricingManagerParser(
    pricingContext
  ).parseToState();

  const initialUserAttributes = parseAttributeExpressionToUserAttributes(
    pricingManager.features
  ).filter((userAttribute) => userAttribute.name !== "");
  const [attributes, setAttributes] = useState<FeatureState>(
    pricingManager.features
  );
  const [userContextAttributes, setUserContextAttributes] = useState(
    initialUserAttributes
  );
  const [plans, setPlans] = useState<PlansState>(pricingManager.plans);
  return (
    <EditorContext.Provider
      value={{
        attributes,
        setAttributes,
        userContextAttributes,
        setUserContextAttributes,
        plans,
        setPlans,
        theme: editorTheme,
        returnTo: retTo,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
