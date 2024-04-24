'use client';

import { forwardRef } from 'react';

import IconArrow from '@/components/presentations/Icon/IconArrowBottom';

import style from './SelectBox.module.scss';

type Props = JSX.IntrinsicElements['select'] & {
  label: string;
  children: JSX.IntrinsicElements['option'][];
};

const SelectBox = forwardRef<HTMLSelectElement, Props>((props: Props, ref) => {
  const { label, children, ...inputProps } = props;

  return (
    <div className={style['select-component']}>
      <label className={style['caption']}>{label}</label>
      <select {...inputProps} className={style['select']} ref={ref}>
        {children}
      </select>
      <span className={style['icon']}>
        <IconArrow />
      </span>
    </div>
  );
});

SelectBox.displayName = 'SelectBox';

export default SelectBox;
