import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { useResponsive } from '@/hooks/useResponsive';

import style from './Tab.module.scss';

type Props = {
  onChange: (index: number) => void;
};

const Tab = ({ onChange }: Props) => {
  const { isSp } = useResponsive();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const onTabChange = (index: number) => {
    onChange(index);
    setSelectedIndex(index);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.transform = isSp
      ? `translateX( ${selectedIndex * 108}px)`
      : `translateX( ${selectedIndex * 248}px)`;
  }, [isSp, selectedIndex]);

  return (
    <div className={style['tab-component']}>
      <ul className={style['tab']}>
        {tabItems.map(({ label }, i) => (
          <li
            className={clsx(
              style['item'],
              selectedIndex === i && style['-selected'],
            )}
            key={i}
            onClick={() => onTabChange(i)}>
            {label}
          </li>
        ))}
        <div className={style['background']} ref={ref} />
      </ul>
    </div>
  );
};

export default Tab;

const tabItems = [
  {
    label: '持ち物',
  },
  {
    label: '会計',
  },
  {
    label: 'メモ',
  },
];
