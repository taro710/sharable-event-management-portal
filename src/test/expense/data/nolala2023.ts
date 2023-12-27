import { ExpenseTestDataType } from '@/test/expense/type';

/**
 * のらら2023
 */
export const NOLALA_2023: ExpenseTestDataType<
  | 'そめさん'
  | 'たろさん'
  | 'ふらっしゅさん'
  | 'ぴー'
  | 'わさお'
  | 'こま'
  | 'ぐっち'
  | 'こうすけ'
> = {
  PARTICIPANTS: [
    'そめさん',
    'たろさん',
    'ふらっしゅさん',
    'ぴー',
    'わさお',
    'こま',
    'ぐっち',
    'こうすけ',
  ],
  DATA: [
    {
      name: '高速、ガソリン代',
      price: 17920,
      person: 'そめさん',
      person2: [
        'そめさん',
        'たろさん',
        'ふらっしゅさん',
        'ぴー',
        'わさお',
        'こま',
        'ぐっち',
        'こうすけ',
      ],
    },
    {
      name: 'スーパー',
      price: 11172,
      person: 'ぴー',
      person2: [
        'そめさん',
        'たろさん',
        'ふらっしゅさん',
        'ぴー',
        'わさお',
        'こま',
        'ぐっち',
        'こうすけ',
      ],
    },
    {
      name: 'のららキャンプ代',
      price: 14100,
      person: 'そめさん',
      person2: [
        'そめさん',
        'たろさん',
        'ふらっしゅさん',
        'ぴー',
        'わさお',
        'こま',
        'ぐっち',
        'こうすけ',
      ],
    },
    {
      name: '肉代',
      price: 10717,
      person: 'そめさん',
      person2: [
        'そめさん',
        'たろさん',
        'ふらっしゅさん',
        'ぴー',
        'わさお',
        'こま',
        'ぐっち',
        'こうすけ',
      ],
    },
    {
      name: 'スーパー',
      price: 13450,
      person: 'ふらっしゅさん',
      person2: [
        'そめさん',
        'たろさん',
        'ふらっしゅさん',
        'ぴー',
        'わさお',
        'こま',
        'ぐっち',
        'こうすけ',
      ],
    },
    {
      name: '車',
      price: 9640,
      person: 'ふらっしゅさん',
      person2: [
        'そめさん',
        'たろさん',
        'ふらっしゅさん',
        'ぴー',
        'わさお',
        'こま',
        'ぐっち',
        'こうすけ',
      ],
    },
    {
      name: '交通費・ガソリン代',
      price: 13052,
      person: 'わさお',
      person2: [
        'そめさん',
        'たろさん',
        'ふらっしゅさん',
        'ぴー',
        'わさお',
        'こま',
        'ぐっち',
        'こうすけ',
      ],
    },
    {
      name: 'ビール等仕入れ代',
      price: 8500,
      person: 'わさお',
      person2: [
        'そめさん',
        'たろさん',
        'ふらっしゅさん',
        'ぴー',
        'わさお',
        'こま',
        'ぐっち',
        'こうすけ',
      ],
    },
  ],
  RESULT1: [
    { paidMemberName: 'そめさん', totalPaidFee: 42737 },
    { paidMemberName: 'ぴー', totalPaidFee: 11172 },
    { paidMemberName: 'ふらっしゅさん', totalPaidFee: 23090 },
    { paidMemberName: 'わさお', totalPaidFee: 21552 },
  ],
  RESULT2: [
    { participant: 'そめさん', totalFee: 12318 },
    { participant: 'たろさん', totalFee: 12318 },
    { participant: 'ふらっしゅさん', totalFee: 12318 },
    { participant: 'ぴー', totalFee: 12318 },
    { participant: 'わさお', totalFee: 12318 },
    { participant: 'こま', totalFee: 12318 },
    { participant: 'ぐっち', totalFee: 12318 },
    { participant: 'こうすけ', totalFee: 12318 },
  ],
  RESULT3: [
    { participant: 'そめさん', balance: -30418 },
    { participant: 'たろさん', balance: 12318 },
    { participant: 'ふらっしゅさん', balance: -10771 },
    { participant: 'ぴー', balance: 1146 },
    { participant: 'わさお', balance: -9233 },
    { participant: 'こま', balance: 12318 },
    { participant: 'ぐっち', balance: 12318 },
    { participant: 'こうすけ', balance: 12318 },
  ],
  RESULT4: [
    {
      participant: 'たろさん',
      to: [
        {
          participant: 'そめさん',
          price: 12300,
        },
      ],
    },
    {
      participant: 'こま',
      to: [
        {
          participant: 'そめさん',
          price: 12300,
        },
      ],
    },
    {
      participant: 'ぐっち',
      to: [
        {
          participant: 'ふらっしゅさん',
          price: 10800,
        },
        {
          participant: 'そめさん',
          price: 1500,
        },
      ],
    },
    {
      participant: 'こうすけ',
      to: [
        {
          participant: 'わさお',
          price: 9200,
        },
        {
          participant: 'そめさん',
          price: 3100,
        },
      ],
    },
    {
      participant: 'ぴー',
      to: [
        {
          participant: 'そめさん',
          price: 1100,
        },
      ],
    },
  ],
} as const;
