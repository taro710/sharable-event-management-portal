import { Metadata } from 'next';
import Link from 'next/link';

import styles from './page.module.scss';

import { PAGE_META, PAGE_PATH } from '@/constants/pathname';

const Home = () => (
  <div className={styles['layout-component']}>
    <p aria-hidden>Get started by creating event</p>
    <p aria-hidden>↓</p>
    <Link
      aria-label="イベントを作成する"
      className={styles.button}
      href={PAGE_PATH.NEW_EVENT}>
      New Event
    </Link>
  </div>
);

export const metadata: Metadata = PAGE_META['/'];

export default Home;
