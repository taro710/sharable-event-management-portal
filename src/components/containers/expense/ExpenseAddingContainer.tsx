'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';

import style from './ExpenseAddingContainer.module.scss';

import { eventAtom } from '@/atoms/eventAtom';
import Button from '@/components/presentations/Common/Button/Button';
import Input from '@/components/presentations/Form/Input/Input';
import SelectBox from '@/components/presentations/Form/SelectBox/SelectBox';
import TagCheckbox from '@/components/presentations/Form/TagCheckbox/TagCheckbox';
import IconArrow from '@/components/presentations/Icon/IconArrow';
import IconClose from '@/components/presentations/Icon/IconClose';
import { ExpenseData, expenseFormSchema } from '@/domain/expense';
import { useResponsive } from '@/hooks/useResponsive';

type Props = {
  handleSubmit: (expense: ExpenseData) => void;
  close: () => void;
};

const ExpenseAddingContainer = ({ handleSubmit: onSubmit, close }: Props) => {
  const { isSp } = useResponsive();
  const [event] = useAtom(eventAtom);
  const members = event?.members || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseData>({
    defaultValues: { members },
    resolver: yupResolver(expenseFormSchema),
  });

  return (
    <div className={style['dialog-content']}>
      <div className={style.header}>
        <div className={style.icon} onClick={close}>
          {isSp ? <IconArrow /> : <IconClose />}
        </div>
      </div>
      <div className={style.body}>
        <Input
          hasError={Boolean(errors.expenseName)}
          label="出費名"
          {...register('expenseName')}
        />
        <div className={style.price}>
          <Input
            hasError={Boolean(errors.price)}
            label="金額"
            type={`${isSp ? 'tel' : 'number'}`}
            {...register('price', { valueAsNumber: true })}
          />
          <span className={style.unit}>円</span>
        </div>
        <SelectBox label="支払い者" {...register('payerName')}>
          {members.map((member) => (
            // FIXME: key
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </SelectBox>

        <div className={style.members}>
          <p className={style.caption}>割り勘対象者</p>
          <div className={style.tag}>
            {members.map((participant) => (
              <TagCheckbox
                key={participant} // FIXME: key
                label={participant}
                value={participant}
                {...register('members')}
              />
            ))}
          </div>
          {errors.members ? <span>対象者を選択してください</span> : null}
        </div>
        <div className={style.footer}>
          <Button
            text="追加"
            type="primary"
            width={120}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  );
};
export default ExpenseAddingContainer;
