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

  const onSubmit = async (data: EventData) => {
    const event = await addEvent(data);
    router.push(PAGE_PATH.ITEM(event.eventId));
  };

  return (
    <div className={style['page-component']}>
      <EventEditContainer onSubmit={onSubmit} />
    </div>
  );
};

export default EventNew;
