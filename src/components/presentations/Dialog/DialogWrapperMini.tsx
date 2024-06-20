'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import Button from '@/components/presentations/Common/Button/Button';

import style from './DialogWrapperMini.module.scss';

type Props = {
  title: string;
  isOpen: boolean;
  closeDialog: () => void;
  handleOk: () => void;
  children?: React.ReactNode;
};

const DialogWrapperMini = ({
  title,
  isOpen,
  closeDialog,
  children,
  handleOk,
}: Props) => {
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
            <p className={style['title']}>{title}</p>
            {children && <div className={style['content']}>{children}</div>}
            <div className={style['action']}>
              <Button text="確定" onClick={handleOk} />
              <Button
                text="キャンセル"
                type="secondary"
                onClick={closeDialog}
              />
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
export default DialogWrapperMini;
