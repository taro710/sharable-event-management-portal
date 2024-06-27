'use client';

import { useAtom } from 'jotai';
import { NextPage } from 'next';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';

import style from './page.module.scss';

import { expenseAtom } from '@/atoms/expenseAtom';
import ExpenseAddingContainer from '@/components/containers/expense/ExpenseAddingContainer';
import ExpenseEditContainer from '@/components/containers/expense/ExpenseEditContainer';
import FadeIn from '@/components/presentations/Animation/FadeIn';
import CardExpense from '@/components/presentations/Common/Card/CardExpense';
import DialogExpenseAdding from '@/components/presentations/Dialog/DialogExpenseAdding';
import DialogExpenseEdit from '@/components/presentations/Dialog/DialogExpenseEdit';
import IconAdd from '@/components/presentations/Icon/IconAdd';
import { ExpenseData } from '@/domain/expense';
import { useExpensePage } from '@/hooks/pages/useExpensePage';
import { useResponsive } from '@/hooks/useResponsive';

const DashBoard: NextPage = () => {
  const { isSp } = useResponsive();
  const eventId = useParams()?.eventId as string;

  const [expenses, setExpenses] = useAtom(expenseAtom);
  const [editingExpense, setEditingExpense] = useState<ExpenseData>();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const { addExpense, updateExpense, deleteExpense } = useExpensePage(expenses);

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
          {expenses.length <= 0 ? (
            <p className={style.notice}>支払いはありません🤔</p>
          ) : null}
          <ul className={style.cards}>
            {expenses.map((expense) => (
              <CardExpense
                expense={expense}
                key={expense.expenseId} // FIXME: id型の必須化
                onClick={() => openEditPanel(expense)}
              />
            ))}
          </ul>
          {expenses.length ? (
            <Link className={style.link} href={`/${eventId}/expense/seisan`}>
              清算金額を確認
            </Link>
          ) : null}
        </FadeIn>

        <div className={style['container-component']}>
          {isAddDialogOpen ? (
            <ExpenseAddingContainer
              close={closeAddPanel}
              handleSubmit={async (expense: ExpenseData) => {
                const result = await addExpense(expense);
                if (result === undefined) return;
                setExpenses(result);
                closeAddPanel();
              }}
            />
          ) : null}
          {isEditDialogOpen && editingExpense ? (
            <ExpenseEditContainer
              close={closeEditPanel}
              defaultExpense={editingExpense}
              deleteExpense={async (expenseId?: number) => {
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
          ) : null}
        </div>
      </div>

      {!isAddDialogOpen && !isEditDialogOpen ? (
        <button
          className={style['add-button']}
          type="button"
          onClick={openAddPanel}>
          <IconAdd />
        </button>
      ) : null}

      {isSp ? null : (
        <DialogExpenseAdding
          closeDialog={closeAddPanel}
          handleSubmit={async (expense: ExpenseData) => {
            const result = await addExpense(expense);
            if (result === undefined) return;
            setExpenses(result);
            closeAddPanel();
          }}
          isOpen={isAddDialogOpen}
        />
      )}
      {!isSp && editingExpense ? (
        <DialogExpenseEdit
          closeDialog={closeEditPanel}
          defaultExpense={editingExpense}
          deleteExpense={async (expenseId?: number) => {
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
          isOpen={isEditDialogOpen}
        />
      ) : null}
    </>
  );
};

export default DashBoard;
