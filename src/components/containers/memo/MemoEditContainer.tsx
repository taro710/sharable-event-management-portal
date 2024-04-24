'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useState } from 'react';

import { eventAtom } from '@/atoms/eventAtom';
import Button from '@/components/presentations/Button';
import SelectBox from '@/components/presentations/Form/SelectBox';
import TextArea from '@/components/presentations/Form/TextArea';
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
  const [isOpenNoticePanel] = useState(false);
  const [event] = useAtom(eventAtom);
  const [memo, setMemo] = useState<string>(memoData.memo);
  const [author, setAuthor] = useState<string>(memoData.member);

  return (
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
            {event.members.map((member) => (
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
              onClick={() => handleDelete(memoData.memoId)}
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
  );
};
export default MemoEditContainer;
