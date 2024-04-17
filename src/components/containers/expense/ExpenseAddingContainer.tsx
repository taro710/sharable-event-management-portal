'use client';

import { useForm } from 'react-hook-form';

import Button from '@/components/presentations/Button';
import CheckboxTag from '@/components/presentations/CheckboxTag';
import SelectBox from '@/components/presentations/Form/SelectBox';
import IconClose from '@/components/presentations/Icon/IconClose';
import Input from '@/components/presentations/Input';
import { ExpenseData } from '@/hooks/pages/useExpensePage';

import style from './ExpenseAddingContainer.module.scss';

type Props = {
  handleSubmit: (expense: ExpenseData) => void;
  close: () => void;
};

const ExpenseAddingContainer = ({ handleSubmit: onSubmit, close }: Props) => {
  const members = ['たろ', 'そめ', 'ハマ', '黒田', 'フラ', 'りゅー'];

  const { register, handleSubmit } = useForm<ExpenseData>({
    defaultValues: { members },
  });

  return (
    <div className={style['dialog-content']}>
      <div className={style['header']}>
        <p className={style['title']}>支払い記録を追加</p>
        <div className={style['icon']} onClick={close}>
          <IconClose />
        </div>
      </div>
      <div className={style['body']}>
        <Input label="出費名" {...register('expenseName')} />
        <div className={style['price']}>
          <Input label="金額" type="number" {...register('price')} />
          <span className={style['unit']}>円</span>
        </div>
        <SelectBox label="支払い者" {...register('payerName')}>
          <option value="" disabled selected>
            選択してください
          </option>
          <option value="たろ">たろ</option>
          <option value="そめ">そめ</option>
          <option value="ハマ">ハマ</option>
        </SelectBox>

        <div className={style['members']}>
          <p className={style['caption']}>割り勘対象者</p>
          <div className={style['tag']}>
            {members.map((participant, i) => (
              <CheckboxTag
                label={participant}
                value={participant}
                key={i}
                {...register('members')}
              />
            ))}
          </div>
        </div>
        <Button text="追加" type="primary" onClick={handleSubmit(onSubmit)} />
      </div>
    </div>
  );
};
export default ExpenseAddingContainer;
