'use client';

import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import ExpenseAddingContainer from '@/components/containers/expense/ExpenseAddingContainer';
import ExpenseEditContainer from '@/components/containers/expense/ExpenseEditContainer';
import CardExpense from '@/components/presentations/CardExpense';
import DialogExpenseAdding from '@/components/presentations/Dialog/DialogExpenseAdding';
import DialogExpenseEdit from '@/components/presentations/Dialog/DialogExpenseEdit';
import FadeIn from '@/components/presentations/FadeIn';
import IconAdd from '@/components/presentations/Icon/IconAdd';
import { ExpenseData, useExpensePage } from '@/hooks/pages/useExpensePage';
import { useResponsive } from '@/hooks/useResponsive';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const { isSp } = useResponsive();

  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [editingExpense, setEditingExpense] = useState<ExpenseData>();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const { addExpense, updateExpense, getExpenseList, deleteExpense } =
    useExpensePage(expenses);

  // TODO:
  useEffect(() => {
    (async () => {
      const data = await getExpenseList();
      if (data === undefined) return;
      setExpenses(data);
    })();
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const openAddPanel = () => {
    setIsAddDialogOpen(true);
    if (!isSp) return;
    if (!ref.current) return;
    ref.current.style.transform = 'translateX(-50%)';
  };

  const closeAddPanel = () => {
    setIsAddDialogOpen(false);
    if (!isSp) return;
    if (!ref.current) return;
    ref.current.style.transform = 'translateX(0)';
  };

  // TODO: any
  const openEditPanel = (expense: ExpenseData) => {
    setEditingExpense(expense);
    setIsEditDialogOpen(true);
    if (!isSp) return;
    if (!ref.current) return;
    ref.current.style.transform = 'translateX(-50%)';
  };

  const closeEditPanel = () => {
    setEditingExpense(undefined);
    setIsEditDialogOpen(false);
    if (!isSp) return;
    if (!ref.current) return;
    ref.current.style.transform = 'translateX(0)';
  };

  return (
    <>
      <div className={style['page-component']} ref={ref}>
        <FadeIn className={style['expense-panel']}>
          <ul className={style['cards']}>
            {expenses.map((expense, i) => (
              <CardExpense
                expense={expense}
                key={i}
                onClick={() => openEditPanel(expense)}
              />
            ))}
          </ul>
          <Link href="/sample/expense/seisan" className={style['link']}>
            清算金額を確認
          </Link>
        </FadeIn>

        <button className={style['add-button']} onClick={openAddPanel}>
          <IconAdd />
        </button>

        <div className={style['container-component']}>
          {isAddDialogOpen && (
            <ExpenseAddingContainer
              close={closeAddPanel}
              handleSubmit={async (expense: ExpenseData) => {
                const result = await addExpense(expense);
                if (result === undefined) return;
                setExpenses(result);
                closeAddPanel();
              }}
            />
          )}
          {isEditDialogOpen && editingExpense && (
            <ExpenseEditContainer
              defaultExpense={editingExpense}
              close={closeEditPanel}
              deleteExpense={async (expenseId: number) => {
                const result = await deleteExpense(expenseId);
                if (result === undefined) return;
                setExpenses(result);
                closeEditPanel();
              }}
              handleSubmit={async (expense: ExpenseData) => {
                const result = await updateExpense(expense);
                if (result === undefined) return;
                setExpenses(result);
                closeEditPanel();
              }}
            />
          )}
        </div>
      </div>

      {!isSp && (
        <DialogExpenseAdding
          isOpen={isAddDialogOpen}
          closeDialog={closeAddPanel}
          handleSubmit={async (expense: ExpenseData) => {
            const result = await addExpense(expense);
            if (result === undefined) return;
            setExpenses(result);
            closeAddPanel();
          }}
        />
      )}
      {!isSp && editingExpense && (
        <DialogExpenseEdit
          isOpen={isEditDialogOpen}
          closeDialog={closeEditPanel}
          defaultExpense={editingExpense}
          deleteExpense={async (expenseId: number) => {
            const result = await deleteExpense(expenseId);
            if (result === undefined) return;
            setExpenses(result);
            closeEditPanel();
          }}
          handleSubmit={async (expense: ExpenseData) => {
            const result = await updateExpense(expense);
            if (result === undefined) return;
            setExpenses(result);
            closeEditPanel();
          }}
        />
      )}
    </>
  );
};

export default DashBoard;
