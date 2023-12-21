'use client';

import { NextPage } from 'next';
import { useMemo, useState } from 'react';

import Checkbox from '@/components/Checkbox';
import Tag from '@/components/Tag';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const selectedData: { text: string; bring: string[] } | undefined = useMemo(
    () => data[selectedIndex],
    [selectedIndex],
  );

  return (
    <div className={style['item-panel']}>
      <div className={style['tags']}>
        {data.map(({ text }, i) => (
          <Tag
            text={text}
            isActive={i === selectedIndex}
            onClick={() => setSelectedIndex(i)}
            key={i}
          />
        ))}
      </div>
      <div className={style['content']}>
        {selectedData.bring.map((item, i) => (
          <Checkbox label={item} key={i} index={i} />
        ))}
      </div>
      <button className={style['button']}>+</button>
    </div>
  );
};

export default DashBoard;

const data: { text: string; bring: string[] }[] = [
  {
    text: 'たろ',
    bring: ['イス', 'シュラフ', 'カメラ', 'クッカー'],
  },
  {
    text: 'そめ',
    bring: ['イス', 'シュラフ', 'テント'],
  },
  {
    text: 'ハマ',
    bring: ['イス', 'シュラフ', 'ランタン', 'クッカー'],
  },
  {
    text: '黒田',
    bring: ['イス', 'シュラフ', 'クッカー', 'コット'],
  },
  {
    text: 'フラ',
    bring: ['イス', 'シュラフ', 'コット'],
  },
  {
    text: 'りゅー',
    bring: ['イス', 'シュラフ'],
  },
];
