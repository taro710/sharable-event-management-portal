'use client';

import clsx from 'clsx';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

import style from './ClientLayout.module.scss';

import { eventAtom } from '@/atoms/eventAtom';
import Tab from '@/components/presentations/Common/Tab/Tab';
import IconTriangle from '@/components/presentations/Icon/IconTriangle';
import MainPanel from '@/components/presentations/Panel/MainPanel';
import SubPanel from '@/components/presentations/Panel/SubPanel';
import { EventData } from '@/domain/event';
import { useResponsive } from '@/hooks/useResponsive';

type Props = {
  event: EventData | undefined;
  children: React.ReactNode;
};

const Wrapper = ({ event, children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isSp } = useResponsive();

  const onClick = () => {
    if (!isSp) return;
    setIsOpen(!isOpen);
  };

  const setEvent = useSetAtom(eventAtom);

  useEffect(() => {
    setEvent(event);
  });

  return (
    <div className={style['page-component']}>
      <div className={clsx(style.sub, isOpen && style['-open'])}>
        <SubPanel
          isOpen={isSp ? isOpen : true}
          setIsOpen={isSp ? setIsOpen : undefined}
        />
        {isSp ? (
          <span
            className={clsx(style.icon, isOpen && style['-reverse'])}
            onClick={onClick}>
            <IconTriangle />
          </span>
        ) : null}
      </div>
      <div className={style.main}>
        <div className={style.tab}>
          <Tab />
        </div>
        <div className={style.panel}>
          <MainPanel>{children}</MainPanel>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
