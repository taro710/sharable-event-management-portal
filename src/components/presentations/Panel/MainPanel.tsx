'use client';

import style from './MainPanel.module.scss';

type Props = {
  children: React.ReactNode;
};

const MainPanel = ({ children }: Props) => <div className={style['panel-component']}>{children}</div>;

export default MainPanel;
