'use client';

import { NextPage } from 'next';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import EventEditContainer from '@/components/containers/event/EventEditContainer';
import { PAGE_PATH } from '@/constants/pathname';
import { EventData, useEvent } from '@/hooks/useEvent';

import style from './page.module.scss';

const EventEdit: NextPage = () => {
  const router = useRouter();
  const eventId = useParams()?.eventId as string;
  const { getEvent, updateEvent } = useEvent(eventId);

  const [event, setEvent] = useState<EventData>();
  useEffect(() => {
    (async () => {
      const data = await getEvent();
      if (data === undefined) return;
      setEvent(data);
    })();
  }, []);

  const handleSubmit = useCallback(
    async (data: EventData) => {
      await updateEvent(data);
      router.push(PAGE_PATH.ITEM(eventId));
    },
    [eventId, router, updateEvent],
  );

  if (event === undefined) return null; // TODO:

  return (
    <div className={style['page-component']}>
      <EventEditContainer
        event={event}
        handleSubmit={handleSubmit}
        handleCancel={() => router.push(PAGE_PATH.ITEM(eventId))}
      />
    </div>
  );
};

export default EventEdit;
