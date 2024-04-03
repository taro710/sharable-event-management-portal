'use client';

import style from './SubPanel.module.scss';

const SubPanel = () => {
  return (
    <div className={style['sub-panel']}>
      <div className={style['body']}>
        <div className={style['body2']}>
          <h1 className={style['title']}>Nagano Camp</h1>

          <table className={style['overview-table']}>
            <tbody>
              <tr className={style['row']}>
                <td className={style['caption']}>集合場所</td>
                <td className={style['text']}>池袋駅</td>
              </tr>
              <tr className={style['row']}>
                <td className={style['caption']}>集合時間</td>
                <td className={style['text']}>08:30</td>
              </tr>
              <tr className={style['row']}>
                <td className={style['caption']}>参加者</td>
                <td className={style['content']}>
                  <ul className={style['list']}>
                    <li className={style['name']}>たろ</li>
                    <li className={style['name']}>そめ</li>
                    <li className={style['name']}>ハマ</li>
                    <li className={style['name']}>黒田</li>
                    <li className={style['name']}>フラ</li>
                    <li className={style['name']}>りゅー</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubPanel;
