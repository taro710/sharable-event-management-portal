'use client';

import clsx from 'clsx';
import { useState } from 'react';

import Button from '@/components/presentations/Button';
import IconClose from '@/components/presentations/Icon/IconClose';
import Input from '@/components/presentations/Input';
import TextArea from '@/components/presentations/TextArea';
import { MemoData } from '@/hooks/pages/useMemoPage';

import style from './MemoAddingContainer.module.scss';

type Props = {
  handleSubmit: (memoData: Omit<MemoData, 'memoId'>) => void;
  close: () => void;
};

const MemoAddingContainer = ({ handleSubmit, close }: Props) => {
  const [isOpenNoticePanel] = useState(false);

  const [memo, setMemo] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  return (
    <div
      className={clsx(
        style['dialog-content'],
        isOpenNoticePanel && style['-disabled'],
      )}>
      <div className={style['header']}>
        <p className={style['title']}>メモを追加</p>
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
            onClick={() => handleSubmit({ member: author, memo })}
          />
        </div>
      </div>
    </div>
  );
};
export default MemoAddingContainer;
