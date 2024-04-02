'use client';

import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

import FadeIn from '@/components/FadeIn';
import { NOLALA_2023 } from '@/test/expense/data/nolala2023';
import { func } from '@/util/sample';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const router = useRouter();

  const expenses = NOLALA_2023.DATA;

  const participants = NOLALA_2023.PARTICIPANTS;

  const answer = func(expenses, participants);

  return (
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
      <button
        className={style['button']}
        onClick={() => router.push('/sample/expense')}>
        会計一覧
      </button>
    </FadeIn>
  );
};

export default DashBoard;
