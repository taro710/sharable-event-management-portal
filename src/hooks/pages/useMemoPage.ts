import { useMemo } from 'react';
import useSWR from 'swr';

import { MemoApi } from '@/hooks/pages/memoApi';

// TODO: どこかに定義しておく
export type MemoData = {
  memoId: number;
  member: string;
  memo: string;
};

export const useMemoPage = (eventId: string) => {
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

    const afterAddMemoData = [...currentMemos, { ...newMemoWithId }];
    mutate(afterAddMemoData, false); // optimistic UI update
  };

  const updateMemo = async (updatedMemo: MemoData) => {
    await memoApi.update(updatedMemo);

    const afterUpdateMemoData = [...memos].map((memo) => {
      if (memo.memoId === updatedMemo.memoId) return updatedMemo;
      return memo;
    });
    mutate(afterUpdateMemoData, false); // optimistic UI update
  };

  const deleteMemo = async (memoId: number) => {
    await memoApi.delete(memoId);

    const afterDeleteMemoData = [...memos].filter(
      (memo) => memo.memoId !== memoId,
    );
    mutate(afterDeleteMemoData, false); // optimistic UI update
  };

  return {
    memos,
    addMemo,
    updateMemo,
    deleteMemo,
  };
};
