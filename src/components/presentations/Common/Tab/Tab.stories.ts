import type { Meta, StoryObj } from '@storybook/react';

import Tab from '@/components/presentations/Common/Tab/Tab';


const meta = {
  title: 'Common/Tab',
  component: Tab,
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
