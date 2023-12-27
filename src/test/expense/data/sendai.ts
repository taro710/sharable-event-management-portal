import { ExpenseTestDataType } from '@/test/expense/type';

/**
 * 仙台旅行
 */
export const SENDAI: ExpenseTestDataType<
  'たろ' | 'ハマ' | '黒田' | 'フラ' | 'りゅー'
> = {
  PARTICIPANTS: ['たろ', 'ハマ', '黒田', 'フラ', 'りゅー'],
  DATA: [
    {
      name: '観音入館料',
      price: 2500,
      person: 'フラ',
      person2: ['たろ', 'ハマ', '黒田', 'フラ', 'りゅー'],
    },
    {
      name: 'しんかんせん',
      price: 10670,
      person: 'りゅー',
      person2: ['フラ'],
    },
    {
      name: '1日目夜飯代',
      price: 27620,
      person: 'ハマ',
      person2: ['フラ', 'たろ', 'ハマ', '黒田', 'りゅー'],
    },
    {
      name: '瑞鳳殿',
      price: 2850,
      person: '黒田',
      person2: ['フラ', 'たろ', 'ハマ', '黒田', 'りゅー'],
    },
    {
      name: '7/30 カーシェア',
      price: 3850,
      person: '黒田',
      person2: ['フラ', 'たろ', 'ハマ', '黒田', 'りゅー'],
    },
    {
      name: 'ずんだシェイク',
      price: 1440,
      person: 'たろ',
      person2: ['フラ', 'たろ', 'ハマ', '黒田', 'りゅー'],
    },
    {
      name: '焼肉',
      price: 25400,
      person: 'たろ',
      person2: ['フラ', 'たろ', 'ハマ', '黒田', 'りゅー'],
    },
    {
      name: '7/29カーシェア',
      price: 4290,
      person: 'たろ',
      person2: ['フラ', 'たろ', 'ハマ', '黒田', 'りゅー'],
    },
  ],
  RESULT1: [
    { paidMemberName: 'フラ', totalPaidFee: 2500 },
    { paidMemberName: 'りゅー', totalPaidFee: 10670 },
    { paidMemberName: 'ハマ', totalPaidFee: 27620 },
    { paidMemberName: '黒田', totalPaidFee: 6700 },
    { paidMemberName: 'たろ', totalPaidFee: 31130 },
  ],
  RESULT2: [
    { participant: 'たろ', totalFee: 13590 },
    { participant: 'ハマ', totalFee: 13590 },
    { participant: '黒田', totalFee: 13590 },
    { participant: 'フラ', totalFee: 24260 },
    { participant: 'りゅー', totalFee: 13590 },
  ],
  RESULT3: [
    { participant: 'たろ', balance: -17540 },
    { participant: 'ハマ', balance: -14030 },
    { participant: '黒田', balance: 6890 },
    { participant: 'フラ', balance: 21760 },
    { participant: 'りゅー', balance: 2920 },
  ],
  RESULT4: [
    {
      participant: 'フラ',
      to: [
        {
          participant: 'たろ',
          price: 17540,
        },
        {
          participant: 'ハマ',
          price: 4220,
        },
      ],
    },
    {
      participant: '黒田',
      to: [
        {
          participant: 'ハマ',
          price: 6890,
        },
      ],
    },
    {
      participant: 'りゅー',
      to: [
        {
          participant: 'ハマ',
          price: 2920,
        },
      ],
    },
  ],
} as const;
