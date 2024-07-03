'use client';

import Linkify from 'linkify-react';

import style from './CardMemo.module.scss';

import IconEdit from '@/components/presentations/Icon/IconEdit';
import { MemoData } from '@/hooks/pages/useMemoPage';

type Props = {
  memo: MemoData;
  onClick: () => void;
};
const CardMemo = ({ memo: { member, memo, memoId }, onClick }: Props) => (
  <div className={style.memo} key={memoId}>
    <div className={style.header}>
      <p className={style.member}>{member}</p>
      <button className={style.icon} type="button" onClick={onClick}>
        <IconEdit />
      </button>
    </div>
    <div className={style.text}>
      <Linkify
        as="p"
        options={{
          className: style['link-text'],
          target: {
            url: '_blank', // TODO: noopener
          },
        }}>
        {memo}
      </Linkify>
    </div>
  </div>
);

export default CardMemo;
