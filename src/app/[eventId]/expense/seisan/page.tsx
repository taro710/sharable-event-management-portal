'use client';

import { NextPage } from 'next';
import Link from 'next/link';

import FadeIn from '@/components/presentations/FadeIn';
import { NOLALA_2023 } from '@/test/expense/data/nolala2023';
import { func } from '@/util/sample';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const expenses = NOLALA_2023.DATA;

  const participants = NOLALA_2023.PARTICIPANTS;

  const answer = func(expenses, participants);

  return (
    <>
      <FadeIn className={style['expense-panel']}>
        <h2>やりとり</h2>
        {answer.map((list, i) => (
          <p key={i}>
            <span>
              {list.participant}→
              {list.to.map((to) => to.participant + 'に' + to.price + '円')}
            </span>
          </p>
        ))}
      </FadeIn>

      <Link href="/sample/expense" className={style['link-button']}>
        会計一覧
      </Link>
    </>
  );
};

export default DashBoard;
