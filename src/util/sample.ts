export const sample = (
  expenses: {
    name: string;
    price: number;
    person: string;
    person2: string[];
  }[],
) => {
  const paidMemberNames = new Set(expenses.map((expense) => expense.person));

  // {paidMemberName:負担した人. totalPaidFee:その人のトータルの負担額}
  const paidMemberNameAndTotalPaidFeeList = Array.from(paidMemberNames).map(
    (paidMemberName) => {
      const totalPaidFee = expenses
        .filter((expense) => expense.person === paidMemberName)
        .reduce((acc, cur) => acc + cur.price, 0);
      return { paidMemberName, totalPaidFee };
    },
  );

  return paidMemberNameAndTotalPaidFeeList;
};

export const sample2 = (
  expenses: {
    name: string;
    price: number;
    person: string;
    person2: string[];
  }[],
  participants: string[],
) => {
  const participantAndTotalFeeList = participants.map((participant) => {
    const expenseList = expenses.filter((expense) =>
      expense.person2.includes(participant),
    );

    const totalFee = expenseList.reduce((acc, cur) => {
      return acc + cur.price / cur.person2.length;
    }, 0);

    return { participant, totalFee };
  });
  return participantAndTotalFeeList;
};

export const sample3 = (
  paidMemberNameAndTotalPaidFeeList: {
    paidMemberName: string;
    totalPaidFee: number;
  }[],
  participantAndTotalFeeList: {
    participant: string;
    totalFee: number;
  }[],
) => {
  const participantAndPayBalanceList = participantAndTotalFeeList.map(
    ({ participant, totalFee }) => {
      const paidTotalFee =
        paidMemberNameAndTotalPaidFeeList.find(
          ({ paidMemberName }) => paidMemberName === participant,
        )?.totalPaidFee || 0;

      const balance = totalFee - paidTotalFee;

      return { participant, balance };
    },
  );
  return participantAndPayBalanceList;
};

export const func = (
  expenses: {
    name: string;
    price: number;
    person: string;
    person2: string[];
  }[],
  participants: string[],
) => {
  // {paidMemberName:負担した人. totalPaidFee:その人のトータルの負担額}
  const paidMemberNameAndTotalPaidFeeList = sample(expenses);

  // {participant:参加者. totalFee: このイベントではらわないといけない実質額}
  const participantAndTotalFeeList = sample2(expenses, participants);

  // {participant:参加者. balance: 貸し借りの額}
  const participantAndPayBalanceList = sample3(
    paidMemberNameAndTotalPaidFeeList,
    participantAndTotalFeeList,
  );

  console.log({ participantAndPayBalanceList });

  const もらう人 = structuredClone(participantAndPayBalanceList) // TODO: 解除可能
    .filter((man) => man.balance < 0)
    .sort((a, b) => a.balance - b.balance);
  const 払う人 = structuredClone(participantAndPayBalanceList) // TODO: 解除可能
    .filter((man) => man.balance > 0)
    .sort((a, b) => b.balance - a.balance);

  console.log({ もらう人 });
  console.log({ 払う人 });

  let i = 0; // answerを関数化して、中に入れる // TODO:
  const answer = 払う人.map((man) => {
    const to = [];

    console.warn(man.participant + 'が誰にいくら払うか計算開始');

    let 余力 = man.balance;

    while (true) {
      console.log(man.participant + 'の現在の余力は' + 余力);

      const もらう人のdiff = もらう人[i].balance;

      console.log('もらう人は' + もらう人[i].participant);
      console.log(もらう人[i].participant + 'のdiffは' + もらう人のdiff);

      if (余力 + もらう人のdiff > 0) {
        to.push({
          participant: もらう人[i].participant,
          price: -もらう人のdiff,
        });
        // 余力がまだあるので次の人にも支払い
        余力 += もらう人のdiff;
        i++;
      } else {
        // 全部余力を使ったのでこのmanは支払い完了
        to.push({ participant: もらう人[i].participant, price: 余力 });
        もらう人[i].balance += 余力;

        return {
          participant: man.participant,
          //   diff: man.balance,
          to,
        };
      }
    }
  });

  return answer;
};
