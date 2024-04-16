'use client';

import clsx from 'clsx';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

import DialogWrapper from '@/components/Dialog/DialogWrapper';
import IconClose from '@/components/Icon/IconClose';
import { NOLALA_2023 } from '@/test/expense/data/nolala2023';

import style from './DialogExpenseAdding.module.scss';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSubmit: (selectedItem: string[]) => void;
};
const DialogExpenseEdit = ({ isOpen, setIsOpen }: Props) => {
  const [isOpenNoticePanel] = useState<boolean>(false);

  const [expenses, setExpenses] = useState<
    {
      name: string;
      price: number;
      person: string;
      person2: string[];
    }[]
  >([...NOLALA_2023.DATA]);

  const members = ['たろ', 'そめ', 'ハマ', '黒田', 'フラ', 'りゅー'];

  const selectedMember = 'そめ';

  return (
    <DialogWrapper isOpen={isOpen} closeDialog={() => {}}>
      <div
        className={clsx(
          style['dialog-content'],
          isOpenNoticePanel && style['-disabled'],
        )}>
        <div className={style['header']}>
          <p className={style['title']}>支払い記録を変更</p>
          <div className={style['icon']} onClick={() => setIsOpen(false)}>
            <IconClose />
          </div>
        </div>
        <div className={style['body']}>
          <Formik
            initialValues={{
              name: '',
              price: 0,
              person: 'たろ',
              person2: [],
            }}
            onSubmit={async (values) => {
              setExpenses([...expenses, values]);
            }}>
            <Form>
              <Field as="select" name="person">
                {members.map((member, i) => (
                  <option value={member} key={i}>
                    {member}
                  </option>
                ))}
              </Field>
              が、（
              {members
                .filter((member) => member !== selectedMember)
                .map((participant, i) => (
                  <label key={i}>
                    <Field type="checkbox" name="person2" value={participant} />
                    {participant}
                  </label>
                ))}
              ）の
              <Field id="name" name="name" placeholder="品目名" />
              を支払った。
              <br />
              料金は
              <Field
                id="price"
                name="price"
                placeholder="price"
                type="number"
              />
              円。
              <br />
              <br />
              <br />
              <button type="submit">追加</button>
            </Form>
          </Formik>
        </div>
      </div>
    </DialogWrapper>
  );
};

export default DialogExpenseEdit;
