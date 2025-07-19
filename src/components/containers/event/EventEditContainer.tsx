'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import style from './EventEditContainer.module.scss';

import Button from '@/components/presentations/Common/Button/Button';
import DialogWrapperMini from '@/components/presentations/Dialog/DialogWrapperMini';
import Input from '@/components/presentations/Form/Input/Input';
import TagCheckbox from '@/components/presentations/Form/TagCheckbox/TagCheckbox';
import TextArea from '@/components/presentations/Form/TextArea/TextArea';
import { EventData, eventFormSchema } from '@/domain/event';

type Props = {
  event?: EventData;
  onSubmit: (data: EventData) => Promise<void>;
  onCancel?: () => void;
};
const EventEditContainer = ({ event, onSubmit, onCancel }: Props) => {
  const [isOpenNoticePanel, setIsOpenNoticePanel] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EventData>({ resolver: yupResolver(eventFormSchema) });

  const [inputtedMemberName, setInputtedMemberName] = useState<string>('');
  const [members, setMembers] = useState<string[]>([]);

  useEffect(() => {
    const defaultValues = {
      ...event,
      eventId: event?.eventId || 'tmp', // 新規作成時はeventIdは空の状態である
      members: event?.members || [],
    };
    reset(defaultValues);
    setMembers(defaultValues.members);
  }, [event]);

  const currentMembers = watch('members');
  const memberInput = useRef<HTMLInputElement>(null);
  const handleAddMember = () => {
    if (inputtedMemberName === '') return;
    if (members.includes(inputtedMemberName)) return;
    const updatedMembers = [...members, inputtedMemberName];
    setValue('members', [...currentMembers, inputtedMemberName]);
    setMembers(updatedMembers);
    setInputtedMemberName('');
    clearErrors('members');
    memberInput.current?.focus();
  };

  return (
    <>
      <div
        className={clsx(
          style['dialog-content'],
          isOpenNoticePanel && style['-disabled'],
        )}>
        <div className={style.body}>
          <div className={style.form}>
            <Input
              hasError={Boolean(errors.eventName)}
              isRequired
              label="イベント名"
              {...register('eventName')}
            />
            <div className={style['member-field']}>
              <div className={style.member}>
                <Input
                  hasError={Boolean(errors.members)}
                  isRequired
                  label="メンバー"
                  ref={memberInput}
                  value={inputtedMemberName}
                  onChange={(e) => setInputtedMemberName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddMember();
                  }}
                />
                <div className={style.submit}>
                  <Button
                    aria-label="メンバーを追加"
                    text="追加"
                    onClick={handleAddMember}
                  />
                </div>
              </div>
              <ul className={style.list} tabIndex={0}>
                {members.map((member) => (
                  <TagCheckbox
                    defaultChecked
                    key={member} // FIXME:
                    label={member}
                    value={member}
                    {...register('members')}
                  />
                ))}
              </ul>
            </div>
            <Input label="集合場所" {...register('meetingPlace')} />
            <div className={style.twin}>
              <Input label="集合日" type="date" {...register('startDate')} />
              <Input label="集合時間" type="time" {...register('startTime')} />
            </div>

            <Input label="解散場所" {...register('dissolutionPlace')} />
            <div className={style.twin}>
              <Input label="解散日" type="date" {...register('endDate')} />
              <Input label="解散時間" type="time" {...register('endTime')} />
            </div>
            <TextArea label="メッセージ" {...register('message')} />
          </div>
          <div className={style.action}>
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
            {onCancel ? (
              <Button text="キャンセル" theme="secondary" onClick={onCancel} />
            ) : null}
          </div>
        </div>
      </div>
      <DialogWrapperMini
        closeDialog={() => setIsOpenNoticePanel(false)}
        handleOk={handleSubmit(async (__event) => await onSubmit(__event))}
        isOpen={isOpenNoticePanel}
        title="メンバーを削除します">
        <p>関連する会計とメモは残ります</p>
      </DialogWrapperMini>
    </>
  );
};

export default EventEditContainer;
