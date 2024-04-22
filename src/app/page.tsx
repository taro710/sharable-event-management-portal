import Link from 'next/link';

import { PAGE_PATH } from '@/constants/pathname';

import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles['layout-component']}>
      <p>Get started by creating event</p>
      <p>↓</p>
      <Link href={PAGE_PATH.NEW_EVENT} className={styles['button']}>
        New Event
      </Link>
    </main>
  );
}
