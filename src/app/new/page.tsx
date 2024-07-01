'use client';

import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

import style from './page.module.scss';

import EventEditContainer from '@/components/containers/event/EventEditContainer';
import { PAGE_PATH } from '@/constants/pathname';
import { EventData } from '@/domain/event';
import { useEvent } from '@/hooks/useEvent';

const EventNew: NextPage = () => {
  const router = useRouter();
  const { addEvent } = useEvent();

  const handleSubmit = async (data: EventData) => {
    const eventId = await addEvent(data);
    if (!eventId) return; // TODO: エラーハンドリング
    router.push(PAGE_PATH.ITEM(eventId));
  };

  return (
    <div className={style['page-component']}>
      <EventEditContainer handleSubmit={handleSubmit} mode="new" />
    </div>
  );
};

export default EventNew;
