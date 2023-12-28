'use client';

import { Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useState } from 'react';

import FadeIn from '@/components/FadeIn';
import { NOLALA_2023 } from '@/test/expense/data/nolala2023';
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
  >([...NOLALA_2023.DATA]);

  const participants = NOLALA_2023.PARTICIPANTS;

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
