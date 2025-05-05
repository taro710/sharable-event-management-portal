import type { Meta, StoryObj } from '@storybook/react';

import CardMemo from '@/components/presentations/Common/Card/CardMemo';

const meta = {
  title: 'Common/CardMemo',
  component: CardMemo,
} satisfies Meta<typeof CardMemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onClick: async () => await {},
    memo: {
      member: '山田',
      memo: '飲み会のメモ',
      memoId: 1,
    },
  },
};
