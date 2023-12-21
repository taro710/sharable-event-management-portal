'use client';

import { NextPage } from 'next';

import FadeIn from '@/components/FadeIn';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  return (
    <FadeIn className={style['memo-panel']}>
      <></>
    </FadeIn>
  );
};

export default DashBoard;
