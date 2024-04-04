'use client';

import style from './CardExpense.module.scss';

type Props = {
  onClick?: () => void;
  expense: {
    name: string;
    price: number;
    person: string;
    person2: string[];
  };
};
const CardExpense = ({ expense, onClick }: Props) => {
  return (
    <div className={style['card-component']} onClick={onClick}>
      <div className={style['head']}>
        <p className={style['title']}>{expense.name}</p>
        <p className={style['price']}>{expense.price.toLocaleString()}円</p>
      </div>
      <p className={style['member']}>
        <span className={style['prefix']}>支払い：</span>
        <span>{expense.person}</span>
      </p>
      <p className={style['member']}>
        <span className={style['prefix']}>対象者：</span>
        <span>{expense.person2.join(', ')}</span>
      </p>
    </div>
  );
};

export default CardExpense;
