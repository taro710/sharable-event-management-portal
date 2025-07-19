import { useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { EventApi } from '@/api/eventApi';
import { eventAtom } from '@/atoms/eventAtom';
import { EventData } from '@/domain/event';

export const useEvent = (eventId?: string) => {
  const setEvent = useSetAtom(eventAtom);
  const eventApi = useMemo(() => new EventApi(), []);

  const { data: event, mutate } = useSWR<EventData>(
    'event',
    eventId ? () => eventApi.get(eventId) : null, // TODO:
  );

  useEffect(() => {
    setEvent(event);
  }, [event, setEvent]);

  const addEvent = async (eventData: EventData) => {
    const newEventId = v4();
    const newEvent = { ...eventData, eventId: newEventId };
    await eventApi.add(newEvent);
    setEvent(newEvent);
    mutate(newEvent);
    return newEvent;
  };

  const updateEvent = async (updatedEvent: EventData) => {
    await eventApi.update(updatedEvent);
    setEvent(updatedEvent);
    mutate(updatedEvent);
  };

  return {
    event,
    addEvent,
    updateEvent,
  };
};
