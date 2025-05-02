import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

import style from '@/app/[eventId]/expense/page.module.scss';
import FadeIn from '@/components/presentations/Animation/FadeIn';
import CardExpense from '@/components/presentations/Common/Card/CardExpense';
import { ExpenseData } from '@/domain/expense';
import { database } from '@/firebase';

type Props = {
  onCardClick?: (expenseData: ExpenseData) => void;
  eventId: string;
};

const ExpensePageContent = async ({ onCardClick, eventId }: Props) => {
  if (!eventId) return null; // TODO: ページ直アクセス直後にeventIdがundefined状態になるのを解消する

  const expenses = await (async () => {
    const docRef = doc(database, eventId, 'expense');
    try {
      const document = await getDoc(docRef);
      const data = document?.data();
      const expenseList: ExpenseData[] = Object.values(data || {});
      expenseList.reverse();
      return expenseList;
    } catch (error) {
      throw new Error('Error get document');
    }
  })();

  return (
    <FadeIn className={style['expense-panel']}>
      {expenses.length <= 0 ? (
        <p className={style.notice}>支払いはありません🤔</p>
      ) : null}
      <ul aria-label="支払い記録一覧" className={style.cards}>
        {expenses.map((expense) => (
          <CardExpense
            expense={expense}
            key={expense.expenseId} // FIXME: id型の必須化
            onClick={() => onCardClick?.(expense)}
          />
        ))}
      </ul>
      {expenses.length ? (
        <Link className={style.link} href={`/${eventId}/expense/seisan`}>
          清算金額を確認
        </Link>
      ) : null}
    </FadeIn>
  );
};
export default ExpensePageContent;
