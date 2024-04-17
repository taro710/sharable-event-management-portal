'use client';

import { NextPage } from 'next';

import style from './page.module.scss';

const EventEdit: NextPage = () => {
  return (
    <>
      <h1 className={style['title']}>イベントを編集</h1>
      {/* <EventEditContainer /> */}
    </>
  );
};

export default EventEdit;
