export const PAGE_PATH = {
  TOPw: '/',
  NEW_EVENT: '/new',
  EDIT_EVENT: (eventId: string) => `/edit/${eventId}`,
  ITEM: (eventId: string) => `/${eventId}/item`,
  EXPENSE: (eventId: string) => `/${eventId}/expense`,
  SEISAN: (eventId: string) => `/${eventId}/seisan`,
  MEMO: (eventId: string) => `/${eventId}/memo`,
} as const;
