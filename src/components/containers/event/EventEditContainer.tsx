'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/presentations/Button';
import CheckboxTag from '@/components/presentations/CheckboxTag';
import IconClose from '@/components/presentations/Icon/IconClose';
import Input from '@/components/presentations/Input';
import TextArea from '@/components/presentations/TextArea';
import { EventData } from '@/hooks/useEvent';

import style from './EventEditContainer.module.scss';

type Props = {
  event: EventData;
  closeDialog?: () => void;
  handleSubmit: (data: EventData) => void;
};
const EventEditContainer = ({
  event,
  handleSubmit: onSubmit,
  closeDialog,
}: Props) => {
  const [isOpenNoticePanel] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<EventData>({
    defaultValues: event,
  });

  return (
    <div
      className={clsx(
        style['dialog-content'],
        isOpenNoticePanel && style['-disabled'],
      )}>
      <div className={style['header']}>
        <p className={style['title']}>イベントを編集</p>
        <div className={style['icon']} onClick={closeDialog}>
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
              {event?.members.map((member, i) => (
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
            onClick={handleSubmit(async (event) => {
              await onSubmit(event);
              closeDialog?.();
            })}
          />
          <Button text="キャンセル" type="secondary" onClick={closeDialog} />
        </div>
      </div>
    </div>
  );
};

export default EventEditContainer;
