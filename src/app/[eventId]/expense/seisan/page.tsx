'use client';

import { useAtom } from 'jotai';
import { NextPage } from 'next';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import style from './page.module.scss';

import { eventAtom } from '@/atoms/eventAtom';
import FadeIn from '@/components/presentations/Animation/FadeIn';
import { useExpensePage } from '@/hooks/pages/useExpensePage';
import { func } from '@/util/sample';

const DashBoard: NextPage = () => {
  const [event] = useAtom(eventAtom);

  const eventId = useParams()?.eventId as string;

  const { expenses } = useExpensePage(eventId);

  // イベントから消されたユーザーの支払いデータもDBには残っている。それらユーザーも全て含めて清算する
  const members: string[] = useMemo(() => {
    const memberSet = new Set<string>();
    const eventMembers = event?.members || [];
    eventMembers.forEach((member) => memberSet.add(member));
    expenses.forEach((expense) => {
      memberSet.add(expense.payerName);
      expense.members.forEach((member) => memberSet.add(member));
    });

    return Array.from(memberSet);
  }, [event, expenses]);

  const answer = func(expenses, members);

  return (
    <>
      <FadeIn className={style['expense-panel']}>
        <h2 className={style.title}>清算</h2>
        <div className={style.content}>
          {answer.map((list) => (
            // FIXME: key
            <div className={style.payment} key={list.participant}>
              <p className={style.heading}>{list.participant}</p>
              <p className={style.text}>
                {list.to
                  .map((to) => `${to.participant}に${to.price}円`)
                  .join(' , ')}{' '}
                支払い
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      <Link className={style['link-button']} href={`/${eventId}/expense`}>
        会計一覧
      </Link>
    </>
  );
};

export default DashBoard;
