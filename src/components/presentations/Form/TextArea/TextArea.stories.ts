import TextArea from '@/components/presentations/Form/TextArea/TextArea';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Form/TextArea',
  component: TextArea,
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Input',
  },
};
