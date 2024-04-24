'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useState } from 'react';

import { eventAtom } from '@/atoms/eventAtom';
import Button from '@/components/presentations/Button';
import SelectBox from '@/components/presentations/Form/SelectBox';
import TextArea from '@/components/presentations/Form/TextArea';
import IconClose from '@/components/presentations/Icon/IconClose';
import { MemoData } from '@/hooks/pages/useMemoPage';

import style from './MemoAddingContainer.module.scss';

type Props = {
  handleSubmit: (memoData: Omit<MemoData, 'memoId'>) => void;
  close: () => void;
};

const MemoAddingContainer = ({ handleSubmit, close }: Props) => {
  const [isOpenNoticePanel] = useState(false);
  const [event] = useAtom(eventAtom);

  const [memo, setMemo] = useState<string>('');
  const [author, setAuthor] = useState<string>(event?.members[0] || '');

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
