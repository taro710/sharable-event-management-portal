import clsx from 'clsx';

import style from './Tab.module.scss';

const Tab = () => {
  return (
    <ul className={style['tab-component']}>
      <li className={clsx(style['item'], style['-selected'])}>持ち物</li>
      <li className={style['item']}>会計</li>
      <li className={style['item']}>ノート</li>
      <li className={style['item']}>日程調整</li>
    </ul>
  );
};

export default Tab;
