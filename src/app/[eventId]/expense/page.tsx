'use client';

import { useAtom } from 'jotai';
import { NextPage } from 'next';
import { lazy, Suspense } from 'react';

import { eventAtom } from '@/atoms/eventAtom';

const ExpensePageContent = lazy(
  () => import('@/components/containers/expense/ExpensePageContent'),
);

const DashBoard: NextPage = () => {
  const [event] = useAtom(eventAtom); // TODO: event必須化対応;

  return (
    <Suspense fallback={<div style={{ padding: '24px' }}>Loading...</div>}>
      <ExpensePageContent eventId={event?.eventId || ''} />
    </Suspense>
  );
};

export default DashBoard;
