'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useCallback, useEffect } from 'react';

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

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={closeDialog} className={style['background-component']}>
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
