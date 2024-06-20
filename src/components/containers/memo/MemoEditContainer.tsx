'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';

import { eventAtom } from '@/atoms/eventAtom';
import Button from '@/components/presentations/Common/Button/Button';
import DialogWrapperMini from '@/components/presentations/Dialog/DialogWrapperMini';
import SelectBox from '@/components/presentations/Form/SelectBox/SelectBox';
import TextArea from '@/components/presentations/Form/TextArea/TextArea';
import IconArrow from '@/components/presentations/Icon/IconArrow';
import IconClose from '@/components/presentations/Icon/IconClose';
import { MemoData } from '@/hooks/pages/useMemoPage';
import { useResponsive } from '@/hooks/useResponsive';

import style from './MemoAddingContainer.module.scss';
type Props = {
  memoData: MemoData;
  handleSubmit: (data: MemoData) => void;
  handleDelete: (memoId: number) => void;
  close: () => void;
};

const MemoEditContainer = ({
  memoData,
  handleSubmit,
  handleDelete,
  close,
}: Props) => {
  const { isSp } = useResponsive();
  const [event] = useAtom(eventAtom);
  const [memo, setMemo] = useState<string>(memoData.memo);
  const [author, setAuthor] = useState<string>(memoData.member);
  const [isOpenNoticePanel, setIsOpenNoticePanel] = useState<boolean>(false);

  // イベントから消されたユーザーの支払いデータもDBには残っている。それらユーザーも全て含めて清算する
  const members: string[] = useMemo(() => {
    const members = new Set<string>();
    const eventMembers = event?.members || [];
    eventMembers.forEach((member) => members.add(member));
    members.add(memoData.member);
    return Array.from(members);
  }, [event, memoData]);

  return (
    <>
      <div
        className={clsx(
          style['dialog-content'],
          isOpenNoticePanel && style['-disabled'],
        )}>
        <div className={style['header']}>
          <div className={style['icon']} onClick={close}>
            {isSp ? <IconArrow /> : <IconClose />}
          </div>
        </div>
        <div className={style['body']}>
          {event && (
            <SelectBox
              label="記入者"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}>
              {members.map((member) => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
            </SelectBox>
          )}
          <TextArea
            label="メモ"
            value={memo}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length > 1000) {
                setMemo(value.slice(0, 1000));
                return;
              }
              setMemo(e.target.value);
            }}
          />

          <div className={style['footer']}>
            <div className={style['delete']}>
              <Button
                text="メモを削除"
                type="secondary"
                isAlert
                onClick={() => setIsOpenNoticePanel(true)}
              />
            </div>
            <p className={style['text']}>{`${memo.length}/1000`}</p>
            <Button
              text="確定"
              width={120}
              onClick={() =>
                handleSubmit({ member: author, memo, memoId: memoData.memoId })
              }
            />
          </div>
        </div>
      </div>
      <DialogWrapperMini
        title="メモを削除します"
        isOpen={isOpenNoticePanel}
        closeDialog={() => setIsOpenNoticePanel(false)}
        handleOk={() => handleDelete(memoData.memoId)}
      />
    </>
  );
};
export default MemoEditContainer;
