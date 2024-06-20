import Checkbox from '@/components/presentations/Form/Checkbox/Checkbox';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Checkbox',
  },
};
