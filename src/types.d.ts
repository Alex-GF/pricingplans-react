// ------------ PRICING TYPES ------------ //

export type ValueType = "NUMERIC" | "BOOLEAN" | "TEXT";
export type FeatureType = "INFORMATION" | "INTEGRATION" | "DOMAIN" | "AUTOMATION" | "MANAGEMENT" | "GUARANTEE" | "SUPPORT" | "PAYMENT";
export type UsageLimitType = "RENEWABLE" | "NON_RENEWABLE" | "TIME_DRIVEN" | "RESPONSE_DRIVEN";

export interface Pricing {
    name: string;
    createdAt: string;
    currency: string;
    hasAnnualPayment: boolean;
    features: Feature[];
    usageLimits?: UsageLimit[];
    plans: Plan[];
    addOns?: AddOn[];
}

export interface Feature {
    name: string;
    description: string;
    valueType: ValueType;
    defaultValue: string | number | boolean;
    value?: string | number | boolean;
    expression?: string;
    serverExpression?: string;
    type: FeatureType;
}

export interface UsageLimit {
    name: string;
    description: string;
    valueType: ValueType;
    defaultValue: string | number | boolean;
    value?: string | number | boolean;
    unit: string;
    type: UsageLimitType;
    linkedFeatures?: Feature[];
}

export interface Plan {
    name: string;
    description: string;
    monthlyPrice: number;
    annualPrice: number;
    unit: string;
    features: Feature[];
    usageLimits?: UsageLimit[];
}

export interface AddOn {
    name: string;
    availableFor: string[];
    monthlyPrice: number | null;
    annualPrice: number | null;
    price: number | null;
    unit: string;
    features?: Feature[];
    usageLimits?: UsageLimit[];
    usageLimitsExtensions?: UsageLimit[];
}


// ------------ PRICING RENDERING TYPES ------------ //

type CuiCuiPlan = {
    title: string;
    description: string;
    price: {
      monthly: number;
      annually: number;
    };
    features: string[];
    infos?: string[];
    isBestValue?: boolean;
  };

// ------------ PRICING DATA ------------ //

type PricingData = {
    [key: string]: {value: (string | number | boolean), unit: string}[];
  };