'use client';

import { forwardRef } from 'react';

import IconDirection from '@/components/presentations/Icon/IconDirection';

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
        <IconDirection />
      </span>
    </div>
  );
});

SelectBox.displayName = 'SelectBox';

export default SelectBox;
