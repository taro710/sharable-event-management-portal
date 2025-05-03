'use client';

import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { memoAtom } from '@/atoms/memoAtom';
import { MemoData } from '@/hooks/pages/useMemoPage';

type Props = {
  memos: MemoData[];
  children: React.ReactNode;
};

const MemoPageWrapper = ({ memos, children }: Props) => {
  const setMemos = useSetAtom(memoAtom);
  useEffect(() => setMemos(memos));

  return children;
};

export default MemoPageWrapper;
