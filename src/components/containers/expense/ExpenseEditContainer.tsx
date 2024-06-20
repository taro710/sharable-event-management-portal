'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { eventAtom } from '@/atoms/eventAtom';
import Button from '@/components/presentations/Common/Button/Button';
import DialogWrapperMini from '@/components/presentations/Dialog/DialogWrapperMini';
import Input from '@/components/presentations/Form/Input/Input';
import SelectBox from '@/components/presentations/Form/SelectBox/SelectBox';
import TagCheckbox from '@/components/presentations/Form/TagCheckbox/TagCheckbox';
import IconArrow from '@/components/presentations/Icon/IconArrow';
import IconClose from '@/components/presentations/Icon/IconClose';
import { ExpenseData, expenseFormSchema } from '@/domain/expense';
import { useResponsive } from '@/hooks/useResponsive';

import style from './ExpenseAddingContainer.module.scss';

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
    const members = new Set<string>();
    const eventMembers = event?.members || [];
    eventMembers.forEach((member) => members.add(member));
    members.add(defaultExpense.payerName);
    defaultExpense.members.forEach((member) => members.add(member));
    return Array.from(members);
  }, [event, defaultExpense]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseData>({
    defaultValues: defaultExpense,
    resolver: yupResolver(expenseFormSchema),
  });

  return (
    <>
      <div className={style['dialog-content']}>
        <div className={style['header']}>
          <div className={style['icon']} onClick={close}>
            {isSp ? <IconArrow /> : <IconClose />}
          </div>
        </div>
        <div className={style['body']}>
          <Input
            label="出費名"
            hasError={!!errors.expenseName}
            {...register('expenseName')}
          />
          <div className={style['price']}>
            <Input
              label="金額"
              hasError={!!errors.price}
              type={`${isSp ? 'tel' : 'number'}`}
              {...register('price', { valueAsNumber: true })}
            />
            <span className={style['unit']}>円</span>
          </div>
          <SelectBox label="支払い者" {...register('payerName')}>
            {members.map((member, i) => (
              <option value={member} key={i}>
                {member}
              </option>
            ))}
          </SelectBox>

          <div className={style['members']}>
            <p className={style['caption']}>割り勘対象者</p>
            <div className={style['tag']}>
              {members.map((participant, i) => (
                <TagCheckbox
                  label={participant}
                  value={participant}
                  key={i}
                  {...register('members')}
                />
              ))}
            </div>
            {!!errors.members && <span>対象者を選択してください</span>}
          </div>

          <div className={style['footer']}>
            <Button
              text="支払い記録を削除"
              width={160}
              type="secondary"
              isAlert
              onClick={() => setIsOpenNoticePanel(true)}
            />
            <Button
              text="確定"
              width={120}
              type="primary"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </div>

      <DialogWrapperMini
        title="支払い記録を削除します"
        isOpen={isOpenNoticePanel}
        closeDialog={() => setIsOpenNoticePanel(false)}
        handleOk={() => deleteExpense(defaultExpense.expenseId)}>
        <p>{defaultExpense.expenseName}</p>
      </DialogWrapperMini>
    </>
  );
};
export default ExpenseEditContainer;
