'use client';

import clsx from 'clsx';

import style from './DialogWrapper.module.scss';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};
const DialogWrapper = ({ isOpen, children }: Props) => {
  return (
    <div className={clsx(style['dialog-panel'], isOpen && style['-open'])}>
      <div className={clsx(style['dialog'], isOpen && style['-open'])}>
        {children}
      </div>
    </div>
  );
};

export default DialogWrapper;
