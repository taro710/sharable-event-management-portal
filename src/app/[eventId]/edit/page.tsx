'use client';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';

import EventEditContainer from '@/components/containers/event/EventEditContainer';
import { EventData, useEvent } from '@/hooks/useEvent';

import style from './page.module.scss';

const EventEdit: NextPage = () => {
  const { getEvent, updateEvent } = useEvent('event01');

  const [event, setEvent] = useState<EventData>();
  useEffect(() => {
    (async () => {
      const data = await getEvent();
      if (data === undefined) return;
      setEvent(data);
    })();
  }, []);

  if (event === undefined) return null; // TODO:

  return (
    <>
      <h1 className={style['title']}>イベントを作成</h1>
      <EventEditContainer event={event} handleSubmit={updateEvent} />
    </>
  );
};

export default EventEdit;
