'use client';

import clsx from 'clsx';
import { useState } from 'react';

import Button from '@/components/Button';
import IconClose from '@/components/Icon/IconClose';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import { MemoData } from '@/hooks/pages/useMemoPage';

import style from './MemoAddingContainer.module.scss';
type Props = {
  memoData: MemoData;
  handleSubmit: (data: MemoData) => void;
  close: () => void;
};

const MemoEditContainer = ({ memoData, handleSubmit, close }: Props) => {
  const [isOpenNoticePanel] = useState(false);

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
        <Input
          label="記入者"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <TextArea
          label="メモ"
          value={memo}
          onChange={(e) => {
            setMemo(e.target.value);
          }}
        />

        <div className={style['footer']}>
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
