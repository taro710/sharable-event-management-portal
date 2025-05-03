'use client';

import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { expenseAtom } from '@/atoms/expenseAtom';
import { ExpenseData } from '@/domain/expense';

type Props = {
  expenses: ExpenseData[];
  children: React.ReactNode;
};

const ExpensePageWrapper = ({ expenses, children }: Props) => {
  const setExpenses = useSetAtom(expenseAtom);
  useEffect(() => setExpenses(expenses));

  return children;
};

export default ExpensePageWrapper;
