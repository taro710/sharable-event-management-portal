import { NOLALA_2023 } from '@/test/expense/data/nolala2023';
import { OKINAWA2022 } from '@/test/expense/data/okinawa';
import { SENDAI } from '@/test/expense/data/sendai';
import { CAMP_23_12 } from '@/test/expense/data/tateyama';
import { func, sample, sample2, sample3 } from '@/util/sample';

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
