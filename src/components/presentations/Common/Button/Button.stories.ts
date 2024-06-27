import { fn } from '@storybook/test';

import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/presentations/Common/Button/Button';


const meta = {
  title: 'Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'Button',
  },
};
