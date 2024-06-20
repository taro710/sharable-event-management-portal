'use client';

import clsx from 'clsx';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

import { eventAtom } from '@/atoms/eventAtom';
import { expenseAtom } from '@/atoms/expenseAtom';
import { bringListAtom } from '@/atoms/itemAtom';
import { memoAtom } from '@/atoms/memoAtom';
import Tab from '@/components/presentations/Common/Tab/Tab';
import IconTriangle from '@/components/presentations/Icon/IconTriangle';
import MainPanel from '@/components/presentations/Panel/MainPanel';
import SubPanel from '@/components/presentations/Panel/SubPanel';
import { EventData } from '@/domain/event';
import { ExpenseData } from '@/domain/expense';
import { Data } from '@/hooks/pages/useItemPage';
import { MemoData } from '@/hooks/pages/useMemoPage';
import { useResponsive } from '@/hooks/useResponsive';

import style from './ClientLayout.module.scss';

type Props = {
  event: EventData | undefined;
  itemList: Data[] | undefined;
  expense: ExpenseData[] | undefined;
  memo: MemoData[] | undefined;
  children: React.ReactNode;
};

const Wrapper = ({ event, itemList, expense, memo, children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isSp } = useResponsive();

  const onClick = () => {
    if (!isSp) return;
    setIsOpen(!isOpen);
  };

  const setEvent = useSetAtom(eventAtom);
  const setData = useSetAtom(bringListAtom);
  const setExpenses = useSetAtom(expenseAtom);
  const setMemos = useSetAtom(memoAtom);

  useEffect(() => {
    setEvent(event);
    if (itemList) setData(itemList);
    if (expense) setExpenses(expense);
    if (memo) setMemos(memo);
  });

  return (
    <div className={style['page-component']}>
      <div className={clsx(style['sub'], isOpen && style['-open'])}>
        <SubPanel
          isOpen={isSp ? isOpen : true}
          setIsOpen={isSp ? setIsOpen : undefined}
        />
        {isSp && (
          <span
            className={clsx(style['icon'], isOpen && style['-reverse'])}
            onClick={onClick}>
            <IconTriangle />
          </span>
        )}
      </div>
      <div className={style['main']}>
        <div className={style['tab']}>
          <Tab />
        </div>
        <div className={style['panel']}>
          <MainPanel>{children}</MainPanel>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
