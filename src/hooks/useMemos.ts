import { useMemo } from 'react';
import useSWR from 'swr';

import { MemoApi } from '@/api/memoApi';

// TODO: どこかに定義しておく
export type MemoData = {
  memoId: number;
  member: string;
  memo: string;
};

export const useMemos = (eventId: string) => {
  const memoApi = useMemo(() => new MemoApi(eventId), [eventId]);

  const { data: memos = [], mutate } = useSWR<MemoData[]>(
    'memo',
    () => memoApi.get(), // TODO:
  );

  const addMemo = async (newMemo: Omit<MemoData, 'memoId'>) => {
    const currentMemos = [...memos];
    const newMemoId = (() => {
      if (currentMemos.length === 0) return 1;
      const ids = currentMemos.map((memo) => memo.memoId || 0);
      return Math.max(...ids) + 1;
    })();
    const newMemoWithId = { ...newMemo, memoId: newMemoId };

    await memoApi.add(newMemoWithId);

    const afterAddMemosData = [...currentMemos, { ...newMemoWithId }];
    mutate(afterAddMemosData, false); // optimistic UI update
  };

  const updateMemo = async (updatedMemo: MemoData) => {
    await memoApi.update(updatedMemo);

    const afterUpdateMemosData = [...memos].map((memo) => {
      if (memo.memoId === updatedMemo.memoId) return updatedMemo;
      return memo;
    });
    mutate(afterUpdateMemosData, false); // optimistic UI update
  };

  const deleteMemo = async (memoId: number) => {
    await memoApi.delete(memoId);

    const afterDeleteMemosData = [...memos].filter(
      (memo) => memo.memoId !== memoId,
    );
    mutate(afterDeleteMemosData, false); // optimistic UI update
  };

  return {
    memos,
    addMemo,
    updateMemo,
    deleteMemo,
  };
};
