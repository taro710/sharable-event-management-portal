'use client';

import { NextPage } from 'next';
import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

import style from './page.module.scss';

import EventEditContainer from '@/components/containers/event/EventEditContainer';
import { PAGE_PATH } from '@/constants/pathname';
import { EventData } from '@/domain/event';
import { useEvent } from '@/hooks/useEvent';

const EventEdit: NextPage = () => {
  const router = useRouter();
  const eventId = useParams()?.eventId as string;
  const { event, updateEvent } = useEvent(eventId);

  const handleSubmit = useCallback(
    async (data: EventData) => {
      await updateEvent(data);
      router.push(PAGE_PATH.ITEM(eventId));
    },
    [eventId, router, updateEvent],
  );

  return (
    <div className={style['page-component']}>
      <EventEditContainer
        event={event}
        onCancel={() => router.push(PAGE_PATH.ITEM(eventId))}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EventEdit;
