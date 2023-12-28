import { ExpenseTestDataType } from '@/test/expense/type';

/**
 * 2023/12 館山キャンプ
 */
export const CAMP_23_12: ExpenseTestDataType<
  'たろ' | 'そめ' | 'フラ' | 'だい' | 'ぐち'
> = {
  PARTICIPANTS: ['たろ', 'そめ', 'フラ', 'だい', 'ぐち'],
  DATA: [
    {
      name: 'キャンプ場代',
      price: 7000,
      person: 'フラ',
      person2: ['たろ', 'そめ', 'フラ', 'だい', 'ぐち'],
    },
    {
      name: '食費',
      price: 24840,
      person: 'たろ',
      person2: ['たろ', 'そめ', 'フラ', 'だい', 'ぐち'],
    },
    {
      name: '高速代',
      price: 9560,
      person: 'そめ',
      person2: ['たろ', 'そめ', 'フラ', 'だい', 'ぐち'],
    },
    {
      name: 'ガソリン',
      price: 5000,
      person: 'そめ',
      person2: ['たろ', 'そめ', 'フラ', 'だい', 'ぐち'],
    },
  ],
  RESULT1: [
    { paidMemberName: 'フラ', totalPaidFee: 7000 },
    { paidMemberName: 'たろ', totalPaidFee: 24840 },
    { paidMemberName: 'そめ', totalPaidFee: 14560 },
  ],
  RESULT2: [
    { participant: 'たろ', totalFee: 9280 },
    { participant: 'そめ', totalFee: 9280 },
    { participant: 'フラ', totalFee: 9280 },
    { participant: 'だい', totalFee: 9280 },
    { participant: 'ぐち', totalFee: 9280 },
  ],
  RESULT3: [
    { participant: 'たろ', balance: -15560 },
    { participant: 'そめ', balance: -5280 },
    { participant: 'フラ', balance: 2280 },
    { participant: 'だい', balance: 9280 },
    { participant: 'ぐち', balance: 9280 },
  ],
  RESULT4: [
    {
      participant: 'だい',
      to: [
        {
          participant: 'たろ',
          price: 9280,
        },
      ],
    },
    {
      participant: 'ぐち',
      to: [
        {
          participant: 'たろ',
          price: 6280,
        },
        {
          participant: 'そめ',
          price: 3000,
        },
      ],
    },
    {
      participant: 'フラ',
      to: [
        {
          participant: 'そめ',
          price: 2280,
        },
      ],
    },
  ],
} as const;
