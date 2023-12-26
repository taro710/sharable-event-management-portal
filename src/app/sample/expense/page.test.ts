import { func, sample, sample2, sample3 } from '../../../util/sample';

type Type<T> = {
  PARTICIPANTS: T[];
  DATA: {
    name: string;
    price: number;
    person: T;
    person2: T[];
  }[];
  RESULT1: {
    paidMemberName: T;
    totalPaidFee: number;
  }[];
  RESULT2: {
    participant: T;
    totalFee: number;
  }[];
  RESULT3: {
    participant: T;
    balance: number;
  }[];
  RESULT4: {
    participant: T;
    to: {
      participant: T;
      price: number;
    }[];
  }[];
};

/**
 * 仙台旅行
 */
const SENDAI: Type<'たろ' | 'ハマ' | '黒田' | 'フラ' | 'りゅー'> = {
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
};

describe('仙台旅行', () => {
  const result1 = sample(SENDAI.DATA);
  const result2 = sample2(SENDAI.DATA, SENDAI.PARTICIPANTS);
  const result2_2 = result2.map((res) => {
    return { ...res, totalFee: Math.trunc(res.totalFee) };
  });
  const result3 = sample3(result1, result2).map((res) => {
    return { ...res, balance: Math.trunc(res.balance) };
  });
  const result4 = func(SENDAI.DATA, SENDAI.PARTICIPANTS);

  test('メンバーごとの建替負担額のテスト', () => {
    expect(result1).toStrictEqual(SENDAI.RESULT1);
  });

  test('メンバーごとの実質負担額のテスト', () => {
    expect(result2_2).toStrictEqual(SENDAI.RESULT2);
  });

  test('メンバーごとの貸し借り状態のテスト', () => {
    expect(result3).toStrictEqual(SENDAI.RESULT3);
  });

  test('誰から誰に払うかのテスト', () => {
    expect(result4).toStrictEqual(SENDAI.RESULT4);
  });
});

/**
 * 2022沖縄旅行の精算
 */
const OKINAWA2022: Type<'たろ' | 'そめ' | 'りゅさん' | 'フラ'> = {
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
          participant: 'そめ',
          price: 23773,
        },
        {
          participant: 'たろ',
          price: 3601,
        },
      ],
    },
  ],
};

describe('沖縄旅行2022', () => {
  const result1 = sample(OKINAWA2022.DATA);
  const result2 = sample2(OKINAWA2022.DATA, OKINAWA2022.PARTICIPANTS);
  const result2_2 = result2.map((res) => {
    return { ...res, totalFee: Math.trunc(res.totalFee) };
  });
  const result3 = sample3(result1, result2).map((res) => {
    return { ...res, balance: Math.trunc(res.balance) };
  });
  // const result4 = func(SENDAI.DATA, SENDAI.PARTICIPANTS);

  test('メンバーごとの建替負担額のテスト', () => {
    expect(result1).toStrictEqual(OKINAWA2022.RESULT1);
  });

  test('メンバーごとの実質負担額のテスト', () => {
    expect(result2_2).toStrictEqual(OKINAWA2022.RESULT2);
  });

  test('メンバーごとの貸し借り状態のテスト', () => {
    expect(result3).toStrictEqual(OKINAWA2022.RESULT3);
  });

  // test('誰から誰に払うかのテスト', () => {
  //   expect(result4).toStrictEqual(SENDAI.RESULT4);
  // });
});

/**
 * 2023/12 館山キャンプ
 */
const CAMP_23_12: Type<'たろ' | 'そめ' | 'フラ' | 'だい' | 'ぐち'> = {
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
          participant: 'そめ',
          price: 9280,
        },
      ],
    },
    {
      participant: 'ぐち',
      to: [
        {
          participant: 'そめ',
          price: 6280,
        },
        {
          participant: 'たろ',
          price: 3000,
        },
      ],
    },
    {
      participant: 'フラ',
      to: [
        {
          participant: 'たろ',
          price: 2280,
        },
      ],
    },
  ],
};

describe('館山キャンプ2023年12月', () => {
  const result1 = sample(CAMP_23_12.DATA);
  const result2 = sample2(CAMP_23_12.DATA, CAMP_23_12.PARTICIPANTS);
  const result2_2 = result2.map((res) => {
    return { ...res, totalFee: Math.trunc(res.totalFee) };
  });
  const result3 = sample3(result1, result2).map((res) => {
    return { ...res, balance: Math.trunc(res.balance) };
  });
  //   const result4 = func(CAMP_23_12.DATA, CAMP_23_12.PARTICIPANTS);

  test('メンバーごとの建替負担額のテスト', () => {
    expect(result1).toStrictEqual(CAMP_23_12.RESULT1);
  });

  test('メンバーごとの実質負担額のテスト', () => {
    expect(result2_2).toStrictEqual(CAMP_23_12.RESULT2);
  });

  test('メンバーごとの貸し借り状態のテスト', () => {
    expect(result3).toStrictEqual(CAMP_23_12.RESULT3);
  });

  //   test('誰から誰に払うかのテスト', () => {
  //     expect(result4).toStrictEqual(CAMP_23_12.RESULT4);
  //   });
});

/**
 * のらら2023
 */
const NOLALA_2023: Type<
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
};

describe('のらら2023', () => {
  const result1 = sample(NOLALA_2023.DATA);
  const result2 = sample2(NOLALA_2023.DATA, NOLALA_2023.PARTICIPANTS);
  const result2_2 = result2.map((res) => {
    return { ...res, totalFee: Math.trunc(res.totalFee) };
  });
  const result3 = sample3(result1, result2).map((res) => {
    return { ...res, balance: Math.trunc(res.balance) };
  });
  //   const result4 = func(NOLALA_2023.DATA, NOLALA_2023.PARTICIPANTS);

  test('メンバーごとの建替負担額のテスト', () => {
    expect(result1).toStrictEqual(NOLALA_2023.RESULT1);
  });

  test('メンバーごとの実質負担額のテスト', () => {
    expect(result2_2).toStrictEqual(NOLALA_2023.RESULT2);
  });

  test('メンバーごとの貸し借り状態のテスト', () => {
    expect(result3).toStrictEqual(NOLALA_2023.RESULT3);
  });

  //   test('誰から誰に払うかのテスト', () => {
  //     expect(result4).toStrictEqual(NOLALA_2023.RESULT4);
  //   });
});
