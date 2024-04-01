'use client';

import clsx from 'clsx';
import { useCallback, useEffect } from 'react';

import style from './DialogWrapper.module.scss';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
};
const DialogWrapper = ({ isOpen, setIsOpen, children }: Props) => {
  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeDialog();
    },
    [closeDialog, isOpen],
  );
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={clsx(style['dialog-panel'], isOpen && style['-open'])}>
      <div className={clsx(style['dialog'], isOpen && style['-open'])}>
        {children}
      </div>
    </div>
  );
};

export default DialogWrapper;
