'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useState } from 'react';

import { eventAtom } from '@/atoms/eventAtom';
import Button from '@/components/presentations/Button';
import SelectBox from '@/components/presentations/Form/SelectBox';
import IconClose from '@/components/presentations/Icon/IconClose';
import TextArea from '@/components/presentations/Form/TextArea';
import { MemoData } from '@/hooks/pages/useMemoPage';

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
        <p className={style['title']}>メモを編集</p>
        <div className={style['icon']} onClick={close}>
          <IconClose />
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
            setMemo(e.target.value);
          }}
        />

        <div className={style['footer']}>
          <Button
            text="メモを削除"
            type="secondary"
            onClick={() => handleDelete(memoData.memoId)}
          />
          <p className={style['text']}>残り1000文字</p>
          <Button
            text="確定"
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
