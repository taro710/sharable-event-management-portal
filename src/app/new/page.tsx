'use client';

import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

import EventEditContainer from '@/components/containers/event/EventEditContainer';
import { PAGE_PATH } from '@/constants/pathname';
import { EventData, useEvent } from '@/hooks/useEvent';

import style from './page.module.scss';

const EventEdit: NextPage = () => {
  const router = useRouter();
  const { addEvent } = useEvent();

  const handleSubmit = async (data: EventData) => {
    const eventId = await addEvent(data);
    if (!eventId) return; // TODO: エラーハンドリング
    router.push(PAGE_PATH.ITEM(eventId));
  };

  return (
    <div className={style['page-component']}>
      <EventEditContainer handleSubmit={handleSubmit} />
    </div>
  );
};

export default EventEdit;
