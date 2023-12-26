'use client';

import { Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useState } from 'react';

import FadeIn from '@/components/FadeIn';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const [expenses, setExpenses] = useState<
    {
      name: string;
      price: number;
      person: string;
      person2: string[];
    }[]
  >(
    // [
    // {
    //   name: 'ガソリン代',
    //   price: 5000,
    //   person: 'たろ',
    //   person2: ['たろ', 'そめ', 'ハマ', '黒田', 'フラ'],
    // },
    // {
    //   name: 'ガソリン代',
    //   price: 9560,
    //   person: 'たろ',
    //   person2: ['たろ', 'そめ', 'ハマ', '黒田', 'フラ'],
    // },
    // {
    //   name: 'ガソリン代',
    //   price: 24840,
    //   person: 'そめ',
    //   person2: ['たろ', 'そめ', 'ハマ', '黒田', 'フラ'],
    // },
    // {
    //   name: 'ガソリン代',
    //   price: 7000,
    //   person: 'フラ',
    //   person2: ['たろ', 'そめ', 'ハマ', '黒田', 'フラ'],
    // },
    //
    DATA,
  );

  console.log({ expenses });

  const participants = ['たろ', 'そめ', 'ハマ', '黒田', 'フラ', 'りゅー'];

  const func = (expenses: typeof DATA, participants: string[]) => {
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

    // {participant:参加者. totalFee: このイベントではらわないといけない実質額}
    const participantAndTotalFeeList = participants.map((participant) => {
      const expenseList = expenses.filter((expense) =>
        expense.person2.includes(participant),
      );
      const totalFee = expenseList.reduce(
        (acc, cur) => acc + cur.price / cur.person2.length,
        0,
      );

      return { participant, totalFee };
    });

    // {participant:参加者. balance: 貸し借りの額}
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
            diff: man.balance,
            to,
          };
        }
      }
    });

    return answer;
  };

  const answer = func(expenses, participants);

  return (
    <FadeIn className={style['expense-panel']}>
      <table className={style['table']}>
        <thead>
          <tr>
            <th>品目</th>
            <th className={style['price']}>値段</th>
            <th>建替え者</th>
            <th>支払対象者</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, i) => (
            <tr key={i}>
              <td>{expense.name}</td>
              <td>{expense.price}</td>
              <td>{expense.person}</td>
              <td>{expense.person2}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <Formik
        initialValues={{
          name: '',
          price: 0,
          person: 'たろ',
          person2: [],
        }}
        onSubmit={async (values) => {
          setExpenses([...expenses, values]);
        }}>
        <Form>
          <Field as="select" name="person">
            {participants.map((participant, i) => (
              <option value={participant} key={i}>
                {participant}
              </option>
            ))}
          </Field>
          が、（
          <label>
            <Field type="checkbox" name="person2" value="たろ" />
            たろ
          </label>
          <label>
            <Field type="checkbox" name="person2" value="そめ" />
            そめ
          </label>
          <label>
            <Field type="checkbox" name="person2" value="ハマ" />
            ハマ
          </label>
          <label>
            <Field type="checkbox" name="person2" value="黒田" />
            黒田
          </label>
          <label>
            <Field type="checkbox" name="person2" value="フラ" />
            フラ
          </label>
          <label>
            <Field type="checkbox" name="person2" value="りゅー" />
            りゅー
          </label>
          ）の
          <Field id="name" name="name" placeholder="品目名" />
          を支払った。
          <br />
          料金は
          <Field id="price" name="price" placeholder="price" type="number" />
          円。
          <br />
          <br />
          <br />
          <button type="submit">「追加」←クリック</button>
        </Form>
      </Formik>
      <button className={style['button']}>+</button>
      <br />
      <br />
      <h2>やりとり</h2>
      {answer.map((list, i) => (
        <p key={i}>
          <span>
            {list.participant}→
            {list.to.map((to) => to.participant + 'に' + to.price + '円')}
          </span>
        </p>
      ))}
    </FadeIn>
  );
};

export default DashBoard;

const DATA = [
  {
    name: 'ガソリン代',
    price: 2500,
    person: 'フラ',
    person2: ['たろ', 'ハマ', '黒田', 'フラ', 'りゅー'],
  },
  {
    name: 'ガソリン代',
    price: 10670,
    person: 'りゅー',
    person2: ['フラ'],
  },
  {
    name: 'ガソリン代',
    price: 27620,
    person: 'ハマ',
    person2: ['フラ', 'たろ', 'ハマ', '黒田', 'りゅー'],
  },
  {
    name: 'ガソリン代',
    price: 2850,
    person: '黒田',
    person2: ['フラ', 'たろ', 'ハマ', '黒田', 'りゅー'],
  },
  {
    name: 'ガソリン代',
    price: 3850,
    person: '黒田',
    person2: ['フラ', 'たろ', 'ハマ', '黒田', 'りゅー'],
  },
  {
    name: 'ガソリン代',
    price: 1440,
    person: 'たろ',
    person2: ['フラ', 'たろ', 'ハマ', '黒田', 'りゅー'],
  },
  {
    name: 'ガソリン代',
    price: 25400,
    person: 'たろ',
    person2: ['フラ', 'たろ', 'ハマ', '黒田', 'りゅー'],
  },
  {
    name: 'ガソリン代',
    price: 4290,
    person: 'たろ',
    person2: ['フラ', 'たろ', 'ハマ', '黒田', 'りゅー'],
  },
];
