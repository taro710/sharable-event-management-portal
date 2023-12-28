import { ExpenseTestDataType } from '@/test/expense/type';

/**
 * 2022沖縄旅行の精算
 */
export const OKINAWA2022: ExpenseTestDataType<
  'たろ' | 'そめ' | 'りゅさん' | 'フラ'
> = {
  PARTICIPANTS: ['たろ', 'そめ', 'フラ', 'りゅさん'],
  DATA: [
    {
      name: 'ガソリン代',
      price: 3818,
      person: 'そめ',
      person2: ['たろ', 'そめ', 'フラ', 'りゅさん'],
    },
    {
      name: '高速往復代',
      price: 620,
      person: 'そめ',
      person2: ['たろ', 'そめ'],
    },
    {
      name: '駐車代',
      price: 700,
      person: 'そめ',
      person2: ['たろ', 'そめ', 'りゅさん'],
    },
    {
      name: '寿司そば天ぷら唐揚げ',
      price: 6204,
      person: 'たろ',
      person2: ['たろ', 'そめ', 'りゅさん'],
    },
    {
      name: '帰り美海から',
      price: 850,
      person: 'りゅさん',
      person2: ['たろ', 'そめ', 'フラ', 'りゅさん'],
    },
    {
      name: 'ホテル代',
      price: 42360,
      person: 'そめ',
      person2: ['たろ', 'そめ', 'フラ', 'りゅさん'],
    },
    {
      name: '帰り美海まで',
      price: 850,
      person: 'たろ',
      person2: ['たろ', 'そめ', 'フラ', 'りゅさん'],
    },
    {
      name: 'マック',
      price: 800,
      person: 'たろ',
      person2: ['たろ', 'そめ', 'フラ', 'りゅさん'],
    },
    {
      name: '肉そば',
      price: 1400,
      person: 'そめ',
      person2: ['りゅさん'],
    },
    {
      name: 'レンタカー',
      price: 28900,
      person: 'たろ',
      person2: ['たろ', 'そめ', 'フラ', 'りゅさん'],
    },
    {
      name: '味噌汁屋さん',
      price: 3000,
      person: 'そめ',
      person2: ['たろ', 'そめ', 'フラ', 'りゅさん'],
    },
    {
      name: '沖縄料理',
      price: 11594,
      person: 'たろ',
      person2: ['たろ', 'そめ', 'フラ', 'りゅさん'],
    },
    {
      name: '創作料理',
      price: 15463,
      person: 'たろ',
      person2: ['たろ', 'そめ', 'フラ', 'りゅさん'],
    },
    {
      name: 'タクシー代',
      price: 1860,
      person: 'そめ',
      person2: ['たろ', 'そめ', 'フラ', 'りゅさん'],
    },
  ],

  RESULT1: [
    { paidMemberName: 'そめ', totalPaidFee: 53758 },
    { paidMemberName: 'たろ', totalPaidFee: 63811 },
    { paidMemberName: 'りゅさん', totalPaidFee: 850 },
  ],

  RESULT2: [
    { participant: 'たろ', totalFee: 29985 },
    { participant: 'そめ', totalFee: 29985 },
    { participant: 'フラ', totalFee: 27373 },
    { participant: 'りゅさん', totalFee: 31075 },
  ],

  RESULT3: [
    { participant: 'たろ', balance: -33825 },
    { participant: 'そめ', balance: -23772 },
    { participant: 'フラ', balance: 27373 },
    { participant: 'りゅさん', balance: 30225 },
  ],

  RESULT4: [
    {
      participant: 'りゅさん',
      to: [
        {
          participant: 'たろ',
          price: 30225,
        },
      ],
    },
    {
      participant: 'フラ',
      to: [
        {
          participant: 'たろ',
          price: 3601,
        },
        {
          participant: 'そめ',
          price: 23773,
        },
      ],
    },
  ],
} as const;
