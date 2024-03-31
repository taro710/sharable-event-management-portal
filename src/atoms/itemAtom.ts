import { atom } from 'jotai';

export const itemAtom = atom<string[]>([
  'イス',
  'シュラフ',
  'テント',
  'ランタン',
  'クッカー',
  'コット',
  'カメラ',
]);
