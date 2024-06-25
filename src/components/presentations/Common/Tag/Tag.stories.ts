import type { Meta, StoryObj } from '@storybook/react';

import Tag from '@/components/presentations/Common/Tag/Tag';


const meta = {
  title: 'Common/Tag',
  component: Tag,
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'Tag',
  },
};
