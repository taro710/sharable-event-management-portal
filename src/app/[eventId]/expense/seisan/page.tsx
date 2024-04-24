'use client';

import { useAtom } from 'jotai';
import { NextPage } from 'next';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { eventAtom } from '@/atoms/eventAtom';
import { expenseAtom } from '@/atoms/expenseAtom';
import FadeIn from '@/components/presentations/FadeIn';
import { func } from '@/util/sample';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const [event] = useAtom(eventAtom);
  const members = event?.members || [];

  const eventId = useParams()?.eventId as string;

  const [expenses] = useAtom(expenseAtom);

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
