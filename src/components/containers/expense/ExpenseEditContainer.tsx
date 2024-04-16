'use client';

import clsx from 'clsx';
import { useState } from 'react';

import Button from '@/components/presentations/Button';
import CheckboxTag from '@/components/presentations/CheckboxTag';
import IconClose from '@/components/presentations/Icon/IconClose';
import Input from '@/components/presentations/Input';
import { NOLALA_2023 } from '@/test/expense/data/nolala2023';

import style from './ExpenseAddingContainer.module.scss';

type Props = {
  handleSubmit: () => void;
  close: () => void;
};

const ExpenseEditContainer = ({ handleSubmit, close }: Props) => {
  const [isOpenNoticePanel] = useState<boolean>(false);

  const [expenses, setExpenses] = useState<
    {
      name: string;
      price: number;
      person: string;
      person2: string[];
    }[]
  >([...NOLALA_2023.DATA]);

  const members = ['たろ', 'そめ', 'ハマ', '黒田', 'フラ', 'りゅー'];

  const selectedMember = 'そめ';

  return (
    <div
      className={clsx(
        style['dialog-content'],
        isOpenNoticePanel && style['-disabled'],
      )}>
      <div className={style['header']}>
        <p className={style['title']}>支払い記録を変更</p>
        <div className={style['icon']} onClick={close}>
          <IconClose />
        </div>
      </div>
      <div className={style['body']}>
        <Input label="出費名" />
        <Input label="金額" />円<p>支払い者</p>
        <select>
          <option value="たろ">たろ</option>
          <option value="そめ">そめ</option>
          <option value="ハマ">ハマ</option>
        </select>
        <br />
        割り勘対象者
        {members
          .filter((member) => member !== selectedMember)
          .map((participant, i) => (
            <CheckboxTag label={participant} value={participant} key={i} />
          ))}
        <Button text="追加" type="primary" onClick={handleSubmit} />
      </div>
    </div>
  );
};
export default ExpenseEditContainer;
