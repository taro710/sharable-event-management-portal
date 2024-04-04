'use client';

import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import CardExpense from '@/components/CardExpense';
import DialogExpenseAdding from '@/components/Dialog/DialogExpenseAdding';
import DialogExpenseEdit from '@/components/Dialog/DialogExpenseEdit';
import FadeIn from '@/components/FadeIn';
import IconAdd from '@/components/Icon/IconAdd';
import { NOLALA_2023 } from '@/test/expense/data/nolala2023';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const expenses = NOLALA_2023.DATA;

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  return (
    <>
      <FadeIn className={style['expense-panel']}>
        <ul className={style['cards']}>
          {expenses.map((expense, i) => (
            <CardExpense
              expense={expense}
              key={i}
              onClick={() => setIsEditDialogOpen(true)}
            />
          ))}
        </ul>
        <Link href="/sample/expense/seisan" className={style['link']}>
          清算金額を確認
        </Link>
      </FadeIn>

      <button
        className={style['add-button']}
        onClick={() => setIsAddDialogOpen(true)}>
        <IconAdd />
      </button>

      <DialogExpenseAdding
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        handleSubmit={() => {}}
      />
      <DialogExpenseEdit
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        handleSubmit={() => {}}
      />
    </>
  );
};

export default DashBoard;
