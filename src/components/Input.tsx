'use client';

import style from './Input.module.scss';

type Props = JSX.IntrinsicElements['input'] & {
  label: string;
};

const Input = (props: Props) => {
  const { label, ...inputProps } = props;

  return (
    <div className={style['input-component']}>
      <label className={style['caption']}>{label}</label>
      <input {...inputProps} className={style['input']} />
    </div>
  );
};

export default Input;
