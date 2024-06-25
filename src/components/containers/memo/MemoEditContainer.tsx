'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';

import style from './MemoAddingContainer.module.scss';

import { eventAtom } from '@/atoms/eventAtom';
import Button from '@/components/presentations/Common/Button/Button';
import DialogWrapperMini from '@/components/presentations/Dialog/DialogWrapperMini';
import SelectBox from '@/components/presentations/Form/SelectBox/SelectBox';
import TextArea from '@/components/presentations/Form/TextArea/TextArea';
import IconArrow from '@/components/presentations/Icon/IconArrow';
import IconClose from '@/components/presentations/Icon/IconClose';
import { MemoData } from '@/hooks/pages/useMemoPage';
import { useResponsive } from '@/hooks/useResponsive';

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
        <div className={style.header}>
          <div className={style.icon} onClick={close}>
            {isSp ? <IconArrow /> : <IconClose />}
          </div>
        </div>
        <div className={style.body}>
          {event ? <SelectBox
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
            </SelectBox> : null}
          <TextArea
            label="メモ"
            value={memo}
            onChange={(e) => {
              const {value} = e.target;
              if (value.length > 1000) {
                setMemo(value.slice(0, 1000));
                return;
              }
              setMemo(e.target.value);
            }}
          />

          <div className={style.footer}>
            <div className={style.delete}>
              <Button
                isAlert
                text="メモを削除"
                type="secondary"
                onClick={() => setIsOpenNoticePanel(true)}
              />
            </div>
            <p className={style.text}>{`${memo.length}/1000`}</p>
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
        closeDialog={() => setIsOpenNoticePanel(false)}
        handleOk={() => handleDelete(memoData.memoId)}
        isOpen={isOpenNoticePanel}
        title="メモを削除します"
      />
    </>
  );
};
export default MemoEditContainer;
