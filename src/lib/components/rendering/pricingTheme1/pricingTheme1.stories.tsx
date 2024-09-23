import type { Meta, StoryObj } from '@storybook/react';

import { PricingTheme1 } from '.';
import pricing from './CCSIM.json';
import pricingTemplate from './template.json';
import { Pricing } from '../../../../types';

const meta = {
  component: PricingTheme1,
  tags: ['autodocs'],
} satisfies Meta<typeof PricingTheme1>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PricingTemplate: Story = {
  args: {
    pricing: pricingTemplate as unknown as Pricing,
    style: {
      plansColor: "#000000",
      priceColor: "#000000",
      periodColor: "#000000",
      headerColor: "#000000",
      namesColor: "#000000",
      valuesColor: "#000000",
      checkColor: "#76B703",
      crossColor: "#9ca3af",
      backgroundColor: "#f3f4f6",
      dividerColor: "#9e9e9e",
      billingSelectionColor: "#ffffff",
      billingSelectionBackgroundColor: "#EEE",
      billingSelectionTextColor: "#334155",
      addonBackgroundColor: "#ffffff",
      addonTextColor: "#334155",
    }
  },
};

export const CCSIM: Story = {
  args: {
    pricing: pricing as unknown as Pricing,
    style: {
      plansColor: "#000000",
      priceColor: "#000000",
      periodColor: "#000000",
      headerColor: "#000000",
      namesColor: "#000000",
      valuesColor: "#000000",
      checkColor: "#76B703",
      crossColor: "#9ca3af",
      backgroundColor: "#f3f4f6",
      dividerColor: "#9e9e9e",
      billingSelectionColor: "#ffffff",
      billingSelectionBackgroundColor: "#EEE",
      billingSelectionTextColor: "#334155",
      addonBackgroundColor: "#ffffff",
      addonTextColor: "#334155",
    }
  },
};