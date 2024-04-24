'use client';

import { useAtom } from 'jotai';
import { NextPage } from 'next';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { eventAtom } from '@/atoms/eventAtom';
import FadeIn from '@/components/presentations/FadeIn';
import { ExpenseData } from '@/domain/expense';
import { useExpensePage } from '@/hooks/pages/useExpensePage';
import { func } from '@/util/sample';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const [event] = useAtom(eventAtom);
  const members = event?.members || [];

  const eventId = useParams()?.eventId as string;

  const [expenses, setExpenses] = useState<ExpenseData[]>([]);

  const { getExpenseList } = useExpensePage([]);

  // TODO:
  useEffect(() => {
    (async () => {
      const data = await getExpenseList();
      if (data === undefined) return;
      setExpenses(data);
    })();
  }, []);

  const answer = func(expenses, members);

  return (
    <>
      <FadeIn className={style['expense-panel']}>
        <h2 className={style['title']}>清算</h2>
        {answer.map((list, i) => (
          <p key={i}>
            <span>
              {list.participant}→
              {list.to.map((to) => to.participant + 'に' + to.price + '円')}
            </span>
          </p>
        ))}
      </FadeIn>

      <Link href={`/${eventId}/expense`} className={style['link-button']}>
        会計一覧
      </Link>
    </>
  );
};

export default DashBoard;
