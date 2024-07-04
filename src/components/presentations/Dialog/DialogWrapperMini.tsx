'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import style from './DialogWrapperMini.module.scss';

import Button from '@/components/presentations/Common/Button/Button';

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
}: Props) => (
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
          <p className={style.title}>{title}</p>
          {children ? <div className={style.content}>{children}</div> : null}
          <div className={style.action}>
            <Button text="確定" onClick={handleOk} />
            <Button text="キャンセル" theme="secondary" onClick={closeDialog} />
          </div>
        </Dialog.Panel>
      </Transition.Child>
    </Dialog>
  </Transition>
);
export default DialogWrapperMini;
