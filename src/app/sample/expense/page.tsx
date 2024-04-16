'use client';

import { NextPage } from 'next';
import Link from 'next/link';
import { useRef, useState } from 'react';

import CardExpense from '@/components/CardExpense';
import DialogExpenseAdding from '@/components/Dialog/DialogExpenseAdding';
import DialogExpenseEdit from '@/components/Dialog/DialogExpenseEdit';
import FadeIn from '@/components/FadeIn';
import IconAdd from '@/components/Icon/IconAdd';
import ExpenseAddingContainer from '@/components/containers/ExpenseAddingContainer';
import ExpenseEditContainer from '@/components/containers/ExpenseEditContainer';
import { useResponsive } from '@/hooks/useResponsive';
import { NOLALA_2023 } from '@/test/expense/data/nolala2023';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const expenses = NOLALA_2023.DATA;
  const { isSp } = useResponsive();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

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
  const openEditPanel = () => {
    setIsEditDialogOpen(true);
    if (!isSp) return;
    if (!ref.current) return;
    ref.current.style.transform = 'translateX(-50%)';
  };

  const closeEditPanel = () => {
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
              <CardExpense expense={expense} key={i} onClick={openEditPanel} />
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
              handleSubmit={() => {}}
            />
          )}
          {isEditDialogOpen && (
            <ExpenseEditContainer
              close={closeEditPanel}
              handleSubmit={() => {}}
            />
          )}
        </div>
      </div>

      {!isSp && (
        <DialogExpenseAdding
          isOpen={isAddDialogOpen}
          closeDialog={closeAddPanel}
          handleSubmit={() => {}}
        />
      )}
      {!isSp && (
        <DialogExpenseEdit
          isOpen={isEditDialogOpen}
          closeDialog={closeEditPanel}
          handleSubmit={() => {}}
        />
      )}
    </>
  );
};

export default DashBoard;
