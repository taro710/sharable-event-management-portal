'use client';

import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import DialogWrapper from '@/components/Dialog/DialogWrapper';
import IconClose from '@/components/Icon/IconClose';
import Input from '@/components/Input';
import CheckboxTag from '@/components/CheckboxTag';
import { EventData } from '@/hooks/useSubPanel';

import style from './DialogOverviewEdit.module.scss';
import TextArea from '@/components/TextArea';
import { set } from 'firebase/database';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSubmit: (data: EventData) => Promise<EventData | undefined>;
};
const DialogOverviewEdit = ({
  isOpen,
  setIsOpen,
  handleSubmit: onSubmit,
}: Props) => {
  const setIsDialogOpen = useCallback(
    (isOpen: boolean) => {
      setIsOpen(isOpen);
    },
    [setIsOpen],
  );

  const [isOpenNoticePanel] = useState<boolean>(false);

  const members = ['たろ', 'そめ', 'ハマ', '黒田', 'フラ', 'りゅー'];

  const { register, setValue, watch, handleSubmit } = useForm<EventData>();

  useEffect(() => {
    setValue('members', members);
  }, [watch]);

  return (
    <DialogWrapper isOpen={isOpen} setIsOpen={setIsDialogOpen}>
      <div
        className={clsx(
          style['dialog-content'],
          isOpenNoticePanel && style['-disabled'],
        )}>
        <div className={style['header']}>
          <p className={style['title']}>イベントを編集</p>
          <div className={style['icon']} onClick={() => setIsDialogOpen(false)}>
            <IconClose />
          </div>
        </div>
        <div className={style['body']}>
          <div className={style['form']}>
            <Input label="イベント名" {...register('eventName')} />
            <div className={style['member-field']}>
              <div className={style['member']}>
                <Input label="メンバー" />
                <Button text="追加" onClick={() => {}} />
              </div>
              <ul className={style['list']}>
                {members.map((member, i) => (
                  <CheckboxTag
                    label={member}
                    key={i}
                    defaultChecked
                    value={member}
                    {...register('members')}
                  />
                ))}
              </ul>
            </div>
            <Input label="集合場所" {...register('meetingPlace')} />
            <Input label="集合時間" {...register('startDate')} />
            <Input label="解散場所" {...register('dissolutionPlace')} />
            <Input label="解散時間" {...register('endDate')} />
            <TextArea label="メッセージ" {...register('message')} />
          </div>
          <div className={style['action']}>
            <Button
              text="確定"
              onClick={handleSubmit(async (value) => {
                console.log(value);
                await onSubmit({
                  eventName: 'Nagano Camp',
                  members: ['たろ', 'そめ', 'ハマ', '黒田', 'フラ', 'りゅー'],
                  startDate: '2022-10-01',
                  endDate: '2022-10-03',
                  meetingPlace: '池袋駅',
                  dissolutionPlace: '池袋駅',
                });
                // setIsOpen(false);
              })}
            />
            <Button
              text="キャンセル"
              type="secondary"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
};

export default DialogOverviewEdit;
