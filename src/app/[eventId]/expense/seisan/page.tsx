'use client';

import { useAtom } from 'jotai';
import { NextPage } from 'next';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import style from './page.module.scss';

import { eventAtom } from '@/atoms/eventAtom';
import { expenseAtom } from '@/atoms/expenseAtom';
import FadeIn from '@/components/presentations/Animation/FadeIn';
import { func } from '@/util/sample';

const DashBoard: NextPage = () => {
  const [event] = useAtom(eventAtom);

  const eventId = useParams()?.eventId as string;

  const [expenses] = useAtom(expenseAtom);

  // イベントから消されたユーザーの支払いデータもDBには残っている。それらユーザーも全て含めて清算する
  const members: string[] = useMemo(() => {
    const members = new Set<string>();
    const eventMembers = event?.members || [];
    eventMembers.forEach((member) => members.add(member));
    expenses.forEach((expense) => {
      members.add(expense.payerName);
      expense.members.forEach((member) => members.add(member));
    });

    return Array.from(members);
  }, [event, expenses]);

  const answer = func(expenses, members);

  return (
    <>
      <FadeIn className={style['expense-panel']}>
        <h2 className={style.title}>清算</h2>
        {answer.map((list, i) => (
          <p className={style.text} key={i}>
            {list.participant}→{' '}
            {list.to.map((to) => `${to.participant}に${to.price}円支払い。`)}
          </p>
        ))}
      </FadeIn>

      <Link className={style['link-button']} href={`/${eventId}/expense`}>
        会計一覧
      </Link>
    </>
  );
};

export default DashBoard;
