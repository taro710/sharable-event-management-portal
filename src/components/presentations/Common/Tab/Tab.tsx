'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import style from './Tab.module.scss';

import { useResponsive } from '@/hooks/useResponsive';

const Tab = () => {
  const { isSp } = useResponsive();
  const pathName = usePathname();
  const eventId = useParams()?.eventId as string;
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const tabItems = [
    {
      label: 'アイテム',
      path: `/${eventId}/item`,
    },
    {
      label: '会計',
      path: `/${eventId}/expense`,
    },
    {
      label: 'メモ',
      path: `/${eventId}/memo`,
    },
  ];

  useEffect(() => {
    switch (pathName) {
      case `/${eventId}/item`:
        setSelectedIndex(0);
        break;
      case `/${eventId}/expense`:
      case `/${eventId}/expense/seisan`:
        setSelectedIndex(1);
        break;
      case `/${eventId}/memo`:
        setSelectedIndex(2);
        break;
      default:
        break;
    }
  }, [eventId, pathName]);

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
      <ul className={style.tab}>
        {tabItems.map(({ label, path }, i) => (
          <Link
            className={clsx(
              style.item,
              selectedIndex === i && style['-selected'],
            )}
            href={path}
            key={i}>
            {label}
          </Link>
        ))}
        {selectedIndex !== undefined ? (
          <div className={style.background} ref={ref} />
        ) : null}
      </ul>
    </div>
  );
};

export default Tab;
