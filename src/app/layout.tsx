import Link from 'next/link';

import { PAGE_PATH } from '@/constants/pathname';

import style from './layout.module.scss';

import type { Metadata } from 'next';

import '@/assets/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={style['page-layout']}>
        <header className={style['header-component']}>
          <Link className={style['logo']} href={{ pathname: PAGE_PATH.TOP }}>
            LOGO
          </Link>
          <ul className={style['menu']}>
            <li className={style['item']}>Events</li>
            <li className={style['item']}>Mypage</li>
            <li className={style['item']}>New Event</li>
          </ul>
        </header>
        <main className={style['main-component']}>
          <div className={style['content']}>{children}</div>
        </main>
        <footer className={style['footer-component']}>
          <div className={style['footer']}>
            <span>©</span>LOGO
          </div>
        </footer>
      </body>
    </html>
  );
}
