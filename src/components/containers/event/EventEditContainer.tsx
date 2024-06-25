'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import style from './EventEditContainer.module.scss';

import { eventAtom } from '@/atoms/eventAtom';
import Button from '@/components/presentations/Common/Button/Button';
import DialogWrapperMini from '@/components/presentations/Dialog/DialogWrapperMini';
import Input from '@/components/presentations/Form/Input/Input';
import TagCheckbox from '@/components/presentations/Form/TagCheckbox/TagCheckbox';
import TextArea from '@/components/presentations/Form/TextArea/TextArea';
import { EventData, eventFormSchema } from '@/domain/event';

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
                  value={inputtedMemberName}
                  onChange={(e) => setInputtedMemberName(e.target.value)}
                />
                <div className={style.submit}>
                  <Button text="追加" onClick={handleAddMember} />
                </div>
              </div>
              <ul className={style.list}>
                {members.map((member, i) => (
                  <TagCheckbox
                    defaultChecked
                    key={i}
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
            {handleCancel ? (
              <Button
                text="キャンセル"
                type="secondary"
                onClick={handleCancel}
              />
            ) : null}
          </div>
        </div>
      </div>
      <DialogWrapperMini
        closeDialog={() => setIsOpenNoticePanel(false)}
        handleOk={handleSubmit(async (event) => await onSubmit(event))}
        isOpen={isOpenNoticePanel}
        title="メンバーを削除します">
        <p>関連する会計とメモは残ります</p>
      </DialogWrapperMini>
    </>
  );
};

export default EventEditContainer;
