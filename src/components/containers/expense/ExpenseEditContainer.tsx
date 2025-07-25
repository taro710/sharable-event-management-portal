'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import style from './ExpenseAddingContainer.module.scss';

import { eventAtom } from '@/atoms/eventAtom';
import Button from '@/components/presentations/Common/Button/Button';
import DialogWrapperMini from '@/components/presentations/Dialog/DialogWrapperMini';
import Input from '@/components/presentations/Form/Input/Input';
import SelectBox from '@/components/presentations/Form/SelectBox/SelectBox';
import TagCheckbox from '@/components/presentations/Form/TagCheckbox/TagCheckbox';
import IconArrow from '@/components/presentations/Icon/IconArrow';
import IconClose from '@/components/presentations/Icon/IconClose';
import { ExpenseData, expenseEditFormSchema } from '@/domain/expense';
import { useResponsive } from '@/hooks/useResponsive';

type Props = {
  defaultExpense: ExpenseData;
  handleSubmit: (expense: ExpenseData) => void;
  deleteExpense: (expenseId?: number) => void;
  close: () => void;
};

const ExpenseEditContainer = ({
  handleSubmit: onSubmit,
  close,
  defaultExpense,
  deleteExpense,
}: Props) => {
  const { isSp } = useResponsive();
  const [event] = useAtom(eventAtom);
  const [isOpenNoticePanel, setIsOpenNoticePanel] = useState<boolean>(false);

  // イベントから消されたユーザーの支払いデータもDBには残っている。それらユーザーも全て含めて清算する
  const members: string[] = useMemo(() => {
    const memberSet = new Set<string>();
    const eventMembers = event?.members || [];
    eventMembers.forEach((member) => memberSet.add(member));
    memberSet.add(defaultExpense.payerName);
    defaultExpense.members.forEach((member) => memberSet.add(member));
    return Array.from(memberSet);
  }, [event, defaultExpense]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseData>({
    defaultValues: defaultExpense,
    resolver: yupResolver(expenseEditFormSchema),
  });

  return (
    <>
      <div className={style['dialog-content']}>
        <div className={style.header}>
          <button className={style.icon} type="button" onClick={close}>
            {isSp ? <IconArrow /> : <IconClose />}
          </button>
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
              isAlert
              text="支払い記録を削除"
              theme="secondary"
              width={160}
              onClick={() => setIsOpenNoticePanel(true)}
            />
            <Button
              text="確定"
              theme="primary"
              width={120}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </div>

      <DialogWrapperMini
        closeDialog={() => setIsOpenNoticePanel(false)}
        handleOk={() => deleteExpense(defaultExpense.expenseId)}
        isOpen={isOpenNoticePanel}
        title="支払い記録を削除します">
        <p>{defaultExpense.expenseName}</p>
      </DialogWrapperMini>
    </>
  );
};
export default ExpenseEditContainer;
