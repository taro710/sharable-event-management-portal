'use client';

import { NextPage } from 'next';

import EventEditContainer from '@/components/containers/event/EventEditContainer';

import style from './page.module.scss';

const EventEdit: NextPage = () => {
  return (
    <>
      <h1 className={style['title']}>イベントを編集</h1>
      <EventEditContainer closeDialog={() => {}} handleSubmit={() => {}} />
    </>
  );
};

export default EventEdit;
