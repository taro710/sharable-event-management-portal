'use client';

import { ExpenseData } from '@/domain/expense';

import style from './CardExpense.module.scss';

type Props = {
  onClick?: () => void;
  expense: ExpenseData;
};
const CardExpense = ({ expense, onClick }: Props) => {
  return (
    <div className={style['card-component']} onClick={onClick}>
      <div className={style['head']}>
        <p className={style['title']}>{expense.expenseName}</p>
        <p className={style['price']}>{expense.price.toLocaleString()}円</p>
      </div>
      <p className={style['member']}>
        <span className={style['prefix']}>支払い：</span>
        <span>{expense.payerName}</span>
      </p>
      <p className={style['member']}>
        <span className={style['prefix']}>対象者：</span>
        <span>{expense.members.join(', ')}</span>
      </p>
    </div>
  );
};

export default CardExpense;
