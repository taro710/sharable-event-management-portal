'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useResponsive } from '@/hooks/useResponsive';

import style from './Tab.module.scss';

const Tab = () => {
  const { isSp } = useResponsive();
  const pathName = usePathname();
  const [selectedIndex, setSelectedIndex] = useState<number>();

  useEffect(() => {
    switch (pathName) {
      case '/sample/item':
        setSelectedIndex(0);
        break;
      case '/sample/expense':
      case '/sample/expense/seisan':
        setSelectedIndex(1);
        break;
      case '/sample/memo':
        setSelectedIndex(2);
        break;
      default:
        break;
    }
  }, [pathName]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (selectedIndex === undefined) return;
    ref.current.style.transform = isSp
      ? `translateX( ${selectedIndex * 108}px)`
      : `translateX( ${selectedIndex * 248}px)`;
  }, [isSp, selectedIndex]);

  return (
    <div className={style['tab-component']}>
      <ul className={style['tab']}>
        {tabItems.map(({ label, path }, i) => (
          <Link
            className={clsx(
              style['item'],
              selectedIndex === i && style['-selected'],
            )}
            href={path}
            key={i}>
            {label}
          </Link>
        ))}
        {selectedIndex !== undefined && (
          <div className={style['background']} ref={ref} />
        )}
      </ul>
    </div>
  );
};

export default Tab;

const tabItems = [
  {
    label: '持ち物',
    path: '/sample/item',
  },
  {
    label: '会計',
    path: '/sample/expense',
  },
  {
    label: 'メモ',
    path: '/sample/memo',
  },
];
