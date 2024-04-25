'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { eventAtom } from '@/atoms/eventAtom';
import { expenseAtom } from '@/atoms/expenseAtom';
import { bringListAtom } from '@/atoms/itemAtom';
import { memoAtom } from '@/atoms/memoAtom';
import IconTriangle from '@/components/presentations/Icon/IconTriangle';
import MainPanel from '@/components/presentations/MainPanel';
import SubPanel from '@/components/presentations/SubPanel';
import Tab from '@/components/presentations/Tab';
import { useExpensePage } from '@/hooks/pages/useExpensePage';
import { useItemPage } from '@/hooks/pages/useItemPage';
import { useMemoPage } from '@/hooks/pages/useMemoPage';
import { useEvent } from '@/hooks/useEvent';
import { useResponsive } from '@/hooks/useResponsive';

import style from './layout.module.scss';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isSp } = useResponsive();
  const eventId = useParams()?.eventId as string;

  const onClick = () => {
    if (!isSp) return;
    setIsOpen(!isOpen);
  };

  const { getItemList } = useItemPage();
  const [, setData] = useAtom(bringListAtom);
  // TODO:
  useEffect(() => {
    (async () => {
      console.log('item');
      const data = await getItemList();
      if (data === undefined) return;
      setData(data);
    })();
  }, []);

  const [memos, setMemos] = useAtom(memoAtom);
  const { getMemoList } = useMemoPage(memos);
  // TODO:
  useEffect(() => {
    (async () => {
      console.log('memo');
      const data = await getMemoList();
      if (data === undefined) return;
      setMemos(data);
    })();
  }, []);

  const [expenses, setExpenses] = useAtom(expenseAtom);
  const { getExpenseList } = useExpensePage(expenses);
  // TODO:
  useEffect(() => {
    console.log('expenses');
    (async () => {
      const data = await getExpenseList();
      if (data === undefined) return;
      setExpenses(data);
    })();
  }, []);

  const { getEvent } = useEvent(eventId);

  const [, setEvent] = useAtom(eventAtom);
  useEffect(() => {
    (async () => {
      const data = await getEvent();
      if (data === undefined) return;
      setEvent(data);
    })();
  }, []);

  return (
    <>
      {/* FIXME: */}
      <meta property="og:title" content="野らら" />
      <meta
        name="description"
        content="のららです 配車はメモ欄 集合、解散は各車にて"
      />
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
    </>
  );
};

export default PageLayout;
