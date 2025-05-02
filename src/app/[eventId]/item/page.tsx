'use client';

import { useAtom } from 'jotai';
import { NextPage } from 'next';
import { lazy, Suspense } from 'react';

import { eventAtom } from '@/atoms/eventAtom';

const ItemPageContent = lazy(
  () => import('@/components/containers/item/ItemPageContent'),
);

const DashBoard: NextPage = () => {
  const [event] = useAtom(eventAtom);

  return (
    <>
      {/* TODO: コンポーネント化 */}
      <Suspense fallback={<div style={{ padding: '24px' }}>Loading...</div>}>
        <ItemPageContent eventId={event?.eventId || ''} />
      </Suspense>
    </>
  );
};

export default DashBoard;
