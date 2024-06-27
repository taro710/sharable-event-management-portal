'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useEffect } from 'react';

import style from './DialogWrapper.module.scss';

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  children: React.ReactNode;
};
const DialogWrapper = ({ isOpen, closeDialog, children }: Props) => {
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
    <Transition appear as={Fragment} show={isOpen}>
      <Dialog className={style['background-component']} onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter={style['modal-transition-enter']}
          enterFrom={style['modal-transition-enter-from']}
          enterTo={style['modal-transition-enter-to']}
          leave={style['modal-transition-leave']}
          leaveFrom={style['modal-transition-leave-from']}
          leaveTo={style['modal-transition-leave-to']}>
          <Dialog.Panel className={style['dialog-panel']}>
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default DialogWrapper;
