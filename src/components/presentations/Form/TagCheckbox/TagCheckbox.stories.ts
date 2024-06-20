import TagCheckbox from '@/components/presentations/Form/TagCheckbox/TagCheckbox';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Form/TagCheckbox',
  component: TagCheckbox,
} satisfies Meta<typeof TagCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'TagCheckbox',
  },
};
