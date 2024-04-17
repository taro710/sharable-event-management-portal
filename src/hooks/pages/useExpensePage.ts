import { getDoc, doc, updateDoc, deleteField } from 'firebase/firestore';

import { database } from '@/firebase';

export type ExpenseData = {
  expenseId: number;
  expenseName: string;
  price: number;
  payerName: string;
  members: string[];
};

export const useExpensePage = (currentExpenseData: ExpenseData[]) => {
  const addExpense = async (data: ExpenseData) => {
    const newExpenseId = (() => {
      if (currentExpenseData.length === 0) return 1;
      const ids = currentExpenseData.map((expense) => expense.expenseId || 0);
      return Math.max(...ids) + 1;
    })();

    const docRef = doc(database, 'event01', 'expense');
    try {
      await updateDoc(docRef, {
        [newExpenseId]: { ...data, expenseId: newExpenseId },
      });
      const afterAddExpenseData = [
        ...currentExpenseData,
        { ...data, expenseId: newExpenseId },
      ];
      return afterAddExpenseData;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const updateExpense = async (data: ExpenseData) => {
    const docRef = doc(database, 'event01', 'expense');
    try {
      await updateDoc(docRef, { [data.expenseId]: data });

      const afterUpdateExpenseData = [...currentExpenseData].map((expense) => {
        if (expense.expenseId === data.expenseId) return data;
        return expense;
      });
      return afterUpdateExpenseData;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const getExpenseList = async () => {
    const docRef = doc(database, 'event01', 'expense');

    try {
      const document = await getDoc(docRef);
      const data = document?.data();
      const expenseList: ExpenseData[] = Object.values(data || {});
      return expenseList;
    } catch (error) {
      console.error('Error get document: ', error);
    }
  };

  const deleteExpense = async (expenseId: number) => {
    const docRef = doc(database, 'event01', 'expense');
    try {
      await updateDoc(docRef, { [expenseId]: deleteField() });

      const afterDeleteExpenseData = [...currentExpenseData].filter(
        (expense) => expense.expenseId !== expenseId,
      );
      return afterDeleteExpenseData;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return {
    addExpense,
    updateExpense,
    getExpenseList,
    deleteExpense,
  };
};
