'use client';

import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import DialogExpenseAdding from '@/components/Dialog/DialogExpenseAdding';
import FadeIn from '@/components/FadeIn';
import IconAdd from '@/components/Icon/IconAdd';
import { NOLALA_2023 } from '@/test/expense/data/nolala2023';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const expenses = NOLALA_2023.DATA;

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      <FadeIn className={style['expense-panel']}>
        <ul className={style['cards']}>
          {expenses.map((expense, i) => (
            <li className={style['card']} key={i}>
              <div className={style['head']}>
                <p className={style['title']}>{expense.name}</p>
                <p className={style['price']}>
                  {expense.price.toLocaleString()}円
                </p>
              </div>
              <p className={style['member']}>
                <span className={style['prefix']}>支払い：</span>
                <span>{expense.person}</span>
              </p>
              <p className={style['member']}>
                <span className={style['prefix']}>対象者：</span>
                <span>{expense.person2.join(', ')}</span>
              </p>
            </li>
          ))}
        </ul>
        <Link href="/sample/expense/seisan" className={style['link']}>
          清算金額を確認
        </Link>
      </FadeIn>

      <button
        className={style['add-button']}
        onClick={() => setIsDialogOpen(true)}>
        <IconAdd />
      </button>

      <DialogExpenseAdding
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        handleSubmit={() => {}}
      />
    </>
  );
};

export default DashBoard;
