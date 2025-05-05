import type { Meta, StoryObj } from '@storybook/react';

import CardExpense from '@/components/presentations/Common/Card/CardExpense';

const meta = {
  title: 'Common/CardExpense',
  component: CardExpense,
} satisfies Meta<typeof CardExpense>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    expense: {
      expenseId: 1,
      expenseName: '飲み会',
      price: 5000,
      payerName: '山田',
      members: ['山田', '田中', '佐藤'],
    },
  },
};
