'use client';

import { Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useState } from 'react';

import FadeIn from '@/components/FadeIn';
import { func } from '@/util/sample';

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
    [
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
        person2: ['たろ', 'そめ', 'りゅさん'],
      },
      {
        name: '駐車代',
        price: 620,
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
        price: 800,
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
        person: 'たろ',
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
  );

  console.log({ expenses });

  // const participants = ['たろ', 'そめ', 'ハマ', '黒田', 'フラ', 'りゅー'];
  const participants = ['たろ', 'そめ', 'フラ', 'りゅさん'];

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
