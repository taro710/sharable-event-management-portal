'use client';

import { NextPage } from 'next';

import FadeIn from '@/components/FadeIn';

import style from './page.module.scss';

const DashBoard: NextPage = () => {
  return (
    <FadeIn className={style['expense-panel']}>
      <table className={style['table']}>
        <thead>
          <tr>
            <th>品目</th>
            <th>値段</th>
            <th>担当者</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>食材</td>
            <td>¥10,000</td>
            <td>たろ</td>
          </tr>
          <tr>
            <td>薪</td>
            <td>¥1,000</td>
            <td>そめ</td>
          </tr>
          <tr>
            <td>サイト代</td>
            <td>¥5,000</td>
            <td>ハマ</td>
          </tr>
          <tr>
            <td>高速代</td>
            <td>¥1,0000</td>
            <td>黒田</td>
          </tr>
        </tbody>
      </table>
    </FadeIn>
  );
};

export default DashBoard;
