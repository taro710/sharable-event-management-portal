import { useMemo } from 'react';
import useSWR from 'swr';

import { ExpenseData } from '@/domain/expense';
import { ExpenseApi } from '@/hooks/pages/expenseApi';

export const useExpensePage = (eventId: string) => {
  const expenseApi = useMemo(() => new ExpenseApi(eventId), [eventId]);

  const { data: expenses = [], mutate } = useSWR<ExpenseData[]>(
    'expense',
    () => expenseApi.get(), // TODO:
  );

  const addExpense = async (newExpense: ExpenseData) => {
    const currentExpenses = [...expenses];
    const newExpenseId = (() => {
      if (currentExpenses.length === 0) return 1;
      const ids = currentExpenses.map((expense) => expense.expenseId || 0);
      return Math.max(...ids) + 1;
    })();

    const newExpenseWithId = { ...newExpense, expenseId: newExpenseId };

    await expenseApi.add(newExpenseWithId);

    const afterAddExpenseData = [...currentExpenses, { ...newExpenseWithId }];
    mutate(afterAddExpenseData);
  };

  const updateExpense = async (updatedExpense: ExpenseData) => {
    await expenseApi.update(updatedExpense);

    const afterUpdateExpenseData = [...expenses].map((expense) => {
      if (expense.expenseId === updatedExpense.expenseId) return updatedExpense;
      return expense;
    });
    mutate(afterUpdateExpenseData);
  };

  // TODO: expenseId必須化
  const deleteExpense = async (expenseId?: number) => {
    if (!expenseId) return;
    await expenseApi.delete(expenseId);

    const afterDeleteExpenseData = [...expenses].filter(
      (expense) => expense.expenseId !== expenseId,
    );
    mutate(afterDeleteExpenseData);
  };

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };
};
