import { Metadata } from 'next';

export const PAGE_PATH = {
  TOP: '/',
  NEW_EVENT: '/new',
  EDIT_EVENT: (eventId: string) => `/edit/${eventId}`,
  ITEM: (eventId: string) => `/${eventId}/item`,
  EXPENSE: (eventId: string) => `/${eventId}/expense`,
  SEISAN: (eventId: string) => `/${eventId}/seisan`,
  MEMO: (eventId: string) => `/${eventId}/memo`,
} as const;

export const PAGE_META: {
  [key: string]: Metadata;
} = {
  [PAGE_PATH.TOP]: {
    title: 'SEMP',
    description: 'Sharable Event Management Portal',
  },
  [PAGE_PATH.NEW_EVENT]: {
    title: 'New Event',
    description: 'Get started by creating event',
  },
  // TODO:
  '/edit': {
    title: 'Edit Event',
    description: 'edit event',
  },
};
