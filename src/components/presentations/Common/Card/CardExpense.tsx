'use client';

import style from './CardExpense.module.scss';

import { ExpenseData } from '@/domain/expense';

type Props = {
  onClick?: () => void;
  expense: ExpenseData;
};
const CardExpense = ({ expense, onClick }: Props) => (
  <button className={style['card-component']} type="button" onClick={onClick}>
    <div className={style.head}>
      <p className={style.title}>{expense.expenseName}</p>
      <p className={style.price}>{expense.price.toLocaleString()}円</p>
    </div>
    <p className={style.member}>
      <span className={style.prefix}>支払い：</span>
      <span>{expense.payerName}</span>
    </p>
    <p className={style.member}>
      <span className={style.prefix}>対象者：</span>
      <div className={style.names}>
        {expense.members.map((member) => (
          <span className={style.text} key={member}>
            {member}
          </span>
        ))}
      </div>
    </p>
  </button>
);

export default CardExpense;
