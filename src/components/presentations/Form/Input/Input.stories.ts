import Input from '@/components/presentations/Form/Input/Input';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Form/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Input',
    isRequired: true,
    hasError: false,
  },
};
