import { useMemo } from 'react';
import useSWR from 'swr';

import { ExpenseApi } from '@/api/expenseApi';
import { ExpenseData, ExpenseDataWithoutId } from '@/domain/expense';

export const useExpense = (eventId: string) => {
  const expenseApi = useMemo(() => new ExpenseApi(eventId), [eventId]);

  const { data: expenses = [], mutate } = useSWR<ExpenseData[]>(
    'expense',
    () => expenseApi.get(), // TODO:
  );

  const addExpense = async (newExpense: ExpenseDataWithoutId) => {
    const currentExpenses = [...expenses];
    const newExpenseId = (() => {
      if (currentExpenses.length === 0) return 1;
      const ids = currentExpenses.map((expense) => expense.expenseId || 0);
      return Math.max(...ids) + 1;
    })();

    const newExpenseWithId = { ...newExpense, expenseId: newExpenseId };

    await expenseApi.add(newExpenseWithId);

    const afterAddExpensesData = [...currentExpenses, { ...newExpenseWithId }];
    mutate(afterAddExpensesData);
  };

  const updateExpense = async (updatedExpense: ExpenseData) => {
    await expenseApi.update(updatedExpense);

    const afterUpdateExpensesData = [...expenses].map((expense) => {
      if (expense.expenseId === updatedExpense.expenseId) return updatedExpense;
      return expense;
    });
    mutate(afterUpdateExpensesData);
  };

  // TODO: expenseId必須化
  const deleteExpense = async (expenseId?: number) => {
    if (!expenseId) return;
    await expenseApi.delete(expenseId);

    const afterDeleteExpensesData = [...expenses].filter(
      (expense) => expense.expenseId !== expenseId,
    );
    mutate(afterDeleteExpensesData);
  };

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };
};
