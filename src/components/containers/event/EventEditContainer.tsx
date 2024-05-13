'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { eventAtom } from '@/atoms/eventAtom';
import Button from '@/components/presentations/Button';
import TagCheckbox from '@/components/presentations/TagCheckbox';
import DialogWrapperMini from '@/components/presentations/Dialog/DialogWrapperMini';
import Input from '@/components/presentations/Form/Input';
import TextArea from '@/components/presentations/Form/TextArea';
import { EventData, eventFormSchema } from '@/domain/event';

import style from './EventEditContainer.module.scss';

type Props = {
  mode?: 'edit' | 'new';
  handleSubmit: (data: EventData) => Promise<void>;
  handleCancel?: () => void;
};
const EventEditContainer = ({
  mode = 'edit',
  handleSubmit: onSubmit,
  handleCancel,
}: Props) => {
  const [isOpenNoticePanel, setIsOpenNoticePanel] = useState<boolean>(false);
  const [_event] = useAtom(eventAtom);

  const event = mode === 'new' ? undefined : _event;

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<EventData>({
    defaultValues:
      mode === 'new'
        ? { members: [] }
        : { ...event, members: event?.members || [] },
    resolver: yupResolver(eventFormSchema),
  });

  const ref = useRef(false);
  useEffect(() => {
    if (!event) return;
    if (ref.current) return;
    setValue('members', event.members || []);
    ref.current = true;
  }, [event, setValue]);

  const [inputtedMemberName, setInputtedMemberName] = useState<string>('');
  const [members, setMembers] = useState<string[]>(event?.members || []);

  const currentMembers = watch('members');
  const handleAddMember = () => {
    if (inputtedMemberName === '') return;
    if (members.includes(inputtedMemberName)) return;
    const updatedMembers = [...members, inputtedMemberName];
    setValue('members', [...currentMembers, inputtedMemberName]);
    setMembers(updatedMembers);
    setInputtedMemberName('');
    clearErrors('members');
  };

  return (
    <>
      <div
        className={clsx(
          style['dialog-content'],
          isOpenNoticePanel && style['-disabled'],
        )}>
        <div className={style['body']}>
          <div className={style['form']}>
            <Input
              label="イベント名"
              isRequired
              hasError={!!errors.eventName}
              {...register('eventName')}
            />
            <div className={style['member-field']}>
              <div className={style['member']}>
                <Input
                  label="メンバー"
                  isRequired
                  hasError={!!errors.members}
                  value={inputtedMemberName}
                  onChange={(e) => setInputtedMemberName(e.target.value)}
                />
                <div className={style['submit']}>
                  <Button text="追加" onClick={handleAddMember} />
                </div>
              </div>
              <ul className={style['list']}>
                {members.map((member, i) => (
                  <TagCheckbox
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
              onClick={handleSubmit(async (eventData) => {
                const removedMembers =
                  event?.members.filter(
                    (member) => !eventData.members.includes(member),
                  ) || [];
                if (removedMembers.length > 0) {
                  setIsOpenNoticePanel(true);
                  return;
                }
                await onSubmit(eventData);
              })}
            />
            {handleCancel && (
              <Button
                text="キャンセル"
                type="secondary"
                onClick={handleCancel}
              />
            )}
          </div>
        </div>
      </div>
      <DialogWrapperMini
        title="メンバーを削除します"
        isOpen={isOpenNoticePanel}
        closeDialog={() => setIsOpenNoticePanel(false)}
        handleOk={handleSubmit(async (event) => await onSubmit(event))}>
        <p>関連する会計とメモは残ります</p>
      </DialogWrapperMini>
    </>
  );
};

export default EventEditContainer;
