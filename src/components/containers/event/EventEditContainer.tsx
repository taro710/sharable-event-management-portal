'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/presentations/Button';
import CheckboxTag from '@/components/presentations/CheckboxTag';
import Input from '@/components/presentations/Form/Input';
import TextArea from '@/components/presentations/Form/TextArea';
import { EventData } from '@/hooks/useEvent';

import style from './EventEditContainer.module.scss';

type Props = {
  event?: EventData;
  handleSubmit: (data: EventData) => Promise<void>;
  handleCancel?: () => void;
};
const EventEditContainer = ({
  event,
  handleSubmit: onSubmit,
  handleCancel,
}: Props) => {
  const [isOpenNoticePanel] = useState<boolean>(false);

  const { register, handleSubmit, watch, setValue } = useForm<EventData>({
    defaultValues: event,
  });

  const [inputtedMemberName, setInputtedMemberName] = useState<string>('');
  const [members, setMembers] = useState<string[]>(event?.members || []);

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
      <div className={style['body']}>
        <div className={style['form']}>
          <Input label="イベント名" isRequired {...register('eventName')} />
          <div className={style['member-field']}>
            <div className={style['member']}>
              <Input
                label="メンバー"
                isRequired
                value={inputtedMemberName}
                onChange={(e) => setInputtedMemberName(e.target.value)}
              />
              <div className={style['submit']}>
                <Button text="追加" onClick={handleAddMember} />
              </div>
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
              const _members = Array.isArray(event.members) // TODO: 他に方法を探す
                ? event?.members
                : [event.members];
              await onSubmit({ ...event, members: _members });
            })}
          />
          {handleCancel && (
            <Button text="キャンセル" type="secondary" onClick={handleCancel} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventEditContainer;
