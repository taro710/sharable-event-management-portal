'use client';

import { NextPage } from 'next';

import MainPanel from '@/components/MainPanel';
import SubPanel from '@/components/SubPanel';
import Tab from '@/components/Tab';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  return (
    <div className={style['page-component']}>
      <div className={style['sub']}>
        <SubPanel />
      </div>
      <div className={style['main']}>
        <div className={style['tab']}>
          <Tab />
        </div>
        <div className={style['panel']}>
          <MainPanel />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
