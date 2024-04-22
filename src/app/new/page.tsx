'use client';

import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

import EventEditContainer from '@/components/containers/event/EventEditContainer';
import { EventData, useEvent } from '@/hooks/useEvent';

import style from './page.module.scss';

const EventEdit: NextPage = () => {
  const router = useRouter();
  const { addEvent } = useEvent();

  const handleSubmit = async (data: EventData) => {
    const eventId = await addEvent(data);
    router.push(`/${eventId}/item`);
  };

  return (
    <div className={style['page-component']}>
      <h1 className={style['title']}>イベントを作成</h1>
      <EventEditContainer handleSubmit={handleSubmit} />
    </div>
  );
};

export default EventEdit;
