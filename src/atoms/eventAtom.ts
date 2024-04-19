import { atom } from 'jotai';

import { EventData } from '@/hooks/useEvent';

export const eventAtom = atom<EventData | undefined>(undefined);

export const eventIdAtom = atom<number | undefined>(undefined);