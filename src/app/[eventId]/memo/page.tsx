'use client';

import { useAtom } from 'jotai';
import { NextPage } from 'next';
import { lazy, Suspense } from 'react';

import { eventAtom } from '@/atoms/eventAtom';

const MemoPageContent = lazy(
  () => import('@/components/containers/memo/MemoPageContent'),
);

const DashBoard: NextPage = () => {
  const [event] = useAtom(eventAtom);

  return (
    <>
      {/* TODO: コンポーネント化 */}
      <Suspense fallback={<div style={{ padding: '24px' }}>Loading...</div>}>
        <MemoPageContent eventId={event?.eventId || ''} />
      </Suspense>
    </>
  );
};

export default DashBoard;
