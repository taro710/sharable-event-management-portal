import { collection, setDoc, getDoc, doc } from 'firebase/firestore';

import { database } from '@/firebase';

export type MemoData = {
  memoId?: string;
  member: string;
  memo: string;
};

export const useMemoPage = (currentMemoData: MemoData[]) => {
  const addMemo = async (data: MemoData) => {
    const memoId = '111'; // TODO: memoIdを自動採番する
    const payload: { memoList: MemoData[] } = {
      memoList: [...currentMemoData, { ...data, memoId }],
    };
    const itemRef = collection(database, 'event01');
    try {
      await setDoc(doc(itemRef, 'memo'), payload);
      return payload.memoList; // TODO: 可能ならAPIの戻り値を使いたい
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const updateMemo = async (data: MemoData) => {
    const payload: { memoList: MemoData[] } = {
      memoList: [...currentMemoData].map((memo) => {
        if (memo.memoId === data.memoId) return data;
        return memo;
      }),
    };
    const itemRef = collection(database, 'event01');
    try {
      await setDoc(doc(itemRef, 'memo'), payload);
      return payload.memoList;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const getMemoList = async () => {
    const docRef = doc(database, 'event01', 'memo');

    try {
      const document = await getDoc(docRef);
      const data: MemoData[] = document?.data()?.memoList || [];
      return data;
    } catch (error) {
      console.error('Error get document: ', error);
    }
  };

  return {
    addMemo,
    updateMemo,
    getMemoList,
  };
};
