'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { eventAtom } from '@/atoms/eventAtom';
import Button from '@/components/presentations/Button';
import CheckboxTag from '@/components/presentations/CheckboxTag';
import IconClose from '@/components/presentations/Icon/IconClose';
import Input from '@/components/presentations/Input';
import TextArea from '@/components/presentations/TextArea';
import { EventData } from '@/hooks/useEvent';

import style from './EventEditContainer.module.scss';

type Props = {
  closeDialog?: () => void;
  handleSubmit: (data: EventData) => void;
};
const EventEditContainer = ({ handleSubmit: onSubmit, closeDialog }: Props) => {
  const [isOpenNoticePanel] = useState<boolean>(false);

  const [event] = useAtom(eventAtom);

  const { register, handleSubmit, watch, setValue } = useForm<EventData>({
    defaultValues: event,
  });

  const [inputtedMemberName, setInputtedMemberName] = useState<string>('');
  const [members, setMembers] = useState<string[]>([]);

  const handleAddMember = () => {
    if (inputtedMemberName === '') return;
    if (members.includes(inputtedMemberName)) return;
    const updatedMembers = [...members, inputtedMemberName];
    const currentMembers = watch('members');
    const currentMembersArray = (() => {
      if (Array.isArray(currentMembers)) return currentMembers;
      if (typeof currentMembers === 'string') return [currentMembers];
      return [];
    })();

    setValue('members', [...currentMembersArray, inputtedMemberName]);
    setMembers(updatedMembers);
    setInputtedMemberName('');
  };

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
              <Input
                label="メンバー"
                value={inputtedMemberName}
                onChange={(e) => setInputtedMemberName(e.target.value)}
              />
              <Button text="追加" onClick={handleAddMember} />
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
          <div className={style['twin']}>
            <Input label="集合日" type="date" {...register('startDate')} />
            <Input label="集合時間" type="time" {...register('startTime')} />
          </div>

          <Input label="解散場所" {...register('dissolutionPlace')} />
          <div className={style['twin']}>
            <Input label="解散日" type="date" {...register('endDate')} />
            <Input label="解散時間" type="time" {...register('endTime')} />
          </div>
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
