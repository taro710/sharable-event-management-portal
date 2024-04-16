'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/presentations/Button';
import CheckboxTag from '@/components/presentations/CheckboxTag';
import IconClose from '@/components/presentations/Icon/IconClose';
import Input from '@/components/presentations/Input';
import TextArea from '@/components/presentations/TextArea';
import { EventData } from '@/hooks/useSubPanel';

import style from './EventEditContainer.module.scss';

type Props = {
  closeDialog: () => void;
  handleSubmit: (data: EventData) => Promise<EventData | undefined>;
};
const EventEditContainer = ({ closeDialog, handleSubmit: onSubmit }: Props) => {
  const [isOpenNoticePanel] = useState<boolean>(false);

  const members = ['たろ', 'そめ', 'ハマ', '黒田', 'フラ', 'りゅー'];

  const { register, setValue, watch, handleSubmit } = useForm<EventData>();

  useEffect(() => {
    setValue('members', members);
  }, [watch]);

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
          <Button text="キャンセル" type="secondary" onClick={closeDialog} />
        </div>
      </div>
    </div>
  );
};

export default EventEditContainer;
