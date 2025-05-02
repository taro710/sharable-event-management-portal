'use client';

import { useAtom } from 'jotai';
import { NextPage } from 'next';
import { lazy, Suspense, useRef, useState } from 'react';

import style from './page.module.scss';

import { eventAtom } from '@/atoms/eventAtom';
import { expenseAtom } from '@/atoms/expenseAtom';
import ExpenseAddingContainer from '@/components/containers/expense/ExpenseAddingContainer';
import ExpenseEditContainer from '@/components/containers/expense/ExpenseEditContainer';
// import ExpensePageContent from '@/components/containers/expense/ExpensePageContent';
import DialogExpenseAdding from '@/components/presentations/Dialog/DialogExpenseAdding';
import DialogExpenseEdit from '@/components/presentations/Dialog/DialogExpenseEdit';
import IconAdd from '@/components/presentations/Icon/IconAdd';
import { ExpenseData } from '@/domain/expense';
import { useExpensePage } from '@/hooks/pages/useExpensePage';
import { useResponsive } from '@/hooks/useResponsive';

const ExpensePageContent = lazy(
  () => import('@/components/containers/expense/ExpensePageContent'),
);

const DashBoard: NextPage = () => {
  const { isSp } = useResponsive();
  const [event] = useAtom(eventAtom); // TODO: event必須化対応;

  const [expenses, setExpenses] = useAtom(expenseAtom);
  const [editingExpense, setEditingExpense] = useState<ExpenseData>();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const { addExpense, updateExpense, deleteExpense } = useExpensePage(expenses);

  const ref = useRef<HTMLDivElement>(null);
  const openAddPanel = () => {
    if (isSp) window.scrollTo(0, 0);

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
    if (isSp) {
      setScrollPosition(window.scrollY);
      window.scrollTo(0, 0);
    }

    setEditingExpense(expense);
    setIsEditDialogOpen(true);
    if (!isSp) return;
    if (!ref.current) return;
    ref.current.style.transform = 'translateX(-50%)';
  };

  const closeEditPanel = () => {
    if (isSp) window.scrollTo(0, scrollPosition);

    setEditingExpense(undefined);
    setIsEditDialogOpen(false);
    if (!isSp) return;
    if (!ref.current) return;
    ref.current.style.transform = 'translateX(0)';
  };

  return (
    <>
      <div className={style['page-component']} ref={ref}>
        {/* TODO: コンポーネント化 */}
        <Suspense fallback={<div style={{ padding: '24px' }}>Loading...</div>}>
          <ExpensePageContent
            eventId={event?.eventId || ''}
            onCardClick={openEditPanel}
          />
        </Suspense>

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
          aria-label="支払い記録を追加する"
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
