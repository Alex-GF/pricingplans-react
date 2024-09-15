import type { Meta, StoryObj } from '@storybook/react';

import { PricingTheme1 } from '.';
import pricing from './pricing.json';

const meta = {
  component: PricingTheme1,
  tags: ['autodocs'],
} satisfies Meta<typeof PricingTheme1>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pricing: pricing
  }
};