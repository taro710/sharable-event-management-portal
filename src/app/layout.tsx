import Link from 'next/link';

import style from './layout.module.scss';

import { PAGE_PATH } from '@/constants/pathname';

import '@/assets/styles/globals.scss';

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={style['page-layout']}>
      <header className={style['header-component']}>
        <Link className={style.logo} href={{ pathname: PAGE_PATH.TOP }}>
          SEMP
        </Link>
        {/* <ul className={style.menu}>
            <li className={style.item}>Events</li>
            <li className={style.item}>Mypage</li>
          </ul> */}
      </header>
      <main className={style['main-component']}>
        <div className={style.content}>{children}</div>
      </main>
      <footer className={style['footer-component']}>
        <div className={style.footer}>
          <span>©</span>SEMP
        </div>
      </footer>
    </body>
  </html>
);

export default RootLayout;
