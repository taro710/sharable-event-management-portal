import SelectBox from '@/components/presentations/Form/SelectBox/SelectBox';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Form/SelectBox',
  component: SelectBox,
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'SelectBox',
    children: [
      <option key="1" value="1">
        Option1
      </option>,
      <option key="2" value="2">
        Option2
      </option>,
      <option key="3" value="3">
        Option3
      </option>,
    ],
  },
};
